import BusinessOpportunityForm from "./BusinessOpportunityForm";
import { TrendingUp, IndianRupee, Lock, Briefcase, Infinity, Zap } from "lucide-react";

export default function BusinessOpportunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Business Opportunity
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Build a sustainable income stream through our transparent Business Volume (BV) system
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="font-bold text-xl text-gray-900 dark:text-white">How It Works</h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Income is calculated from <strong className="text-blue-600 dark:text-blue-400">Business Volume (BV)</strong>. Each service has a BV value, and repurchases
                add BV again, compounding your earning potential.
              </p>
              <p>
                Our transparent system ensures every transaction is tracked and income is distributed fairly across your network.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="font-bold text-xl text-gray-900 dark:text-white">Commission Structure</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Level-wise commission distributed as a decreasing percentage of BV:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="font-semibold text-gray-900 dark:text-white">Level 1</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">5% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="font-semibold text-gray-900 dark:text-white">Level 2</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">2.5% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="font-semibold text-gray-900 dark:text-white">Level 3</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">1.25% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="font-semibold text-gray-900 dark:text-white">Level 4</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">0.625% of BV</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="font-semibold text-gray-900 dark:text-white">Level 5+</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">50% of previous</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          <BusinessOpportunityForm />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Infinity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Unlimited Depth</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No limits on network growth potential
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">100% Transparent</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Every BV transaction is visible and verifiable
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
