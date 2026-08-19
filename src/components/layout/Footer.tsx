import Link from "next/link";
import { Globe, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-xs">L</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Listing<span className="text-indigo-500">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mb-6">
              Discover smarter solutions, services, and opportunities all in one place.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="#" className="hover:text-indigo-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/products" className="hover:text-indigo-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-indigo-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-indigo-400 transition-colors">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="#" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ListingHub. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Module 2 - Independent Setup</p>
        </div>
      </div>
    </footer>
  );
}
