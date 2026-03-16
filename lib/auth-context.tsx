"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  login: (userType: "user" | "admin") => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage on mount (client-side only)
    const authStatus = localStorage.getItem("isAuthenticated")
    const adminStatus = localStorage.getItem("isAdmin")
    
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    if (adminStatus === "true") {
      setIsAdmin(true)
    }
    setIsLoading(false)
  }, [])

  const login = (userType: "user" | "admin") => {
    setIsAuthenticated(true)
    localStorage.setItem("isAuthenticated", "true")
    
    // Set cookies for middleware
    document.cookie = "isAuthenticated=true; path=/; max-age=86400"
    
    if (userType === "admin") {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", "true")
      document.cookie = "isAdmin=true; path=/; max-age=86400"
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("isAdmin")
    
    // Clear cookies
    document.cookie = "isAuthenticated=; path=/; max-age=0"
    document.cookie = "isAdmin=; path=/; max-age=0"
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
