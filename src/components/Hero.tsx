"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const headlineLines = [
  ["Creation", "Without"],
  ["Limitation"]
]

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  // Smooth spring animations for tilt - enhanced on hover
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], isHovered ? [12, -12] : [5, -5]),
    {
      stiffness: 150,
      damping: 15,
    }
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], isHovered ? [-12, 12] : [-5, 5]),
    {
      stiffness: 150,
      damping: 15,
    }
  )

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const sectionTop = rect.top

        const progress = Math.max(
          0,
          Math.min(1, (-sectionTop + windowHeight * 0.3) / (windowHeight * 0.7))
        )
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle mouse move for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const x = (e.clientX - centerX) / rect.width
        const y = (e.clientY - centerY) / rect.height
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const parallaxOffset = scrollProgress * 20

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-20" />

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-between py-8">
        {/* Top section with text */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 pt-8">
          {/* Eyebrow text - fades in first */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.2,
            }}
          >
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 whitespace-nowrap">
              Meet • Finstinct
            </p>
          </motion.div>

          {/* Staggered headline reveal */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white text-center mb-6 leading-[1.1] text-balance"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.4 }}
          >
            {headlineLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map((word, wordIndex) => (
                  <motion.span
                    key={`${lineIndex}-${wordIndex}`}
                    className="inline-block mr-2 md:mr-3"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.33, 1, 0.68, 1],
                        },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                {lineIndex < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Image container with floating and tilt animations */}
        <motion.div
          ref={imageRef}
          className="relative w-full max-w-4xl mx-auto flex-shrink-0 flex items-center justify-center"
          style={{
            height: "50vh",
            minHeight: "400px",
            y: parallaxOffset,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            opacity: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.8 },
            scale: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.8 },
          }}
        >
          {/* Floating animation wrapper with hover tilt */}
          <motion.div
            className="relative w-full h-full cursor-pointer"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [0, -12, 0],
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1],
              },
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1], // Sine wave-like easing
              },
            }}
          >
            {/* Minimal gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 z-10 pointer-events-none" />

            {/* Image with 3D perspective */}
            <div className="relative w-full h-full">
              <Image
                src="/pearl/1.png"
                alt="Finstinct"
                fill
                className="object-contain"
                priority
                style={{
                  filter: "brightness(1.1) contrast(1.05)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
