"use client"

import { usePaymentHistory, useMakePayment } from "@/lib/api/queries"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { PaymentHistorySkeleton } from "@/components/loading-skeletons"

export default function PaymentHistoryPage() {
  const { user, isAuthenticated } = useAuth()
  const { data: payments = [], isLoading, error } = usePaymentHistory(user?.id || null)
  const makePaymentMutation = useMakePayment()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-24 pb-16">
          <div className="max-w-[980px] mx-auto px-6 text-center">
            <h1 className="text-5xl font-semibold text-black mb-4">Please sign in</h1>
            <p className="text-gray-600 mb-8">You need to be signed in to view your payment history.</p>
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
              <h1 className="text-5xl font-semibold text-black mb-2">Payment History</h1>
              <p className="text-gray-600">View all your past payments</p>
            </div>
            <PaymentHistorySkeleton />
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
              <p className="text-red-600 mb-4">Failed to load payment history. Please try again later.</p>
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
            <h1 className="text-5xl font-semibold text-black mb-2">Payment History</h1>
            <p className="text-gray-600">View all your past payments</p>
          </div>

          {payments.length === 0 ? (
            <div className="text-center py-24 border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-semibold text-black mb-4">No payment history found</h2>
              <p className="text-gray-600 mb-8">You haven't made any payments yet.</p>
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment: any) => (
                <div
                  key={payment.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-black">
                          Payment #{payment.id}
                        </h3>
                        {payment.status && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'completed' || payment.status === 'success'
                                ? 'text-green-600 bg-green-50'
                                : payment.status === 'pending'
                                ? 'text-orange-600 bg-orange-50'
                                : 'text-gray-600 bg-gray-50'
                            }`}
                          >
                            {payment.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Amount: <span className="font-semibold text-black">${payment.amount?.toFixed(2) || '0.00'}</span>
                      </p>
                      {payment.createdAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(payment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
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

