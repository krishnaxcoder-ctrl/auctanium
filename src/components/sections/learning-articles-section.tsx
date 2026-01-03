"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen02, TrendUp01, Lightbulb02 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";

const articles = [
    {
        id: "article-1",
        title: "The Ultimate Guide to Online Auction Bidding: Tips for Winning",
        excerpt: "Learn proven strategies to win auctions, avoid overbidding, and score amazing deals on electronics, fashion, and collectibles.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        category: "Guide",
        readTime: "8 min read",
        author: {
            name: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        featured: true,
    },
    {
        id: "article-2",
        title: "2024 Market Trends: What's Hot in Online Auctions",
        excerpt: "Industry experts share insights on trending categories, pricing patterns, and what buyers are looking for.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        category: "Market Insights",
        readTime: "12 min read",
        author: {
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        featured: false,
    },
    {
        id: "article-3",
        title: "How to Spot Authentic Luxury Items: A Buyer's Checklist",
        excerpt: "Protect yourself from counterfeits with our comprehensive guide to authenticating watches, bags, and more.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
        category: "Beginner",
        readTime: "6 min read",
        author: {
            name: "Emily Rodriguez",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        featured: false,
    },
    {
        id: "article-4",
        title: "Selling on Auctions: Maximize Your Profits",
        excerpt: "Expert tips on photography, pricing strategies, and timing to get the best returns on your items.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        category: "Market Insights",
        readTime: "10 min read",
        author: {
            name: "David Park",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        featured: false,
    },
];

const categoryIcons: Record<string, typeof BookOpen02> = {
    Guide: BookOpen02,
    "Market Insights": TrendUp01,
    Beginner: Lightbulb02,
};

export const LearningArticlesSection = () => {
    const featuredArticle = articles.find((a) => a.featured);
    const otherArticles = articles.filter((a) => !a.featured);

    return (
        <section className="bg-secondary py-8 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary sm:text-xl">
                        Learning Resources
                    </h2>
                    <Link href="/learn" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Articles Grid */}
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {/* Featured Article */}
                    {featuredArticle && (
                        <Link
                            href={`/article/${featuredArticle.id}`}
                            className="group relative overflow-hidden rounded-2xl bg-primary lg:row-span-2"
                        >
                            <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full">
                                <Image
                                    src={featuredArticle.image}
                                    alt={featuredArticle.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <Badge type="pill-color" size="sm" color="brand" className="w-fit">
                                        {featuredArticle.category}
                                    </Badge>
                                    <h3 className="mt-3 text-xl font-semibold text-white lg:text-2xl">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                                        {featuredArticle.excerpt}
                                    </p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <Avatar size="sm" src={featuredArticle.author.avatar} />
                                        <div className="text-sm">
                                            <p className="font-medium text-white">{featuredArticle.author.name}</p>
                                            <p className="text-gray-400">{featuredArticle.readTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Other Articles */}
                    <div className="space-y-4">
                        {otherArticles.map((article) => {
                            const CategoryIcon = categoryIcons[article.category] || BookOpen02;
                            return (
                                <Link
                                    key={article.id}
                                    href={`/article/${article.id}`}
                                    className="group flex gap-4 rounded-xl border border-secondary bg-primary p-4 transition-all duration-300 hover:border-brand-300 hover:shadow-lg"
                                >
                                    <div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <div className="flex items-center gap-2">
                                            <CategoryIcon className="size-3.5 text-brand-500" />
                                            <span className="text-xs font-medium text-brand-600">
                                                {article.category}
                                            </span>
                                        </div>
                                        <h3 className="mt-1 text-sm font-semibold text-primary line-clamp-2 group-hover:text-brand-600">
                                            {article.title}
                                        </h3>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-tertiary">
                                            <Clock className="size-3" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
