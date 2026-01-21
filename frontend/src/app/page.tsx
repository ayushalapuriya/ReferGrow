"use client";

import Link from "next/link";
import {
  Rocket,
  IndianRupee,
  TrendingUp,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import ImageSlider from "@/app/_components/ImageSlider";
import { useState, useEffect } from "react";

export default function Home() {
  const [sliderUpdate, setSliderUpdate] = useState(0);

  // Listen for slider updates from admin panel
  useEffect(() => {
    const handleStorageChange = () => {
      setSliderUpdate(prev => prev + 1);
    };

    // Listen for storage changes (when admin updates sliders)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Slider */}
      <section className="relative h-[92vh] max-h-[800px]">
        <ImageSlider 
          key={sliderUpdate}
          className="w-full h-full"
          autoPlay={true}
          interval={5000}
          showControls={true}
          showIndicators={true}
          externalUpdate={sliderUpdate}
        />
      </section>

      {/* Hero Content Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Grow Your Income Through
              <span className="text-blue-600 dark:text-blue-400"> Smart Referrals</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              Join ReferGrow and build your financial freedom with our innovative referral platform featuring binary tree structure and Business Volume distribution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                prefetch={false}
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Rocket className="w-5 h-5" />
                Get Started Free
              </Link>
              <Link
                prefetch={false}
                href="/business-opportunity"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ReferGrow?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Build your network and earn with our proven referral system
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <IndianRupee className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Earn Through Referrals</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build your network and earn income through our sophisticated Business Volume distribution system.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Binary Tree Structure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatic placement in a balanced binary tree ensures fair distribution and growth potential.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Real-time Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor your income, referrals, and network growth with our comprehensive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-12 text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Growing?</h2>
            <p className="text-lg mb-8 text-blue-50">
              Join thousands of members already building their income through ReferGrow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                prefetch={false}
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                prefetch={false}
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Members</div>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">₹50L+</div>
              <div className="text-gray-600 dark:text-gray-400">Distributed Income</div>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Secure Platform</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
