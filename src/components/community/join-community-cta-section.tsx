"use client";

import Link from "next/link";
import { ArrowRight, Users01, MessageCircle01, Calendar, Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const benefits = [
    {
        icon: Users01,
        title: "Connect with 50K+ Members",
        description: "Join a thriving community of collectors",
    },
    {
        icon: MessageCircle01,
        title: "Share & Learn",
        description: "Exchange tips and strategies",
    },
    {
        icon: Calendar,
        title: "Exclusive Events",
        description: "Access workshops and meetups",
    },
    {
        icon: Star01,
        title: "Earn Rewards",
        description: "Get recognized for contributions",
    },
];

export const JoinCommunityCTASection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 py-20 lg:py-28">
            {/* Background Pattern */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -right-40 size-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-white/10 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* Heading */}
                    <h2 className="text-display-sm font-bold text-white sm:text-display-md lg:text-display-lg">
                        Ready to Join Our Community?
                    </h2>
                    <p className="mt-6 mx-auto max-w-3xl text-xl text-brand-100 lg:text-2xl">
                        Connect with passionate collectors, share your expertise, and discover exclusive opportunities.
                        It's free to join!
                    </p>

                    {/* Benefits Grid */}
                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
                            >
                                <div className="inline-flex rounded-xl bg-white/20 p-3">
                                    <benefit.icon className="size-6 text-white" />
                                </div>
                                <h3 className="mt-4 font-semibold text-white">{benefit.title}</h3>
                                <p className="mt-2 text-sm text-brand-100">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link href="/signup" className="w-full sm:w-auto">
                            <Button
                                color="primary"
                                size="xl"
                                iconTrailing={ArrowRight}
                                className="w-full justify-center bg-white text-brand-700 hover:bg-brand-50 sm:w-auto"
                            >
                                Join the Community Free
                            </Button>
                        </Link>
                        <Link href="/login" className="w-full sm:w-auto">
                            <Button
                                color="secondary"
                                size="xl"
                                className="w-full justify-center border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
                            >
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-12 flex flex-col items-center gap-2 text-brand-100">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star01 key={i} className="size-5 fill-warning-400 text-warning-400" />
                            ))}
                        </div>
                        <p className="text-sm">
                            <span className="font-semibold text-white">4.9/5</span> from 2,000+ community reviews
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
