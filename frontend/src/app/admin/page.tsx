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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage your platform settings and configurations
        </p>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Services Management */}
        <Link
          href="/admin/services"
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Services
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage services, set pricing and business volume
          </p>
        </Link>

        {/* Distribution Rules */}
        <Link
          href="/admin/rules"
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
              <List className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Distribution Rules
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Configure commission rules and distribution percentages
          </p>
        </Link>

        {/* User Dashboard Link */}
        <Link
          href="/dashboard"
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            User Dashboard
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            View platform as a regular user
          </p>
        </Link>
      </div>

      {/* Quick Stats Section */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Users className="w-10 h-10 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
          </div>
          <div className="text-center">
            <Settings className="w-10 h-10 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Services</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
          </div>
          <div className="text-center">
            <BarChart3 className="w-10 h-10 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
