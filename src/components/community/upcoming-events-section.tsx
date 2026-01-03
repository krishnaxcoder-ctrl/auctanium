"use client";

import Link from "next/link";
import { Calendar, MarkerPin01, Users01, Clock, ArrowRight, VideoRecorder } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

const events = [
    {
        id: 1,
        title: "Collector's Meetup: Vintage Watches",
        description: "Join fellow watch enthusiasts for an evening of sharing, learning, and networking.",
        date: "Jan 15, 2025",
        time: "6:00 PM - 9:00 PM EST",
        location: "Virtual Event",
        attendees: 234,
        maxAttendees: 500,
        type: "virtual",
        category: "Meetup",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=400&fit=crop",
        featured: true,
    },
    {
        id: 2,
        title: "Authentication Workshop: Art & Collectibles",
        description: "Learn from experts how to authenticate and grade your valuable items.",
        date: "Jan 22, 2025",
        time: "2:00 PM - 5:00 PM EST",
        location: "New York, NY",
        attendees: 89,
        maxAttendees: 150,
        type: "in-person",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
        featured: false,
    },
    {
        id: 3,
        title: "Monthly Auction Strategy Webinar",
        description: "Master advanced bidding techniques and strategies from top collectors.",
        date: "Jan 28, 2025",
        time: "7:00 PM - 8:30 PM EST",
        location: "Virtual Event",
        attendees: 456,
        maxAttendees: 1000,
        type: "virtual",
        category: "Webinar",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
        featured: true,
    },
];

export const UpcomingEventsSection = () => {
    return (
        <section className="bg-secondary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                            Upcoming Events
                        </h2>
                        <p className="mt-3 text-lg text-tertiary">
                            Join workshops, meetups, and webinars with fellow collectors
                        </p>
                    </div>
                    <Link href="/community/events" className="hidden items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 lg:flex">
                        View All Events
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Events List */}
                <div className="mt-12 space-y-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary transition-all duration-300 hover:border-brand-400 hover:shadow-xl"
                        >
                            <div className="flex flex-col lg:flex-row">
                                {/* Image */}
                                <div className="relative lg:w-80 aspect-[2/1] lg:aspect-auto overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {event.featured && (
                                        <div className="absolute top-4 left-4">
                                            <Badge type="pill-color" size="md" color="warning">
                                                Featured
                                            </Badge>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <Badge type="pill-color" size="md" color={event.type === "virtual" ? "brand" : "success"}>
                                            {event.type === "virtual" ? (
                                                <>
                                                    <VideoRecorder className="size-3" />
                                                    <span className="ml-1">Virtual</span>
                                                </>
                                            ) : (
                                                <>
                                                    <MarkerPin01 className="size-3" />
                                                    <span className="ml-1">In-Person</span>
                                                </>
                                            )}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 lg:p-8">
                                    <div className="flex flex-col h-full">
                                        {/* Category */}
                                        <Badge type="pill-color" size="sm" color="purple">
                                            {event.category}
                                        </Badge>

                                        {/* Title & Description */}
                                        <h3 className="mt-4 text-xl font-semibold text-primary lg:text-2xl">
                                            {event.title}
                                        </h3>
                                        <p className="mt-3 text-sm text-tertiary lg:text-base">
                                            {event.description}
                                        </p>

                                        {/* Event Details */}
                                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-brand-primary p-2">
                                                    <Calendar className="size-5 text-brand-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-tertiary">Date</p>
                                                    <p className="text-sm font-medium text-primary">{event.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-success-primary p-2">
                                                    <Clock className="size-5 text-success-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-tertiary">Time</p>
                                                    <p className="text-sm font-medium text-primary">{event.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-warning-primary p-2">
                                                    <Users01 className="size-5 text-warning-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-tertiary">Attendees</p>
                                                    <p className="text-sm font-medium text-primary">
                                                        {event.attendees} / {event.maxAttendees}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location & CTA */}
                                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-secondary pt-6">
                                            <div className="flex items-center gap-2 text-sm text-tertiary">
                                                <MarkerPin01 className="size-4" />
                                                <span>{event.location}</span>
                                            </div>
                                            <Link href={`/community/events/${event.id}`}>
                                                <Button color="primary" size="md" iconTrailing={ArrowRight}>
                                                    Register Now
                                                </Button>
                                            </Link>
                                        </div>
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
