import SectionHeader from "@/components/shared/SectionHeader";
import { BadgeCheck, LayoutDashboard, LockKeyhole, Search } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="About"
        title="About EventGuru"
        description="EventGuru is a simple event management application created for the Odyssey Next.js Assessment Task."
      />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop"
            alt="Event audience"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-slate-950">
            Built for attendees and organizers
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            EventGuru brings event discovery and organizer tools
            into one simple experience. Visitors can browse events,
            search by interest, filter by location or price, and
            view full event details before deciding to attend.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              {
                icon: Search,
                title: "Search and filtering",
                text: "Users can search and filter events by category, location, and price.",
              },
              {
                icon: LockKeyhole,
                title: "Protected routes",
                text: "Add and manage event pages are only accessible after login.",
              },
              {
                icon: LayoutDashboard,
                title: "Management interface",
                text: "Authenticated users can view and delete events from a responsive table.",
              },
              {
                icon: BadgeCheck,
                title: "Organizer ready",
                text: "Organizers can add new events and manage their listings after signing in.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-3xl bg-slate-50 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}