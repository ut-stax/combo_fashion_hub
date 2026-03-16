"use client"

import { useState } from "react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    // Simple credentials check
    if (username === "admin" && password === "combo123") {
      // Set session in localStorage (matching auth context keys)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("isAdmin", "true")
      // Also set cookie for middleware
      document.cookie = "isAuthenticated=true; path=/; max-age=86400"
      document.cookie = "isAdmin=true; path=/; max-age=86400"
      // Use window.location to force full page reload
      window.location.href = "/admin"
    } else {
      setError("Invalid username or password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#2C2418]">
          Admin Login
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#2C2418]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-[#E0D6C8] rounded-md focus:ring-2 focus:ring-[#C67B5C] focus:border-transparent"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-[#2C2418]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#E0D6C8] rounded-md focus:ring-2 focus:ring-[#C67B5C] focus:border-transparent"
              placeholder="Enter password"
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C67B5C] hover:bg-[#A65D3F] text-white py-2 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <p className="text-xs text-[#7A7062] text-center mt-4">
          Demo: admin / combo123
        </p>
      </div>
    </div>
  )
}
