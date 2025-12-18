import Image from "next/image"

interface FeatureSectionProps {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  reverse?: boolean
}

export default function FeatureSection({
  title,
  description,
  imageUrl,
  imageAlt,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="w-full h-full relative">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <Image src={imageUrl || "/placeholder.svg"} alt={imageAlt} fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Content overlay */}
        <div
          className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex items-center ${reverse ? "justify-end" : "justify-start"}`}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-tight text-balance">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
