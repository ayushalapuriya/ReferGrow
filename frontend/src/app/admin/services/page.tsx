"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { useAuth } from "@/lib/useAuth";
import { AlertCircle, RefreshCw, Settings, Plus, List, Check, X, Edit } from "lucide-react";
import { formatINR } from "@/lib/format";

type Service = {
  _id: string;
  name: string;
  price: number;
  businessVolume: number;
  status: "active" | "inactive";
  createdAt: string;
};

export default function AdminServicesPage() {
  useAuth({ requireAdmin: true }); // Protect admin page
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [businessVolume, setBusinessVolume] = useState<number | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [editBusinessVolume, setEditBusinessVolume] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setError(null);
    const res = await apiFetch("/api/admin/services");
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error ?? "Failed to load");
    setServices(json.services ?? []);
  }

  useEffect(() => {
    load().catch((e) => setError(String(e?.message ?? e)));
  }, []);

  async function createService(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, businessVolume, status: "active" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Create failed");
      setName("");
      setPrice(0);
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(service: Service) {
    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch(`/api/admin/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: service.status === "active" ? "inactive" : "active" }),
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

  function startEdit(service: Service) {
    setEditingId(service._id);
    setEditName(service.name);
    setEditPrice(service.price);
    setEditBusinessVolume(service.businessVolume);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit() {
    if (!editingId) return;
    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch(`/api/admin/services/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, price: editPrice, businessVolume: editBusinessVolume }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Update failed");
      setEditingId(null);
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <Settings className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Panel</h1>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 ml-15">Manage services and their Business Volume</p>
          </div>
          <div className="flex gap-3 animate-slide-in">
            <Link 
              className="glass-panel rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-500/30" 
              prefetch={false}
              href="/admin/rules"
            >
              Rules
            </Link>
            <Link 
              className="glass-panel rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-500/30" 
              prefetch={false}
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

        <form className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 mb-6" onSubmit={createService} style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl">
              ➕
            </div>
            <h2 className="font-bold text-xl">Create New Service</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <input
              className="glass-panel md:col-span-2 rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 font-medium transition-all focus:ring-2 focus:ring-purple-500"
              placeholder="Service name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 font-medium transition-all focus:ring-2 focus:ring-purple-500"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              min={0}
              step="0.01"
              placeholder="Price (₹)"
              required
            />
            <input
              className="glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 font-medium transition-all focus:ring-2 focus:ring-purple-500"
              type="number"
              value={businessVolume}
              onChange={(e) => setBusinessVolume(e.target.value === "" ? "" : Number(e.target.value))}
              min={0}
              placeholder="Business Volume"
              required
            />
          </div>
          <button
            className="mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
            disabled={busy}
            type="submit"
          >
            {busy ? "Creating..." : "Create Service"}
          </button>
        </form>

        <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl">
              📋
            </div>
            <h2 className="font-bold text-xl">All Services</h2>
          </div>
          <div className="overflow-auto rounded-xl border border-purple-200 dark:border-purple-500/30">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-left text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">BV</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr className="border-t border-purple-200 dark:border-purple-500/30 hover:bg-purple-500/5 transition-colors" key={s._id}>
                    <td className="py-3 px-4">
                      {editingId === s._id ? (
                        <input
                          className="w-full glass-panel rounded-lg border border-purple-200 dark:border-purple-500/30 px-3 py-2 font-medium"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        <span className="font-medium">{s.name}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingId === s._id ? (
                        <input
                          className="w-full glass-panel rounded-lg border border-purple-200 dark:border-purple-500/30 px-3 py-2 font-medium"
                          type="number"
                          step="0.01"
                          min={0}
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value === "" ? "" : Number(e.target.value))}
                          placeholder="Price"
                        />
                      ) : (
                        <span className="font-bold text-green-600 dark:text-green-400">{formatINR(s.price)}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingId === s._id ? (
                        <input
                          className="w-full glass-panel rounded-lg border border-purple-200 dark:border-purple-500/30 px-3 py-2 font-medium"
                          type="number"
                          min={0}
                          value={editBusinessVolume}
                          onChange={(e) => setEditBusinessVolume(e.target.value === "" ? "" : Number(e.target.value))}
                          placeholder="Business Volume"
                        />
                      ) : (
                        <span className="font-bold text-blue-600 dark:text-blue-400">{s.businessVolume}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {s.status === "active" ? (
                        <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300 text-xs font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-lg bg-gray-500/10 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === s._id ? (
                          <>
                            <button
                              className="glass-panel rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-60 border border-green-200 dark:border-green-500/30 hover:bg-green-500/10 transition-colors"
                              onClick={saveEdit}
                              disabled={busy}
                            >
                              ✓ Save
                            </button>
                            <button
                              className="glass-panel rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-60 border border-red-200 dark:border-red-500/30 hover:bg-red-500/10 transition-colors"
                              onClick={cancelEdit}
                              disabled={busy}
                            >
                              ✕ Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="glass-panel rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-60 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-500/10 transition-colors"
                              onClick={() => startEdit(s)}
                              disabled={busy}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="glass-panel rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-60 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-500/10 transition-colors"
                              onClick={() => toggleActive(s)}
                              disabled={busy}
                            >
                              🔄 Toggle
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {services.length === 0 ? (
                  <tr>
                    <td className="py-8 text-center text-zinc-600 dark:text-zinc-400" colSpan={5}>
                      No services yet. Create your first service above!
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
