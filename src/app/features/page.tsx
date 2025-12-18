import Image from "next/image"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 pb-16">
        <div className="relative h-[60vh] mb-16 overflow-hidden">
          <Image
            src="/pet-wearing-smart-collar-active-outdoors-running-d.jpg"
            alt="Features hero"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <h1 className="text-6xl md:text-7xl font-light mb-4 text-balance">Features</h1>
              <p className="text-xl md:text-2xl text-gray-300">Everything you need to keep your pet safe</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6">
          <div className="space-y-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/smart-pet-collar-gps-tracker-close-up-detail-shot-.jpg"
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
                  src="/pet-wearing-smart-collar-active-outdoors-running-d.jpg"
                  alt="Activity Monitoring"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/waterproof-smart-pet-collar-in-water-splash-photog.jpg"
                  alt="Waterproof"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-5xl font-light mb-6 text-balance">Waterproof & Durable</h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Built to withstand any adventure. The PetX collar is IP68 rated, making it fully waterproof and
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

          <div className="mt-32 relative h-[70vh] rounded-2xl overflow-hidden">
            <Image
              src="/sleek-black-smart-pet-collar-on-pure-black-backgro.jpg"
              alt="PetX Collar"
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-4">Ready to experience PetX?</h2>
              <p className="text-xl text-gray-400 mb-8">Join thousands of pet owners keeping their pets safe</p>
              <a
                href="/register"
                className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Pre-Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
