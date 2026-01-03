"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Mail01,
    Phone,
    MarkerPin01,
    Globe02,
    ChevronUp,
} from "@untitledui/icons";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button as AriaButton } from "react-aria-components";

const Logo = () => (
    <Link href="/" className="flex items-center">
        <Image
            src="/sitelogo.png"
            alt="Nexpay"
            width={1000}
            height={20}
            className="h-8 w-auto"
        />
    </Link>
);

const footerLinks = {
    Marketplace: [
        { label: "Browse All", href: "/marketplace" },
        { label: "Featured Auctions", href: "/marketplace?featured=true" },
        { label: "Ending Soon", href: "/marketplace?sort=ending-soon" },
        { label: "Buy Now", href: "/marketplace?type=buy-now" },
        { label: "Free Shipping", href: "/marketplace?freeShipping=true" },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press Kit", href: "/press" },
        { label: "Contact", href: "/contact" },
    ],
    Resources: [
        { label: "Help Center", href: "#help" },
        { label: "Seller Guide", href: "/seller/guide" },
        { label: "Community", href: "#community" },
        { label: "Pricing & Fees", href: "/seller/fees" },
        { label: "API Docs", href: "#api" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "GDPR", href: "/gdpr" },
        { label: "Licenses", href: "/licenses" },
    ],
};


export const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t-[3px] border-brand-300">
            {/* Large CTA Section */}
            <div className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800">
                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 -right-40 size-96 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-white/5 blur-3xl" />
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

            </div>

            {/* Main Footer Content */}
            <div className="bg-primary">
                <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="grid gap-12 lg:grid-cols-6 lg:gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-2">
                            <Logo />
                            <p className="mt-3 max-w-sm text-sm leading-relaxed text-tertiary">
                                The most trusted online auction platform. Discover amazing deals, bid on unique items, and win big. Join 50,000+ users winning auctions daily.
                            </p>

                            {/* Contact Info */}
                            <div className="mt-8 space-y-4">
                                <a
                                    href="mailto:auctanium@gmail.com"
                                    className="flex items-center gap-3 text-sm text-tertiary transition-colors hover:text-primary"
                                >
                                    <Mail01 className="size-5 text-brand-secondary" />
                                    auctanium@gmail.com
                                </a>
                                <a
                                    href="tel:+1234567890"
                                    className="flex items-center gap-3 text-sm text-tertiary transition-colors hover:text-primary"
                                >
                                    <Phone className="size-5 text-brand-secondary" />
                                    +1 (234) 567-890
                                </a>
                                <div className="flex items-center gap-3 text-sm text-tertiary">
                                    <MarkerPin01 className="size-5 text-brand-secondary" />
                                    San Francisco, CA, USA
                                </div>
                            </div>

                        </div>

                        {/* Links Grid */}
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category}>
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                                        {category}
                                    </h4>
                                    <ul className="mt-6 space-y-4">
                                        {links.map((link) => (
                                            <li key={link.label}>
                                                {link.href.startsWith("/") ? (
                                                    <Link
                                                        href={link.href}
                                                        className="group flex items-center text-sm text-tertiary transition-colors hover:text-primary"
                                                    >
                                                        <span className="relative">
                                                            {link.label}
                                                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-solid transition-all group-hover:w-full" />
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={link.href}
                                                        className="group flex items-center text-sm text-tertiary transition-colors hover:text-primary"
                                                    >
                                                        <span className="relative">
                                                            {link.label}
                                                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-solid transition-all group-hover:w-full" />
                                                        </span>
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-secondary bg-secondary_subtle">
                <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                        {/* Copyright */}
                        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                            <p className="text-sm text-tertiary">
                                © 2025 Auctanium Inc. All rights reserved.
                            </p>
                            <div className="hidden h-4 w-px bg-tertiary/30 sm:block" />
                            <p className="text-sm text-tertiary">
                                Made with passion for bidders worldwide
                            </p>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                            <Link
                                href="/privacy"
                                className="text-sm text-tertiary transition-colors hover:text-primary"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-tertiary transition-colors hover:text-primary"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-sm text-tertiary transition-colors hover:text-primary"
                            >
                                Cookies
                            </Link>
                            <a
                                href="#sitemap"
                                className="text-sm text-tertiary transition-colors hover:text-primary"
                            >
                                Sitemap
                            </a>
                            <Dropdown.Root>
                                <AriaButton className="flex cursor-pointer items-center gap-2 text-sm text-tertiary transition-colors hover:text-primary focus:outline-none">
                                    <Globe02 className="size-4" />
                                    <span>English</span>
                                    <ChevronUp className="size-4" />
                                </AriaButton>
                                <Dropdown.Popover placement="top" className="w-40">
                                    <Dropdown.Menu>
                                        <Dropdown.Item id="english" label="English" />
                                        <Dropdown.Item id="spanish" label="Spanish" />
                                        <Dropdown.Item id="french" label="French" />
                                        <Dropdown.Item id="german" label="German" />
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown.Root>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
