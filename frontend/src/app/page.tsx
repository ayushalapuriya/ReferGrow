import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="gradient-bg relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-white/30 blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl text-center animate-fade-in-up">
          <h1 className="text-6xl font-bold tracking-tight text-white mb-6">
            Welcome to <span className="text-pink-200">ReferGrow</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transform your network into income with our innovative referral-based platform featuring binary tree structure and Business Volume distribution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-2xl hover:scale-105 transition-transform"
            >
              🚀 Get Started
            </Link>
            <Link
              href="/login"
              className="glass px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          Why Choose ReferGrow?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-hover glass rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">Earn Through Referrals</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Build your network and earn income through our sophisticated Business Volume distribution system.
            </p>
          </div>
          
          <div className="card-hover glass rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🌳</div>
            <h3 className="text-xl font-bold mb-3">Binary Tree Structure</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Automatic placement in a balanced binary tree ensures fair distribution and growth potential.
            </p>
          </div>
          
          <div className="card-hover glass rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Monitor your income, referrals, and network growth with our comprehensive dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="gradient-bg rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Growing?</h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of members already building their income through ReferGrow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              href="/business-opportunity"
              className="glass px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mx-auto max-w-4xl px-6 py-8 mb-16">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/services" className="glass px-6 py-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all">
            🛍️ View Services
          </Link>
          <Link href="/about" className="glass px-6 py-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all">
            ℹ️ About Us
          </Link>
          <Link href="/dashboard" className="glass px-6 py-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all">
            📊 Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
