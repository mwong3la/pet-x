"use client"

import Image from "next/image"
import { getAllImages, getImagesByFolder } from "@/lib/imageUtils"
import { useParallax, useScrollProgress } from "@/hooks/useScrollAnimation"
import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface FeatureSectionProps {
  title: string
  description: string
  imageUrl?: string
  imageAlt: string
  reverse?: boolean
  preferredFolder?: "ai" | "military" | "pearl"
}

export default function FeatureSection({
  title,
  description,
  imageUrl,
  imageAlt,
  reverse = false,
  preferredFolder,
}: FeatureSectionProps) {
  const [currentImage, setCurrentImage] = useState<string>("")
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, amount: 0.3 })
  // Disable scroll progress for image changes to prevent layout breaking
  const { progress } = useScrollProgress()
  const { ref: parallaxRef, offset } = useParallax(0.2) // Reduced parallax speed

  useEffect(() => {
    if (imageUrl) {
      setCurrentImage(imageUrl)
    } else if (preferredFolder) {
      const folderImages = getImagesByFolder(preferredFolder)
      if (folderImages.length > 0) {
        // For adventure section, use a different image from the folder
        if (title.includes("adventure")) {
          // Use image at index 3, 4, or 5 for variety
          const adventureIndex = Math.min(5, folderImages.length - 1)
          setCurrentImage(folderImages[adventureIndex]?.src || folderImages[Math.floor(folderImages.length / 2)]?.src || folderImages[0].src)
        } else {
          setCurrentImage(folderImages[0].src)
        }
      }
    } else {
      const allImages = getAllImages()
      setCurrentImage(allImages[0]?.src || "")
    }
  }, [imageUrl, preferredFolder, title])

  // Disable scroll-based image changes to prevent layout breaking
  // Image stays static once loaded

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      <div className="w-full h-full relative min-h-screen">
        {/* Full-screen background image with subtle parallax */}
        <div ref={parallaxRef} className="absolute inset-0 min-h-screen">
          <motion.div
            className="absolute inset-0 min-h-screen"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{
              transform: `translateY(${offset * 0.1}px)`,
            }}
          >
            <Image
              key={currentImage}
              src={currentImage || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover"
              priority={false}
              sizes="100vw"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </motion.div>
          {/* Consistent gradient overlays matching other sections */}
          <div className="absolute inset-0 min-h-screen bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
          <div className="absolute inset-0 min-h-screen bg-gradient-radial from-transparent via-transparent to-black/40" />
          {reverse && (
            <div className="absolute inset-0 min-h-screen bg-gradient-to-l from-black/60 via-transparent to-transparent" />
          )}
        </div>

        {/* Content overlay - consistent with other sections */}
        <div
          className={`relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 min-h-screen flex items-center ${reverse ? "justify-end" : "justify-start"}`}
        >
          <motion.div
            ref={contentRef}
            className={`max-w-2xl ${reverse ? "text-right" : "text-left"}`}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.1,
              }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
                {title.includes("adventure") ? "Durability" : "Features"}
              </span>
            </motion.div>
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white mb-8 leading-[0.95] text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.2,
              }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.3,
              }}
            >
              {description}
            </motion.p>
            
            {/* Feature badges - only for adventure, styled to blend */}
            {title.includes("adventure") && (
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.4,
                  staggerChildren: 0.1,
                }}
              >
                {["IP68 Waterproof", "30-Day Battery", "Military Grade"].map((badge, index) => (
                  <motion.div
                    key={index}
                    className="px-6 py-3 border border-gray-800 rounded-full bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.4 + index * 0.1,
                    }}
                  >
                    <span className="text-sm text-gray-300 font-light">{badge}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
