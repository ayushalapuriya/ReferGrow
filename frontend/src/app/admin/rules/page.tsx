"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { useAuth } from "@/lib/useAuth";

type Rule = {
  _id: string;
  basePercentage: number;
  decayEnabled: boolean;
  isActive: boolean;
  createdAt: string;
};

export default function AdminRulesPage() {
  useAuth({ requireAdmin: true }); // Protect admin page
  const [rules, setRules] = useState<Rule[]>([]);
  const [basePercentage, setBasePercentage] = useState<number>(10);
  const [decayEnabled, setDecayEnabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setError(null);
    const res = await apiFetch("/api/admin/rules");
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error ?? "Failed to load");

    const recent = (json.recentRules ?? []) as Rule[];
    setRules(recent);
  }

  useEffect(() => {
    load().catch((e) => setError(String(e?.message ?? e)));
  }, []);

  async function createRule(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch("/api/admin/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ basePercentage, decayEnabled, isActive: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Create failed");
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function setActive(rule: Rule) {
    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch(`/api/admin/rules/${rule._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Update failed");
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl">
                📊
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Income Rules</h1>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 ml-15">Configure BV income distribution rules</p>
          </div>
          <div className="flex gap-3 animate-slide-in">
            <Link 
              className="glass-panel rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-500/30" 
              href="/admin/services"
            >
              Services
            </Link>
            <Link 
              className="glass-panel rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-500/30" 
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {error ? (
          <div className="mb-6 glass-panel animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
            ⚠️ {error}
          </div>
        ) : null}

        <form className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 mb-6" onSubmit={createRule} style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl">
              ➕
            </div>
            <h2 className="font-bold text-xl">Create New Rule</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Level 1 Percentage (of BV)</label>
              <input
                className="w-full glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 font-medium transition-all focus:ring-2 focus:ring-purple-500"
                type="number"
                step="0.01"
                value={basePercentage}
                onChange={(e) => setBasePercentage(Number(e.target.value))}
                min={0}
                max={100}
                required
              />
              <p className="text-xs text-zinc-600 dark:text-zinc-400 pl-1">
                💡 Example: 10 = 10% income at Level 1
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Decay Mode</label>
              <label className="flex items-start gap-3 glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 p-4 cursor-pointer hover:bg-purple-500/5 transition-colors">
                <input
                  className="mt-1 w-4 h-4 accent-purple-600"
                  type="checkbox"
                  checked={decayEnabled}
                  onChange={(e) => setDecayEnabled(e.target.checked)}
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Halve each level<br />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">(L2 = 50% of L1, etc.)</span>
                </span>
              </label>
            </div>
          </div>
          <button
            className="mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
            disabled={busy}
            type="submit"
          >
            {busy ? "Saving..." : "Create & Set Active"}
          </button>
        </form>

        <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl">
              📋
            </div>
            <h2 className="font-bold text-xl">All Rules</h2>
          </div>
          <div className="overflow-auto rounded-xl border border-purple-200 dark:border-purple-500/30">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-left text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="py-3 px-4 font-semibold">Level 1</th>
                  <th className="py-3 px-4 font-semibold">Decay</th>
                  <th className="py-3 px-4 font-semibold">Active</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr className="border-t border-purple-200 dark:border-purple-500/30 hover:bg-purple-500/5 transition-colors" key={r._id}>
                    <td className="py-3 px-4">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {(r.basePercentage * 100).toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {r.decayEnabled ? (
                        <span className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                          Halving
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-lg bg-gray-500/10 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                          Level 1 only
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {r.isActive ? (
                        <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300 text-xs font-semibold">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-lg bg-gray-500/10 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="glass-panel rounded-lg px-4 py-1.5 text-xs font-medium disabled:opacity-60 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-500/10 transition-colors"
                        onClick={() => setActive(r)}
                        disabled={busy || r.isActive}
                      >
                        {r.isActive ? "✓ Active" : "Set Active"}
                      </button>
                    </td>
                  </tr>
                ))}
                {rules.length === 0 ? (
                  <tr>
                    <td className="py-8 text-center text-zinc-600 dark:text-zinc-400" colSpan={4}>
                      No rules yet. Create your first rule above!
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-500/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                <strong className="text-blue-600 dark:text-blue-400">Formula:</strong> Income per level = BV × Level-1% × (1/2)^(level-1) when decay is enabled.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
