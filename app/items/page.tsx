"use client"

import EventCard from "@/components/shared/EventCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { useEvents } from "@/context/EventContext";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";


export default function ItemsPage() {
    const { events } = useEvents()

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [location, setLocation] = useState("all");
    const [price, setPrice] = useState("all");

    const categories = [
        "all",
        ...Array.from(new Set(events.map(event => event.category)))
    ]

    const locations = [
        "all",
        ...Array.from(new Set(events.map(event => event.location)))
    ]


    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.shortDescription.toLowerCase().includes(search.toLowerCase())

            const matchesCategory = category === "all" || event.category === category
            const matchesLocation = location === "all" || event.location === location


            const matchesPrice =
                price === "all" ||
                (price === "free" && event.price === 0) ||
                (price === "low" && event.price > 0 && event.price <= 1000) ||
                (price === "medium" && event.price > 1000 && event.price <= 2500) ||
                (price === "high" && event.price > 2500)

            return matchesSearch && matchesCategory && matchesLocation && matchesPrice
        })
    }, [events, search, category, location, price])


    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader
                eyebrow="Events"
                title="Browse all events"
                description="Search and filter events by category, location, and price range."
            />

            <div className="mx-auto mb-10 max-w-7xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by event name..."
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item === "all" ? "All Categories" : item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    >
                        {locations.map((item) => (
                            <option key={item} value={item}>
                                {item === "all" ? "All Locations" : item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    >
                        <option value="all">All Prices</option>
                        <option value="free">Free</option>
                        <option value="low">৳1 - ৳1000</option>
                        <option value="medium">৳1001 - ৳2500</option>
                        <option value="high">৳2500+</option>
                    </select>
                </div>
            </div>

            <div className="mx-auto max-w-7xl">
                <p className="mb-5 text-sm font-semibold text-slate-500">
                    Showing {filteredEvents.length} event(s)
                </p>

                {filteredEvents.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <h3 className="text-xl font-black text-slate-950">
                            No events found
                        </h3>
                        <p className="mt-2 text-slate-500">
                            Try changing your search or filter options.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
