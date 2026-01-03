"use client";

import { FeedHeader } from "@/components/feed/feed-header";
import { FeedSidebar } from "@/components/feed/feed-sidebar";
import { FeedMain } from "@/components/feed/feed-main";
import { FeedRightSidebar } from "@/components/feed/feed-right-sidebar";

export const FeedScreen = () => {
    return (
        <div className="min-h-screen bg-secondary">
            {/* Header */}
            <FeedHeader />

            {/* Main Content */}
            <div className="mx-auto px-4 py-6" style={{ maxWidth: '1400px' }}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-3">
                        <FeedSidebar />
                    </div>

                    {/* Main Feed */}
                    <div className="lg:col-span-6">
                        <FeedMain />
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-3">
                        <FeedRightSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};
