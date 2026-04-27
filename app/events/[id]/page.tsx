"use client"

import EventCard from "@/components/shared/EventCard"
import { useEvents } from "@/context/EventContext"
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    Star,
    Ticket,
    Users
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"


export default function ItemDetailsPage() {
    const params = useParams<{ id: string }>()
    const { events } = useEvents()

    const event = events.find(event => event.id === params.id)

    if (!event) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="max-w-md rounded-3xl border bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-black text-slate-950">
                        Event not found
                    </h1>
                    <p className="mt-3 text-slate-500">
                        The event you are looking for may have been removed.
                    </p>
                    <Link
                        href="/items"
                        className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
                    >
                        Back to Items
                    </Link>
                </div>
            </section>
        );
    }


    const relatedItems = events
        .filter(item => item.category === event.category && item.id !== event.id)
        .slice(0, 3)

    return (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/items"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                    <ArrowLeft size={18} />
                    Back to Items
                </Link>

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-[420px] w-full rounded-[2rem] object-cover shadow-sm"
                        />

                        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
                                {event.category}
                            </span>

                            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                                {event.title}
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                {event.fullDescription}
                            </p>
                        </div>
                    </div>

                    <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
                        <h2 className="text-2xl font-black text-slate-950">
                            Event Information
                        </h2>

                        <div className="mt-6 grid gap-4">
                            <InfoRow icon={CalendarDays} label="Date" value={event.date} />
                            <InfoRow icon={MapPin} label="Location" value={event.location} />
                            <InfoRow icon={Ticket} label="Price" value={`৳${event.price}`} />
                            <InfoRow
                                icon={Users}
                                label="Capacity"
                                value={`${event.capacity} people`}
                            />
                            <InfoRow icon={Star} label="Rating" value={`${event.rating}/5`} />
                        </div>

                        <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                            <p className="text-sm font-semibold text-slate-500">Organizer</p>
                            <p className="mt-1 text-lg font-black text-slate-950">
                                {event.organizer}
                            </p>
                        </div>

                        <button className="mt-6 w-full rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100">
                            Reserve Seat
                        </button>
                    </aside>
                </div>

                {relatedItems.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-3xl font-black text-slate-950">
                            Related Events
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedItems.map((item) => (
                                <EventCard key={item.id} event={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );

}


function InfoRow({ icon: Icon, label, value }:
    { icon: React.ElementType; label: string; value: string; }) {
    return (
        <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {label}
                </p>
                <p className="font-bold text-slate-950">{value}</p>
            </div>
        </div>
    );
}