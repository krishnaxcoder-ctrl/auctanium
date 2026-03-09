import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Get auction details and status
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Check if id is product_id or auction_id
        let auction;
        let isProductId = false;

        // First try as auction_id
        const { data: auctionById, error: auctionError } = await supabase
            .from("auctions")
            .select(`
                *,
                products (
                    id,
                    title,
                    images,
                    current_bid,
                    starting_price,
                    bids_count,
                    status
                )
            `)
            .eq("id", id)
            .single();

        if (auctionById) {
            auction = auctionById;
        } else {
            // Try as product_id
            const { data: auctionByProductId } = await supabase
                .from("auctions")
                .select(`
                    *,
                    products (
                        id,
                        title,
                        images,
                        current_bid,
                        starting_price,
                        bids_count,
                        status
                    )
                `)
                .eq("product_id", id)
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (auctionByProductId) {
                auction = auctionByProductId;
                isProductId = true;
            }
        }

        if (!auction) {
            return NextResponse.json({ error: "Auction not found" }, { status: 404 });
        }

        // Calculate time remaining
        const endTime = new Date(auction.end_time);
        const now = new Date();
        const timeRemaining = Math.max(0, endTime.getTime() - now.getTime());

        // Get top bidders (anonymized)
        const { data: topBids } = await supabase
            .from("bids")
            .select("id, amount, bidder_display_name, created_at")
            .eq("auction_id", auction.id)
            .order("amount", { ascending: false })
            .limit(5);

        // Get total unique bidders
        const { data: uniqueBidders } = await supabase
            .from("bids")
            .select("user_id")
            .eq("auction_id", auction.id);

        const uniqueBidderCount = new Set(uniqueBidders?.map((b) => b.user_id) || []).size;

        // Check if auction should be ended
        if (auction.status === "active" && timeRemaining === 0) {
            // Process auction end
            await processAuctionEnd(auction.id);
            auction.status = "ended";
        }

        return NextResponse.json({
            auction: {
                id: auction.id,
                productId: auction.product_id,
                startTime: auction.start_time,
                endTime: auction.end_time,
                status: auction.status,
                minimumBidIncrement: auction.minimum_bid_increment,
                winnerId: auction.winner_id,
                winningBid: auction.winning_bid,
            },
            product: auction.products,
            timeRemaining,
            timeRemainingFormatted: formatTimeRemaining(timeRemaining),
            topBids: topBids || [],
            totalBids: auction.products?.bids_count || 0,
            uniqueBidders: uniqueBidderCount,
            currentBid: auction.products?.current_bid || auction.products?.starting_price || 0,
            isEnded: timeRemaining === 0,
        });
    } catch (error) {
        console.error("Auction GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Process auction end
async function processAuctionEnd(auctionId: string) {
    // Get the winning bid
    const { data: winningBid } = await supabase
        .from("bids")
        .select("*")
        .eq("auction_id", auctionId)
        .eq("status", "winning")
        .single();

    const auctionUpdate: any = {
        status: "ended",
        updated_at: new Date().toISOString(),
    };

    if (winningBid) {
        auctionUpdate.status = "sold";
        auctionUpdate.winner_id = winningBid.user_id;
        auctionUpdate.winning_bid = winningBid.amount;

        // Update winning bid status
        await supabase
            .from("bids")
            .update({ status: "won" })
            .eq("id", winningBid.id);

        // Update all other bids to lost
        await supabase
            .from("bids")
            .update({ status: "lost" })
            .eq("auction_id", auctionId)
            .neq("id", winningBid.id);

        // Get auction product info for notifications
        const { data: auction } = await supabase
            .from("auctions")
            .select("product_id, products(title)")
            .eq("id", auctionId)
            .single();

        const productTitle = (auction?.products as any)?.title || "item";

        // Create notification for winner
        await supabase.from("notifications").insert({
            user_id: winningBid.user_id,
            type: "won",
            title: "Congratulations! You won the auction!",
            message: `You won "${productTitle}" with a bid of $${winningBid.amount.toFixed(2)}. Complete your purchase now!`,
            auction_id: auctionId,
            product_id: auction?.product_id,
        });

        // Create notifications for losing bidders
        const { data: losingBids } = await supabase
            .from("bids")
            .select("user_id")
            .eq("auction_id", auctionId)
            .eq("status", "lost");

        if (losingBids) {
            const uniqueUsers = [...new Set(losingBids.map((b) => b.user_id))];
            const notifications = uniqueUsers.map((userId) => ({
                user_id: userId,
                type: "lost",
                title: "Auction ended",
                message: `The auction for "${productTitle}" has ended. You were outbid.`,
                auction_id: auctionId,
                product_id: auction?.product_id,
            }));

            await supabase.from("notifications").insert(notifications);
        }

        // Update product status
        await supabase
            .from("products")
            .update({ status: "sold", updated_at: new Date().toISOString() })
            .eq("id", auction?.product_id);
    } else {
        // No bids - auction ended without sale
        const { data: auction } = await supabase
            .from("auctions")
            .select("product_id")
            .eq("id", auctionId)
            .single();

        await supabase
            .from("products")
            .update({ status: "ended", updated_at: new Date().toISOString() })
            .eq("id", auction?.product_id);
    }

    // Update auction
    await supabase.from("auctions").update(auctionUpdate).eq("id", auctionId);
}

// Format time remaining
function formatTimeRemaining(ms: number): string {
    if (ms <= 0) return "Ended";

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
}
