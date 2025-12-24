"use client"

import { useProducts } from "@/lib/api/queries"
import Image from "next/image"
import Link from "next/link"
import { ProductsSkeleton } from "@/components/loading-skeletons"
import { getImagesByFolder } from "@/lib/imageUtils"

function getDefaultProductImage(index: number): string {
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const allImages = [...militaryImages, ...pearlImages]
  return allImages[index % allImages.length]?.src || "/military/1.png"
}

export default function ProductsPage() {
  const { data: products = [], isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h1 className="text-5xl font-semibold text-black mb-2">Our Products</h1>
              <p className="text-gray-600">Discover our range of smart pet collars</p>
            </div>
            <ProductsSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-24">
              <p className="text-red-600 mb-4">Failed to load products. Please try again later.</p>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl font-semibold text-black mb-2">Our Products</h1>
            <p className="text-gray-600">Discover our range of smart pet collars</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">No products available</h2>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Go Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any, index: number) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                    <Image
                      src={product.image || getDefaultProductImage(index)}
                      alt={product.name || `Product ${product.id}`}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {product.name || `Product ${product.id}`}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    )}
                    {product.price !== undefined && (
                      <p className="text-xl font-semibold text-black">${product.price.toFixed(2)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

