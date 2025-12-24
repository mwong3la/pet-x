"use client"

import { useState, useRef } from "react"
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/lib/api/queries"
import { useOrders, useUpdateOrderStatus } from "@/lib/api/queries"
import { useAllPayments } from "@/lib/api/queries"
import { blobApi } from "@/lib/api/services"
import Image from "next/image"
import { getImagesByFolder } from "@/lib/imageUtils"
import type { Product } from "@/lib/api/types"

type Tab = "products" | "orders" | "payments"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("products")
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    deviceId: "",
  })
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: products = [], isLoading: productsLoading } = useProducts()
  const { data: orders = [], isLoading: ordersLoading } = useOrders()
  const { data: payments = [], isLoading: paymentsLoading } = useAllPayments()
  const createProductMutation = useCreateProduct()
  const updateProductMutation = useUpdateProduct()
  const deleteProductMutation = useDeleteProduct()
  const updateOrderStatusMutation = useUpdateOrderStatus()

  const militaryImages = getImagesByFolder("military")
  const pearlImages = getImagesByFolder("pearl")
  const allImages = [...militaryImages, ...pearlImages]

  const getDefaultProductImage = (index: number): string => {
    return allImages[index % allImages.length]?.src || "/military/1.png"
  }

  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setProductForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        image: product.imageURL || product.image || "",
        deviceId: (product as any).deviceId || "",
      })
      setImagePreview(product.imageURL || product.image || null)
      setSelectedImageFile(null)
    } else {
      setEditingProduct(null)
      setProductForm({ name: "", description: "", price: "", image: "", deviceId: "" })
      setImagePreview(null)
      setSelectedImageFile(null)
    }
    setIsProductModalOpen(true)
  }

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false)
    setEditingProduct(null)
    setProductForm({ name: "", description: "", price: "", image: "", deviceId: "" })
    setImagePreview(null)
    setSelectedImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let imageURL = productForm.image

      // If a new image file is selected, upload it first
      if (selectedImageFile) {
        setIsUploadingImage(true)
        try {
          imageURL = await blobApi.uploadFile(selectedImageFile)
        } catch (uploadError) {
          console.error("Failed to upload image:", uploadError)
          alert("Failed to upload image. Please try again.")
          setIsUploadingImage(false)
          return
        } finally {
          setIsUploadingImage(false)
        }
      }

      // If no image URL and no file selected, use default
      if (!imageURL) {
        imageURL = getDefaultProductImage(products.length)
      }

      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        imageURL: imageURL,
        deviceId: productForm.deviceId || undefined,
      }

      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          data: productData,
        })
      } else {
        await createProductMutation.mutateAsync(productData)
      }
      handleCloseProductModal()
    } catch (error) {
      console.error("Failed to save product:", error)
      alert("Failed to save product. Please try again.")
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await deleteProductMutation.mutateAsync(id)
    } catch (error) {
      console.error("Failed to delete product:", error)
      alert("Failed to delete product. Please try again.")
    }
  }

  const handleUpdateOrderStatus = async (orderId: number, newStatus: number) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ orderId, orderStatus: newStatus })
    } catch (error) {
      console.error("Failed to update order status:", error)
      alert("Failed to update order status. Please try again.")
    }
  }

  const getOrderStatusText = (status: number) => {
    const statusMap: Record<number, string> = {
      1: "Pending",
      2: "Paid",
      3: "Processing",
      4: "Shipped",
      5: "Delivered",
      6: "Cancelled",
      7: "Refunded",
      8: "Failed",
      9: "Returned",
    }
    return statusMap[status] || "Unknown"
  }

  const getOrderStatusColor = (status: number) => {
    const colorMap: Record<number, string> = {
      1: "text-gray-600 bg-gray-50",
      2: "text-purple-600 bg-purple-50",
      3: "text-orange-600 bg-orange-50",
      4: "text-blue-600 bg-blue-50",
      5: "text-green-600 bg-green-50",
      6: "text-red-600 bg-red-50",
      7: "text-yellow-600 bg-yellow-50",
      8: "text-red-600 bg-red-50",
      9: "text-orange-600 bg-orange-50",
    }
    return colorMap[status] || "text-gray-600 bg-gray-50"
  }

  const getPaymentStatusText = (status?: number) => {
    if (status === 1) return "Not Paid"
    if (status === 2) return "Paid"
    return "Unknown"
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold text-black mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage products, orders, and payments</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "products"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "orders"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "payments"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Payments
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-black">Products</h2>
                <button
                  onClick={() => handleOpenProductModal()}
                  className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  + Add Product
                </button>
              </div>

              {productsLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product: Product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="aspect-square bg-gray-50 relative">
                        <Image
                          src={product.imageURL || product.image || getDefaultProductImage(product.id)}
                          alt={product.name || `Product ${product.id}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-black mb-2">
                          {product.name || `Product ${product.id}`}
                        </h3>
                        {product.price !== undefined && (
                          <p className="text-xl font-semibold text-black mb-3">${product.price.toFixed(2)}</p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenProductModal(product)}
                            className="flex-1 bg-gray-100 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-semibold text-black mb-6">Orders</h2>
              {ordersLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading orders...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order: any) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-black">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">User ID: {order.userId}</p>
                          <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                            {getOrderStatusText(order.orderStatus)}
                          </span>
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(order.id, parseInt(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value={1}>Pending</option>
                            <option value={2}>Paid</option>
                            <option value={3}>Processing</option>
                            <option value={4}>Shipped</option>
                            <option value={5}>Delivered</option>
                            <option value={6}>Cancelled</option>
                            <option value={7}>Refunded</option>
                            <option value={8}>Failed</option>
                            <option value={9}>Returned</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Items: {(order.items || order.orderItems)?.length || 0}</p>
                        {order.paymentStatus && (
                          <p>Payment: {order.paymentStatus === 1 ? "Not Paid" : "Paid"}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div>
              <h2 className="text-2xl font-semibold text-black mb-6">Payments</h2>
              {paymentsLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading payments...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment: any) => (
                    <div key={payment.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-black">Payment #{payment.id}</h3>
                          <p className="text-sm text-gray-600">User ID: {payment.userId}</p>
                          <p className="text-sm text-gray-600">Amount: ${payment.amount?.toFixed(2) || "0.00"}</p>
                          {payment.createdAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            payment.status === 2
                              ? "text-green-600 bg-green-50"
                              : payment.status === 1
                              ? "text-orange-600 bg-orange-50"
                              : "text-gray-600 bg-gray-50"
                          }`}
                        >
                          {getPaymentStatusText(payment.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Product Modal */}
          {isProductModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-black">
                      {editingProduct ? "Edit Product" : "Create Product"}
                    </h2>
                    <button
                      onClick={handleCloseProductModal}
                      className="text-gray-600 hover:text-black"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"
                      />
                      {imagePreview && (
                        <div className="mt-4 mb-4">
                          <p className="text-sm text-gray-600 mb-2">Preview:</p>
                          <div className="relative w-full h-48 bg-gray-50 rounded-lg overflow-hidden">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )}
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Or enter Image URL:</label>
                        <input
                          type="text"
                          value={productForm.image}
                          onChange={(e) => {
                            setProductForm({ ...productForm, image: e.target.value })
                            if (e.target.value) {
                              setImagePreview(e.target.value)
                              setSelectedImageFile(null)
                            }
                          }}
                          placeholder="Enter image URL"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedImageFile ? "Image will be uploaded to blob storage" : "Leave empty for default image"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device ID (optional)</label>
                      <input
                        type="text"
                        value={productForm.deviceId}
                        onChange={(e) => setProductForm({ ...productForm, deviceId: e.target.value })}
                        placeholder="Enter device ID"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={createProductMutation.isPending || updateProductMutation.isPending || isUploadingImage}
                        className="flex-1 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {isUploadingImage
                          ? "Uploading Image..."
                          : createProductMutation.isPending || updateProductMutation.isPending
                          ? "Saving..."
                          : editingProduct
                          ? "Update Product"
                          : "Create Product"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseProductModal}
                        className="flex-1 bg-gray-100 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

