import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Get user's notifications
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const unreadOnly = searchParams.get("unreadOnly") === "true";
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");

        let query = supabase
            .from("notifications")
            .select("*", { count: "exact" })
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .range(offset, offset + limit - 1);

        if (unreadOnly) {
            query = query.eq("is_read", false);
        }

        const { data, error, count } = await query;

        if (error) {
            console.error("Notifications GET error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // Get unread count
        const { count: unreadCount } = await supabase
            .from("notifications")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)
            .eq("is_read", false);

        return NextResponse.json({
            notifications: data || [],
            total: count || 0,
            unreadCount: unreadCount || 0,
            hasMore: count ? offset + limit < count : false,
        });
    } catch (error) {
        console.error("Notifications GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH - Mark notifications as read
export async function PATCH(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { notificationIds, markAllRead } = await request.json();

        if (markAllRead) {
            // Mark all as read
            const { error } = await supabase
                .from("notifications")
                .update({ is_read: true })
                .eq("user_id", userId)
                .eq("is_read", false);

            if (error) {
                console.error("Notifications update error:", error);
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: "All notifications marked as read" });
        }

        if (!notificationIds || !Array.isArray(notificationIds)) {
            return NextResponse.json({ error: "Notification IDs required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("notifications")
            .update({ is_read: true })
            .in("id", notificationIds)
            .eq("user_id", userId);

        if (error) {
            console.error("Notifications update error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notifications PATCH error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE - Delete notifications
export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const notificationId = searchParams.get("id");
        const deleteAll = searchParams.get("deleteAll");

        if (deleteAll === "true") {
            const { error } = await supabase
                .from("notifications")
                .delete()
                .eq("user_id", userId);

            if (error) {
                console.error("Notifications delete error:", error);
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: "All notifications deleted" });
        }

        if (!notificationId) {
            return NextResponse.json({ error: "Notification ID required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("notifications")
            .delete()
            .eq("id", notificationId)
            .eq("user_id", userId);

        if (error) {
            console.error("Notifications delete error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Notifications DELETE error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
