"use client"

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SectionHeader from "@/components/shared/SectionHeader"
import { useEvents } from "@/context/EventContext"
import {Eye, Trash2} from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function ManageItemsPage(){
    return (
        <ProtectedRoute>
            <ManageItemsContent />
        </ProtectedRoute>
    )
}


function ManageItemsContent(){
    const { events, deleteEvent } = useEvents()

    const handleDelete = (id: string) => {
        deleteEvent(id)
        toast.success("Event deleted successfully")
    }

    return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Organizer"
        title="Manage events"
        description="Review, open, and maintain your published event listings from one place."
      />

      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-14 w-20 rounded-2xl object-cover"
                      />
                      <div>
                        <p className="font-black text-slate-950">
                          {event.title}
                        </p>
                        <p className="line-clamp-1 max-w-xs text-sm text-slate-500">
                          {event.shortDescription}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    {event.category}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    {event.location}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                    {event.date}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-slate-950">
                    ৳{event.price}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/items/${event.id}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(event.id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && (
            <div className="p-12 text-center">
              <h3 className="text-xl font-black text-slate-950">
                No events available
              </h3>
              <p className="mt-2 text-slate-500">
                Add a new event to see it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}