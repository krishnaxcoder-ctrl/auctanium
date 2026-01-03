"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen01, ChevronRight, Home05, ArrowRight, Clock } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

const posts = [
  {
    id: 1,
    title: "10 Tips for Winning Your First Auction",
    excerpt: "New to online auctions? Here are our top strategies for securing great deals on your first bids.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop",
    category: "Tips & Tricks",
    author: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "Dec 15, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How We Process Over 1 Million Bids Per Day",
    excerpt: "A deep dive into our technical infrastructure and how we handle massive scale in real-time.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    category: "Engineering",
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "Dec 12, 2025",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "The Psychology Behind Auction Bidding",
    excerpt: "Understanding the emotional and psychological factors that influence bidding behavior.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
    category: "Insights",
    author: {
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    date: "Dec 10, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Seller Success Stories: From Hobby to Business",
    excerpt: "Meet the sellers who turned their passion into thriving businesses on our platform.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "Success Stories",
    author: {
      name: "David Park",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    date: "Dec 8, 2025",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "New Feature: Real-Time Bid Notifications",
    excerpt: "Never miss a bid again with our new instant notification system across all devices.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    category: "Product Updates",
    author: {
      name: "Anna Schmidt",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    date: "Dec 5, 2025",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Holiday Auction Guide 2025",
    excerpt: "Your complete guide to finding the best deals during the holiday auction season.",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&h=400&fit=crop",
    category: "Guides",
    author: {
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    date: "Dec 1, 2025",
    readTime: "10 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Blog</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <BookOpen01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Blog
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  News, tips, and insights from our team
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="group mt-3 hidden items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:flex"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group overflow-hidden rounded-2xl border border-secondary bg-primary transition-all hover:border-brand-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge type="pill-color" color="brand" size="sm">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-primary group-hover:text-brand-600 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-tertiary line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Author & Meta */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" src={post.author.avatar} />
                    <span className="text-sm font-medium text-primary">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-tertiary">
                    <Clock className="size-3.5" />
                    {post.readTime}
                  </div>
                </div>

                <p className="mt-3 text-xs text-tertiary">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-brand-100 hover:text-brand-600">
            Load More Posts
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
