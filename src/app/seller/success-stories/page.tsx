"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Trophy01,
  ChevronRight,
  Home05,
  Star01,
  ArrowRight,
  TrendUp01,
  MessageChatCircle,
  Users01,
  Play,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const featuredStory = {
  name: "Vikram Mehta",
  title: "From Collector to Top Seller",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  banner: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&h=500&fit=crop",
  category: "Watches",
  totalSales: "₹1.2 Cr",
  itemsSold: "340+",
  rating: 4.9,
  story: "What started as a hobby turned into a thriving business. I've been collecting vintage watches for 15 years, and Auctanium gave me the platform to share my passion with buyers worldwide. The authentication service has been invaluable—buyers trust what they're getting, which means faster sales at better prices.",
  quote: "Auctanium transformed my hobby into a six-figure business. The platform's reach and tools made all the difference.",
};

const successStories = [
  {
    name: "Ananya Sharma",
    category: "Art Gallery Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    sales: "₹2.5 Cr+",
    story: "Running an art gallery, I needed a platform that understood high-value transactions. Auctanium's authentication and buyer protection made my clients comfortable purchasing online.",
    achievement: "Top Art Seller 2025",
  },
  {
    name: "Rajesh Kumar",
    category: "Trading Cards",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    sales: "₹85L+",
    story: "Started selling Pokemon cards from my childhood collection. Within a year, I became a full-time seller with a team. The platform's reach to international buyers was game-changing.",
    achievement: "500+ 5-Star Reviews",
  },
  {
    name: "Priya Patel",
    category: "Vintage Fashion",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    sales: "₹45L+",
    story: "I source vintage luxury items from estate sales. The seller tools helped me manage inventory efficiently, and the photography tips improved my listing quality dramatically.",
    achievement: "Fastest Growing Seller 2025",
  },
  {
    name: "Amit Verma",
    category: "Classic Cars",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    sales: "₹4.8 Cr+",
    story: "Selling classic cars online seemed impossible until I found Auctanium. The escrow service and detailed listing features made high-value transactions smooth and secure.",
    achievement: "Highest Single Sale: ₹1.2 Cr",
  },
  {
    name: "Sneha Reddy",
    category: "Fine Jewelry",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    sales: "₹1.8 Cr+",
    story: "Third-generation jeweler transitioning to online sales. The platform's authentication gave buyers confidence, and I've expanded from local clients to a global customer base.",
    achievement: "Verified Top Seller",
  },
  {
    name: "Karthik Nair",
    category: "Sports Memorabilia",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    sales: "₹65L+",
    story: "Cricket memorabilia was a niche market before. Auctanium connected me with passionate collectors worldwide. My signed Sachin bat sold for 3x the expected price!",
    achievement: "Most Watched Items 2025",
  },
];

const stats = [
  { value: "₹100Cr+", label: "Total Seller Earnings" },
  { value: "15,000+", label: "Success Stories" },
  { value: "96%", label: "Would Recommend" },
  { value: "2.5x", label: "Avg. Price vs Other Platforms" },
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link href="/" className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white">
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <Link href="/sell" className="text-white/70 hover:text-white">Sell</Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Success Stories</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Trophy01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Seller Success Stories
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Real sellers, real results
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-brand-50 border-b border-brand-200 py-8">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-600">{stat.value}</p>
                <p className="text-sm text-tertiary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Featured Story */}
        <div className="mb-16 rounded-2xl border border-secondary bg-primary overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <Image
              src={featuredStory.banner}
              alt={featuredStory.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge type="pill-color" color="warning" size="lg">
                <Star01 className="size-4 mr-1" />
                Featured Seller
              </Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.name}
                  width={64}
                  height={64}
                  className="rounded-full border-4 border-white"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{featuredStory.name}</h2>
                  <p className="text-white/80">{featuredStory.title}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-6 mb-6">
              <div>
                <p className="text-sm text-tertiary">Category</p>
                <p className="font-semibold text-primary">{featuredStory.category}</p>
              </div>
              <div>
                <p className="text-sm text-tertiary">Total Sales</p>
                <p className="font-semibold text-brand-600">{featuredStory.totalSales}</p>
              </div>
              <div>
                <p className="text-sm text-tertiary">Items Sold</p>
                <p className="font-semibold text-primary">{featuredStory.itemsSold}</p>
              </div>
              <div>
                <p className="text-sm text-tertiary">Rating</p>
                <div className="flex items-center gap-1">
                  <Star01 className="size-4 text-yellow-500" />
                  <span className="font-semibold text-primary">{featuredStory.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-tertiary leading-relaxed mb-6">{featuredStory.story}</p>
            <div className="p-4 rounded-xl bg-brand-50 border border-brand-200">
              <MessageChatCircle className="size-6 text-brand-400 mb-2" />
              <p className="text-brand-700 font-medium italic">{featuredStory.quote}</p>
            </div>
          </div>
        </div>

        {/* More Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-8">More Success Stories</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-primary">{story.name}</p>
                    <p className="text-sm text-tertiary">{story.category}</p>
                  </div>
                </div>
                <Badge type="pill-color" color="success" size="sm" className="mb-3">
                  {story.sales} in sales
                </Badge>
                <p className="text-sm text-tertiary mb-4 line-clamp-3">{story.story}</p>
                <div className="pt-4 border-t border-secondary flex items-center gap-2">
                  <TrendUp01 className="size-4 text-brand-600" />
                  <span className="text-sm font-medium text-brand-600">{story.achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Testimonials Placeholder */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-brand-50 to-purple-50 border border-brand-200 p-8 sm:p-12 text-center">
          <Play className="size-12 text-brand-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Watch Seller Stories</h2>
          <p className="text-tertiary mb-6 max-w-lg mx-auto">
            Hear directly from our top sellers about their journey and success on Auctanium.
          </p>
          <Button color="primary" size="lg" iconLeading={Play}>
            Watch Videos
          </Button>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Users01 className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Write Your Success Story</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Join thousands of sellers who have transformed their passion into profit.
          </p>
          <Link href="/sell">
            <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
              Start Selling Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
