import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReferGrow - Grow Your Income Through Referrals",
  description: "BV-based referral income platform with binary tree structure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="glass border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
            <Link className="text-xl font-bold gradient-text hover:scale-105 transition-transform" href="/">
              🌱 ReferGrow
            </Link>
            <nav className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="/services">
                Services
              </Link>
              <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="/about">
                About
              </Link>
              <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="/join">
                Join
              </Link>
              <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="/business-opportunity">
                Opportunity
              </Link>
              <Link 
                className="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold" 
                href="/dashboard"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-white/10 bg-zinc-50 dark:bg-zinc-900/50 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg gradient-text mb-4">ReferGrow</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Building financial freedom through smart referral networks.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Platform</h4>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/services" className="hover:text-purple-600">Services</Link></li>
                  <li><Link href="/dashboard" className="hover:text-purple-600">Dashboard</Link></li>
                  <li><Link href="/referrals" className="hover:text-purple-600">Referrals</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/about" className="hover:text-purple-600">About Us</Link></li>
                  <li><Link href="/about/vision" className="hover:text-purple-600">Vision</Link></li>
                  <li><Link href="/about/success-stories" className="hover:text-purple-600">Success Stories</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Account</h4>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/login" className="hover:text-purple-600">Login</Link></li>
                  <li><Link href="/register" className="hover:text-purple-600">Register</Link></li>
                  <li><Link href="/account" className="hover:text-purple-600">My Account</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
              <p>© 2026 ReferGrow. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
