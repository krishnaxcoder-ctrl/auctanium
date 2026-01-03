"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Grid01,
  ChevronRight,
  Home05,
  ArrowRight,
  TrendUp01,
  Clock,
  Palette,
  WatchCircle,
  Truck01,
  Diamond01,
  BookOpen01,
  GamingPad02,
  MusicNote01,
  ShoppingBag01,
  Home01,
  Coins01,
  Trophy01,
  Star01,
  Camera01,
  Globe01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const mainCategories = [
  {
    name: "Art",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
    href: "/marketplace?category=art",
    count: "2,450+",
    trending: true,
  },
  {
    name: "Watches & Jewelry",
    icon: WatchCircle,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
    href: "/marketplace?category=watches-jewelry",
    count: "1,890+",
    trending: true,
  },
  {
    name: "Classic Cars",
    icon: Truck01,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    href: "/marketplace?category=classic-cars",
    count: "340+",
  },
  {
    name: "Jewelry & Gems",
    icon: Diamond01,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
    href: "/marketplace?category=jewelry",
    count: "1,560+",
  },
  {
    name: "Books & Manuscripts",
    icon: BookOpen01,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
    href: "/marketplace?category=books",
    count: "890+",
  },
  {
    name: "Trading Cards",
    icon: GamingPad02,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&h=400&fit=crop",
    href: "/marketplace?category=trading-cards",
    count: "3,200+",
    trending: true,
  },
  {
    name: "Music & Vinyl",
    icon: MusicNote01,
    image: "https://images.unsplash.com/photo-1539375665275-f0e749d6a86f?w=600&h=400&fit=crop",
    href: "/marketplace?category=music",
    count: "1,120+",
  },
  {
    name: "Fashion & Accessories",
    icon: ShoppingBag01,
    image: "https://images.unsplash.com/photo-1558171813-01342daa54d6?w=600&h=400&fit=crop",
    href: "/marketplace?category=fashion",
    count: "2,780+",
  },
  {
    name: "Furniture & Decor",
    icon: Home01,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    href: "/marketplace?category=furniture",
    count: "650+",
  },
  {
    name: "Coins & Currency",
    icon: Coins01,
    image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=600&h=400&fit=crop",
    href: "/marketplace?category=coins",
    count: "1,340+",
  },
  {
    name: "Sports Memorabilia",
    icon: Trophy01,
    image: "https://images.unsplash.com/photo-1461896836934- voices-1",
    href: "/marketplace?category=sports",
    count: "780+",
  },
  {
    name: "Wine & Spirits",
    icon: Star01,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop",
    href: "/marketplace?category=wine",
    count: "450+",
  },
  {
    name: "Cameras & Photography",
    icon: Camera01,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
    href: "/marketplace?category=cameras",
    count: "560+",
  },
  {
    name: "Asian & Tribal Art",
    icon: Globe01,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    href: "/marketplace?category=asian-art",
    count: "720+",
  },
];

const trendingCategories = [
  { name: "Pokemon Cards", count: "1,234", change: "+45%" },
  { name: "Rolex Watches", count: "856", change: "+32%" },
  { name: "Vintage Sneakers", count: "678", change: "+28%" },
  { name: "NFT Art", count: "445", change: "+67%" },
  { name: "Vintage Wine", count: "234", change: "+18%" },
];

export default function CategoriesPage() {
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
            <span className="text-white">Categories</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Grid01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Browse Categories
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Discover unique items across all categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Trending Categories Sidebar */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">All Categories</h2>
              <span className="text-sm text-tertiary">{mainCategories.length} categories</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mainCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="group relative rounded-2xl border border-secondary bg-primary overflow-hidden transition-all hover:border-brand-300 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {category.trending && (
                      <div className="absolute top-3 left-3">
                        <Badge type="pill-color" color="warning" size="sm">
                          <TrendUp01 className="size-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 text-white mb-1">
                        <category.icon className="size-5" />
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                      <p className="text-sm text-white/80">{category.count} items</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-600/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button color="secondary" size="md" iconTrailing={ArrowRight}>
                      Browse Category
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-secondary bg-primary p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendUp01 className="size-5 text-brand-600" />
                  <h3 className="font-semibold text-primary">Trending Now</h3>
                </div>
                <div className="space-y-4">
                  {trendingCategories.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-primary">{item.name}</p>
                        <p className="text-sm text-tertiary">{item.count} listings</p>
                      </div>
                      <span className="text-sm font-medium text-success-600">{item.change}</span>
                    </div>
                  ))}
                </div>
                <Link href="/marketplace?sort=trending" className="block mt-6">
                  <Button color="secondary" size="md" className="w-full">
                    View All Trending
                  </Button>
                </Link>
              </div>

              {/* Ending Soon */}
              <div className="mt-6 rounded-2xl border border-secondary bg-primary p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="size-5 text-warning-600" />
                  <h3 className="font-semibold text-primary">Ending Soon</h3>
                </div>
                <p className="text-sm text-tertiary mb-4">
                  Don&apos;t miss out on auctions ending in the next 24 hours!
                </p>
                <Link href="/auctions/ending-soon">
                  <Button color="primary" size="md" className="w-full" iconTrailing={ArrowRight}>
                    View Auctions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
