import { SocialIcon } from "react-social-icons";
import Link from "next/link";

export default function Footer() {

  const socials = [
    { name: "Github", link: "https://github.com", icon: "github" },
    { name: "Twitter", link: "https://twitter.com", icon: "twitter" },
    { name: "Linkedin", link: "https://linkedin.com", icon: "linkedin" },
    { name: "Facebook", link: "https://facebook.com", icon: "facebook" },
    { name: "Instagram", link: "https://instagram.com", icon: "instagram" },
  ]
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-black text-slate-950">EventGuru</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            A modern event discovery platform for attendees and organizers.
            Find quality events, explore details, and manage listings from one place.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-950">Pages</h4>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/" className="text-slate-600 hover:text-indigo-600">
              Home
            </Link>
            <Link
              href="/events"
              className="text-slate-600 hover:text-indigo-600"
            >
              Items
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-indigo-600"
            >
              About
            </Link>
            {/* <Link
              href="/events/add"
              className="text-slate-600 hover:text-indigo-600"
            >
              Add Item
            </Link> */}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-950">Social</h4>
          <div className="mt-4 flex gap-3">
            {socials.map((social, i) => (
              <span
                key={i}
                className="flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white"
              >
                <SocialIcon url={social.link} network={social.icon}/>
              </span>
            ))}
            
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EventGuru. All rights reserved.
      </div>
    </footer>
  );
}