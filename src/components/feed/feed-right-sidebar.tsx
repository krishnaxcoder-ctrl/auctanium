"use client";

import Link from "next/link";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Plus, ArrowRight } from "@untitledui/icons";

const whoToFollow = [
    {
        id: 1,
        name: "Judy Nguyen",
        title: "News anchor",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        isFollowing: false,
    },
    {
        id: 2,
        name: "Amanda Reed",
        title: "Web Developer",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        isFollowing: false,
    },
    {
        id: 3,
        name: "Billy Vasquez",
        title: "News anchor",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        isFollowing: false,
    },
    {
        id: 4,
        name: "Lori Ferguson",
        title: "Web Developer",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        isFollowing: false,
    },
    {
        id: 5,
        name: "Carolyn Ortiz",
        title: "News anchor",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        isFollowing: false,
    },
];

const todaysNews = [
    {
        id: 1,
        title: "Ten questions you should answer truthfully",
        category: "Business",
    },
    {
        id: 2,
        title: "Five unbelievable facts about money",
        category: "Finance",
    },
    {
        id: 3,
        title: "Best Pinterest Boards for learning about business",
        category: "Marketing",
    },
    {
        id: 4,
        title: "Skills that you can learn from business",
        category: "Career",
    },
];

export const FeedRightSidebar = () => {
    return (
        <div className="space-y-4">
            {/* Who to Follow */}
            <div className="rounded-2xl border border-secondary bg-primary p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-primary">Who to follow</h3>
                    <Link href="/discover" className="text-sm text-brand-600 hover:underline">
                        View more
                    </Link>
                </div>

                <div className="space-y-4">
                    {whoToFollow.map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                            <Avatar size="sm" src={user.avatar} />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-primary truncate">{user.name}</h4>
                                <p className="text-xs text-tertiary truncate">{user.title}</p>
                            </div>
                            <button className="flex-shrink-0 rounded-full bg-brand-primary p-1.5 text-brand-600 transition-colors hover:bg-brand-secondary">
                                <Plus className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Today's News */}
            <div className="rounded-2xl border border-secondary bg-primary p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-primary">Today's news</h3>
                </div>

                <div className="space-y-4">
                    {todaysNews.map((news) => (
                        <Link
                            key={news.id}
                            href={`/news/${news.id}`}
                            className="group block"
                        >
                            <div className="flex items-start gap-2">
                                <div className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-brand-600" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-primary group-hover:text-brand-600 transition-colors">
                                        {news.title}
                                    </h4>
                                    <p className="mt-1 text-xs text-tertiary">{news.category}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link
                    href="/news"
                    className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-brand-600 hover:underline"
                >
                    View all latest news
                    <ArrowRight className="size-4" />
                </Link>
            </div>

            {/* Ad Space */}
            <div className="rounded-2xl border border-secondary bg-gradient-to-br from-brand-50 to-brand-100 p-6 text-center">
                <div className="mb-3 inline-flex rounded-full bg-brand-primary px-3 py-1 text-xs font-medium text-brand-700">
                    Premium
                </div>
                <h4 className="font-semibold text-primary">Unlock Premium Features</h4>
                <p className="mt-2 text-sm text-tertiary">
                    Get access to exclusive content and advanced networking tools
                </p>
                <Button color="primary" size="sm" className="mt-4 w-full justify-center">
                    Upgrade Now
                </Button>
            </div>
        </div>
    );
};
