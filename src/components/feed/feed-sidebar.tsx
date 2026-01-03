"use client";

import Link from "next/link";
import { Avatar } from "@/components/base/avatar/avatar";
import { Users01, Calendar, MessageCircle01, Settings01, BarChart03 } from "@untitledui/icons";

export const FeedSidebar = () => {
    return (
        <div className="space-y-4">
            {/* Profile Card */}
            <div className="overflow-hidden rounded-2xl border border-secondary bg-primary">
                {/* Cover Image */}
                <div className="relative h-16 bg-gradient-to-r from-brand-600 to-brand-400" />

                {/* Profile Info */}
                <div className="relative px-4 pb-4">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                        <Avatar
                            size="xl"
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            className="ring-4 ring-bg-primary"
                        />
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="font-semibold text-primary">San Lamon</h3>
                        <p className="mt-1 text-sm text-tertiary">Your Description in Two Lines</p>
                        <p className="mt-2 text-xs text-tertiary">
                            I'd love to change the world, but they won't give me the source code...
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-4 border-t border-secondary pt-4">
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">250</div>
                            <div className="text-xs text-tertiary">Posts</div>
                        </div>
                        <div className="text-center border-x border-secondary">
                            <div className="text-lg font-bold text-primary">2.5K</div>
                            <div className="text-xs text-tertiary">Followers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-primary">365</div>
                            <div className="text-xs text-tertiary">Following</div>
                        </div>
                    </div>

                    {/* View Profile Button */}
                    <Link
                        href="/profile"
                        className="mt-4 block rounded-lg bg-brand-primary py-2 text-center text-sm font-medium text-brand-700 transition-colors hover:bg-brand-secondary"
                    >
                        View Profile
                    </Link>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="overflow-hidden rounded-2xl border border-secondary bg-primary">
                <nav className="p-2">
                    <Link
                        href="/feed"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-brand-600 transition-colors hover:bg-secondary"
                    >
                        <BarChart03 className="size-5" />
                        <span>Feed</span>
                    </Link>
                    <Link
                        href="/connections"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary"
                    >
                        <Users01 className="size-5" />
                        <span>Connections</span>
                    </Link>
                    <Link
                        href="/latest-news"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary"
                    >
                        <MessageCircle01 className="size-5" />
                        <span>Latest News</span>
                    </Link>
                    <Link
                        href="/events"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary"
                    >
                        <Calendar className="size-5" />
                        <span>Events</span>
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary"
                    >
                        <Settings01 className="size-5" />
                        <span>Settings</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};
