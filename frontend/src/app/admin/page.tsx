"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { Settings, List, Users, BarChart3 } from "lucide-react";

export default function AdminPage() {
  useAuth({ requireAdmin: true }); // Protect admin page

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold gradient-text mb-4">Admin Dashboard</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Manage your platform settings and configurations
        </p>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Services Management */}
        <Link
          href="/admin/services"
          className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 group-hover:shadow-lg transition-shadow">
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
            Services
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Create and manage services, set pricing and business volume
          </p>
        </Link>

        {/* Distribution Rules */}
        <Link
          href="/admin/rules"
          className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 group-hover:shadow-lg transition-shadow">
              <List className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
            Distribution Rules
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Configure commission rules and distribution percentages
          </p>
        </Link>

        {/* User Dashboard Link */}
        <Link
          href="/dashboard"
          className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 group-hover:shadow-lg transition-shadow">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
            User Dashboard
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            View platform as a regular user
          </p>
        </Link>
      </div>

      {/* Quick Stats Section (Optional - can be expanded) */}
      <div className="mt-12 glass rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Users</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">-</p>
          </div>
          <div className="text-center">
            <Settings className="w-12 h-12 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Active Services</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">-</p>
          </div>
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Revenue</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
