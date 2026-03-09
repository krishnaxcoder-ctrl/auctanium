import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch user's wishlist
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");

        // Check if specific product is wishlisted
        if (productId) {
            const { data, error } = await supabase
                .from("wishlists")
                .select("id")
                .eq("user_id", userId)
                .eq("product_id", productId)
                .single();

            if (error && error.code !== "PGRST116") {
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }

            return NextResponse.json({ isWishlisted: !!data });
        }

        // Get all wishlisted product IDs
        const { data, error } = await supabase
            .from("wishlists")
            .select("product_id")
            .eq("user_id", userId);

        if (error) {
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        const productIds = data?.map((item) => item.product_id) || [];
        return NextResponse.json({ productIds });
    } catch (error) {
        console.error("Wishlist GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Add to wishlist
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId } = await request.json();

        if (!productId) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        const { error } = await supabase.from("wishlists").insert({
            user_id: userId,
            product_id: productId,
        });

        if (error) {
            // Handle duplicate entry
            if (error.code === "23505") {
                return NextResponse.json({ message: "Already in wishlist" }, { status: 200 });
            }
            console.error("Wishlist insert error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Added to wishlist" });
    } catch (error) {
        console.error("Wishlist POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Remove from wishlist
export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("wishlists")
            .delete()
            .eq("user_id", userId)
            .eq("product_id", productId);

        if (error) {
            console.error("Wishlist delete error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Removed from wishlist" });
    } catch (error) {
        console.error("Wishlist DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
