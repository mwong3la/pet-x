"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/lib/api/queries";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { getUserIdFromStorage } from "@/lib/userUtils";

export default function BagPage() {
  const router = useRouter();
  const { user, userId, isAuthenticated } = useAuth();
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } =
    useCart();
  const createOrderMutation = useCreateOrder();

  const bagItems = items.filter((item) => item.product); // Only show items with product data

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      router.push("/signin");
      return;
    }

    if (bagItems.length === 0) {
      return;
    }

    try {
      const currentUserId = userId || user?.id || getUserIdFromStorage();
      if (!currentUserId) {
        alert("User ID not found. Please sign in again.");
        router.push("/signin");
        return;
      }

      const orderData = {
        products: bagItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        userId: currentUserId,
      };

      const order = await createOrderMutation.mutateAsync(orderData);

      // Clear bag and redirect to orders or payment
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (error: any) {
      console.error("Failed to create order:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to create order. Please try again."
      );
    }
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-16">
        <div className="max-w-[980px] mx-auto px-6">
          {bagItems.length === 0 ? (
            <div className="text-center py-24">
              <h1 className="text-5xl font-semibold text-black mb-4">
                Your Bag is empty.
              </h1>
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
              <div className="mb-8">
                <h1 className="text-5xl font-semibold text-black">Bag</h1>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                  {bagItems.map((item) => {
                    const product = item.product!;
                    const imageURL =
                      product.imageURL || product.image || "/placeholder.svg";
                    const price = product.price || 0;

                    return (
                      <div
                        key={item.productId}
                        className="pb-6 mb-6 border-b border-gray-200"
                      >
                        <div className="flex gap-6">
                          <div className="flex-shrink-0 w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                            <Image
                              src={imageURL}
                              alt={product.name || `Product ${product.id}`}
                              width={128}
                              height={128}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-semibold text-black">
                                  {product.name || `Product ${product.id}`}
                                </h3>
                                {product.description && (
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                              </div>
                              <p className="text-xl font-semibold text-black">
                                ${price.toFixed(2)}
                              </p>
                            </div>

                            <div className="flex items-center gap-6 mt-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity - 1
                                    )
                                  }
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
                                <span className="text-sm font-medium text-black w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity + 1
                                    )
                                  }
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

                              <button
                                onClick={() => removeItem(item.productId)}
                                className="text-black text-sm hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="lg:w-[340px]">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-black">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        {/* <span className="font-medium text-black">
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span> */}
                      </div>
                      <div className="pt-3 border-t border-gray-300">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-black">
                            Total
                          </span>
                          <span className="text-lg font-semibold text-black">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={
                        bagItems.length === 0 ||
                        createOrderMutation.isPending ||
                        !isAuthenticated
                      }
                      className="w-full bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createOrderMutation.isPending
                        ? "Processing..."
                        : !isAuthenticated
                        ? "Sign in to Checkout"
                        : "Check Out"}
                    </button>

                    <Link
                      href="/"
                      className="block text-center text-black text-sm hover:underline"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
