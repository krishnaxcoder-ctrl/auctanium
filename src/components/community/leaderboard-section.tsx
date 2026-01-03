"use client";

import { Trophy01, TrendUp01, Award01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";

const leaderboard = [
    {
        rank: 1,
        name: "Sarah Mitchell",
        username: "@sarahcollects",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        points: 15420,
        auctions: 287,
        wins: 245,
        badge: "Diamond",
        trend: "up",
    },
    {
        rank: 2,
        name: "Marcus Chen",
        username: "@marcusart",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        points: 14890,
        auctions: 445,
        wins: 389,
        badge: "Platinum",
        trend: "up",
    },
    {
        rank: 3,
        name: "Elena Rodriguez",
        username: "@elenafinds",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        points: 13567,
        auctions: 156,
        wins: 134,
        badge: "Gold",
        trend: "same",
    },
    {
        rank: 4,
        name: "James Wilson",
        username: "@jameswins",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        points: 12345,
        auctions: 534,
        wins: 467,
        badge: "Diamond",
        trend: "down",
    },
    {
        rank: 5,
        name: "Lisa Kim",
        username: "@lisakim",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        points: 11234,
        auctions: 298,
        wins: 256,
        badge: "Platinum",
        trend: "up",
    },
];

const getRankColor = (rank: number) => {
    if (rank === 1) return "warning";
    if (rank === 2) return "gray";
    if (rank === 3) return "orange";
    return "brand";
};

const getRankIcon = (rank: number) => {
    if (rank === 1) return Trophy01;
    if (rank === 2) return Award01;
    if (rank === 3) return Award01;
    return null;
};

export const LeaderboardSection = () => {
    return (
        <section className="bg-secondary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                        Community Leaderboard
                    </h2>
                    <p className="mt-3 text-lg text-tertiary">
                        Top performers this month based on activity and success
                    </p>
                </div>

                {/* Leaderboard */}
                <div className="mt-12 mx-auto max-w-4xl">
                    <div className="space-y-4">
                        {leaderboard.map((member, index) => {
                            const RankIcon = getRankIcon(member.rank);
                            const rankColor = getRankColor(member.rank);

                            return (
                                <div
                                    key={member.rank}
                                    className={`group relative overflow-hidden rounded-2xl border border-secondary bg-primary p-6 transition-all duration-300 hover:scale-[1.02] hover:border-brand-400 hover:shadow-xl ${member.rank <= 3 ? "ring-2 ring-" + rankColor + "-200" : ""
                                        }`}
                                >
                                    {/* Background gradient for top 3 */}
                                    {member.rank <= 3 && (
                                        <div className={`absolute inset-0 bg-gradient-to-r from-${rankColor}-50 to-transparent opacity-50`} />
                                    )}

                                    <div className="relative flex items-center gap-6">
                                        {/* Rank */}
                                        <div className="flex-shrink-0">
                                            {RankIcon ? (
                                                <div className={`flex size-16 items-center justify-center rounded-xl bg-${rankColor}-primary`}>
                                                    <RankIcon className={`size-8 text-${rankColor}-600`} />
                                                </div>
                                            ) : (
                                                <div className="flex size-16 items-center justify-center rounded-xl bg-brand-primary">
                                                    <span className="text-2xl font-bold text-brand-600">#{member.rank}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Member Info */}
                                        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4">
                                            <div className="flex items-center gap-4 flex-1">
                                                <Avatar size="lg" src={member.avatar} className="ring-2 ring-bg-primary" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-primary truncate">{member.name}</h3>
                                                        <Badge type="pill-color" size="sm" color={rankColor}>
                                                            {member.badge}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-tertiary">{member.username}</p>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center gap-6">
                                                <div className="text-center">
                                                    <div className="text-xl font-bold text-primary">{member.points.toLocaleString()}</div>
                                                    <div className="text-xs text-tertiary">Points</div>
                                                </div>
                                                <div className="h-10 w-px bg-tertiary" />
                                                <div className="text-center">
                                                    <div className="text-xl font-bold text-primary">{member.auctions}</div>
                                                    <div className="text-xs text-tertiary">Auctions</div>
                                                </div>
                                                <div className="h-10 w-px bg-tertiary" />
                                                <div className="text-center">
                                                    <div className="text-xl font-bold text-primary">{member.wins}</div>
                                                    <div className="text-xs text-tertiary">Wins</div>
                                                </div>
                                            </div>

                                            {/* Trend */}
                                            <div className="flex-shrink-0">
                                                {member.trend === "up" && (
                                                    <div className="flex items-center gap-1 text-success-600">
                                                        <TrendUp01 className="size-5" />
                                                        <span className="text-sm font-medium">Rising</span>
                                                    </div>
                                                )}
                                                {member.trend === "down" && (
                                                    <div className="flex items-center gap-1 text-error-600">
                                                        <TrendUp01 className="size-5 rotate-180" />
                                                        <span className="text-sm font-medium">Falling</span>
                                                    </div>
                                                )}
                                                {member.trend === "same" && (
                                                    <div className="flex items-center gap-1 text-tertiary">
                                                        <span className="text-sm font-medium">Stable</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View Full Leaderboard */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-tertiary">
                            Want to see your name here?{" "}
                            <a href="/signup" className="font-medium text-brand-600 hover:text-brand-700">
                                Join the community
                            </a>{" "}
                            and start bidding!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
