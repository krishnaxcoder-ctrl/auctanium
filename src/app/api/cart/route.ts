import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch user's cart with product details
export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from("cart_items")
            .select(`
                id,
                quantity,
                created_at,
                product_id,
                products (
                    id,
                    title,
                    images,
                    buy_now_price,
                    stock_quantity,
                    shipping_cost,
                    free_shipping,
                    seller_id,
                    seller_name,
                    status
                )
            `)
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Cart GET error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // Filter out items where product is no longer available
        const validItems = data?.filter(
            (item: any) => item.products && item.products.status === "active"
        ) || [];

        // Calculate totals
        const subtotal = validItems.reduce((sum: number, item: any) => {
            return sum + (item.products.buy_now_price || 0) * item.quantity;
        }, 0);

        const shippingTotal = validItems.reduce((sum: number, item: any) => {
            if (item.products.free_shipping) return sum;
            return sum + (item.products.shipping_cost || 0);
        }, 0);

        return NextResponse.json({
            items: validItems,
            itemCount: validItems.length,
            subtotal,
            shippingTotal,
            total: subtotal + shippingTotal,
        });
    } catch (error) {
        console.error("Cart GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, quantity = 1 } = await request.json();

        if (!productId) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        // Verify product exists and is buy-now eligible
        const { data: product, error: productError } = await supabase
            .from("products")
            .select("id, listing_type, buy_now_price, stock_quantity, status")
            .eq("id", productId)
            .single();

        if (productError || !product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (product.status !== "active") {
            return NextResponse.json({ error: "Product is not available" }, { status: 400 });
        }

        if (product.listing_type === "auction" && !product.buy_now_price) {
            return NextResponse.json({ error: "This product is auction-only" }, { status: 400 });
        }

        if (quantity > product.stock_quantity) {
            return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
        }

        // Check if item already in cart
        const { data: existingItem } = await supabase
            .from("cart_items")
            .select("id, quantity")
            .eq("user_id", userId)
            .eq("product_id", productId)
            .single();

        if (existingItem) {
            // Update quantity
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.stock_quantity) {
                return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
            }

            const { error: updateError } = await supabase
                .from("cart_items")
                .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
                .eq("id", existingItem.id);

            if (updateError) {
                console.error("Cart update error:", updateError);
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: "Cart updated" });
        }

        // Insert new cart item
        const { error: insertError } = await supabase.from("cart_items").insert({
            user_id: userId,
            product_id: productId,
            quantity,
        });

        if (insertError) {
            console.error("Cart insert error:", insertError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Cart POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH - Update cart item quantity
export async function PATCH(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { itemId, quantity } = await request.json();

        if (!itemId || quantity === undefined) {
            return NextResponse.json({ error: "Item ID and quantity required" }, { status: 400 });
        }

        if (quantity < 1) {
            return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 });
        }

        // Get cart item with product info
        const { data: cartItem, error: fetchError } = await supabase
            .from("cart_items")
            .select("id, product_id, products(stock_quantity)")
            .eq("id", itemId)
            .eq("user_id", userId)
            .single();

        if (fetchError || !cartItem) {
            return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
        }

        const product = cartItem.products as any;
        if (quantity > product.stock_quantity) {
            return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
        }

        const { error: updateError } = await supabase
            .from("cart_items")
            .update({ quantity, updated_at: new Date().toISOString() })
            .eq("id", itemId)
            .eq("user_id", userId);

        if (updateError) {
            console.error("Cart update error:", updateError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Quantity updated" });
    } catch (error) {
        console.error("Cart PATCH error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Remove item from cart or clear cart
export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get("itemId");
        const clearAll = searchParams.get("clearAll");

        if (clearAll === "true") {
            // Clear entire cart
            const { error } = await supabase
                .from("cart_items")
                .delete()
                .eq("user_id", userId);

            if (error) {
                console.error("Cart clear error:", error);
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: "Cart cleared" });
        }

        if (!itemId) {
            return NextResponse.json({ error: "Item ID required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("cart_items")
            .delete()
            .eq("id", itemId)
            .eq("user_id", userId);

        if (error) {
            console.error("Cart delete error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error("Cart DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
