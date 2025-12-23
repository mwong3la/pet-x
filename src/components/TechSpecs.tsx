"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function TechSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const specs = [
    { label: "Dimensions", value: "42 × 36 × 12 mm" },
    { label: "Weight", value: "25 grams" },
    { label: "Display", value: '0.96" OLED' },
    { label: "Battery", value: "300 mAh lithium polymer" },
    { label: "Battery Life", value: "Up to 30 days" },
    { label: "Charging", value: "Magnetic USB charging" },
    { label: "Water Resistance", value: "5ATM (50 meters)" },
    { label: "Connectivity", value: "4G LTE, GPS, Bluetooth 5.2" },
    { label: "Sensors", value: "Accelerometer, Gyroscope, Heart Rate" },
    { label: "Operating Temp", value: "-10°C to 45°C" },
    { label: "Materials", value: "Medical-grade silicone, aluminum" },
    { label: "Compatibility", value: "iOS 14+, Android 9+" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-black text-white" id="specs">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.1,
            }}
          >
            Technical Specifications
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.2,
            }}
          >
            Premium engineering meets thoughtful design. Built to last, designed
            to impress.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-800 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.3 + index * 0.05,
              }}
            >
              <dt className="text-sm text-gray-400 mb-2">{spec.label}</dt>
              <dd className="text-lg font-medium">{spec.value}</dd>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.8,
          }}
        >
          <Link
            href="/specifications"
            className="bg-white text-black px-8 py-4 rounded-full text-base font-medium hover:bg-gray-200 transition-all hover:scale-105"
          >
            View Full Specifications
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
