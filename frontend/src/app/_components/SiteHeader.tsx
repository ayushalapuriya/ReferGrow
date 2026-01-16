"use client";

import Link from "next/link";
import { useState } from "react";
import { Sprout, ShoppingCart, Menu, X } from "lucide-react";

import { useAppSelector } from "@/store/hooks";

export default function SiteHeader() {
  const cartCount = useAppSelector((s) => s.cart.totalQuantity);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/services", label: "Services", prefetch: false },
    { href: "/about", label: "About", prefetch: true },
    { href: "/join", label: "Join", prefetch: false },
    { href: "/business-opportunity", label: "Opportunity", prefetch: false },
  ];

  return (
    <header className="glass border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          className="text-lg sm:text-xl font-bold gradient-text hover:scale-105 transition-transform flex items-center gap-2"
          href="/"
        >
          <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" /> 
          <span className="hidden sm:inline">ReferGrow</span>
          <span className="sm:hidden">RG</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              prefetch={item.prefetch}
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          
          <Link
            prefetch={false}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2"
            href="/cart"
          >
            <span className="relative inline-flex">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 ? (
                <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 rounded-full bg-green-500 text-white text-[11px] leading-4.5 text-center font-semibold">
                  {cartCount}
                </span>
              ) : null}
            </span>
            <span className="hidden sm:inline">Cart</span>
          </Link>

          <Link
            prefetch={false}
            className="btn-primary px-4 py-2 rounded-lg text-white text-sm font-semibold"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            prefetch={false}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative"
            href="/cart"
          >
            <span className="relative inline-flex">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 ? (
                <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 rounded-full bg-green-500 text-white text-[11px] leading-4.5 text-center font-semibold">
                  {cartCount}
                </span>
              ) : null}
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl mobile-menu-enter">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                prefetch={item.prefetch}
                className="block px-3 py-2 rounded-lg hover:bg-white/10 dark:hover:bg-zinc-800/50 transition-colors text-sm font-medium"
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-2 border-t border-white/10">
              <Link
                prefetch={false}
                className="btn-primary w-full px-4 py-2 rounded-lg text-white text-sm font-semibold text-center block"
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
