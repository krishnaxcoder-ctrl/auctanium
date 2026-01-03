"use client";

import Link from "next/link";
import Image from "next/image";
import { SearchLg, Home01, Users01, MessageCircle01, Bell01, Settings01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";

export const FeedHeader = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-secondary bg-primary shadow-sm">
            <div className="mx-auto px-4" style={{ maxWidth: '1400px' }}>
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/sitelogo.png"
                            alt="Auctanium"
                            width={120}
                            height={32}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>

                    {/* Search */}
                    <div className="hidden flex-1 max-w-md md:block">
                        <div className="relative">
                            <SearchLg className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-tertiary" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full rounded-lg border border-secondary bg-secondary py-2 pl-10 pr-4 text-sm text-primary placeholder:text-tertiary focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-1">
                        <Link
                            href="/feed"
                            className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 text-brand-600 transition-colors hover:bg-secondary"
                        >
                            <Home01 className="size-5" />
                            <span className="hidden text-xs font-medium lg:block">Home</span>
                        </Link>
                        <Link
                            href="/network"
                            className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 text-tertiary transition-colors hover:bg-secondary hover:text-primary"
                        >
                            <Users01 className="size-5" />
                            <span className="hidden text-xs font-medium lg:block">Network</span>
                        </Link>
                        <Link
                            href="/messages"
                            className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 text-tertiary transition-colors hover:bg-secondary hover:text-primary"
                        >
                            <MessageCircle01 className="size-5" />
                            <span className="hidden text-xs font-medium lg:block">Messages</span>
                        </Link>
                        <button className="relative flex flex-col items-center gap-1 rounded-lg px-4 py-2 text-tertiary transition-colors hover:bg-secondary hover:text-primary">
                            <Bell01 className="size-5" />
                            <span className="hidden text-xs font-medium lg:block">Notifications</span>
                            <span className="absolute right-2 top-1 size-2 rounded-full bg-error-500" />
                        </button>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center gap-3 border-l border-secondary pl-4">
                        <Link href="/profile">
                            <Avatar
                                size="sm"
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                className="cursor-pointer ring-2 ring-transparent transition-all hover:ring-brand-400"
                            />
                        </Link>
                        <Button color="primary" size="sm" className="hidden md:flex">
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
