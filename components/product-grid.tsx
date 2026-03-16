"use client"
import { useState, useEffect } from "react"
import ProductCard from "./product-card"
import { Product } from "@/types/product"

interface Props {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mobile: Masonry columns (2 columns with staggered look)
  // Desktop: Regular grid - more columns on larger screens
  return (
    <>
      {/* Mobile: Masonry layout */}
      {mounted && (
        <div className="sm:hidden columns-2 gap-3 space-y-3">
          {products.map((product) => (
            <div key={product.id} className="break-inside-avoid">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      
      {/* Desktop: Regular grid - wider on larger screens */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
