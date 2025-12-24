"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const isHome = pathname === "/";

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMenuOpen(false);
  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5 transition-colors
        ${isHome ? "bg-black/60" : "bg-gray-900/80"}
      `}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-light tracking-tight text-white hover:text-gray-300 transition-colors"
            >
              Finstinct
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="/features"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/support"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Support
            </Link>
            <Link
              href="/bag"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Bag
            </Link>
            {isAuthenticated && (
              <>
                {!isAdmin && (
                  <Link
                    href="/orders"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Orders
                  </Link>
                )}
              </>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-white transition-colors text-nowrap"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Pre-Order
                </Link>
              </>
            )}
            {isAuthenticated && isAdmin && (
              <Link
                href="/admin"
                className="w-full bg-white text-black px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors text-center"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-6 space-y-4">
            <Link
              href="/products"
              className="block text-sm text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/features"
              className="block text-sm text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/support"
              className="block text-sm text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/orders"
                  className="block text-sm text-gray-400 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/payment-history"
                  className="block text-sm text-gray-400 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Payments
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block text-sm  text-gray-400 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </>
            )}
            <Link
              href="/bag"
              className="block text-sm text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Bag
            </Link>
            {isAuthenticated ? (
              <>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-2">
                    {user?.name || user?.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="block text-sm text-gray-400 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="w-full bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors mt-4 inline-block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pre-Order
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
