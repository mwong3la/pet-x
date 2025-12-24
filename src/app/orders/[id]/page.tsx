"use client"

import { useOrder, usePayForOrder } from "@/lib/api/queries"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { OrderDetailSkeleton } from "@/components/loading-skeletons"
import { getImagesByFolder } from "@/lib/imageUtils"
import { getUserIdFromStorage } from "@/lib/userUtils"

function getDefaultProductImage(id: number): string {
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const allImages = [...militaryImages, ...pearlImages]
  return allImages[id % allImages.length]?.src || "/military/1.png"
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, userId, isAuthenticated } = useAuth()
  const orderId = params?.id ? parseInt(params.id as string) : null
  const { data: order, isLoading, error } = useOrder(orderId)
  const payForOrderMutation = usePayForOrder()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handlePayment = async () => {
    if (!isAuthenticated || !user || !order) {
      router.push("/signin")
      return
    }

    setIsProcessingPayment(true)
    try {
      const currentUserId = userId || user?.id || getUserIdFromStorage()
      if (!currentUserId) {
        alert("User ID not found. Please sign in again.")
        router.push("/signin")
        return
      }

      const paymentData = {
        userId: currentUserId,
        amount: order.total || 0,
        successURL: `${window.location.origin}/checkout/success`,
        cancelURL: `${window.location.origin}/checkout/cancel`,
      }

      const result = await payForOrderMutation.mutateAsync({
        orderId: order.id,
        data: paymentData,
      })
      // Save session ID to localStorage before redirecting
      if (result.stripeSessioId      ) {
        const sessionId = result.stripeSessioId

        localStorage.setItem('stripeSessionId', sessionId)
        localStorage.setItem('orderId', order.id.toString())
      }

      // If the API returns a payment URL, redirect to it
      if (result.url || result.paymentUrl) {
        window.location.href = result.url || result.paymentUrl
      } else {
        alert("Payment initiated. Please check your payment history.")
        router.push("/payment-history")
      }
    } catch (error: any) {
      console.error("Payment error:", error)
      alert(error?.response?.data?.message || "Failed to process payment. Please try again.")
    } finally {
      setIsProcessingPayment(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-[980px] mx-auto px-6">
            <OrderDetailSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-[980px] mx-auto px-6">
            <div className="text-center py-24">
              <p className="text-red-600 mb-4">Order not found or failed to load.</p>
              <Link
                href="/orders"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Back to Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-[980px] mx-auto px-6 text-center">
            <h1 className="text-5xl font-semibold text-black mb-4">Please sign in</h1>
            <p className="text-gray-600 mb-8">You need to be signed in to view order details.</p>
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

  const getOrderStatusColor = (status: number) => {
    switch (status) {
      case 5: // Delivered
        return "text-green-600 bg-green-50"
      case 4: // Shipped
        return "text-blue-600 bg-blue-50"
      case 3: // Processing
        return "text-orange-600 bg-orange-50"
      case 2: // Paid
        return "text-purple-600 bg-purple-50"
      case 1: // Pending
        return "text-gray-600 bg-gray-50"
      case 6: // Cancelled
        return "text-red-600 bg-red-50"
      case 7: // Refunded
        return "text-yellow-600 bg-yellow-50"
      case 8: // Failed
        return "text-red-600 bg-red-50"
      case 9: // Returned
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getOrderStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "Pending"
      case 2:
        return "Paid"
      case 3:
        return "Processing"
      case 4:
        return "Shipped"
      case 5:
        return "Delivered"
      case 6:
        return "Cancelled"
      case 7:
        return "Refunded"
      case 8:
        return "Failed"
      case 9:
        return "Returned"
      default:
        return "Unknown"
    }
  }

  const getPaymentStatusColor = (status: number) => {
    switch (status) {
      case 2: // Paid
        return "text-green-600 bg-green-50"
      case 1: // NotPaid
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPaymentStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "Not Paid"
      case 2:
        return "Paid"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="mb-6">
            <Link href="/orders" className="text-blue-600 hover:underline text-sm">
              ← Back to Orders
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-semibold text-black mb-2">Order #{order.id}</h1>
                {order.createdAt && (
                  <p className="text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                  {getOrderStatusText(order.orderStatus)}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {getPaymentStatusText(order.paymentStatus)}
                </span>
              </div>
            </div>
            {order.stripeSessionId && (
              <p className="text-xs text-gray-500 mt-2">
                Stripe Session: {order.stripeSessionId}
              </p>
            )}
            {order.paymentIntentId && (
              <p className="text-xs text-gray-500">
                Payment Intent: {order.paymentIntentId}
              </p>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-black">Order Items</h2>
            </div>
            <div className="p-6">
              {(order.items || order.orderItems) && (order.items || order.orderItems)!.length > 0 ? (
                <div className="space-y-4">
                  {(order.items || order.orderItems)!.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={getDefaultProductImage(item.productId || idx)}
                          alt={item.productName || `Product ${item.productId}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-1">
                          {item.productName || `Product ${item.productId}`}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">Quantity: {item.quantity}</p>
                        {item.unitPrice !== undefined && (
                          <p className="text-sm font-medium text-black">
                            ${item.unitPrice.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No items in this order.</p>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-black">Total</span>
                <span className="text-2xl font-semibold text-black">
                  ${order.total.toFixed(2)}
                </span>
              </div>
              {order.paymentStatus !== 2 && (
                <button
                  onClick={handlePayment}
                  disabled={isProcessingPayment || payForOrderMutation.isPending}
                  className="w-full bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment || payForOrderMutation.isPending
                    ? "Processing Payment..."
                    : "Pay Now"}
                </button>
              )}
              {order.paymentStatus === 2 && (
                <div className="text-center text-green-600 text-sm font-medium">
                  ✓ Payment Completed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

