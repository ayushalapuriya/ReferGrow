"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";

export default function BusinessOpportunityForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);

    try {
      const res = await apiFetch("/api/business-opportunity/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Request failed");

      setResult(
        json.emailed
          ? "Sent. Please check your inbox."
          : "Saved. Email sending is not configured yet on this server."
      );
      setEmail("");
    } catch (err: unknown) {
      setResult(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Get More Information</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Receive detailed information about our business opportunity</p>
        </div>
      </div>
      
      <form onSubmit={submit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 font-medium transition-all focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            autoComplete="email"
          />
          <button
            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
            disabled={busy}
            type="submit"
          >
            {busy ? "Sending..." : "Send Me Details"}
          </button>
        </div>
        {result ? (
          <div className={`mt-4 p-4 rounded-xl border ${
            result.includes("check your inbox") || result.includes("Saved")
              ? "bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-300"
              : "bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300"
          }`}>
            {result.includes("check your inbox") || result.includes("Saved") ? "✓ " : "⚠️ "}
            {result}
          </div>
        ) : null}
      </form>
    </div>
  );
}
