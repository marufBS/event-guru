"use client"

import { useAuth } from "@/context/AuthContext"
import { CalendarCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"

export default function LoginPage() {
    const { login, loginWithGoogle } = useAuth()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Email and password are required")
            return
        }

        try {
            await login(email, password)
            toast.success("Login successful")
            router.push("/")
        } catch (error) {
            toast.error("Invalid email or password")
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
            toast.success("Google login successful")
            router.push("/")
        } catch (error) {
            toast.error("Google login failed")
        }
    }

    return (
        <section className="flex min-h-[80vh] items-center justify-center px-4 py-16">
            <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                    <CalendarCheck />
                </div>

                <div className="mt-6 text-center">
                    <h1 className="text-3xl font-black text-slate-950">Welcome back</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Login to publish and manage your events.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 grid gap-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="h-12 rounded-full bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>

                <button
                    onClick={handleGoogleLogin}
                    className="mt-4 h-12 w-full rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-bold text-indigo-600">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
}