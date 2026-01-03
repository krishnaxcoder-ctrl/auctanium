"use client";

import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { RatingStars } from "@/components/foundations/rating-stars";

const testimonials = [
    {
        name: "Rajesh Kumar",
        role: "Collector",
        location: "Mumbai, India",
        content:
            "I've won over 20 auctions in the past 6 months. The deals are incredible - saved over ₹1,50,000 on vintage items! The platform makes bidding so easy and enjoyable.",
        avatar: "/face1.png",
        rating: 5,
        earned: "50% Saved",
    },
    {
        name: "Arjun Sharma",
        role: "Tech Enthusiast",
        location: "Bangalore, India",
        content:
            "Got a brand new laptop for 40% off retail. The bidding process is exciting and the platform is super easy to use! Customer support is always helpful and responsive.",
        avatar: "/face2.png",
        rating: 5,
        earned: "40% Off",
    },
    {
        name: "Vikram Patel",
        role: "Antique Dealer",
        location: "Ahmedabad, India",
        content:
            "Best auction platform I've used. Great selection of items, verified sellers, and fast shipping. Highly recommend to anyone looking for quality antiques and collectibles!",
        avatar: "/face3.png",
        rating: 5,
        earned: "100+ Wins",
    },
    {
        name: "Priya Nair",
        role: "Art Collector",
        location: "Chennai, India",
        content:
            "Found rare art pieces I couldn't find anywhere else. The authentication process gives me complete confidence in every purchase. Truly a game-changer for collectors.",
        avatar: "/face4.png",
        rating: 5,
        earned: "60% Saved",
    },
    {
        name: "Amit Singh",
        role: "Fashion Enthusiast",
        location: "Delhi, India",
        content:
            "I've won designer items and accessories at amazing prices. The real-time bidding feature is so thrilling! Love the instant notifications that keep me updated on my bids.",
        avatar: "/face5.png",
        rating: 5,
        earned: "45% Off",
    },
    {
        name: "Sneha Reddy",
        role: "Vintage Collector",
        location: "Hyderabad, India",
        content:
            "Found rare collectibles I've been searching for years. The seller verification gives me peace of mind. Shipping was fast and items arrived in perfect condition.",
        avatar: "/face6.png",
        rating: 5,
        earned: "30+ Wins",
    },
];

export const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="bg-primary py-8 lg:py-6 border-y-4 border-brand-300">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <Badge type="pill-color" size="md" color="brand">
                            Testimonials
                        </Badge>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-primary sm:text-xl">Loved by bidders worldwide</h2>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-tertiary">
                        See what our bidders are saying about their winning experiences.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative"
                        >
                            <div className="h-full rounded-2xl bg-primary border border-secondary p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-brand-300 hover:ring-1 hover:ring-brand-300">
                                {/* Header with rating and earned badge */}
                                <div className="flex justify-between items-center mb-4">
                                    <RatingStars rating={testimonial.rating} />
                                    <Badge type="pill-color" size="sm" color="success">
                                        {testimonial.earned}
                                    </Badge>
                                </div>

                                <p className="text-primary text-sm leading-relaxed mb-5 line-clamp-3">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-3 pt-4 border-t border-primary">
                                    <Avatar size="md" src={testimonial.avatar} />
                                    <div>
                                        <p className="font-semibold text-sm text-primary">{testimonial.name}</p>
                                        <p className="text-xs text-tertiary">
                                            {testimonial.role} • {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
