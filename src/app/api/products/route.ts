import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - List products with filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const category = searchParams.get("category");
        const listingType = searchParams.get("listingType");
        const status = searchParams.get("status") || "active";
        const sellerId = searchParams.get("sellerId");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort") || "created_at";
        const order = searchParams.get("order") || "desc";
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");

        let query = supabase
            .from("products")
            .select(`
                *,
                auctions (
                    id,
                    start_time,
                    end_time,
                    status,
                    minimum_bid_increment
                )
            `, { count: "exact" });

        // Apply filters
        if (status) {
            query = query.eq("status", status);
        }

        if (category) {
            query = query.eq("category", category);
        }

        if (listingType) {
            query = query.eq("listing_type", listingType);
        }

        if (sellerId) {
            query = query.eq("seller_id", sellerId);
        }

        if (search) {
            query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
        }

        // Apply sorting
        const ascending = order === "asc";
        if (sort === "price") {
            query = query.order("current_bid", { ascending, nullsFirst: false });
        } else if (sort === "bids") {
            query = query.order("bids_count", { ascending: false });
        } else if (sort === "ending") {
            // This requires joining with auctions
            query = query.order("created_at", { ascending });
        } else {
            query = query.order("created_at", { ascending });
        }

        // Apply pagination
        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) {
            console.error("Products GET error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({
            products: data || [],
            total: count || 0,
            limit,
            offset,
            hasMore: count ? offset + limit < count : false,
        });
    } catch (error) {
        console.error("Products GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // Validate required fields
        const { title, category, listingType } = body;

        if (!title || !category || !listingType) {
            return NextResponse.json({
                error: "Title, category, and listing type are required",
            }, { status: 400 });
        }

        // Generate lot number
        const lotNumber = `LOT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        // Create product
        const productData = {
            title: body.title,
            description: body.description || null,
            seller_description: body.sellerDescription || null,
            images: body.images || [],
            category: body.category,
            subcategory: body.subcategory || null,
            lot_number: lotNumber,
            condition: body.condition || "new",
            specifications: body.specifications || [],
            listing_type: body.listingType,
            starting_price: body.startingPrice || 0,
            current_bid: 0,
            buy_now_price: body.buyNowPrice || null,
            reserve_price: body.reservePrice || null,
            estimate_low: body.estimateLow || null,
            estimate_high: body.estimateHigh || null,
            no_reserve: body.noReserve || false,
            stock_quantity: body.stockQuantity || 1,
            seller_id: userId,
            seller_name: body.sellerName || null,
            seller_verified: false,
            shipping_available: body.shippingAvailable !== false,
            shipping_location: body.shippingLocation || null,
            shipping_cost: body.shippingCost || 0,
            free_shipping: body.freeShipping || false,
            buyer_protection_fee: body.buyerProtectionFee || 9,
            status: body.status || "draft",
        };

        const { data: product, error: productError } = await supabase
            .from("products")
            .insert(productData)
            .select()
            .single();

        if (productError) {
            console.error("Product create error:", productError);
            return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
        }

        // If it's an auction, create auction record
        if (body.listingType === "auction" || body.listingType === "both") {
            const startTime = body.auctionStartTime || new Date().toISOString();
            const endTime = body.auctionEndTime ||
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // Default 7 days

            const { error: auctionError } = await supabase.from("auctions").insert({
                product_id: product.id,
                start_time: startTime,
                end_time: endTime,
                status: new Date(startTime) <= new Date() ? "active" : "scheduled",
                minimum_bid_increment: body.minimumBidIncrement || 5,
            });

            if (auctionError) {
                console.error("Auction create error:", auctionError);
                // Product created but auction failed - could rollback or continue
            }
        }

        return NextResponse.json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("Products POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
