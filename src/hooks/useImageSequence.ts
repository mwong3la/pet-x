"use client"

import { useState, useEffect, useRef } from "react"
import { getAllImages, ImageData } from "@/lib/imageUtils"

interface UseImageSequenceOptions {
  images?: ImageData[]
  autoPlay?: boolean
  interval?: number
  scrollTriggered?: boolean
}

export function useImageSequence(options: UseImageSequenceOptions = {}) {
  const {
    images = getAllImages(),
    autoPlay = false,
    interval = 5000,
    scrollTriggered = false,
  } = options

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying && !scrollTriggered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, interval)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [isPlaying, interval, images.length, scrollTriggered])

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const previous = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, images.length - 1)))

  return {
    currentImage: images[currentIndex],
    currentIndex,
    next,
    previous,
    goTo,
    isPlaying,
    setIsPlaying,
    totalImages: images.length,
  }
}

