import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper to check if string is UUID
function isUUID(str: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

// GET - Get product details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Query by UUID or slug
        const query = supabase
            .from("products")
            .select(`
                *,
                auctions (
                    id,
                    start_time,
                    end_time,
                    status,
                    minimum_bid_increment,
                    winner_id,
                    winning_bid
                )
            `);

        // Check if id is UUID or slug
        const { data: product, error } = isUUID(id)
            ? await query.eq("id", id).single()
            : await query.eq("slug", id).single();

        if (error || !product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Get recent bids if auction
        let recentBids: any[] = [];
        const auction = product.auctions?.[0];

        if (auction) {
            const { data: bids } = await supabase
                .from("bids")
                .select("id, amount, bidder_display_name, created_at")
                .eq("auction_id", auction.id)
                .order("created_at", { ascending: false })
                .limit(5);

            recentBids = bids || [];
        }

        return NextResponse.json({
            product,
            auction: auction || null,
            recentBids,
        });
    } catch (error) {
        console.error("Product GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT - Update product
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Verify ownership
        const { data: existingProduct, error: fetchError } = await supabase
            .from("products")
            .select("seller_id, status")
            .eq("id", id)
            .single();

        if (fetchError || !existingProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (existingProduct.seller_id !== userId) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        // Build update object
        const updates: any = {
            updated_at: new Date().toISOString(),
        };

        // Only allow certain fields to be updated
        const allowedFields = [
            "title", "description", "seller_description", "images",
            "category", "subcategory", "condition", "specifications",
            "buy_now_price", "reserve_price", "estimate_low", "estimate_high",
            "stock_quantity", "shipping_available", "shipping_location",
            "shipping_cost", "free_shipping", "status"
        ];

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                // Convert camelCase to snake_case
                const snakeField = field.replace(/([A-Z])/g, "_$1").toLowerCase();
                updates[snakeField] = body[field];
            }
        }

        const { data: product, error: updateError } = await supabase
            .from("products")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (updateError) {
            console.error("Product update error:", updateError);
            return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
        }

        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error("Product PUT error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Delete product (soft delete by setting status)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        // Verify ownership
        const { data: product, error: fetchError } = await supabase
            .from("products")
            .select("seller_id, status")
            .eq("id", id)
            .single();

        if (fetchError || !product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (product.seller_id !== userId) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        // Check if product can be deleted (not sold or in active auction with bids)
        const { data: auction } = await supabase
            .from("auctions")
            .select("id, status")
            .eq("product_id", id)
            .eq("status", "active")
            .single();

        if (auction) {
            const { count } = await supabase
                .from("bids")
                .select("*", { count: "exact", head: true })
                .eq("auction_id", auction.id);

            if (count && count > 0) {
                return NextResponse.json({
                    error: "Cannot delete product with active bids",
                }, { status: 400 });
            }
        }

        // Soft delete
        const { error: deleteError } = await supabase
            .from("products")
            .update({
                status: "cancelled",
                updated_at: new Date().toISOString(),
            })
            .eq("id", id);

        if (deleteError) {
            console.error("Product delete error:", deleteError);
            return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
        }

        // Also cancel any associated auction
        await supabase
            .from("auctions")
            .update({ status: "cancelled", updated_at: new Date().toISOString() })
            .eq("product_id", id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Product DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
