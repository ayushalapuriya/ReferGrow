import Link from "next/link";
import { BookOpen, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About ReferGrow
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Discover our mission, vision, and the success stories that define our community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link 
            className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8 transition-all hover:scale-105 hover:shadow-2xl group" 
            prefetch={false}
            href="/about/story"
            style={{animationDelay: '0.1s'}}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl group-hover:scale-110 transition-transform">
              📖
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">Our Story</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Learn how ReferGrow was built to empower communities through transparent reward systems
              </p>
            </div>
          </Link>

          <Link 
            className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8 transition-all hover:scale-105 hover:shadow-2xl group" 
            prefetch={false}
            href="/about/vision"
            style={{animationDelay: '0.2s'}}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl group-hover:scale-110 transition-transform">
              🎯
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">Vision</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Explore our vision for a transparent, scalable platform that rewards network growth
              </p>
            </div>
          </Link>

          <Link
            className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8 transition-all hover:scale-105 hover:shadow-2xl group"
            prefetch={false}
            href="/about/success-stories"
            style={{animationDelay: '0.3s'}}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-4xl group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Success Stories</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Read inspiring stories from our thriving community members
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
