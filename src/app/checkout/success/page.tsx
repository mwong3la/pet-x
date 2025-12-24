"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useVerifyPayment } from "@/lib/api/queries"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verifyPaymentMutation = useVerifyPayment()
  const [isVerifying, setIsVerifying] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null)

  useEffect(() => {
    let isMounted = true;

    const verifyPayment = async () => {
      try {
        // Get session ID from localStorage or URL params
        const sessionId = localStorage.getItem('stripeSessionId') || searchParams.get('session_id')
        const orderId = localStorage.getItem('orderId')

        if (!sessionId) {
          if (isMounted) {
            setVerificationStatus("error")
            setIsVerifying(false)
          }
          return
        }

        // Verify payment with backend
        await verifyPaymentMutation.mutateAsync(sessionId)
        
        if (isMounted) {
          setVerificationStatus("success")
          
          // Clear localStorage
          localStorage.removeItem('stripeSessionId')
          if (orderId) {
            localStorage.removeItem('orderId')
          }
        }
      } catch (error) {
        console.error("Payment verification failed:", error)
        if (isMounted) {
          setVerificationStatus("error")
        }
      } finally {
        if (isMounted) {
          setIsVerifying(false)
        }
      }
    }

    verifyPayment()

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          {isVerifying ? (
            <div className="text-center py-24">
              <div className="mb-6">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
              <h1 className="text-3xl font-semibold text-black mb-4">Verifying Payment...</h1>
              <p className="text-gray-600">Please wait while we confirm your payment.</p>
            </div>
          ) : verificationStatus === "success" ? (
            <div className="text-center py-24">
              <div className="mb-6">
                <svg
                  className="w-20 h-20 text-green-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-semibold text-black mb-4">Payment Successful!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/orders"
                  className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  View Orders
                </Link>
                <Link
                  href="/"
                  className="bg-gray-100 text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="mb-6">
                <svg
                  className="w-20 h-20 text-red-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-semibold text-black mb-4">Payment Verification Failed</h1>
              <p className="text-xl text-gray-600 mb-8">
                We couldn't verify your payment. Please contact support if you were charged.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/payment-history"
                  className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Check Payment History
                </Link>
                <Link
                  href="/"
                  className="bg-gray-100 text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Go Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

