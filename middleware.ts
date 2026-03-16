import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true"
  const isAdmin = request.cookies.get("isAdmin")?.value === "true"
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup", "/admin"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // Admin routes
  const isAdminRoute = pathname.startsWith("/admin")

  // Protected routes (require authentication)
  const protectedRoutes = ["/home", "/products"]
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Allow public routes
  if (isPublicRoute) {
    // If already logged in and trying to access login/signup, redirect to home/admin
    if ((pathname === "/login" || pathname === "/signup") && isAuthenticated) {
      if (isAdmin) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.redirect(new URL("/home", request.url))
    }
    return NextResponse.next()
  }

  // Admin route protection
  if (isAdminRoute) {
    // Let /admin through - the page will handle showing login or dashboard
    return NextResponse.next()
  }

  // Protected route protection
  if (isProtectedRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
