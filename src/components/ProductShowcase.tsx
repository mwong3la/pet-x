"use client"

import Image from "next/image"
import { getAllImages } from "@/lib/imageUtils"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

export default function ProductShowcase() {
  const allImages = getAllImages()
  // Select 4 diverse images from different folders
  const displayedImages = [
    allImages.find((img) => img.folder === "ai") || allImages[0],
    allImages.find((img) => img.folder === "military") || allImages[1],
    allImages.find((img) => img.folder === "pearl") || allImages[2],
    allImages[Math.floor(allImages.length / 2)] || allImages[3],
  ].filter(Boolean).slice(0, 4)

  const products = [
    {
      image: displayedImages[0]?.src || "",
      title: "Real-Time GPS",
      description: "Precision tracking anywhere",
    },
    {
      image: displayedImages[1]?.src || "",
      title: "Health Monitoring",
      description: "Heart rate and activity insights",
    },
    {
      image: displayedImages[2]?.src || "",
      title: "Water Resistant",
      description: "5ATM rated for any adventure",
    },
    {
      image: displayedImages[3]?.src || "",
      title: "Long Battery",
      description: "30 days on single charge",
    },
  ]

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: false,
  })

  const headlineRef = useRef<HTMLDivElement>(null)
  const headlineInView = useInView(headlineRef, { once: true, amount: 0.3 })
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [imageProgress, setImageProgress] = useState<number[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const newProgress = imageRefs.current.map((ref) => {
        if (!ref) return 0
        const rect = ref.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementTop = rect.top
        const progress = Math.max(
          0,
          Math.min(1, 1 - (elementTop - windowHeight * 0.5) / (windowHeight * 0.5))
        )
        return progress
      })
      setImageProgress(newProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="py-0 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Full-width headline section */}
        <motion.div
          ref={headlineRef}
          className="px-6 lg:px-12 py-24 lg:py-32 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-tight text-balance max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.1,
            }}
          >
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </motion.h2>
        </motion.div>

        {/* 2x2 Grid of product images */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {products.map((product, index) => {
            const progress = imageProgress[index] || 0
            const isVisible = progress > 0.1

            return (
              <motion.div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                className="relative aspect-square group overflow-hidden border-[0.5px] border-gray-900"
                initial={{ opacity: 0, y: 60 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1],
                  delay: index * 0.15,
                }}
              >
                {/* Product image with scroll-based reveal */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                  transition={{
                    duration: 1,
                    ease: [0.33, 1, 0.68, 1],
                    delay: index * 0.15 + 0.2,
                  }}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Text overlay - bottom left with scroll reveal */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 bg-gradient-to-t from-black/80 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.33, 1, 0.68, 1],
                    delay: index * 0.15 + 0.4,
                  }}
                >
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-2">{product.title}</h3>
                  <p className="text-sm md:text-base text-gray-400">{product.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
