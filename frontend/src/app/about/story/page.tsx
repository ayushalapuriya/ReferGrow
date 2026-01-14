export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel animate-fade-in rounded-3xl border border-purple-200 dark:border-purple-500/30 p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl">
              📖
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Story</h1>
          </div>
          
          <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              ReferGrow is built around a simple yet powerful idea: reward community growth using Business Volume (BV)
              so that every purchase can contribute to structured, level-wise income.
            </p>
            <p>
              The platform is open to everyone. Users can join, purchase services, and build their network
              while the system automatically tracks BV and distributes income along the upline.
            </p>
            <p>
              Our journey began with a vision to create a transparent, fair, and sustainable referral system
              that benefits all participants. By leveraging blockchain-inspired transparency and modern technology,
              we've built a platform where trust and growth go hand in hand.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-500/30">
              <div className="text-4xl mb-4 flex justify-center">
                <Sprout className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-purple-600 dark:text-purple-400">Community First</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                We believe in empowering every member of our community to achieve financial growth through collaboration.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-500/30">
              <div className="text-4xl mb-4 flex justify-center">
                <Gem className="w-16 h-16 text-purple-500" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-blue-600 dark:text-blue-400">Transparency</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Every transaction, every BV distribution, every income calculation is clear and verifiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
