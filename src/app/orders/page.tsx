"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Order {
  id: string
  date: string
  status: "delivered" | "shipped" | "processing"
  total: number
  items: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-2025-001",
      date: "January 15, 2025",
      status: "delivered",
      total: 199.0,
      items: [
        {
          id: "1",
          name: "PetX Smart Collar",
          image: "/sleek-black-smart-pet-collar-on-white-background-m.jpg",
          price: 199,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-2024-045",
      date: "December 20, 2024",
      status: "shipped",
      total: 398.0,
      items: [
        {
          id: "2",
          name: "PetX Smart Collar",
          image: "/sleek-black-smart-pet-collar-on-white-background-m.jpg",
          price: 199,
          quantity: 2,
        },
      ],
    },
  ])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "shipped":
        return "text-blue-600 bg-blue-50"
      case "processing":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "shipped":
        return "Shipped"
      case "processing":
        return "Processing"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold text-black mb-2">Your Orders</h1>
            <p className="text-gray-600">Track, return, or buy things again</p>
          </div>

          {orders.length === 0 ? (
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
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div>
                        <p className="text-gray-600 uppercase text-xs mb-1">Order Placed</p>
                        <p className="font-medium text-black">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 uppercase text-xs mb-1">Total</p>
                        <p className="font-medium text-black">£{order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 uppercase text-xs mb-1">Order #</p>
                        <p className="font-medium text-black">{order.id}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="p-6">
                    {order.items.map((item) => (
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

                          <div className="flex flex-wrap gap-3">
                            <Link
                              href={`/orders/${order.id}`}
                              className="text-blue-600 text-sm hover:underline font-medium"
                            >
                              View order details
                            </Link>
                            <button className="text-blue-600 text-sm hover:underline font-medium">Buy it again</button>
                            {order.status === "delivered" && (
                              <button className="text-blue-600 text-sm hover:underline font-medium">
                                Return or replace
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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
