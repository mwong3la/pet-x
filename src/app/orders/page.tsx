"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useOrders } from "@/lib/api/queries"
import { useAuth } from "@/contexts/AuthContext"
import type { Order } from "@/lib/api/types"
import { OrdersSkeleton } from "@/components/loading-skeletons"
import { getImagesByFolder } from "@/lib/imageUtils"

function getDefaultProductImage(index: number): string {
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const allImages = [...militaryImages, ...pearlImages]
  return allImages[index % allImages.length]?.src || "/military/1.png"
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()
  const { data: orders = [], isLoading, error } = useOrders()

  const formattedOrders = useMemo(() => {
    // Reverse the array so newest orders appear first
    return [...orders].reverse().map((order: Order) => ({
      id: order.id,
      orderNumber: `ORD-${order.id}`,
      date: order.createdAt 
        ? new Date(order.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : 'N/A',
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      total: order.total || 0,
      items: order.orderItems?.map((item, idx) => ({
        id: item.productId?.toString() || idx.toString(),
        name: `Product ${item.productId}`,
        image: getDefaultProductImage(item.productId || idx),
        price: 0, // Price not in API response
        quantity: item.quantity || 1,
      })) || [],
    }))
  }, [orders])

  const getOrderStatusColor = (status: number) => {
    switch (status) {
      case 3: // delivered
        return "text-green-600 bg-green-50"
      case 2: // shipped
        return "text-blue-600 bg-blue-50"
      case 1: // processing
        return "text-orange-600 bg-orange-50"
      case 0: // pending
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getOrderStatusText = (status: number) => {
    switch (status) {
      case 3:
        return "Delivered"
      case 2:
        return "Shipped"
      case 1:
        return "Processing"
      case 0:
        return "Pending"
      default:
        return "Unknown"
    }
  }

  const getPaymentStatusColor = (status: number) => {
    switch (status) {
      case 1: // paid
        return "text-green-600 bg-green-50"
      case 2: // failed
        return "text-red-600 bg-red-50"
      case 0: // pending
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPaymentStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "Paid"
      case 2:
        return "Failed"
      case 0:
        return "Pending"
      default:
        return "Unknown"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-[980px] mx-auto px-6 text-center">
            <h1 className="text-5xl font-semibold text-black mb-4">Please sign in</h1>
            <p className="text-gray-600 mb-8">You need to be signed in to view your orders.</p>
            <Link
              href="/signin"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-[980px] mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-5xl font-semibold text-black mb-2">Your Orders</h1>
              <p className="text-gray-600">Track, return, or buy things again</p>
            </div>
            <OrdersSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-[980px] mx-auto px-6">
            <div className="text-center py-24">
              <p className="text-red-600 mb-4">Failed to load orders. Please try again later.</p>
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
        <div className="max-w-[980px] mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold text-black mb-2">Your Orders</h1>
            <p className="text-gray-600">Track, return, or buy things again</p>
          </div>

          {formattedOrders.length === 0 ? (
            <div className="text-center py-24 border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">You haven't placed any orders yet.</h2>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {formattedOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div>
                        <p className="text-gray-600 uppercase text-xs mb-1">Order Placed</p>
                        <p className="font-medium text-black">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 uppercase text-xs mb-1">Total</p>
                        <p className="font-medium text-black">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 uppercase text-xs mb-1">Order #</p>
                        <p className="font-medium text-black">{order.orderNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                        {getOrderStatusText(order.orderStatus)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {getPaymentStatusText(order.paymentStatus)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {order.items.length > 0 ? (
                      order.items.map((item) => (
                        <div key={item.id} className="flex gap-6 mb-6 last:mb-0">
                          <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-black mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No items in this order.</p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-blue-600 text-sm hover:underline font-medium"
                      >
                        View order details
                      </Link>
                      {order.orderStatus === 3 && (
                        <button className="text-blue-600 text-sm hover:underline font-medium">
                          Return or replace
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
