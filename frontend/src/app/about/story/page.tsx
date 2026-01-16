import { Gem, Sprout } from "lucide-react";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
              <span className="text-3xl">📖</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Our Story</h1>
          </div>
          
          <div className="space-y-6 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
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
              we’ve built a platform where trust and growth go hand in hand.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <Sprout className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white text-center">Community First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                We believe in empowering every member of our community to achieve financial growth through collaboration.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <Gem className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white text-center">Transparency</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Every transaction, every BV distribution, every income calculation is clear and verifiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
