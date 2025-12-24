"use client"

import { useProduct } from "@/lib/api/queries"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ProductDetailSkeleton } from "@/components/loading-skeletons"
import { Skeleton } from "@/components/ui/skeleton"
import { getImagesByFolder } from "@/lib/imageUtils"

function getDefaultProductImage(id: number): string {
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const allImages = [...militaryImages, ...pearlImages]
  return allImages[id % allImages.length]?.src || "/military/1.png"
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const productId = params?.id ? parseInt(params.id as string) : null
  const { data: product, isLoading, error } = useProduct(productId)
  const [quantity, setQuantity] = useState(1)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-6">
              <Skeleton className="h-4 w-32" />
            </div>
            <ProductDetailSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-24">
              <p className="text-red-600 mb-4">Product not found or failed to load.</p>
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToBag = () => {
    // In a real app, you'd add to a cart/bag context or localStorage
    // For now, redirect to bag page
    router.push("/bag")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <Link href="/products" className="text-blue-600 hover:underline text-sm">
              ← Back to Products
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
              <Image
                src={product.image || getDefaultProductImage(product.id)}
                alt={product.name || `Product ${product.id}`}
                fill
                className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-4xl font-semibold text-black mb-4">
                {product.name || `Product ${product.id}`}
              </h1>

              {product.price !== undefined && (
                <p className="text-3xl font-semibold text-black mb-6">${product.price.toFixed(2)}</p>
              )}

              {product.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-black mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-lg font-medium text-black w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToBag}
                  className="w-full bg-black text-white px-6 py-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Add to Bag
                </button>
                {!isAuthenticated && (
                  <p className="text-sm text-gray-600 text-center">
                    <Link href="/signin" className="text-blue-600 hover:underline">
                      Sign in
                    </Link>{" "}
                    to save items to your bag
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

