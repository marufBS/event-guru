"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { initialEvents } from "@/data/events"
import { EventItem } from "@/types/event"

type EventContextType = {
    events: EventItem[];
    addEvent: (event: Omit<EventItem, "id" | "rating">) => void;
    deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined)

const STORAGE_KEY = "event-guru-mbs"

export function EventProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<EventItem[]>(initialEvents)

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)

        if (stored) {
            setEvents(JSON.parse(stored))
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEvents))
        }
    }, [])

    const persist = (nextEvents: EventItem[]) => {
        setEvents(nextEvents)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEvents))
    }

    const addEvent = (event: Omit<EventItem, "id" | "rating">) => {
        const newEvent: EventItem = {
            ...event,
            id: crypto.randomUUID(),
            rating: 4.5
        }

        persist([newEvent, ...events])
    }

    const deleteEvent = (id: string) => {
        persist(events.filter(event => event.id !== id))
    }

    return (
        <EventContext.Provider
            value={{ events, addEvent, deleteEvent }}
        >
            {children}
        </EventContext.Provider>
    )
}

export function useEvents(){
    const context = useContext(EventContext)

    if(!context){
        throw new Error("useEvents must be used within a EventProvider")
    }

    return context
}