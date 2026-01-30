"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch, readApiBody } from "@/lib/apiClient";
import { Gift } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setUserProfile } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiFetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, fullName: name, mobile, countryCode, email, password, referralCode, acceptedTerms }),
      });

      const body = await readApiBody(res);
      const data = body.json as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error ?? body.text ?? "Registration failed");

      let userRole = "user";
      try {
        const meRes = await apiFetch("/api/me");
        const meBody = await readApiBody(meRes);
        const meJson = meBody.json as { user?: { role?: string } } | null;
        if (meRes.ok) {
          dispatch(setUserProfile(meJson?.user ?? null));
          userRole = meJson?.user?.role ?? "user";
        }
      } catch {
        // ignore
      }

      // Show success toast
      toast.success("Account created successfully! Redirecting...");

      // Redirect based on user role
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      toast.error(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 mb-4 shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Join ReferGrow
            </h1>
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link prefetch={false} className="font-medium text-blue-600 hover:underline" href="/login">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Country Code</label>
              <select
                id="countryCode"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+91">🇮🇳 India (+91)</option>
                <option value="+1">🇺🇸 United States (+1)</option>
                <option value="+44">🇬🇧 United Kingdom (+44)</option>
                <option value="+61">🇦🇺 Australia (+61)</option>
                <option value="+1">🇨🇦 Canada (+1)</option>
                <option value="+971">🇦🇪 UAE (+971)</option>
                <option value="+65">🇸🇬 Singapore (+65)</option>
                <option value="+60">🇲🇾 Malaysia (+60)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 py-2.5 border border-gray-300 rounded-md bg-gray-50 text-gray-700 min-w-[80px]">
                  {countryCode}
                </div>
                <input
                  id="mobile"
                  className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  type="tel"
                  autoComplete="tel"
                  required
                  minLength={10}
                  maxLength={15}
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">Referral Code (Optional)</label>
              <input
                id="referralCode"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code"
              />
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <Gift className="w-4 h-4 text-blue-500" />
                Join your referrer’s network to start earning together
              </p>
            </div>

            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                className="mt-1 w-4 h-4 accent-blue-600"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
              />
              <span className="text-gray-700">
                I accept the <span className="font-medium text-blue-600">Terms &amp; Conditions</span>
              </span>
            </label>

            <button
              className="btn-primary w-full rounded-md px-4 py-2.5 font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
