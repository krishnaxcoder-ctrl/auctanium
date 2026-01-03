"use client";

import { CheckCircle, Shield01, Heart, MessageCircle01, Users01, AlertCircle } from "@untitledui/icons";

const guidelines = [
    {
        icon: Heart,
        title: "Be Respectful",
        description: "Treat all members with kindness and respect. Personal attacks, harassment, or discrimination will not be tolerated.",
        color: "error",
    },
    {
        icon: Shield01,
        title: "Stay Safe",
        description: "Never share personal information publicly. Use our secure messaging system for private communications.",
        color: "brand",
    },
    {
        icon: MessageCircle01,
        title: "Contribute Meaningfully",
        description: "Share valuable insights, ask thoughtful questions, and help others learn and grow.",
        color: "success",
    },
    {
        icon: CheckCircle,
        title: "Follow the Rules",
        description: "Adhere to our terms of service and community standards. Violations may result in account suspension.",
        color: "warning",
    },
    {
        icon: Users01,
        title: "Support Each Other",
        description: "Help newcomers, share your expertise, and celebrate others' successes. We're all in this together.",
        color: "purple",
    },
    {
        icon: AlertCircle,
        title: "Report Issues",
        description: "If you see something concerning, report it to our moderation team. We take all reports seriously.",
        color: "orange",
    },
];

export const CommunityGuidelinesSection = () => {
    return (
        <section className="bg-primary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                        Community Guidelines
                    </h2>
                    <p className="mt-3 text-lg text-tertiary max-w-3xl mx-auto">
                        Our community thrives on mutual respect and shared passion. Follow these guidelines to ensure
                        a positive experience for everyone.
                    </p>
                </div>

                {/* Guidelines Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {guidelines.map((guideline) => (
                        <div
                            key={guideline.title}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary p-8 transition-all duration-300 hover:scale-105 hover:border-brand-400 hover:shadow-xl"
                        >
                            {/* Background gradient on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-${guideline.color}-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                            <div className="relative">
                                {/* Icon */}
                                <div className={`inline-flex rounded-xl bg-${guideline.color}-primary p-4 transition-all duration-300 group-hover:scale-110`}>
                                    <guideline.icon className={`size-6 text-${guideline.color}-600`} />
                                </div>

                                {/* Title */}
                                <h3 className="mt-6 text-xl font-semibold text-primary">{guideline.title}</h3>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-relaxed text-tertiary">{guideline.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 rounded-2xl border border-brand-300 bg-brand-primary p-8 text-center">
                    <h3 className="text-xl font-semibold text-primary">Questions About Our Guidelines?</h3>
                    <p className="mt-3 text-tertiary">
                        Our community team is here to help. Reach out if you need clarification or want to report an issue.
                    </p>
                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-brand-solid px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-solid_hover"
                        >
                            Contact Support
                        </a>
                        <a
                            href="/terms"
                            className="inline-flex items-center justify-center rounded-lg border border-brand-400 bg-primary px-6 py-3 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-primary"
                        >
                            Read Full Terms
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
