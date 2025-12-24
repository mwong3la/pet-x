"use client"

import Image from "next/image"
import Link from "next/link"
import { getImagesByFolder } from "@/lib/imageUtils"

export default function SpecificationsPage() {
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 pb-16">
        {/* Modern Hero Section */}
        <div className="relative h-[70vh] min-h-[600px] mb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={militaryImages[0]?.src || "/military/1.png"}
              alt="Specifications hero"
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
                  <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Specifications</span>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[0.95] text-balance">
                  Technical
                  <br />
                  <span className="text-gray-300">Specifications</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Engineered for performance. Designed for comfort. Built to last.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="space-y-32">
            {/* Design & Build Section */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="relative aspect-[4/3]">
                <Image
                  src={militaryImages[1]?.src || militaryImages[0]?.src || "/military/2.png"}
                  alt="Design & Build"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-5xl font-light mb-8 text-balance">Design & Build</h2>
                <div className="space-y-6">
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Dimensions</span>
                    <span className="text-white text-lg font-light">45 × 32 × 12 mm</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Weight</span>
                    <span className="text-white text-lg font-light">28g</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Materials</span>
                    <span className="text-white text-lg font-light">Aerospace aluminum, TPU</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Colors</span>
                    <span className="text-white text-lg font-light">Midnight Black</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Water Resistance</span>
                    <span className="text-white text-lg font-light">IP68 (up to 1.5m for 30 min)</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Strap</span>
                    <span className="text-white text-lg font-light">Adjustable nylon, 20-60cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Section */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-5xl font-light mb-8 text-balance">Performance</h2>
                <div className="space-y-6">
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">GPS Accuracy</span>
                    <span className="text-white text-lg font-light">5-10m</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Update Frequency</span>
                    <span className="text-white text-lg font-light">Every 30 seconds</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Battery Life</span>
                    <span className="text-white text-lg font-light">Up to 30 days</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Charging Time</span>
                    <span className="text-white text-lg font-light">2 hours (USB-C)</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Operating Temp</span>
                    <span className="text-white text-lg font-light">-10°C to 50°C</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Connectivity</span>
                    <span className="text-white text-lg font-light">LTE-M, NB-IoT, Bluetooth 5.0</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src={pearlImages[0]?.src || pearlImages[1]?.src || "/pearl/1.png"}
                  alt="Performance"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Sensors Section */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="relative aspect-[4/3]">
                <Image
                  src={militaryImages[2]?.src || militaryImages[3]?.src || "/military/3.png"}
                  alt="Sensors"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-5xl font-light mb-8 text-balance">Sensors</h2>
                <div className="space-y-6">
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">GPS</span>
                    <span className="text-white text-lg font-light">GPS, GLONASS, Galileo</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Accelerometer</span>
                    <span className="text-white text-lg font-light">3-axis, 16-bit</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Gyroscope</span>
                    <span className="text-white text-lg font-light">3-axis</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-gray-400 text-lg">Temperature</span>
                    <span className="text-white text-lg font-light">±0.5°C accuracy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In the Box Section */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-5xl font-light mb-8 text-balance">In the Box</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-gray-300 text-lg">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Finstinct Smart Collar
                  </li>
                  <li className="flex items-center gap-4 text-gray-300 text-lg">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    USB-C Charging Cable
                  </li>
                  <li className="flex items-center gap-4 text-gray-300 text-lg">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Quick Start Guide
                  </li>
                  <li className="flex items-center gap-4 text-gray-300 text-lg">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    1 Year Premium Subscription
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src={pearlImages[2]?.src || pearlImages[3]?.src || "/pearl/3.png"}
                  alt="In the Box"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Large product showcase */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-square">
                <Image
                  src={militaryImages[4]?.src || militaryImages[5]?.src || "/military/5.png"}
                  alt="Detail shot"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src={pearlImages[3]?.src || pearlImages[0]?.src || "/pearl/4.png"}
                  alt="In action"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
