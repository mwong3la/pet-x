"use client"

import Image from "next/image"
import { getAllImages, getImagesByFolder } from "@/lib/imageUtils"

export default function FeaturesPage() {
  const allImages = getAllImages()
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const aiImages = getImagesByFolder("ai")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 pb-16">
        {/* Modern Hero Section */}
        <div className="relative h-[70vh] min-h-[600px] mb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={militaryImages[0]?.src || allImages[0]?.src || "/placeholder.svg"}
              alt="Features hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
              <div className="max-w-3xl">
                <div className="mb-6">
                  <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Features</span>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[0.95] text-balance">
                  Everything you need.
                  <br />
                  <span className="text-gray-300">Nothing you don&apos;t.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Advanced technology designed to keep your pet safe, healthy, and connected.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6">
          <div className="space-y-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3]">
                <Image
                  src={militaryImages[1]?.src || militaryImages[0]?.src || allImages[0]?.src || "/placeholder.svg"}
                  alt="GPS Tracking"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-5xl font-light mb-6 text-balance">Real-Time GPS Tracking</h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Know exactly where your pet is at all times with precision GPS tracking. Set up safe zones and get
                  instant alerts when your pet leaves designated areas.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">Live location updates every 30 seconds</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">Unlimited safe zone alerts</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">Location history for the past 90 days</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-5xl font-light mb-6 text-balance">Health & Activity Monitoring</h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Track your pet's daily activity, sleep patterns, and overall health. Get insights into their behavior
                  and early warnings of potential health issues.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">Daily step and calorie tracking</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">Sleep quality monitoring</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">Behavior pattern analysis</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 relative aspect-[4/3]">
                <Image
                  src={pearlImages[0]?.src || pearlImages[1]?.src || allImages[0]?.src || "/placeholder.svg"}
                  alt="Activity Monitoring"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3]">
                <Image
                  src={militaryImages[2]?.src || militaryImages[1]?.src || allImages[0]?.src || "/placeholder.svg"}
                  alt="Waterproof"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-5xl font-light mb-6 text-balance">Waterproof & Durable</h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Built to withstand any adventure. The Finstinct collar is IP68 rated, making it fully waterproof and
                  dustproof for all conditions.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">IP68 waterproof rating</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">30-day battery life</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-lg">Reinforced military-grade materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Modern CTA Section */}
          <div className="mt-32 relative">
            <div className="relative h-[75vh] min-h-[600px] overflow-hidden border border-gray-900 rounded-2xl">
              <div className="absolute inset-0">
                <Image
                  src={pearlImages[2]?.src || pearlImages[1]?.src || allImages[0]?.src || "/placeholder.svg"}
                  alt="Finstinct Collar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
              </div>
              
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center px-6 max-w-3xl">
                  <div className="mb-6">
                    <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Get Started</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-[0.95] text-balance">
                    Ready to experience
                    <br />
                    <span className="text-gray-300">Finstinct?</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Join thousands of pet owners keeping their pets safe, healthy, and connected.
                  </p>
                  <a
                    href="/register"
                    className="inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  >
                    Pre-Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
