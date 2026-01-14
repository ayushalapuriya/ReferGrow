"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { AlertCircle, Gift } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, referralCode, acceptedTerms }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Registration failed");

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-panel animate-fade-in rounded-3xl border border-purple-200 dark:border-purple-500/30 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Join ReferGrow
            </h1>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <Link className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:underline" href="/login">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Full Name</label>
              <input
                className="w-full glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
              <input
                className="w-full glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Password</label>
              <input
                className="w-full glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Min. 8 characters"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Referral Code (Optional)</label>
              <input
                className="w-full glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 px-4 py-3 transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code"
              />
              <p className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-500" />
                Join your referrer's network to start earning together
              </p>
            </div>

            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                className="mt-1 w-4 h-4 accent-purple-600"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                I accept the <span className="font-semibold text-purple-600 dark:text-purple-400">Terms &amp; Conditions</span>
              </span>
            </label>

            {error ? (
              <div className="glass-panel animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
                ⚠️ {error}
              </div>
            ) : null}

            <button
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3.5 font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
              disabled={loading}
              type="submit"
            >
              {loading ? "Creating your account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
