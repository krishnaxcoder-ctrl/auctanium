import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST - Process payment for order(s)
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { orderIds, paymentMethod } = await request.json();

        if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
            return NextResponse.json({ error: "Order IDs required" }, { status: 400 });
        }

        if (!paymentMethod) {
            return NextResponse.json({ error: "Payment method required" }, { status: 400 });
        }

        // Verify all orders belong to user and are pending payment
        const { data: orders, error: ordersError } = await supabase
            .from("orders")
            .select("*")
            .in("id", orderIds)
            .eq("buyer_id", userId)
            .eq("status", "pending_payment");

        if (ordersError) {
            console.error("Orders fetch error:", ordersError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        if (!orders || orders.length !== orderIds.length) {
            return NextResponse.json({
                error: "Some orders not found or already processed",
            }, { status: 400 });
        }

        // Calculate total
        const totalAmount = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);

        // Mock payment processing
        // In production, integrate with Stripe, PayPal, etc.
        const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // Simulate payment success (in production, this would be async)
        const paymentSuccess = true;

        if (!paymentSuccess) {
            // Update orders with failed payment
            await supabase
                .from("orders")
                .update({
                    payment_status: "failed",
                    updated_at: new Date().toISOString(),
                })
                .in("id", orderIds);

            return NextResponse.json({ error: "Payment failed" }, { status: 402 });
        }

        // Update orders with successful payment
        const { error: updateError } = await supabase
            .from("orders")
            .update({
                payment_status: "completed",
                payment_method: paymentMethod,
                payment_id: paymentId,
                status: "confirmed",
                updated_at: new Date().toISOString(),
            })
            .in("id", orderIds);

        if (updateError) {
            console.error("Order update error:", updateError);
            return NextResponse.json({ error: "Failed to update orders" }, { status: 500 });
        }

        // Create notifications for sellers
        for (const order of orders) {
            await supabase.from("notifications").insert({
                user_id: order.seller_id,
                type: "order_update",
                title: "New Order Received!",
                message: `Order ${order.order_number} has been paid. Please process it.`,
                order_id: order.id,
            });
        }

        return NextResponse.json({
            success: true,
            paymentId,
            totalAmount,
            orderIds,
        });
    } catch (error) {
        console.error("Checkout POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET - Get checkout summary (cart or pending auction orders)
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type") || "cart"; // 'cart' or 'auction'
        const auctionId = searchParams.get("auctionId");

        if (type === "auction" && auctionId) {
            // Get auction order details
            const { data: auction, error: auctionError } = await supabase
                .from("auctions")
                .select(`
                    id,
                    winner_id,
                    winning_bid,
                    products (
                        id,
                        title,
                        images,
                        shipping_cost,
                        free_shipping,
                        buyer_protection_fee
                    )
                `)
                .eq("id", auctionId)
                .eq("winner_id", userId)
                .single();

            if (auctionError || !auction) {
                return NextResponse.json({ error: "Auction not found or you're not the winner" }, { status: 404 });
            }

            const product = auction.products as any;
            const subtotal = auction.winning_bid;
            const shippingCost = product.free_shipping ? 0 : (product.shipping_cost || 0);
            const buyerProtectionFee = product.buyer_protection_fee || 9;
            const tax = subtotal * 0.08;
            const total = subtotal + shippingCost + buyerProtectionFee + tax;

            return NextResponse.json({
                type: "auction",
                items: [{
                    productId: product.id,
                    title: product.title,
                    image: product.images?.[0],
                    price: auction.winning_bid,
                    quantity: 1,
                }],
                subtotal,
                shippingCost,
                buyerProtectionFee,
                tax,
                total,
            });
        }

        // Get cart summary
        const { data: cartItems, error: cartError } = await supabase
            .from("cart_items")
            .select(`
                id,
                quantity,
                products (
                    id,
                    title,
                    images,
                    buy_now_price,
                    shipping_cost,
                    free_shipping,
                    buyer_protection_fee,
                    status
                )
            `)
            .eq("user_id", userId);

        if (cartError) {
            console.error("Cart fetch error:", cartError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        const validItems = cartItems?.filter(
            (item: any) => item.products && item.products.status === "active"
        ) || [];

        if (validItems.length === 0) {
            return NextResponse.json({
                type: "cart",
                items: [],
                subtotal: 0,
                shippingCost: 0,
                buyerProtectionFee: 0,
                tax: 0,
                total: 0,
            });
        }

        const subtotal = validItems.reduce((sum: number, item: any) => {
            return sum + (item.products.buy_now_price || 0) * item.quantity;
        }, 0);

        const shippingCost = validItems.reduce((sum: number, item: any) => {
            if (item.products.free_shipping) return sum;
            return sum + (item.products.shipping_cost || 0);
        }, 0);

        const buyerProtectionFee = 9;
        const tax = subtotal * 0.08;
        const total = subtotal + shippingCost + buyerProtectionFee + tax;

        const items = validItems.map((item: any) => ({
            productId: item.products.id,
            title: item.products.title,
            image: item.products.images?.[0],
            price: item.products.buy_now_price,
            quantity: item.quantity,
        }));

        return NextResponse.json({
            type: "cart",
            items,
            subtotal,
            shippingCost,
            buyerProtectionFee,
            tax,
            total,
        });
    } catch (error) {
        console.error("Checkout GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
