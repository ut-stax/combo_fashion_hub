"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, isAdmin, logout, isLoading } = useAuth()
  const isLandingPage = pathname === "/"

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  // Show loading state
  if (isLoading) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="w-10 h-10 bg-[#E8DFD0] rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
    )
  }

  // Landing page navbar - only logo and login button
  if (isLandingPage) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left Section: Logo + Brand Name */}
            <div className="flex items-center h-full">
              <Link href="/" className="flex items-center h-full py-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-[#C67B5C] flex-shrink-0">
                  <Image
                    src="/icons/combo_fashion_hub.png"
                    alt="Combo Fashion Hub Logo"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-[#2C2418] ml-3">Combo Fashion Hub</span>
              </Link>
            </div>

            {/* Right Section: Admin Login Button */}
            <div className="flex items-center h-full py-3">
              <Link
                href="/admin"
                className="flex items-center px-5 py-2 bg-[#C67B5C] text-white font-medium hover:bg-[#A65D3F] rounded-full transition-colors h-full"
              >
                Admin Login
              </Link>
            </div>

          </div>
        </div>
      </nav>
    )
  }

  // Internal pages navbar (home, products, etc.)
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Section: Logo + Brand Name */}
          <div className="flex items-center h-full">
            <Link href="/home" className="flex items-center h-full py-3">
              <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-[#C67B5C] flex-shrink-0">
                <Image
                  src="/icons/combo_fashion_hub.png"
                  alt="Combo Fashion Hub Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-[#2C2418] ml-3">Combo Fashion Hub</span>
            </Link>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden md:flex items-center h-full py-3">
            <div className="flex items-center gap-10 h-full">
              <Link 
                href="/home" 
                className={`flex items-center font-medium transition-colors h-full ${pathname === "/home" ? "text-[#C67B5C]" : "text-[#7A7062] hover:text-[#C67B5C]"}`}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`flex items-center font-medium transition-colors h-full ${pathname === "/products" ? "text-[#C67B5C]" : "text-[#7A7062] hover:text-[#C67B5C]"}`}
              >
                Products
              </Link>
              <Link 
                href="/home#contact" 
                className="flex items-center text-[#7A7062] hover:text-[#C67B5C] font-medium transition-colors h-full"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Section: Auth Buttons */}
          <div className="flex items-center h-full py-3 gap-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center px-4 py-2 text-[#7A7062] hover:text-[#C67B5C] font-medium transition-colors h-full"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-[#7A7062] hover:text-[#C67B5C] font-medium transition-colors h-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-5 py-2 bg-[#C67B5C] text-white font-medium hover:bg-[#A65D3F] rounded-full transition-colors h-full"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}
