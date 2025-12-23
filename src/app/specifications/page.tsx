import Image from "next/image"
import Link from "next/link"

export default function SpecificationsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 pb-16">
        {/* Hero section with product image */}
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square">
              <Image
                src="/sleek-black-smart-pet-collar-on-pure-black-backgro.jpg"
                alt="Finstinct Smart Collar"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-6xl font-light mb-6 text-balance">Technical Specifications</h1>
              <p className="text-xl text-gray-400 mb-8">Engineered for performance. Designed for comfort.</p>
              <Link
                href="/"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Pre-Order Now
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications grid */}
        <div className="max-w-[980px] mx-auto px-6">
          <div className="space-y-12">
            {/* Design & Build */}
            <div>
              <h2 className="text-3xl font-light mb-6 pb-3 border-b border-gray-800">Design & Build</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Dimensions</span>
                  <span className="text-white">45 × 32 × 12 mm</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Weight</span>
                  <span className="text-white">28g</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Materials</span>
                  <span className="text-white">Aerospace aluminum, TPU</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Colors</span>
                  <span className="text-white">Midnight Black</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Water Resistance</span>
                  <span className="text-white">IP68 (up to 1.5m for 30 min)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Strap</span>
                  <span className="text-white">Adjustable nylon, 20-60cm</span>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div>
              <h2 className="text-3xl font-light mb-6 pb-3 border-b border-gray-800">Performance</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">GPS Accuracy</span>
                  <span className="text-white">5-10m</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Update Frequency</span>
                  <span className="text-white">Every 30 seconds</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Battery Life</span>
                  <span className="text-white">Up to 30 days</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Charging Time</span>
                  <span className="text-white">2 hours (USB-C)</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Operating Temp</span>
                  <span className="text-white">-10°C to 50°C</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Connectivity</span>
                  <span className="text-white">LTE-M, NB-IoT, Bluetooth 5.0</span>
                </div>
              </div>
            </div>

            {/* Sensors */}
            <div>
              <h2 className="text-3xl font-light mb-6 pb-3 border-b border-gray-800">Sensors</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">GPS</span>
                  <span className="text-white">GPS, GLONASS, Galileo</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Accelerometer</span>
                  <span className="text-white">3-axis, 16-bit</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Gyroscope</span>
                  <span className="text-white">3-axis</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-900">
                  <span className="text-gray-400">Temperature</span>
                  <span className="text-white">±0.5°C accuracy</span>
                </div>
              </div>
            </div>

            {/* In the Box */}
            <div>
              <h2 className="text-3xl font-light mb-6 pb-3 border-b border-gray-800">In the Box</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Finstinct Smart Collar
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  USB-C Charging Cable
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Quick Start Guide
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
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
          </div>

          {/* Large product showcase */}
          <div className="mt-16 grid md:grid-cols-2 gap-4">
            <div className="relative aspect-square">
              <Image
                src="/smart-pet-collar-gps-tracker-close-up-detail-shot-.jpg"
                alt="Detail shot"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative aspect-square">
              <Image
                src="/pet-wearing-smart-collar-active-outdoors-running-d.jpg"
                alt="In action"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
