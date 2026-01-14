import BusinessOpportunityForm from "./BusinessOpportunityForm";
import { TrendingUp, DollarSign, Lock, Briefcase, Infinity, Zap } from "lucide-react";

export default function BusinessOpportunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl">
            <Briefcase className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Business Opportunity
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Build a sustainable income stream through our transparent Business Volume (BV) system
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">How It Works</h2>
            </div>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <p>
                Income is calculated from <strong className="text-purple-600 dark:text-purple-400">Business Volume (BV)</strong>. Each service has a BV value, and repurchases
                add BV again, compounding your earning potential.
              </p>
              <p>
                Our transparent system ensures every transaction is tracked and income is distributed fairly across your network.
              </p>
            </div>
          </div>

          <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl">
                <DollarSign className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Commission Structure</h2>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Level-wise commission distributed as a decreasing percentage of BV:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200 dark:border-purple-500/30">
                <span className="font-semibold">Level 1</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">10% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-500/30">
                <span className="font-semibold">Level 2</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">5% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-200 dark:border-cyan-500/30">
                <span className="font-semibold">Level 3</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">2.5% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-teal-500/10 to-green-500/10 border border-teal-200 dark:border-teal-500/30">
                <span className="font-semibold">Level 4</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">1.25% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-500/30">
                <span className="font-semibold">Level 5+</span>
                <span className="font-bold text-green-600 dark:text-green-400">50% of previous</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8" style={{animationDelay: '0.3s'}}>
          <BusinessOpportunityForm />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="glass-panel rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 text-center">
            <div className="text-4xl mb-4 flex justify-center">
              <Infinity className="w-16 h-16 text-indigo-500" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">Unlimited Depth</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No limits on network growth potential
            </p>
          </div>
          <div className="glass-panel rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 text-center">
            <div className="text-4xl mb-4 flex justify-center">
              <Lock className="w-16 h-16 text-purple-500" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">100% Transparent</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Every BV transaction is visible and verifiable
            </p>
          </div>
          <div className="glass-panel rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 text-center">
            <div className="text-4xl mb-4 flex justify-center">
              <Zap className="w-16 h-16 text-yellow-500" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">Instant Distribution</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Automated income calculation and distribution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
