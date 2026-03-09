import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Get bid history for a product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const { productId } = await params;

        if (!productId) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "20");

        // Get auction for this product
        const { data: auction, error: auctionError } = await supabase
            .from("auctions")
            .select("id, status, end_time, start_time")
            .eq("product_id", productId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        if (auctionError) {
            // No auction found, might be buy-now only
            return NextResponse.json({
                bids: [],
                totalBids: 0,
                auction: null,
            });
        }

        // Get bids for this auction
        const { data: bids, error: bidsError } = await supabase
            .from("bids")
            .select("id, amount, bidder_display_name, is_auto_bid, status, created_at")
            .eq("auction_id", auction.id)
            .order("created_at", { ascending: false })
            .limit(limit);

        if (bidsError) {
            console.error("Bids fetch error:", bidsError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // Get total bid count
        const { count } = await supabase
            .from("bids")
            .select("*", { count: "exact", head: true })
            .eq("auction_id", auction.id);

        return NextResponse.json({
            bids: bids || [],
            totalBids: count || 0,
            auction: {
                id: auction.id,
                status: auction.status,
                endTime: auction.end_time,
                startTime: auction.start_time,
            },
        });
    } catch (error) {
        console.error("Bid history GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
