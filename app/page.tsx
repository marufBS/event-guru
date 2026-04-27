import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Globe2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { initialEvents } from "@/data/events";
import EventCard from "@/components/shared/EventCard";

const features = [
  {
    icon: CalendarDays,
    title: "Discover events",
    description: "Browse curated events by category, date, price, and location.",
  },
  {
    icon: ShieldCheck,
    title: "Protected dashboard",
    description: "Add and manage events only after Firebase authentication.",
  },
  {
    icon: Globe2,
    title: "Responsive experience",
    description: "Clean layouts for mobile, tablet, and desktop screens.",
  },
];

const stats = [
  { label: "Events listed", value: "120+" },
  { label: "Active organizers", value: "35+" },
  { label: "Average rating", value: "4.7" },
];

const testimonials = [
  {
    name: "Nadia Rahman",
    role: "Product Manager",
    quote:
      "EventGuru makes event discovery feel simple, clean, and professional.",
  },
  {
    name: "Tanvir Hasan",
    role: "Frontend Developer",
    quote:
      "The interface is polished and the protected pages work exactly as expected.",
  },
  {
    name: "Arif Chowdhury",
    role: "Founder",
    quote:
      "A practical event management concept with strong UI consistency.",
  },
];

export default function HomePage() {
  const featuredEvents = initialEvents.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#4f46e5,transparent_35%),radial-gradient(circle_at_bottom_right,#14b8a6,transparent_30%)] opacity-70" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              <Sparkles size={16} />
              Discover events that match your lifestyle
            </span>

            <h1 className="mt-8 max-w-3xl text-5xl font-black tracking-tight text-white md:text-6xl">
              Discover, add, and manage events with a polished dashboard.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              EventGuru helps people discover curated events, workshops, conferences, and meetups while giving organizers a simple way to publish and manage their events.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/items"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 hover:bg-indigo-50"
              >
                Explore Events
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/items/add"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Add Event
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Featured Event
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-slate-950">
                    Startup Growth Summit
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Open
                </span>
              </div>

              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop"
                alt="Startup Growth Summit"
                className="mt-5 h-64 w-full rounded-3xl object-cover"
              />

              <div className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-slate-50 p-4 text-center"
                  >
                    <p className="text-xl font-black text-slate-950">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to find and manage events"
          description="EventGuru helps people discover quality events and helps organizers publish, manage, and promote their programs from one simple platform."
        />

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                <feature.icon size={26} />
              </div>
              <h3 className="mt-6 text-xl font-black text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured"
          title="Popular events this month"
          description="Uniform responsive cards with image, title, short description, metadata, and details button."
        />

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] bg-indigo-600 p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-100">
              Organizer Tools
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Add and manage your own events after login.
            </h2>
            <p className="mt-4 leading-7 text-indigo-100">
              Organizers can publish events, update listings, 
              and maintain a clean event catalog through a secure account-based dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Zap, title: "Fast setup" },
              { icon: BadgeCheck, title: "Clean validation" },
              { icon: Users, title: "User state" },
              { icon: Star, title: "Polished UI" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white/10 p-6 backdrop-blur"
              >
                <item.icon size={26} />
                <p className="mt-4 font-bold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by event professionals"
          description="A simple testimonial section to complete the landing page structure."
        />

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8"
            >
              <p className="leading-7 text-slate-700">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-black text-slate-950">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}