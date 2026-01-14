import { BarChart3, Lock } from "lucide-react";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel animate-fade-in rounded-3xl border border-purple-200 dark:border-purple-500/30 p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl">
              🎯
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Our Vision</h1>
          </div>
          
          <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              Our vision is a transparent and scalable platform where income calculation is clear, BV-based,
              and consistent across unlimited depth.
            </p>
            <p>
              Admin controls service pricing and BV values, and all pages and calculations reflect those
              updates consistently. This ensures fairness and predictability for every network member.
            </p>
            <p>
              We envision a future where referral marketing is synonymous with trust, transparency, and mutual growth.
              Where every participant can see exactly how their efforts contribute to their income and the success of their network.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-500/30">
              <div className="text-5xl mb-4">♾️</div>
              <h3 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">Unlimited Depth</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No arbitrary limits on network growth
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-500/30">
              <div className="text-5xl mb-4 flex justify-center">
                <BarChart3 className="w-20 h-20 text-purple-500" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">Real-Time Updates</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Instant reflection of all changes
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-500/30">
              <div className="text-5xl mb-4 flex justify-center">
                <Lock className="w-20 h-20 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">Secure & Fair</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Built with security and fairness at core
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
