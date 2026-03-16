"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin/admin-login"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is authenticated using auth context
    const authStatus = localStorage.getItem("isAuthenticated")
    const adminStatus = localStorage.getItem("isAdmin")
    
    if (authStatus === "true" && adminStatus === "true") {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F1]">
        <p className="text-[#7A7062]">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
