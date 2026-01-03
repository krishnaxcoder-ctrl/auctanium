"use client";

import { useState } from "react";
import { Avatar } from "@/components/base/avatar/avatar";
import { Image01, VideoRecorder, FaceSmile, ThumbsUp, MessageChatCircle, Share07, DotsHorizontal, Download01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const posts = [
    {
        id: 1,
        author: {
            name: "Lori Ferguson",
            title: "Web Developer at Webestica",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            verified: true,
        },
        content: "I'm thrilled to share that I've completed a graduate certificate course in Product Management with the president's honor roll.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        timestamp: "2h",
        likes: 140,
        comments: 104,
        shares: 3,
    },
    {
        id: 2,
        author: {
            name: "Frances Guerrero",
            title: "Freelance UX Designer",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            verified: false,
        },
        content: "New course! Launching a new account to upload various UI/UX thoroughly researched projects.",
        timestamp: "3h",
        likes: 25,
        comments: 8,
        shares: 1,
        replies: [
            {
                author: {
                    name: "Lori Stevens",
                    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                },
                content: "See! Glad I could help. When you get a chance can you send me the invitation for the party?",
                timestamp: "2hr",
                likes: 10,
            },
            {
                author: {
                    name: "Billy Vasquez",
                    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                },
                content: "Thinking eating is where was baby.",
                timestamp: "18min",
                likes: 5,
            },
        ],
    },
    {
        id: 3,
        author: {
            name: "Bootstrap: Front-end framework",
            title: "Sponsored",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
            verified: false,
        },
        content: "Quickly design and customize responsive mobile-first sites with Bootstrap.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        timestamp: "1d",
        likes: 215,
        comments: 45,
        shares: 12,
        isSponsored: true,
        downloadLink: true,
    },
    {
        id: 4,
        author: {
            name: "Judy Nguyen",
            title: "Web Developer at Webestica",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
            verified: true,
        },
        content: "I'm so privileged to be involved in the @bootstrap hiring process! Interviewing with their team was fun and I hope this can be a valuable resource for future #inclusivebusiness #internship #hiring #apply",
        timestamp: "2d",
        likes: 89,
        comments: 23,
        shares: 5,
        hashtags: ["inclusivebusiness", "internship", "hiring", "apply"],
    },
];

export const FeedMain = () => {
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

    const toggleLike = (postId: number) => {
        setLikedPosts((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    return (
        <div className="space-y-4">
            {/* Create Post */}
            <div className="rounded-2xl border border-secondary bg-primary p-4">
                <div className="flex items-center gap-3">
                    <Avatar size="md" src="https://randomuser.me/api/portraits/men/32.jpg" />
                    <input
                        type="text"
                        placeholder="Share your thoughts..."
                        className="flex-1 rounded-lg border border-secondary bg-secondary px-4 py-2 text-sm text-primary placeholder:text-tertiary focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-secondary pt-4">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                            <Image01 className="size-5 text-success-600" />
                            <span className="hidden sm:inline">Photo</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                            <VideoRecorder className="size-5 text-error-600" />
                            <span className="hidden sm:inline">Video</span>
                        </button>
                        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                            <FaceSmile className="size-5 text-warning-600" />
                            <span className="hidden sm:inline">Feeling</span>
                        </button>
                    </div>
                    <Button color="primary" size="sm">
                        Post
                    </Button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="rounded-2xl border border-secondary bg-primary p-2">
                <div className="flex items-center gap-2">
                    <button className="flex-1 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-brand-700 transition-colors">
                        Posts
                    </button>
                    <button className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                        Video
                    </button>
                    <button className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                        Event
                    </button>
                    <button className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                        Feeling Activity
                    </button>
                </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
                <div key={post.id} className="rounded-2xl border border-secondary bg-primary">
                    {/* Post Header */}
                    <div className="flex items-start justify-between p-4">
                        <div className="flex items-start gap-3">
                            <Avatar size="md" src={post.author.avatar} />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-primary">{post.author.name}</h4>
                                    {post.isSponsored && (
                                        <Badge type="pill-color" size="sm" color="brand">
                                            Sponsored
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-tertiary">{post.author.title}</p>
                                <p className="text-xs text-tertiary">{post.timestamp}</p>
                            </div>
                        </div>
                        <button className="rounded-lg p-2 text-tertiary transition-colors hover:bg-secondary hover:text-primary">
                            <DotsHorizontal className="size-5" />
                        </button>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-4">
                        <p className="text-sm text-primary">{post.content}</p>
                        {post.hashtags && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {post.hashtags.map((tag) => (
                                    <span key={tag} className="text-sm text-brand-600 hover:underline cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Post Image */}
                    {post.image && (
                        <div className="relative">
                            <img src={post.image} alt="Post" className="w-full object-cover" style={{ maxHeight: '400px' }} />
                            {post.downloadLink && (
                                <button className="absolute bottom-4 right-4 rounded-lg bg-brand-solid px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-brand-solid_hover">
                                    <Download01 className="inline size-4 mr-2" />
                                    Download now
                                </button>
                            )}
                        </div>
                    )}

                    {/* Post Stats */}
                    <div className="flex items-center justify-between border-t border-secondary px-4 py-3">
                        <div className="flex items-center gap-4 text-sm text-tertiary">
                            <span className="flex items-center gap-1">
                                <ThumbsUp className="size-4" />
                                {likedPosts.has(post.id) ? post.likes + 1 : post.likes} Likes
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageChatCircle className="size-4" />
                                {post.comments} Comments
                            </span>
                        </div>
                        <span className="text-sm text-tertiary">{post.shares} Shares</span>
                    </div>

                    {/* Post Actions */}
                    <div className="grid grid-cols-3 gap-2 border-t border-secondary p-2">
                        <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${likedPosts.has(post.id)
                                    ? "text-brand-600 bg-brand-primary"
                                    : "text-secondary hover:bg-secondary hover:text-primary"
                                }`}
                        >
                            <ThumbsUp className="size-5" />
                            <span className="hidden sm:inline">Like</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                            <MessageChatCircle className="size-5" />
                            <span className="hidden sm:inline">Comment</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-primary">
                            <Share07 className="size-5" />
                            <span className="hidden sm:inline">Share</span>
                        </button>
                    </div>

                    {/* Comments Section */}
                    {post.replies && post.replies.length > 0 && (
                        <div className="border-t border-secondary p-4">
                            <div className="space-y-4">
                                {post.replies.map((reply, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <Avatar size="sm" src={reply.author.avatar} />
                                        <div className="flex-1">
                                            <div className="rounded-lg bg-secondary p-3">
                                                <h5 className="text-sm font-semibold text-primary">{reply.author.name}</h5>
                                                <p className="mt-1 text-sm text-secondary">{reply.content}</p>
                                            </div>
                                            <div className="mt-2 flex items-center gap-4 text-xs text-tertiary">
                                                <button className="hover:underline">Like · {reply.likes}</button>
                                                <button className="hover:underline">Reply</button>
                                                <span>{reply.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {post.comments > post.replies.length && (
                                <button className="mt-4 text-sm font-medium text-brand-600 hover:underline">
                                    Load more comments
                                </button>
                            )}
                        </div>
                    )}

                    {/* Add Comment */}
                    <div className="border-t border-secondary p-4">
                        <div className="flex items-center gap-3">
                            <Avatar size="sm" src="https://randomuser.me/api/portraits/men/32.jpg" />
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 rounded-lg border border-secondary bg-secondary px-4 py-2 text-sm text-primary placeholder:text-tertiary focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
