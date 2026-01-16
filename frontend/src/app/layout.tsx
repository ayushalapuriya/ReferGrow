import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import SiteHeader from "@/app/_components/SiteHeader";

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
        <Providers>
          <SiteHeader />
          <main>{children}</main>
        </Providers>
        <footer className="mt-12 sm:mt-16 md:mt-20 border-t border-white/10 bg-zinc-50 dark:bg-zinc-900/50 py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h3 className="font-bold text-lg gradient-text mb-3 sm:mb-4">ReferGrow</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Building financial freedom through smart referral networks.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3">Platform</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link prefetch={false} href="/services" className="hover:text-purple-600">Services</Link></li>
                  <li><Link prefetch={false} href="/dashboard" className="hover:text-purple-600">Dashboard</Link></li>
                  <li><Link prefetch={false} href="/referrals" className="hover:text-purple-600">Referrals</Link></li>
                  <li><Link prefetch={false} href="/cart" className="hover:text-purple-600">Cart</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3">Company</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/about" className="hover:text-purple-600">About Us</Link></li>
                  <li><Link prefetch={false} href="/about/vision" className="hover:text-purple-600">Vision</Link></li>
                  <li><Link prefetch={false} href="/about/success-stories" className="hover:text-purple-600">Success Stories</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3">Account</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link prefetch={false} href="/login" className="hover:text-purple-600">Login</Link></li>
                  <li><Link prefetch={false} href="/register" className="hover:text-purple-600">Register</Link></li>
                  <li><Link prefetch={false} href="/account" className="hover:text-purple-600">My Account</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
              <p>© 2026 ReferGrow. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
