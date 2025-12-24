"use client"

import { useOrder, usePayForOrder } from "@/lib/api/queries"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { OrderDetailSkeleton } from "@/components/loading-skeletons"
import { getImagesByFolder } from "@/lib/imageUtils"

function getDefaultProductImage(id: number): string {
  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const allImages = [...militaryImages, ...pearlImages]
  return allImages[id % allImages.length]?.src || "/military/1.png"
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
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
      const paymentData = {
        userId: user.id,
        amount: order.total || 0,
        successURL: `${window.location.origin}/orders/${order.id}?payment=success`,
        cancelURL: `${window.location.origin}/orders/${order.id}?payment=cancelled`,
      }

      const result = await payForOrderMutation.mutateAsync({
        orderId: order.id,
        data: paymentData,
      })

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
              {order.orderItems && order.orderItems.length > 0 ? (
                <div className="space-y-4">
                  {order.orderItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={getDefaultProductImage(item.productId || idx)}
                          alt={`Product ${item.productId}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black mb-1">
                          Product {item.productId}
                        </h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
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
              {order.paymentStatus !== 1 && (
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
              {order.paymentStatus === 1 && (
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

