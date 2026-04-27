"use client"

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SectionHeader from "@/components/shared/SectionHeader"
import { useEvents } from "@/context/EventContext"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"


export default function AddEventPage() {
    return (
        <ProtectedRoute>
            <AddItemForm />
        </ProtectedRoute>
    )
}

function AddItemForm() {
    const { addEvent } = useEvents()
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        title: "",
        shortDescription: "",
        fullDescription: "",
        category: "",
        location: "",
        date: "",
        price: "",
        imageUrl: "",
        organizer: "",
        capacity: ""
    })

    const updateField = (key: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (
            !form.title ||
            !form.shortDescription ||
            !form.fullDescription ||
            !form.category ||
            !form.location ||
            !form.date ||
            !form.price ||
            !form.organizer ||
            !form.capacity
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true)

        addEvent({
            title: form.title,
            shortDescription: form.shortDescription,
            fullDescription: form.fullDescription,
            category: form.category,
            location: form.location,
            date: form.date,
            price: Number(form.price),
            imageUrl:
                form.imageUrl ||
                "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
            organizer: form.organizer,
            capacity: Number(form.capacity),
        });


        toast.success("Event added successfully")
        setLoading(false)
        router.push("/events/manage")

    }

    return (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader
                eyebrow="Organizer"
                title="Add new event"
                description="Create a new event listing with clear details, pricing, location, and capacity."
            />

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <Input
                        label="Title"
                        value={form.title}
                        onChange={(value) => updateField("title", value)}
                        placeholder="Event title"
                        required
                    />

                    <Input
                        label="Category"
                        value={form.category}
                        onChange={(value) => updateField("category", value)}
                        placeholder="Business, Technology, Design"
                        required
                    />

                    <Input
                        label="Location"
                        value={form.location}
                        onChange={(value) => updateField("location", value)}
                        placeholder="Dhaka"
                        required
                    />

                    <Input
                        label="Date"
                        type="date"
                        value={form.date}
                        onChange={(value) => updateField("date", value)}
                        required
                    />

                    <Input
                        label="Price"
                        type="number"
                        value={form.price}
                        onChange={(value) => updateField("price", value)}
                        placeholder="1500"
                        required
                    />

                    <Input
                        label="Capacity"
                        type="number"
                        value={form.capacity}
                        onChange={(value) => updateField("capacity", value)}
                        placeholder="200"
                        required
                    />

                    <Input
                        label="Organizer"
                        value={form.organizer}
                        onChange={(value) => updateField("organizer", value)}
                        placeholder="Organizer name"
                        required
                    />

                    <Input
                        label="Image URL"
                        value={form.imageUrl}
                        onChange={(value) => updateField("imageUrl", value)}
                        placeholder="Optional image URL"
                    />
                </div>

                <div className="mt-5 grid gap-5">
                    <Textarea
                        label="Short Description"
                        value={form.shortDescription}
                        onChange={(value) => updateField("shortDescription", value)}
                        placeholder="Write a short 1-2 line summary"
                        required
                    />

                    <Textarea
                        label="Full Description"
                        value={form.fullDescription}
                        onChange={(value) => updateField("fullDescription", value)}
                        placeholder="Write full event description"
                        rows={6}
                        required
                    />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={() => router.push("/events")}
                        className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </section>
    );


}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
    </label>
  );
}