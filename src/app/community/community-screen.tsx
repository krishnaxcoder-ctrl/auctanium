"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Heart,
    MessageCircle01,
    Share07,
    Bookmark,
    DotsHorizontal,
    Image01,
    VideoRecorder,
    FaceSmile,
    Send01,
    SearchLg,
    TrendUp01,
    Users01,
    Hash02,
    CheckVerified01,
    Globe02,
    Plus,
    Bell01,
    Calendar,
    Award01,
    Star01,
    Zap,
    Eye,
    ShoppingBag01,
    MessageChatCircle,
    Flag01,
    ThumbsUp,
    Clock,
    ArrowRight,
    FilterLines,
    ChevronRight,
    Trophy01,
    Target04,
    Announcement01,
    HelpCircle,
    Gift01,
    Lightning01,
    XClose,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    PauseCircle,
    PlayCircle,
    VolumeMax,
    VolumeX,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const feedTabs = ["For You", "Following", "Trending", "Latest", "Questions"];

const stories = [
    { id: 1, name: "Add Story", avatar: "/face1.png", isAdd: true, video: "" },
    { id: 2, name: "Rahul V.", avatar: "/face1.png", hasNew: true, isLive: false, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { id: 3, name: "Priya S.", avatar: "/face4.png", hasNew: true, isLive: true, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { id: 4, name: "Amit P.", avatar: "/face3.png", hasNew: true, isLive: false, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { id: 5, name: "Sneha R.", avatar: "/face6.png", hasNew: false, isLive: false, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { id: 6, name: "Vikram S.", avatar: "/face5.png", hasNew: true, isLive: false, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { id: 7, name: "Arjun M.", avatar: "/face2.png", hasNew: true, isLive: true, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
];

const quickActions = [
    { icon: ShoppingBag01, label: "Share Deal", color: "text-green-600", bg: "bg-green-50" },
    { icon: HelpCircle, label: "Ask Question", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Star01, label: "Write Review", color: "text-yellow-600", bg: "bg-yellow-50" },
    { icon: Announcement01, label: "Announcement", color: "text-purple-600", bg: "bg-purple-50" },
];

const liveAuctions = [
    {
        id: 1,
        title: "Vintage Rolex Submariner 1968",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop",
        currentBid: "₹2,45,000",
        watchers: 156,
        endsIn: "2h 15m",
    },
    {
        id: 2,
        title: "Rare Indian Stamp Collection",
        image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=200&h=200&fit=crop",
        currentBid: "₹78,500",
        watchers: 89,
        endsIn: "45m",
    },
];

const upcomingEvents = [
    {
        id: 1,
        title: "Vintage Watch Collectors Meetup",
        date: "Dec 28, 2025",
        time: "6:00 PM",
        attendees: 234,
        type: "Virtual",
    },
    {
        id: 2,
        title: "Art Authentication Workshop",
        date: "Jan 5, 2026",
        time: "2:00 PM",
        attendees: 89,
        type: "In-Person",
    },
];

const topContributors = [
    { rank: 1, name: "Rahul Verma", avatar: "/face1.png", points: 15420, badge: "Diamond" },
    { rank: 2, name: "Priya Sharma", avatar: "/face4.png", points: 12890, badge: "Platinum" },
    { rank: 3, name: "Amit Patel", avatar: "/face3.png", points: 11567, badge: "Gold" },
];

const activePoll = {
    question: "What type of collectibles are you most interested in?",
    options: [
        { id: 1, text: "Vintage Watches", votes: 456, percentage: 35 },
        { id: 2, text: "Rare Coins", votes: 342, percentage: 26 },
        { id: 3, text: "Art & Paintings", votes: 289, percentage: 22 },
        { id: 4, text: "Jewelry", votes: 221, percentage: 17 },
    ],
    totalVotes: 1308,
    endsIn: "2 days",
};

const posts = [
    {
        id: 1,
        user: {
            name: "Rahul Verma",
            avatar: "/face1.png",
            username: "@rahulverma",
            verified: true,
            role: "Top Seller",
            badge: "diamond",
        },
        type: "deal",
        content: "Just listed my rare 1947 Indian Independence commemorative coin collection! These pieces have been in my family for generations. Check them out on my store. Serious collectors only!",
        images: ["https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=600&h=400&fit=crop"],
        timestamp: "2h ago",
        likes: 234,
        comments: 45,
        shares: 12,
        views: 1250,
        isLiked: false,
        isBookmarked: false,
        tags: ["RareCoins", "IndianHistory", "Numismatics"],
        isPinned: true,
    },
    {
        id: 2,
        user: {
            name: "Priya Sharma",
            avatar: "/face4.png",
            username: "@priyasharma",
            verified: true,
            role: "Verified Buyer",
            badge: "platinum",
        },
        type: "success",
        content: "Won this amazing vintage Rolex at 40% below market price! The bidding was intense but worth it. Thank you to this amazing community for the tips on auction strategies!",
        images: [
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
        ],
        timestamp: "4h ago",
        likes: 567,
        comments: 89,
        shares: 34,
        views: 3420,
        isLiked: true,
        isBookmarked: true,
        tags: ["WinningBid", "VintageWatch", "Success"],
        isPinned: false,
    },
    {
        id: 3,
        user: {
            name: "Amit Patel",
            avatar: "/face3.png",
            username: "@amitpatel",
            verified: false,
            role: "New Member",
            badge: null,
        },
        type: "question",
        content: "Can anyone help me authenticate this painting? I found it at a local estate sale and I think it might be valuable. The signature looks old but I'm not sure about the artist. Any art experts here?",
        images: [
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
        ],
        timestamp: "6h ago",
        likes: 123,
        comments: 67,
        shares: 5,
        views: 890,
        isLiked: false,
        isBookmarked: false,
        tags: ["Authentication", "Art", "HelpNeeded"],
        isPinned: false,
    },
    {
        id: 4,
        user: {
            name: "Sneha Reddy",
            avatar: "/face6.png",
            username: "@snehareddy",
            verified: true,
            role: "Power Seller",
            badge: "gold",
        },
        type: "announcement",
        content: "SOLD OUT in 2 hours! My handcrafted silver jewelry collection was a huge success. Thank you all for the overwhelming response. New collection dropping next week - stay tuned! Early access for community members only.",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop",
        ],
        timestamp: "8h ago",
        likes: 892,
        comments: 156,
        shares: 78,
        views: 5670,
        isLiked: true,
        isBookmarked: false,
        tags: ["Jewelry", "Handcrafted", "NewCollection"],
        isPinned: false,
    },
    {
        id: 5,
        user: {
            name: "Vikram Singh",
            avatar: "/face5.png",
            username: "@vikramsingh",
            verified: true,
            role: "Expert Collector",
            badge: "platinum",
        },
        type: "tip",
        content: "Pro tip for new collectors: Always check the condition report before bidding on antiques. I've seen many beginners make costly mistakes by not doing their due diligence.\n\nHere's my checklist:\n✓ Request high-res photos\n✓ Ask for provenance documentation\n✓ Check seller ratings and reviews\n✓ Compare with market prices\n✓ Factor in restoration costs",
        images: [],
        timestamp: "12h ago",
        likes: 445,
        comments: 78,
        shares: 156,
        views: 4320,
        isLiked: false,
        isBookmarked: true,
        tags: ["ProTips", "Collecting101", "BiddingStrategy"],
        isPinned: false,
    },
];

const trendingTopics = [
    { tag: "VintageWatches", posts: 2345, trend: "+12%" },
    { tag: "RareCoins", posts: 1892, trend: "+8%" },
    { tag: "AntiqueFurniture", posts: 1456, trend: "+5%" },
    { tag: "ArtCollection", posts: 1234, trend: "+15%" },
    { tag: "JewelryDeals", posts: 987, trend: "+3%" },
];

const suggestedMembers = [
    {
        name: "Arjun Mehta",
        avatar: "/face2.png",
        username: "@arjunmehta",
        verified: true,
        followers: "12.5K",
        specialty: "Watch Expert",
    },
    {
        name: "Kavitha Nair",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        username: "@kavithanair",
        verified: true,
        followers: "8.2K",
        specialty: "Art Dealer",
    },
    {
        name: "Ravi Kumar",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        username: "@ravikumar",
        verified: false,
        followers: "5.1K",
        specialty: "Coin Collector",
    },
];

const recentActivity = [
    { type: "follow", user: "Priya Sharma", action: "started following you", time: "5m ago" },
    { type: "like", user: "Amit Patel", action: "liked your post", time: "15m ago" },
    { type: "comment", user: "Sneha Reddy", action: "commented on your deal", time: "1h ago" },
];

const getPostTypeIcon = (type: string) => {
    switch (type) {
        case "deal": return ShoppingBag01;
        case "question": return HelpCircle;
        case "success": return Trophy01;
        case "announcement": return Announcement01;
        case "tip": return Zap;
        default: return MessageCircle01;
    }
};

const getPostTypeColor = (type: string) => {
    switch (type) {
        case "deal": return "bg-green-50 text-green-600 border-green-200";
        case "question": return "bg-blue-50 text-blue-600 border-blue-200";
        case "success": return "bg-yellow-50 text-yellow-600 border-yellow-200";
        case "announcement": return "bg-purple-50 text-purple-600 border-purple-200";
        case "tip": return "bg-orange-50 text-orange-600 border-orange-200";
        default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
};

const getBadgeColor = (badge: string | null) => {
    switch (badge) {
        case "diamond": return "bg-gradient-to-r from-cyan-400 to-blue-500";
        case "platinum": return "bg-gradient-to-r from-gray-400 to-gray-600";
        case "gold": return "bg-gradient-to-r from-yellow-400 to-amber-500";
        default: return "bg-gray-200";
    }
};

const StoryCircle = ({ story, onClick }: { story: typeof stories[0]; onClick?: () => void }) => (
    <div
        className="flex flex-col items-center gap-1 cursor-pointer group"
        onClick={onClick}
    >
        <div className={cx(
            "relative p-0.5 rounded-full transition-transform group-hover:scale-105",
            story.isAdd ? "bg-secondary" : story.hasNew ? "bg-gradient-to-tr from-brand-600 via-purple-500 to-pink-500" : "bg-secondary"
        )}>
            <div className="relative size-14 sm:size-16 rounded-full overflow-hidden bg-primary p-0.5">
                <Image
                    src={story.avatar}
                    alt={story.name}
                    fill
                    className="object-cover rounded-full"
                />
                {story.isAdd && (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary rounded-full">
                        <Plus className="size-6 text-brand-600" />
                    </div>
                )}
            </div>
            {story.isLive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-red-500 rounded text-[10px] font-bold text-white animate-pulse">
                    LIVE
                </div>
            )}
        </div>
        <span className="text-xs text-tertiary group-hover:text-primary transition-colors truncate max-w-[60px]">
            {story.name}
        </span>
    </div>
);

// Story Modal Component
const StoryModal = ({
    story,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev
}: {
    story: typeof stories[0];
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}) => {
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const progress = (video.currentTime / video.duration) * 100;
            setProgress(progress);
        };

        const handleEnded = () => {
            if (hasNext) {
                onNext();
            } else {
                onClose();
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
        };
    }, [hasNext, onNext, onClose]);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = isMuted;
    }, [isMuted]);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (isPaused) {
            video.pause();
        } else {
            video.play();
        }
    }, [isPaused]);

    // Reset progress when story changes
    React.useEffect(() => {
        setProgress(0);
        setIsPaused(false);
    }, [story.id]);

    // Handle keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && hasNext) onNext();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
            if (e.key === ' ') {
                e.preventDefault();
                setIsPaused(p => !p);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev, hasNext, hasPrev]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 overflow-hidden">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
                <XClose className="size-6 text-white" />
            </button>

            {/* Previous button */}
            {hasPrev && (
                <button
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft className="size-8 text-white" />
                </button>
            )}

            {/* Next button */}
            {hasNext && (
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <ChevronRightIcon className="size-8 text-white" />
                </button>
            )}

            {/* Story content */}
            <div className="relative w-full max-w-md h-[80vh] max-h-[800px] rounded-2xl overflow-hidden bg-black">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 z-10 p-3">
                    <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* User info */}
                <div className="absolute top-6 left-0 right-0 z-10 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative size-10 rounded-full overflow-hidden border-2 border-white">
                            <Image
                                src={story.avatar}
                                alt={story.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">{story.name}</p>
                            <p className="text-white/60 text-xs">Just now</p>
                        </div>
                        {story.isLive && (
                            <span className="px-2 py-0.5 bg-red-500 rounded text-xs font-bold text-white animate-pulse">
                                LIVE
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsPaused(p => !p)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            {isPaused ? (
                                <PlayCircle className="size-5 text-white" />
                            ) : (
                                <PauseCircle className="size-5 text-white" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsMuted(m => !m)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="size-5 text-white" />
                            ) : (
                                <VolumeMax className="size-5 text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Video */}
                <video
                    ref={videoRef}
                    src={story.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted={isMuted}
                    onClick={() => setIsPaused(p => !p)}
                />

                {/* Tap zones for navigation */}
                <div className="absolute inset-0 flex">
                    <div
                        className="w-1/3 h-full cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (hasPrev) onPrev();
                        }}
                    />
                    <div
                        className="w-1/3 h-full cursor-pointer"
                        onClick={() => setIsPaused(p => !p)}
                    />
                    <div
                        className="w-1/3 h-full cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (hasNext) onNext();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const PostCard = ({ post }: { post: typeof posts[0] }) => {
    const [liked, setLiked] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [bookmarked, setBookmarked] = useState(post.isBookmarked);
    const [showComments, setShowComments] = useState(false);
    const PostTypeIcon = getPostTypeIcon(post.type);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    };

    return (
        <div className={cx(
            "bg-primary border rounded-2xl overflow-hidden transition-all hover:shadow-lg",
            post.isPinned ? "border-brand-300 ring-1 ring-brand-100" : "border-secondary"
        )}>
            {/* Pinned Badge */}
            {post.isPinned && (
                <div className="bg-brand-50 px-4 py-2 flex items-center gap-2 border-b border-brand-100">
                    <Flag01 className="size-4 text-brand-600" />
                    <span className="text-sm font-medium text-brand-600">Pinned Post</span>
                </div>
            )}

            <div className="p-4 sm:p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar size="lg" src={post.user.avatar} />
                            {post.user.badge && (
                                <div className={cx(
                                    "absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center",
                                    getBadgeColor(post.user.badge)
                                )}>
                                    <Star01 className="size-3 text-white" />
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-primary">{post.user.name}</span>
                                {post.user.verified && (
                                    <CheckVerified01 className="size-4 text-brand-600" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-tertiary">
                                <span>{post.user.username}</span>
                                <span>·</span>
                                <span>{post.timestamp}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={cx(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium",
                            getPostTypeColor(post.type)
                        )}>
                            <PostTypeIcon className="size-3.5" />
                            <span className="capitalize">{post.type}</span>
                        </div>
                        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                            <DotsHorizontal className="size-5 text-tertiary" />
                        </button>
                    </div>
                </div>

                {/* Post Content */}
                <div className="mt-4">
                    <p className="text-primary leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/community/tag/${tag}`}
                                className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Post Images */}
                {post.images.length > 0 && (
                    <div className={cx(
                        "mt-4 grid gap-2 rounded-xl overflow-hidden",
                        post.images.length === 1 && "grid-cols-1",
                        post.images.length === 2 && "grid-cols-2",
                        post.images.length > 2 && "grid-cols-2"
                    )}>
                        {post.images.map((image, index) => (
                            <div key={index} className="relative aspect-video group cursor-pointer">
                                <Image
                                    src={image}
                                    alt=""
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Post Stats */}
                <div className="mt-4 flex items-center justify-between text-sm text-tertiary">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Heart className={cx("size-4", liked && "fill-red-500 text-red-500")} />
                            {likesCount.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageCircle01 className="size-4" />
                            {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                            <Share07 className="size-4" />
                            {post.shares}
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <Eye className="size-4" />
                        {post.views.toLocaleString()} views
                    </span>
                </div>

                {/* Post Actions */}
                <div className="mt-4 pt-4 border-t border-secondary flex items-center justify-between">
                    <button
                        onClick={handleLike}
                        className={cx(
                            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                            liked ? "text-red-500 bg-red-50" : "text-tertiary hover:bg-secondary"
                        )}
                    >
                        <Heart className={cx("size-5", liked && "fill-current")} />
                        <span className="text-sm font-medium">Like</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-tertiary hover:bg-secondary transition-all"
                    >
                        <MessageCircle01 className="size-5" />
                        <span className="text-sm font-medium">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-tertiary hover:bg-secondary transition-all">
                        <Share07 className="size-5" />
                        <span className="text-sm font-medium">Share</span>
                    </button>
                    <button
                        onClick={() => setBookmarked(!bookmarked)}
                        className={cx(
                            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                            bookmarked ? "text-brand-600 bg-brand-50" : "text-tertiary hover:bg-secondary"
                        )}
                    >
                        <Bookmark className={cx("size-5", bookmarked && "fill-current")} />
                        <span className="text-sm font-medium hidden sm:inline">Save</span>
                    </button>
                </div>

                {/* Comment Input */}
                {showComments && (
                    <div className="mt-4 pt-4 border-t border-secondary">
                        <div className="flex items-center gap-3">
                            <Avatar size="sm" src="/face1.png" />
                            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="flex-1 bg-transparent text-sm outline-none text-primary placeholder:text-tertiary"
                                />
                                <button className="text-tertiary hover:text-primary">
                                    <FaceSmile className="size-5" />
                                </button>
                                <button className="text-tertiary hover:text-primary">
                                    <Image01 className="size-5" />
                                </button>
                                <button className="text-brand-600 hover:text-brand-700">
                                    <Send01 className="size-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const CommunityScreen = () => {
    const [activeTab, setActiveTab] = useState("For You");
    const [postText, setPostText] = useState("");
    const [selectedVote, setSelectedVote] = useState<number | null>(null);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

    // Get viewable stories (excluding "Add Story")
    const viewableStories = stories.filter(s => !s.isAdd);
    const selectedStory = selectedStoryIndex !== null ? viewableStories[selectedStoryIndex] : null;

    const handleStoryClick = (story: typeof stories[0]) => {
        if (story.isAdd) {
            // Handle add story action (could open a create story modal)
            return;
        }
        const index = viewableStories.findIndex(s => s.id === story.id);
        setSelectedStoryIndex(index);
    };

    const handleNextStory = () => {
        if (selectedStoryIndex !== null && selectedStoryIndex < viewableStories.length - 1) {
            setSelectedStoryIndex(selectedStoryIndex + 1);
        }
    };

    const handlePrevStory = () => {
        if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
            setSelectedStoryIndex(selectedStoryIndex - 1);
        }
    };

    return (
        <div className="bg-secondary min-h-screen">
            {/* Community Hero Banner */}
            <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">Community Hub</h1>
                            <p className="text-brand-100 mt-1">Connect, share, and grow with fellow collectors</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                                <Bell01 className="size-4" />
                                <span>Notifications</span>
                                <span className="px-1.5 py-0.5 bg-red-500 rounded-full text-xs font-semibold">3</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white text-brand-700 hover:bg-brand-50 rounded-lg text-sm font-medium transition-colors">
                                <Plus className="size-4" />
                                <span>Create Post</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Users01 className="size-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">50K+</p>
                                    <p className="text-xs text-brand-200">Active Members</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageCircle01 className="size-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">1.2M</p>
                                    <p className="text-xs text-brand-200">Discussions</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Zap className="size-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">1.2K</p>
                                    <p className="text-xs text-brand-200">Online Now</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Trophy01 className="size-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">15K</p>
                                    <p className="text-xs text-brand-200">Success Stories</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            {/* Navigation */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <h3 className="font-semibold text-primary mb-4">Explore</h3>
                                <nav className="space-y-1">
                                    <Link href="/community" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-50 text-brand-600">
                                        <Globe02 className="size-5" />
                                        <span className="font-medium">Feed</span>
                                    </Link>
                                    <Link href="/community/groups" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Users01 className="size-5" />
                                        <span>Groups</span>
                                        <Badge type="pill-color" size="sm" color="gray" className="ml-auto">150</Badge>
                                    </Link>
                                    <Link href="/community/trending" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <TrendUp01 className="size-5" />
                                        <span>Trending</span>
                                    </Link>
                                    <Link href="/community/saved" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Bookmark className="size-5" />
                                        <span>Saved</span>
                                    </Link>
                                    <Link href="/community/events" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Calendar className="size-5" />
                                        <span>Events</span>
                                        <Badge type="pill-color" size="sm" color="success" className="ml-auto">New</Badge>
                                    </Link>
                                    <Link href="/community/leaderboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Award01 className="size-5" />
                                        <span>Leaderboard</span>
                                    </Link>
                                </nav>
                            </div>

                            {/* Trending Topics */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-primary">Trending Topics</h3>
                                    <TrendUp01 className="size-4 text-brand-600" />
                                </div>
                                <div className="space-y-3">
                                    {trendingTopics.map((topic, index) => (
                                        <Link
                                            key={topic.tag}
                                            href={`/community/tag/${topic.tag}`}
                                            className="flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-tertiary w-4">{index + 1}</span>
                                                <Hash02 className="size-4 text-brand-600" />
                                                <span className="text-sm text-primary group-hover:text-brand-600 transition-colors">
                                                    {topic.tag}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-success-600">{topic.trend}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Top Contributors */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-primary">Top Contributors</h3>
                                    <Link href="/community/leaderboard" className="text-xs text-brand-600 hover:text-brand-700">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {topContributors.map((contributor) => (
                                        <div key={contributor.rank} className="flex items-center gap-3">
                                            <div className={cx(
                                                "size-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                                                contributor.rank === 1 && "bg-yellow-500",
                                                contributor.rank === 2 && "bg-gray-400",
                                                contributor.rank === 3 && "bg-amber-600"
                                            )}>
                                                {contributor.rank}
                                            </div>
                                            <Avatar size="sm" src={contributor.avatar} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-primary truncate">{contributor.name}</p>
                                                <p className="text-xs text-tertiary">{contributor.points.toLocaleString()} pts</p>
                                            </div>
                                            <Badge type="pill-color" size="sm" color={
                                                contributor.badge === "Diamond" ? "brand" :
                                                contributor.badge === "Platinum" ? "gray" : "warning"
                                            }>
                                                {contributor.badge}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Stories */}
                        <div className="bg-primary rounded-2xl border border-secondary p-4">
                            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {stories.map((story) => (
                                    <StoryCircle
                                        key={story.id}
                                        story={story}
                                        onClick={() => handleStoryClick(story)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {quickActions.map((action) => (
                                <button
                                    key={action.label}
                                    className={cx(
                                        "flex items-center gap-2 p-3 rounded-xl border border-secondary bg-primary hover:shadow-md transition-all",
                                    )}
                                >
                                    <div className={cx("size-8 rounded-lg flex items-center justify-center", action.bg)}>
                                        <action.icon className={cx("size-4", action.color)} />
                                    </div>
                                    <span className="text-sm font-medium text-primary">{action.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Create Post */}
                        <div className="bg-primary rounded-2xl border border-secondary p-4 sm:p-6">
                            <div className="flex items-start gap-3">
                                <Avatar size="lg" src="/face1.png" />
                                <div className="flex-1">
                                    <textarea
                                        value={postText}
                                        onChange={(e) => setPostText(e.target.value)}
                                        placeholder="Share something with the community..."
                                        className="w-full bg-transparent text-primary placeholder:text-tertiary outline-none resize-none min-h-[80px]"
                                    />
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary">
                                        <div className="flex items-center gap-1">
                                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                                <Image01 className="size-5 text-green-600" />
                                                <span className="text-sm hidden sm:inline">Photo</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                                <VideoRecorder className="size-5 text-red-500" />
                                                <span className="text-sm hidden sm:inline">Video</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                                <Hash02 className="size-5 text-blue-500" />
                                                <span className="text-sm hidden sm:inline">Tag</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                                <FaceSmile className="size-5 text-yellow-500" />
                                            </button>
                                        </div>
                                        <Button
                                            color="primary"
                                            size="sm"
                                            disabled={!postText.trim()}
                                        >
                                            Post
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feed Tabs */}
                        <div className="bg-primary rounded-2xl border border-secondary p-2">
                            <div className="flex items-center gap-1 overflow-x-auto">
                                {feedTabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cx(
                                            "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                                            activeTab === tab
                                                ? "bg-brand-600 text-white"
                                                : "text-tertiary hover:bg-secondary"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Posts Feed */}
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center">
                            <Button color="secondary" size="md">
                                Load More Posts
                            </Button>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            {/* Search */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
                                    <SearchLg className="size-5 text-tertiary" />
                                    <input
                                        type="text"
                                        placeholder="Search community..."
                                        className="flex-1 bg-transparent text-sm outline-none text-primary placeholder:text-tertiary"
                                    />
                                </div>
                            </div>

                            {/* Live Auctions */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                                        <h3 className="font-semibold text-primary">Live Auctions</h3>
                                    </div>
                                    <Link href="/marketplace" className="text-xs text-brand-600 hover:text-brand-700">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {liveAuctions.map((auction) => (
                                        <Link
                                            key={auction.id}
                                            href={`/listing/${auction.id}`}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                                        >
                                            <div className="relative size-12 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={auction.image} alt={auction.title} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-primary truncate">{auction.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-semibold text-success-600">{auction.currentBid}</span>
                                                    <span className="text-xs text-tertiary">·</span>
                                                    <span className="text-xs text-error-600 flex items-center gap-1">
                                                        <Clock className="size-3" />
                                                        {auction.endsIn}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Community Poll */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-primary">Community Poll</h3>
                                    <span className="text-xs text-tertiary">Ends in {activePoll.endsIn}</span>
                                </div>
                                <p className="text-sm text-primary mb-4">{activePoll.question}</p>
                                <div className="space-y-2">
                                    {activePoll.options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelectedVote(option.id)}
                                            className={cx(
                                                "w-full relative p-3 rounded-lg border transition-all text-left",
                                                selectedVote === option.id
                                                    ? "border-brand-300 bg-brand-50"
                                                    : "border-secondary hover:border-brand-200"
                                            )}
                                        >
                                            <div className="flex items-center justify-between relative z-10">
                                                <span className="text-sm font-medium text-primary">{option.text}</span>
                                                <span className="text-sm text-tertiary">{option.percentage}%</span>
                                            </div>
                                            <div
                                                className="absolute left-0 top-0 bottom-0 bg-brand-100 rounded-lg transition-all"
                                                style={{ width: `${option.percentage}%` }}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-tertiary mt-3 text-center">
                                    {activePoll.totalVotes.toLocaleString()} votes
                                </p>
                            </div>

                            {/* Upcoming Events */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-primary">Upcoming Events</h3>
                                    <Link href="/community/events" className="text-xs text-brand-600 hover:text-brand-700">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="p-3 rounded-lg bg-secondary">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-primary">{event.title}</p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-tertiary">
                                                        <Calendar className="size-3" />
                                                        <span>{event.date}</span>
                                                        <span>·</span>
                                                        <span>{event.time}</span>
                                                    </div>
                                                </div>
                                                <Badge type="pill-color" size="sm" color={event.type === "Virtual" ? "brand" : "success"}>
                                                    {event.type}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-xs text-tertiary">{event.attendees} attending</span>
                                                <Button color="secondary" size="sm">RSVP</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggested Members */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <h3 className="font-semibold text-primary mb-4">Suggested Members</h3>
                                <div className="space-y-4">
                                    {suggestedMembers.map((member) => (
                                        <div key={member.username} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar size="md" src={member.avatar} />
                                                <div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-sm font-medium text-primary">
                                                            {member.name}
                                                        </span>
                                                        {member.verified && (
                                                            <CheckVerified01 className="size-3.5 text-brand-600" />
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-tertiary">
                                                        {member.specialty}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button color="secondary" size="sm">
                                                Follow
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/community/members"
                                    className="flex items-center justify-center gap-1 mt-4 text-sm text-brand-600 hover:text-brand-700"
                                >
                                    See All Members
                                    <ChevronRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Modal */}
            {selectedStory && (
                <StoryModal
                    story={selectedStory}
                    onClose={() => setSelectedStoryIndex(null)}
                    onNext={handleNextStory}
                    onPrev={handlePrevStory}
                    hasNext={selectedStoryIndex !== null && selectedStoryIndex < viewableStories.length - 1}
                    hasPrev={selectedStoryIndex !== null && selectedStoryIndex > 0}
                />
            )}
        </div>
    );
};
