"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";
import { useAuth } from "@/lib/useAuth";
import { DollarSign, BarChart3, TrendingUp } from "lucide-react";

type MeResponse = {
  user: {
    id: string;
    email: string;
    role: "admin" | "user";
    referralCode: string;
    parent: string | null;
  };
};

type Service = {
  _id: string;
  name: string;
  price: number;
  businessVolume: number;
  status: "active" | "inactive";
};

type Income = {
  _id: string;
  level: number;
  bv: number;
  amount: number;
  fromUser?: { email: string; referralCode: string };
  createdAt: string;
};

export default function DashboardPage() {
  useAuth(); // Protect this page - require authentication
  const router = useRouter();
  const [me, setMe] = useState<MeResponse["user"] | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalIncome = useMemo(
    () => incomes.reduce((sum, inc) => sum + (inc.amount ?? 0), 0),
    [incomes]
  );

  async function loadAll() {
    setError(null);

    const [meRes, servicesRes, incomeRes] = await Promise.all([
      apiFetch("/api/me"),
      apiFetch("/api/services"),
      apiFetch("/api/income"),
    ]);

    const meJson = await meRes.json();
    if (!meRes.ok) throw new Error(meJson?.error ?? "Not logged in");

    const servicesJson = await servicesRes.json();
    const incomeJson = await incomeRes.json();

    setMe(meJson.user);
    setServices(servicesJson.services ?? []);
    setIncomes(incomeJson.incomes ?? []);

    const firstServiceId = (servicesJson.services?.[0]?._id as string | undefined) ?? "";
    setSelectedServiceId((prev) => prev || firstServiceId);
  }

  useEffect(() => {
    loadAll().catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  async function logout() {
    setBusy(true);
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } finally {
      setBusy(false);
    }
  }

  async function buyService() {
    if (!selectedServiceId) return;
    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selectedServiceId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Purchase failed");

      await loadAll();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  if (error && !me) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Dashboard</h1>
          <div className="mt-4 glass-panel animate-fade-in rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-sm backdrop-blur-xl">
            {error} —{" "}
            <Link className="font-semibold underline transition-colors hover:text-purple-600" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Dashboard</h1>
            {me ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Welcome back, <span className="font-semibold text-purple-600 dark:text-purple-400">{me.email}</span> ({me.role})
              </p>
            ) : null}
          </div>
          <div className="flex gap-3 animate-slide-in">
            {me?.role === "admin" ? (
              <Link 
                className="glass-panel rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-500/30" 
                href="/admin/services"
              >
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Admin Panel</span>
              </Link>
            ) : null}
            <button
              className="glass-panel rounded-xl px-5 py-2.5 text-sm font-medium disabled:opacity-60 transition-all hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-500/30"
              onClick={logout}
              disabled={busy}
            >
              Logout
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-6 glass-panel animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300 backdrop-blur-xl">
            {error}
          </div>
        ) : null}

        {me ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 transition-all hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl">
                  🔗
                </div>
                <h2 className="font-semibold text-lg">Referral Code</h2>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-3 border border-purple-200 dark:border-purple-500/30">
                <code className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{me.referralCode}</code>
              </div>
              <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
                Share this code to invite new users to your network
              </p>
            </div>

            <div className="glass-panel animate-fade-in rounded-2xl border border-green-200 dark:border-green-500/30 p-6 transition-all hover:scale-105 hover:shadow-2xl" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h2 className="font-semibold text-lg">Total Income</h2>
              </div>
              <p className="mt-2 text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse-slow">
                ${totalIncome.toFixed(2)}
              </p>
              <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
                Cumulative BV income from your network
              </p>
            </div>

            <div className="glass-panel animate-fade-in rounded-2xl border border-blue-200 dark:border-blue-500/30 p-6 transition-all hover:scale-105 hover:shadow-2xl md:col-span-2 lg:col-span-1" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h2 className="font-semibold text-lg">Quick Stats</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Income Entries</span>
                  <span className="font-semibold">{incomes.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Available Services</span>
                  <span className="font-semibold">{services.length}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 mb-6 transition-all hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
              🛒
            </div>
            <h2 className="font-semibold text-lg">Purchase Service</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              className="flex-1 glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 font-medium transition-all focus:ring-2 focus:ring-purple-500"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} — ${s.price} — BV {s.businessVolume}
                </option>
              ))}
            </select>
            <button
              className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
              onClick={buyService}
              disabled={busy || !selectedServiceId}
            >
              {busy ? "Processing…" : "Buy Now"}
            </button>
          </div>
          {services.length === 0 ? (
            <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
              No services available. Admin needs to create services first.
            </p>
          ) : null}
        </div>

        <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 transition-all hover:shadow-2xl" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="font-semibold text-lg">Income History</h2>
            </div>
            <Link 
              className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:underline transition-all hover:scale-105" 
              href="/referrals"
            >
              View Referral Tree →
            </Link>
          </div>
          <div className="mt-4 overflow-auto rounded-xl border border-purple-200 dark:border-purple-500/30">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-left text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">From</th>
                  <th className="py-3 px-4 font-semibold">Level</th>
                  <th className="py-3 px-4 font-semibold">BV</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((inc, idx) => (
                  <tr key={inc._id} className="border-t border-purple-200 dark:border-purple-500/30 hover:bg-purple-500/5 transition-colors">
                    <td className="py-3 px-4">{new Date(inc.createdAt).toLocaleString()}</td>
                    <td className="py-3 px-4 font-medium">{inc.fromUser?.email ?? "—"}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                        L{inc.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{inc.bv}</td>
                    <td className="py-3 px-4 font-bold text-green-600 dark:text-green-400">
                      ${inc.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {incomes.length === 0 ? (
                  <tr>
                    <td className="py-8 text-center text-zinc-600 dark:text-zinc-400" colSpan={5}>
                      No income entries yet. Purchase services to start earning!
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
