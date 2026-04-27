"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="rounded-2xl border bg-white px-6 py-4 text-sm font-medium shadow-sm">
                    Checking authentication...
                </div>
            </div>
        );
    }

    if(!user) return null

    return <>{children}</>
}