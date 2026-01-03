"use client";

import { Heart, MessageCircle01, Eye } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";

const galleryItems = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
        title: "My Rolex Submariner Collection",
        author: {
            name: "Sarah M.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        likes: 234,
        comments: 45,
        views: 1234,
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",
        title: "Authenticated Banksy Print",
        author: {
            name: "Marcus C.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        likes: 567,
        comments: 89,
        views: 3456,
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop",
        title: "First Edition Book Collection",
        author: {
            name: "Elena R.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        likes: 345,
        comments: 67,
        views: 2345,
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=600&h=600&fit=crop",
        title: "Vintage Vinyl Records",
        author: {
            name: "James W.",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        likes: 456,
        comments: 78,
        views: 2890,
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
        title: "Diamond & Gemstone Collection",
        author: {
            name: "Lisa K.",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        },
        likes: 678,
        comments: 123,
        views: 4567,
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&h=600&fit=crop",
        title: "Comic Book Graded Collection",
        author: {
            name: "David L.",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        likes: 389,
        comments: 56,
        views: 1987,
    },
];

export const CommunityGallerySection = () => {
    return (
        <section className="bg-primary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                        Community Gallery
                    </h2>
                    <p className="mt-3 text-lg text-tertiary">
                        Showcase your collections and discover what others have found
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary transition-all duration-300 hover:scale-[1.02] hover:border-brand-400 hover:shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Hover overlay with stats */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Heart className="size-4" />
                                                <span className="text-sm font-medium">{item.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle01 className="size-4" />
                                                <span className="text-sm font-medium">{item.comments}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="size-4" />
                                                <span className="text-sm font-medium">{item.views}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-primary line-clamp-1">{item.title}</h3>
                                <div className="mt-3 flex items-center gap-2">
                                    <Avatar size="xs" src={item.author.avatar} />
                                    <span className="text-sm text-tertiary">{item.author.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
