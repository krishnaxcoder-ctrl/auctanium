import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Generate anonymous bidder name
function generateBidderName(userId: string): string {
    const hash = userId.split("").reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);
    return `Bidder ${(hash % 9000) + 1000}`;
}

// POST - Place a new bid
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, amount, maxBid } = await request.json();

        if (!productId || !amount) {
            return NextResponse.json({ error: "Product ID and amount required" }, { status: 400 });
        }

        // Get product and auction info
        const { data: product, error: productError } = await supabase
            .from("products")
            .select("id, listing_type, current_bid, starting_price, status, seller_id")
            .eq("id", productId)
            .single();

        if (productError || !product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (product.status !== "active") {
            return NextResponse.json({ error: "This product is not available for bidding" }, { status: 400 });
        }

        if (product.listing_type === "buy-now") {
            return NextResponse.json({ error: "This product is not an auction" }, { status: 400 });
        }

        if (product.seller_id === userId) {
            return NextResponse.json({ error: "You cannot bid on your own product" }, { status: 400 });
        }

        // Get active auction
        const { data: auction, error: auctionError } = await supabase
            .from("auctions")
            .select("id, status, end_time, minimum_bid_increment")
            .eq("product_id", productId)
            .eq("status", "active")
            .single();

        if (auctionError || !auction) {
            return NextResponse.json({ error: "No active auction found" }, { status: 404 });
        }

        // Check if auction has ended
        if (new Date(auction.end_time) < new Date()) {
            return NextResponse.json({ error: "Auction has ended" }, { status: 400 });
        }

        // Validate bid amount
        const currentBid = product.current_bid || product.starting_price || 0;
        const minimumBid = currentBid + (auction.minimum_bid_increment || 5);

        if (amount < minimumBid) {
            return NextResponse.json({
                error: `Minimum bid is $${minimumBid.toFixed(2)}`,
                minimumBid,
            }, { status: 400 });
        }

        // Mark previous winning bid as outbid
        await supabase
            .from("bids")
            .update({ status: "outbid" })
            .eq("auction_id", auction.id)
            .eq("status", "winning");

        // Create the bid
        const bidderDisplayName = generateBidderName(userId);
        const isAutoBid = maxBid && maxBid > amount;

        const { data: newBid, error: bidError } = await supabase
            .from("bids")
            .insert({
                auction_id: auction.id,
                product_id: productId,
                user_id: userId,
                amount,
                max_bid: maxBid || null,
                is_auto_bid: isAutoBid,
                bidder_display_name: bidderDisplayName,
                status: "winning",
            })
            .select()
            .single();

        if (bidError) {
            console.error("Bid insert error:", bidError);
            return NextResponse.json({ error: "Failed to place bid" }, { status: 500 });
        }

        // Update product current bid and bids count
        await supabase
            .from("products")
            .update({
                current_bid: amount,
                bids_count: product.bids_count ? product.bids_count + 1 : 1,
                updated_at: new Date().toISOString(),
            })
            .eq("id", productId);

        // Process auto-bids from other users
        await processAutoBids(auction.id, productId, amount, userId, auction.minimum_bid_increment);

        // Get updated current bid
        const { data: updatedProduct } = await supabase
            .from("products")
            .select("current_bid, bids_count")
            .eq("id", productId)
            .single();

        // Create notification for outbid users
        const { data: outbidUsers } = await supabase
            .from("bids")
            .select("user_id")
            .eq("auction_id", auction.id)
            .eq("status", "outbid")
            .neq("user_id", userId);

        if (outbidUsers && outbidUsers.length > 0) {
            const uniqueUsers = [...new Set(outbidUsers.map((b) => b.user_id))];
            const notifications = uniqueUsers.map((outbidUserId) => ({
                user_id: outbidUserId,
                type: "outbid",
                title: "You've been outbid!",
                message: `Someone placed a higher bid. Current bid: $${amount.toFixed(2)}`,
                auction_id: auction.id,
                product_id: productId,
            }));

            await supabase.from("notifications").insert(notifications);
        }

        return NextResponse.json({
            success: true,
            bid: newBid,
            currentBid: updatedProduct?.current_bid || amount,
            bidsCount: updatedProduct?.bids_count || 1,
        });
    } catch (error) {
        console.error("Bid POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Process auto-bids
async function processAutoBids(
    auctionId: string,
    productId: string,
    currentAmount: number,
    excludeUserId: string,
    minIncrement: number
) {
    // Get all auto-bids that can outbid current amount
    const { data: autoBids } = await supabase
        .from("bids")
        .select("*")
        .eq("auction_id", auctionId)
        .not("max_bid", "is", null)
        .gt("max_bid", currentAmount)
        .neq("user_id", excludeUserId)
        .order("max_bid", { ascending: false });

    if (!autoBids || autoBids.length === 0) return;

    // Process highest auto-bid
    const highestAutoBid = autoBids[0];
    const newBidAmount = Math.min(
        highestAutoBid.max_bid,
        currentAmount + minIncrement
    );

    // Mark previous winning bid as outbid
    await supabase
        .from("bids")
        .update({ status: "outbid" })
        .eq("auction_id", auctionId)
        .eq("status", "winning");

    // Create auto-bid
    await supabase.from("bids").insert({
        auction_id: auctionId,
        product_id: productId,
        user_id: highestAutoBid.user_id,
        amount: newBidAmount,
        max_bid: highestAutoBid.max_bid,
        is_auto_bid: true,
        bidder_display_name: highestAutoBid.bidder_display_name,
        status: "winning",
    });

    // Update product
    await supabase
        .from("products")
        .update({
            current_bid: newBidAmount,
            bids_count: supabase.rpc("increment_bids_count", { product_id: productId }),
            updated_at: new Date().toISOString(),
        })
        .eq("id", productId);
}

// GET - Get user's bids (my-bids)
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status"); // 'active', 'won', 'lost', 'all'

        let query = supabase
            .from("bids")
            .select(`
                id,
                amount,
                max_bid,
                is_auto_bid,
                status,
                created_at,
                product_id,
                auction_id,
                products (
                    id,
                    title,
                    images,
                    current_bid,
                    status
                ),
                auctions (
                    id,
                    end_time,
                    status,
                    winner_id
                )
            `)
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (status && status !== "all") {
            if (status === "active") {
                query = query.in("status", ["active", "winning"]);
            } else {
                query = query.eq("status", status);
            }
        }

        const { data, error } = await query;

        if (error) {
            console.error("Bids GET error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // Group bids by product to show only the highest bid per product
        const bidsByProduct = new Map();
        data?.forEach((bid: any) => {
            const existing = bidsByProduct.get(bid.product_id);
            if (!existing || bid.amount > existing.amount) {
                bidsByProduct.set(bid.product_id, bid);
            }
        });

        const uniqueBids = Array.from(bidsByProduct.values());

        // Categorize bids
        const activeBids = uniqueBids.filter(
            (b: any) => b.auctions?.status === "active" && ["active", "winning"].includes(b.status)
        );
        const wonBids = uniqueBids.filter((b: any) => b.status === "won");
        const lostBids = uniqueBids.filter((b: any) => b.status === "lost");

        return NextResponse.json({
            bids: uniqueBids,
            activeBids,
            wonBids,
            lostBids,
            counts: {
                active: activeBids.length,
                won: wonBids.length,
                lost: lostBids.length,
                total: uniqueBids.length,
            },
        });
    } catch (error) {
        console.error("Bids GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
