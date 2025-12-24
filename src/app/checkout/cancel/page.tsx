"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function CheckoutCancelPage() {
  useEffect(() => {
    // Clear localStorage on cancel
    localStorage.removeItem('stripeSessionId')
    localStorage.removeItem('orderId')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center py-24">
            <div className="mb-6">
              <svg
                className="w-20 h-20 text-orange-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-semibold text-black mb-4">Payment Cancelled</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your payment was cancelled. No charges were made to your account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bag"
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Return to Bag
              </Link>
              <Link
                href="/"
                className="bg-gray-100 text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

