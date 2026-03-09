import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Generate order number
function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `AUC-${timestamp}-${random}`;
}

// GET - Get user's orders
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const type = searchParams.get("type"); // 'buy-now' or 'auction-won'
        const role = searchParams.get("role") || "buyer"; // 'buyer' or 'seller'

        let query = supabase
            .from("orders")
            .select(`
                id,
                order_number,
                order_type,
                subtotal,
                shipping_cost,
                tax,
                buyer_protection_fee,
                total_amount,
                payment_status,
                status,
                shipping_address,
                tracking_number,
                created_at,
                updated_at,
                order_items (
                    id,
                    quantity,
                    unit_price,
                    total_price,
                    product_title,
                    product_image,
                    product_id
                )
            `)
            .order("created_at", { ascending: false });

        // Filter by role
        if (role === "seller") {
            query = query.eq("seller_id", userId);
        } else {
            query = query.eq("buyer_id", userId);
        }

        // Filter by status
        if (status) {
            query = query.eq("status", status);
        }

        // Filter by type
        if (type) {
            query = query.eq("order_type", type);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Orders GET error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // Categorize orders
        const pendingPayment = data?.filter((o: any) => o.status === "pending_payment") || [];
        const processing = data?.filter((o: any) =>
            ["confirmed", "processing"].includes(o.status)
        ) || [];
        const shipped = data?.filter((o: any) => o.status === "shipped") || [];
        const delivered = data?.filter((o: any) => o.status === "delivered") || [];
        const cancelled = data?.filter((o: any) =>
            ["cancelled", "refunded"].includes(o.status)
        ) || [];

        return NextResponse.json({
            orders: data || [],
            counts: {
                pendingPayment: pendingPayment.length,
                processing: processing.length,
                shipped: shipped.length,
                delivered: delivered.length,
                cancelled: cancelled.length,
                total: data?.length || 0,
            },
        });
    } catch (error) {
        console.error("Orders GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Create a new order (from cart or won auction)
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { orderType, auctionId, shippingAddress } = body;

        if (!orderType) {
            return NextResponse.json({ error: "Order type required" }, { status: 400 });
        }

        if (orderType === "auction-won") {
            // Create order from won auction
            if (!auctionId) {
                return NextResponse.json({ error: "Auction ID required" }, { status: 400 });
            }

            // Verify user won this auction
            const { data: auction, error: auctionError } = await supabase
                .from("auctions")
                .select(`
                    id,
                    winner_id,
                    winning_bid,
                    product_id,
                    status,
                    products (
                        id,
                        title,
                        images,
                        seller_id,
                        shipping_cost,
                        buyer_protection_fee
                    )
                `)
                .eq("id", auctionId)
                .single();

            if (auctionError || !auction) {
                return NextResponse.json({ error: "Auction not found" }, { status: 404 });
            }

            if (auction.winner_id !== userId) {
                return NextResponse.json({ error: "You did not win this auction" }, { status: 403 });
            }

            if (auction.status !== "sold") {
                return NextResponse.json({ error: "Auction is not complete" }, { status: 400 });
            }

            // Check if order already exists for this auction
            const { data: existingOrder } = await supabase
                .from("orders")
                .select("id")
                .eq("auction_id", auctionId)
                .single();

            if (existingOrder) {
                return NextResponse.json({
                    error: "Order already exists for this auction",
                    orderId: existingOrder.id,
                }, { status: 400 });
            }

            const product = auction.products as any;
            const subtotal = auction.winning_bid;
            const shippingCost = product.shipping_cost || 0;
            const buyerProtectionFee = product.buyer_protection_fee || 9;
            const tax = subtotal * 0.08; // 8% tax
            const totalAmount = subtotal + shippingCost + buyerProtectionFee + tax;

            // Create order
            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert({
                    order_number: generateOrderNumber(),
                    buyer_id: userId,
                    seller_id: product.seller_id,
                    order_type: "auction-won",
                    auction_id: auctionId,
                    subtotal,
                    shipping_cost: shippingCost,
                    tax,
                    buyer_protection_fee: buyerProtectionFee,
                    total_amount: totalAmount,
                    shipping_address: shippingAddress,
                })
                .select()
                .single();

            if (orderError) {
                console.error("Order create error:", orderError);
                return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
            }

            // Create order item
            await supabase.from("order_items").insert({
                order_id: order.id,
                product_id: auction.product_id,
                quantity: 1,
                unit_price: auction.winning_bid,
                total_price: auction.winning_bid,
                product_title: product.title,
                product_image: product.images?.[0] || null,
            });

            return NextResponse.json({
                success: true,
                order,
            });
        }

        // Create order from cart (buy-now)
        // Get cart items
        const { data: cartItems, error: cartError } = await supabase
            .from("cart_items")
            .select(`
                id,
                quantity,
                product_id,
                products (
                    id,
                    title,
                    images,
                    buy_now_price,
                    seller_id,
                    shipping_cost,
                    free_shipping,
                    buyer_protection_fee,
                    stock_quantity,
                    status
                )
            `)
            .eq("user_id", userId);

        if (cartError) {
            console.error("Cart fetch error:", cartError);
            return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
        }

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // Validate cart items
        const validItems = cartItems.filter((item: any) => {
            const product = item.products;
            return (
                product &&
                product.status === "active" &&
                item.quantity <= product.stock_quantity
            );
        });

        if (validItems.length === 0) {
            return NextResponse.json({ error: "No valid items in cart" }, { status: 400 });
        }

        // Group items by seller (create separate orders per seller)
        const itemsBySeller = new Map<string, any[]>();
        validItems.forEach((item: any) => {
            const sellerId = item.products.seller_id;
            if (!itemsBySeller.has(sellerId)) {
                itemsBySeller.set(sellerId, []);
            }
            itemsBySeller.get(sellerId)!.push(item);
        });

        const createdOrders: any[] = [];

        // Create orders for each seller
        for (const [sellerId, items] of itemsBySeller) {
            const subtotal = items.reduce((sum: number, item: any) => {
                return sum + item.products.buy_now_price * item.quantity;
            }, 0);

            const shippingCost = items.reduce((sum: number, item: any) => {
                if (item.products.free_shipping) return sum;
                return sum + (item.products.shipping_cost || 0);
            }, 0);

            const buyerProtectionFee = 9; // Flat fee
            const tax = subtotal * 0.08;
            const totalAmount = subtotal + shippingCost + buyerProtectionFee + tax;

            // Create order
            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert({
                    order_number: generateOrderNumber(),
                    buyer_id: userId,
                    seller_id: sellerId,
                    order_type: "buy-now",
                    subtotal,
                    shipping_cost: shippingCost,
                    tax,
                    buyer_protection_fee: buyerProtectionFee,
                    total_amount: totalAmount,
                    shipping_address: shippingAddress,
                })
                .select()
                .single();

            if (orderError) {
                console.error("Order create error:", orderError);
                continue;
            }

            // Create order items
            const orderItems = items.map((item: any) => ({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.products.buy_now_price,
                total_price: item.products.buy_now_price * item.quantity,
                product_title: item.products.title,
                product_image: item.products.images?.[0] || null,
            }));

            await supabase.from("order_items").insert(orderItems);

            // Update product stock
            for (const item of items) {
                await supabase
                    .from("products")
                    .update({
                        stock_quantity: item.products.stock_quantity - item.quantity,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", item.product_id);
            }

            createdOrders.push(order);
        }

        // Clear cart
        await supabase.from("cart_items").delete().eq("user_id", userId);

        return NextResponse.json({
            success: true,
            orders: createdOrders,
        });
    } catch (error) {
        console.error("Orders POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
