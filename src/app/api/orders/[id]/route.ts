import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Get order details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const { data: order, error } = await supabase
            .from("orders")
            .select(`
                *,
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
            .eq("id", id)
            .single();

        if (error || !order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Verify user has access (buyer or seller)
        if (order.buyer_id !== userId && order.seller_id !== userId) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Order GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH - Update order (status, tracking, etc.)
export async function PATCH(
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

        // Get current order
        const { data: order, error: fetchError } = await supabase
            .from("orders")
            .select("*")
            .eq("id", id)
            .single();

        if (fetchError || !order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Verify user has access
        const isBuyer = order.buyer_id === userId;
        const isSeller = order.seller_id === userId;

        if (!isBuyer && !isSeller) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        // Build update object based on what's allowed
        const updates: any = {
            updated_at: new Date().toISOString(),
        };

        // Seller can update: status, tracking_number, shipped_at
        if (isSeller) {
            if (body.status && ["processing", "shipped"].includes(body.status)) {
                updates.status = body.status;
                if (body.status === "shipped") {
                    updates.shipped_at = new Date().toISOString();
                }
            }
            if (body.tracking_number) {
                updates.tracking_number = body.tracking_number;
            }
        }

        // Buyer can update: confirm delivery, cancel (if not shipped)
        if (isBuyer) {
            if (body.status === "delivered") {
                updates.status = "delivered";
                updates.delivered_at = new Date().toISOString();
            }
            if (body.status === "cancelled" && order.status === "pending_payment") {
                updates.status = "cancelled";
            }
        }

        // Update shipping address (buyer only, before shipping)
        if (isBuyer && body.shipping_address && order.status === "pending_payment") {
            updates.shipping_address = body.shipping_address;
        }

        const { data: updatedOrder, error: updateError } = await supabase
            .from("orders")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (updateError) {
            console.error("Order update error:", updateError);
            return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
        }

        // Create notification for status changes
        if (updates.status) {
            const notifyUserId = isSeller ? order.buyer_id : order.seller_id;
            const statusMessages: Record<string, string> = {
                processing: "Your order is being processed",
                shipped: `Your order has been shipped${updates.tracking_number ? ` - Tracking: ${updates.tracking_number}` : ""}`,
                delivered: "Order has been marked as delivered",
                cancelled: "Order has been cancelled",
            };

            await supabase.from("notifications").insert({
                user_id: notifyUserId,
                type: "order_update",
                title: `Order ${order.order_number} Updated`,
                message: statusMessages[updates.status] || `Order status: ${updates.status}`,
                order_id: id,
            });
        }

        return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error("Order PATCH error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
