import Image from "next/image"

export default function ProductShowcase() {
  const products = [
    {
      image: "/smart-pet-collar-gps-tracker-close-up-detail-shot-.jpg",
      title: "Real-Time GPS",
      description: "Precision tracking anywhere",
    },
    {
      image: "/pet-wearing-smart-collar-active-outdoors-running-d.jpg",
      title: "Health Monitoring",
      description: "Heart rate and activity insights",
    },
    {
      image: "/waterproof-smart-pet-collar-in-water-splash-photog.jpg",
      title: "Water Resistant",
      description: "5ATM rated for any adventure",
    },
    {
      image: "/pet-collar-charging-station-minimal-design-black.jpg",
      title: "Long Battery",
      description: "30 days on single charge",
    },
  ]

  return (
    <section className="py-0 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Full-width headline section */}
        <div className="px-6 lg:px-12 py-24 lg:py-32 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-tight text-balance max-w-5xl mx-auto">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>

        {/* 2x2 Grid of product images */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {products.map((product, index) => (
            <div key={index} className="relative aspect-square group overflow-hidden border-[0.5px] border-gray-900">
              {/* Product image */}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

              {/* Text overlay - bottom left */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-2">{product.title}</h3>
                <p className="text-sm md:text-base text-gray-400">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
