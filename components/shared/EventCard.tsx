import { CalendarDays, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { EventItem } from "@/types/event";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {event.category}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-amber-600">
            <Star size={16} fill="currentColor" />
            {event.rating}
          </span>
        </div>

        <div>
          <h3 className="line-clamp-1 text-lg font-bold text-slate-950">
            {event.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {event.shortDescription}
          </p>
        </div>

        <div className="space-y-2 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            {event.date}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {event.location}
          </p>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <p className="font-bold text-slate-950">৳{event.price}</p>
          <Link
            href={`/events/${event.id}`}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}