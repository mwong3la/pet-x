"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCreateOrder } from "@/lib/api/queries"
import { useAuth } from "@/contexts/AuthContext"
import { getImagesByFolder } from "@/lib/imageUtils"

function getDefaultProductImage(id: number): string {
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const allImages = [...militaryImages, ...pearlImages]
  return allImages[id % allImages.length]?.src || "/military/1.png"
}

interface BagItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  productId: number
  color?: string
  size?: string
}

export default function BagPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const createOrderMutation = useCreateOrder()
  const [bagItems, setBagItems] = useState<BagItem[]>([
    {
      id: "1",
      name: "Finstinct Smart Collar",
      image: getDefaultProductImage(1),
      price: 199,
      quantity: 1,
      productId: 1,
      color: "Black",
      size: "Medium",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setBagItems(bagItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setBagItems(bagItems.filter((item) => item.id !== id))
  }

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      router.push("/signin")
      return
    }

    if (bagItems.length === 0) {
      return
    }

    try {
      const orderData = {
        products: bagItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        userId: user.id,
      }

      const order = await createOrderMutation.mutateAsync(orderData)
      
      // Clear bag and redirect to orders or payment
      setBagItems([])
      router.push(`/orders/${order.id}`)
    } catch (error: any) {
      console.error("Failed to create order:", error)
      alert(error?.response?.data?.message || "Failed to create order. Please try again.")
    }
  }

  const subtotal = bagItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 0 : 0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-16">
        <div className="max-w-[980px] mx-auto px-6">
          {bagItems.length === 0 ? (
            <div className="text-center py-24">
              <h1 className="text-5xl font-semibold text-black mb-4">Your Bag is empty.</h1>
              <p className="text-gray-600 mb-8">
                <Link href="/signin" className="text-black hover:underline">
                  Sign in
                </Link>{" "}
                to see if you have any saved items.
              </p>
              <Link
                href="/"
                className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-5xl font-semibold text-black">Bag</h1>
                <Link
                  href="/checkout"
                  className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Review Bag
                </Link>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-[200px] flex-shrink-0">
                  <div className="lg:sticky lg:top-24">
                    <h2 className="text-xs font-semibold text-gray-500 mb-4">My Profile</h2>
                    <nav className="space-y-2">
                      <Link href="/orders" className="flex items-center gap-2 text-sm text-black hover:underline py-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        Orders
                      </Link>
                      <Link href="/account" className="flex items-center gap-2 text-sm text-black hover:underline py-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Account
                      </Link>
                      <Link href="/signin" className="flex items-center gap-2 text-sm text-black hover:underline py-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign in
                      </Link>
                    </nav>
                  </div>
                </div>

                <div className="flex-1">
                  {bagItems.map((item) => (
                    <div key={item.id} className="pb-6 mb-6 border-b border-gray-200">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                              {item.color && <p className="text-sm text-gray-600 mt-1">Color: {item.color}</p>}
                              {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                            </div>
                            <p className="text-xl font-semibold text-black">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="flex items-center gap-6 mt-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="text-sm font-medium text-black w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            <button onClick={() => removeItem(item.id)} className="text-black text-sm hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:w-[340px]">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        {/* <span className="font-medium text-black">
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span> */}
                      </div>
                      <div className="pt-3 border-t border-gray-300">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-black">Total</span>
                          <span className="text-lg font-semibold text-black">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      disabled={bagItems.length === 0 || createOrderMutation.isPending || !isAuthenticated}
                      className="w-full bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createOrderMutation.isPending ? "Processing..." : !isAuthenticated ? "Sign in to Checkout" : "Check Out"}
                    </button>

                    <Link href="/" className="block text-center text-black text-sm hover:underline">
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 flex-shrink-0 text-gray-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-black">Free Delivery</p>
                        <p className="text-xs text-gray-600">On orders over $50</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 flex-shrink-0 text-gray-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-black">2-Year Warranty</p>
                        <p className="text-xs text-gray-600">Included with purchase</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
