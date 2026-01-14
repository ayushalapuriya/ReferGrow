import { User } from "lucide-react";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-4xl">
              ⭐
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Success Stories</h1>
          </div>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Inspiring journeys from our thriving community members
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8" style={{animationDelay: '0.1s'}}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-purple-600 dark:text-purple-400">Sarah Johnson</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Network Builder • Level 5</p>
              </div>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              "ReferGrow transformed my approach to network marketing. The transparent BV system and automated income distribution make it incredibly easy to track growth and earnings. In just 6 months, I've built a network of 50+ active members!"
            </p>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300 font-semibold">
                $5,240 earned
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
                50+ referrals
              </div>
            </div>
          </div>

          <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                👤
              </div>
              <div>
                <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400">Michael Chen</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Early Adopter • Level 7</p>
              </div>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              "The binary tree structure and level-wise income calculation is brilliant! It ensures everyone in the network benefits fairly. I've been able to create a sustainable passive income stream while helping others succeed."
            </p>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300 font-semibold">
                $12,580 earned
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
                120+ referrals
              </div>
            </div>
          </div>

          <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8" style={{animationDelay: '0.3s'}}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                👤
              </div>
              <div>
                <h3 className="font-bold text-xl text-green-600 dark:text-green-400">Emma Rodriguez</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Top Performer • Level 6</p>
              </div>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              "What I love most is the transparency. Every BV calculation, every income entry is visible and verifiable. This builds trust with my network members and makes recruitment so much easier!"
            </p>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300 font-semibold">
                $8,920 earned
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
                75+ referrals
              </div>
            </div>
          </div>

          <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8" style={{animationDelay: '0.4s'}}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                👤
              </div>
              <div>
                <h3 className="font-bold text-xl text-orange-600 dark:text-orange-400">David Kumar</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Rising Star • Level 4</p>
              </div>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              "As a newcomer to network marketing, ReferGrow's user-friendly dashboard and clear documentation made it easy to get started. The automated income distribution means I can focus on growing my network instead of manual calculations."
            </p>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-700 dark:text-green-300 font-semibold">
                $3,450 earned
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
                35+ referrals
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8 text-center" style={{animationDelay: '0.5s'}}>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Join thousands of members building their networks and earning sustainable income
          </p>
          <a 
            href="/register"
            className="inline-block rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
}
