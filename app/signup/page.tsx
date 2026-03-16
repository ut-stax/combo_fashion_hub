"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    setLoading(true)
    // Firebase signup logic will be added here
    // For now, redirect to home
    setTimeout(() => {
      window.location.href = "/home"
    }, 1000)
  }

  const handleGoogleSignUp = () => {
    // Firebase Google signup logic will be added here
    window.location.href = "/home"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF6F1] to-[#E8DFD0] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#C67B5C] shadow-xl mx-auto">
              <Image
                src="/icons/combo_fashion_hub.png"
                alt="Combo Fashion Hub Logo"
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2C2418] mt-6">
            Create Account
          </h1>
          <p className="text-[#7A7062] mt-2">
            Sign up to get started
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2418] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C67B5C] focus:ring-2 focus:ring-[#C67B5C]/20 outline-none transition"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2418] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C67B5C] focus:ring-2 focus:ring-[#C67B5C]/20 outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2418] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C67B5C] focus:ring-2 focus:ring-[#C67B5C]/20 outline-none transition"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2418] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C67B5C] focus:ring-2 focus:ring-[#C67B5C]/20 outline-none transition"
                placeholder="Confirm your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C67B5C] text-white hover:bg-[#A65D3F] font-medium py-6"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#7A7062]">Or continue with</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <Button
            type="button"
            onClick={handleGoogleSignUp}
            variant="outline"
            className="w-full border-2 border-gray-200 hover:border-[#C67B5C] hover:bg-[#C67B5C]/5 py-6"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
        </div>

        {/* Login Link */}
        <p className="text-center text-[#7A7062] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C67B5C] font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}
