"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/types/product"
import { getProducts, deleteProduct } from "@/lib/firebase-products"
import ProductForm from "./product-form"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated")
    const isAdmin = localStorage.getItem("isAdmin")
    if (isAuth !== "true" || isAdmin !== "true") {
      router.push("/admin")
    }
  }, [router])

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = () => {
    setEditingProduct(undefined)
    setShowForm(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    const success = await deleteProduct(productId)
    if (success) {
      await fetchProducts()
    } else {
      alert("Failed to delete product")
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProduct(undefined)
    fetchProducts()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <p className="text-[#7A7062]">Loading products...</p>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-[#FAF6F1]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ProductForm 
            product={editingProduct} 
            onSuccess={handleFormSuccess} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Mobile Back Button */}
            <button
              onClick={() => router.push('/')}
              className="md:hidden p-2 hover:bg-[#F5EDE3] rounded-lg transition-colors"
              aria-label="Go to homepage"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2C2418]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#2C2418]">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddProduct}
              className="px-3 py-1.5 bg-[#C67B5C] text-white rounded-lg font-medium hover:bg-[#A65D3F] transition-colors text-sm"
            >
              + Add Product
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#2C2418] text-white px-4 py-3">
            <h2 className="text-base font-semibold">Product Management</h2>
            <p className="text-xs text-[#B8AFA2]">Manage your store products</p>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5EDE3]">
                <tr>
                  <th className="text-left px-6 py-3 text-[#2C2418] font-semibold text-sm">Image</th>
                  <th className="text-left px-6 py-3 text-[#2C2418] font-semibold text-sm">Product</th>
                  <th className="text-left px-6 py-3 text-[#2C2418] font-semibold text-sm">Price</th>
                  <th className="text-left px-6 py-3 text-[#2C2418] font-semibold text-sm">Sizes</th>
                  <th className="text-right px-6 py-3 text-[#2C2418] font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0D6C8]">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[#7A7062]">
                      No products found. Add your first product!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAF6F1]">
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F5EDE3]">
                          <img 
                            src={product.image} 
                            alt={product.type}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#2C2418]">{product.type}</p>
                        <p className="text-sm text-[#7A7062] line-clamp-1">{product.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        {product.price !== undefined && product.price > 0 ? (
                          <span className="font-medium text-[#C67B5C]">₹{product.price.toLocaleString()}</span>
                        ) : (
                          <span className="text-sm text-[#7A7062]">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((size) => (
                            <span key={size} className="px-2 py-1 bg-[#F5EDE3] text-[#7A7062] text-xs rounded">
                              {size}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="px-3 py-1.5 text-[#C67B5C] hover:bg-[#FAF6F1] rounded font-medium text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded font-medium text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-[#7A7062] text-sm">Total Products</p>
            <p className="text-3xl font-bold text-[#2C2418]">{products.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-[#7A7062] text-sm">Total Sizes Available</p>
            <p className="text-3xl font-bold text-[#2C2418]">
              {[...new Set(products.flatMap(p => p.sizes))].length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-[#7A7062] text-sm">Categories</p>
            <p className="text-3xl font-bold text-[#2C2418]">
              {[...new Set(products.map(p => p.type))].length}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
