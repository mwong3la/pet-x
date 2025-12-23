// Utility functions for managing images from ai, military, and pearl folders

export interface ImageData {
  src: string
  folder: "ai" | "military" | "pearl"
  index: number
  name: string
}

/**
 * Get all images from the three specified folders
 */
export const getAllImages = (): ImageData[] => {
  const images: ImageData[] = []
  
  // AI folder images
  images.push({
    src: "/ai/Gemini_Generated_Image_40j16140j16140j1.png",
    folder: "ai",
    index: 0,
    name: "Gemini_Generated_Image_40j16140j16140j1.png"
  })
  
  // Military folder images (1-11)
  for (let i = 1; i <= 11; i++) {
    images.push({
      src: `/military/${i}.png`,
      folder: "military",
      index: i,
      name: `${i}.png`
    })
  }
  
  // Pearl folder images (1-4)
  for (let i = 1; i <= 4; i++) {
    images.push({
      src: `/pearl/${i}.png`,
      folder: "pearl",
      index: i,
      name: `${i}.png`
    })
  }
  
  return images
}

/**
 * Get images from a specific folder
 */
export const getImagesByFolder = (folder: "ai" | "military" | "pearl"): ImageData[] => {
  return getAllImages().filter((img) => img.folder === folder)
}

/**
 * Get a random image from all folders
 */
export const getRandomImage = (): ImageData => {
  const images = getAllImages()
  return images[Math.floor(Math.random() * images.length)]
}

/**
 * Get a random image from a specific folder
 */
export const getRandomImageFromFolder = (folder: "ai" | "military" | "pearl"): ImageData => {
  const images = getImagesByFolder(folder)
  return images[Math.floor(Math.random() * images.length)]
}

