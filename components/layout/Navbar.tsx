"use client"

import { useAuth } from "@/context/AuthContext"
import {
    CalendarCheck,
    ChevronDown,
    LogOut,
    Menu,
    PlusCircle,
    Settings,
    UserRound,
    X
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

const routes = [
    { label:"Home",href:"/"},
    { label:"Events",href:"/events"},
    { label:"About",href:"/about"},
    // { label:"Add Item",href:"/items/add"},
    // { label:"Manage",href:"/items/manage"},
]

export default function Navbar(){
    const {user, logout} = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await logout()
            setDropdownOpen(false)
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error("Failed to log out")
        }
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <CalendarCheck size={24} />
          </span>
          <span className="text-xl font-black tracking-tight text-slate-950">
            EventGuru
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {routes.slice(0, 5).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600"
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-700">
                  <UserRound size={18} />
                </span>
                <span className="max-w-[160px] truncate text-sm font-semibold">
                  {user.email}
                </span>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Logged in as
                    </p>
                    <p className="mt-1 truncate text-sm font-bold text-slate-900">
                      {user.email}
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/items/add"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <PlusCircle size={18} />
                      Add Product
                    </Link>
                    <Link
                      href="/items/manage"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Settings size={18} />
                      Manage Products
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-2xl border p-2 lg:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {route.label}
              </Link>
            ))}

            <div className="mt-3 grid gap-2 border-t pt-3">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold">
                    {user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
    )
}