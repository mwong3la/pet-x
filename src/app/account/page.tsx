"use client"

import { useState } from "react"
import Link from "next/link"

export default function AccountPage() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+44 7700 900000",
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-[980px] mx-auto px-6">
          <h1 className="text-5xl font-semibold text-black mb-12">Account</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">Orders</h2>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Track, return, or buy things again</p>
              <Link href="/orders" className="text-blue-600 text-sm hover:underline font-medium">
                View all orders
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">Login & Security</h2>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Edit login, name, and password</p>
              <Link href="/account/security" className="text-blue-600 text-sm hover:underline font-medium">
                Manage security
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">Your Addresses</h2>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Edit addresses for orders</p>
              <Link href="/account/addresses" className="text-blue-600 text-sm hover:underline font-medium">
                Manage addresses
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">Payment Methods</h2>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Edit or add payment methods</p>
              <Link href="/account/payments" className="text-blue-600 text-sm hover:underline font-medium">
                Manage payments
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">Contact Preferences</h2>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Manage email and notification settings</p>
              <Link href="/account/preferences" className="text-blue-600 text-sm hover:underline font-medium">
                Manage preferences
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black">Your Devices</h2>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Manage connected Finstinct devices</p>
              <Link href="/account/devices" className="text-blue-600 text-sm hover:underline font-medium">
                View devices
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-black mb-4">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="text-gray-600 w-24">Name:</span>
                <span className="text-black font-medium">{user.name}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">Email:</span>
                <span className="text-black font-medium">{user.email}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24">Phone:</span>
                <span className="text-black font-medium">{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
