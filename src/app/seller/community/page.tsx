"use client";

import Link from "next/link";
import {
  MessageSquare01,
  Users01,
  TrendUp01,
  Star01,
  Heart,
  MessageCircle01,
  Eye,
  ChevronRight,
  Plus,
  SearchLg,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useState } from "react";

const categories = [
  { name: "General Discussion", count: 1234, icon: MessageSquare01 },
  { name: "Tips & Strategies", count: 856, icon: TrendUp01 },
  { name: "Product Photography", count: 423, icon: Star01 },
  { name: "Shipping & Logistics", count: 312, icon: Users01 },
];

const topContributors = [
  {
    name: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    posts: 234,
    badge: "Top Seller",
  },
  {
    name: "James Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    posts: 189,
    badge: "Expert",
  },
  {
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    posts: 156,
    badge: "Mentor",
  },
  {
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    posts: 134,
    badge: "Helper",
  },
];

const discussions = [
  {
    id: 1,
    title: "Best practices for holiday season shipping?",
    author: {
      name: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    category: "Shipping & Logistics",
    replies: 45,
    views: 1234,
    likes: 89,
    lastActivity: "2 hours ago",
    pinned: true,
  },
  {
    id: 2,
    title: "How I increased my sales by 300% in 3 months",
    author: {
      name: "James Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    category: "Tips & Strategies",
    replies: 78,
    views: 2567,
    likes: 234,
    lastActivity: "4 hours ago",
    pinned: true,
  },
  {
    id: 3,
    title: "What camera do you use for product photos?",
    author: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    category: "Product Photography",
    replies: 34,
    views: 890,
    likes: 56,
    lastActivity: "6 hours ago",
    pinned: false,
  },
  {
    id: 4,
    title: "Dealing with difficult customers - share your experiences",
    author: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    category: "General Discussion",
    replies: 67,
    views: 1456,
    likes: 123,
    lastActivity: "8 hours ago",
    pinned: false,
  },
  {
    id: 5,
    title: "International shipping - which carriers do you recommend?",
    author: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    category: "Shipping & Logistics",
    replies: 23,
    views: 567,
    likes: 34,
    lastActivity: "12 hours ago",
    pinned: false,
  },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-primary">Seller Community</h1>
          <p className="mt-1 sm:mt-2 text-sm text-tertiary">Connect with fellow sellers, share tips, and grow together</p>
        </div>
        <Button color="primary" size="sm" iconLeading={Plus} className="flex-shrink-0 self-start sm:self-auto">
          New Discussion
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary">12.5K</div>
          <div className="text-xs sm:text-sm text-tertiary">Members</div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary">3.2K</div>
          <div className="text-xs sm:text-sm text-tertiary">Discussions</div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary">45K</div>
          <div className="text-xs sm:text-sm text-tertiary">Replies</div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-primary">890</div>
          <div className="text-xs sm:text-sm text-tertiary">Online Now</div>
        </div>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2 min-w-0">
          {/* Search */}
          <Input
            icon={SearchLg}
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            placeholder="Search discussions..."
          />

          {/* Discussions */}
          <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
            <div className="border-b border-secondary px-3 sm:px-4 py-3">
              <h2 className="font-semibold text-primary">Recent Discussions</h2>
            </div>
            <div className="divide-y divide-secondary">
              {discussions.map((discussion) => (
                <Link
                  key={discussion.id}
                  href="#"
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-secondary/50 transition-colors"
                >
                  <Avatar src={discussion.author.avatar} alt={discussion.author.name} size="sm" className="flex-shrink-0 hidden sm:block" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center gap-2 flex-wrap">
                      {discussion.pinned && (
                        <Badge type="pill-color" size="sm" color="brand">Pinned</Badge>
                      )}
                      <h3 className="font-medium text-primary text-sm sm:text-base line-clamp-2 sm:truncate">{discussion.title}</h3>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-tertiary">
                      <span className="truncate max-w-[100px]">{discussion.author.name}</span>
                      <span className="text-brand-600 truncate">{discussion.category}</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 sm:gap-4 text-xs text-tertiary">
                      <span className="flex items-center gap-1">
                        <MessageCircle01 className="size-3 flex-shrink-0" />
                        <span className="hidden sm:inline">{discussion.replies} replies</span>
                        <span className="sm:hidden">{discussion.replies}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="size-3 flex-shrink-0" />
                        <span className="hidden sm:inline">{discussion.views} views</span>
                        <span className="sm:hidden">{discussion.views}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="size-3 flex-shrink-0" />
                        <span className="hidden sm:inline">{discussion.likes} likes</span>
                        <span className="sm:hidden">{discussion.likes}</span>
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-5 text-tertiary self-center flex-shrink-0" />
                </Link>
              ))}
            </div>
            <div className="border-t border-secondary px-3 sm:px-4 py-3">
              <Link href="#" className="text-sm font-medium text-brand-600 hover:underline">
                View all discussions
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          {/* Categories */}
          <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
            <div className="border-b border-secondary px-3 sm:px-4 py-3">
              <h2 className="font-semibold text-primary">Categories</h2>
            </div>
            <div className="p-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href="#"
                  className="flex items-center justify-between rounded-lg px-2 sm:px-3 py-2.5 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <category.icon className="size-4 text-tertiary flex-shrink-0" />
                    <span className="text-sm text-primary truncate">{category.name}</span>
                  </div>
                  <span className="text-xs text-tertiary flex-shrink-0 ml-2">{category.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
            <div className="border-b border-secondary px-3 sm:px-4 py-3">
              <h2 className="font-semibold text-primary">Top Contributors</h2>
            </div>
            <div className="p-2">
              {topContributors.map((contributor, index) => (
                <div
                  key={contributor.name}
                  className="flex items-center gap-2 sm:gap-3 rounded-lg px-2 sm:px-3 py-2.5"
                >
                  <span className="text-sm font-medium text-tertiary w-4 flex-shrink-0">{index + 1}</span>
                  <Avatar src={contributor.avatar} alt={contributor.name} size="sm" className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-primary truncate">{contributor.name}</div>
                    <div className="text-xs text-tertiary">{contributor.posts} posts</div>
                  </div>
                  <Badge type="pill-color" size="sm" color="brand" className="flex-shrink-0">{contributor.badge}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="rounded-xl border border-secondary bg-brand-50 p-3 sm:p-4">
            <h3 className="font-semibold text-primary">Community Guidelines</h3>
            <p className="mt-2 text-sm text-tertiary">
              Be respectful, helpful, and constructive. No spam or self-promotion.
            </p>
            <Link href="#" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
              Read full guidelines
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
