"use client"

import { useState, useMemo } from "react"
import { Product } from "@/types/product"
import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"

interface Props {
  products: Product[]
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

export default function ProductFilter({ products }: Props) {
  // Get unique product types from products
  const productTypes = useMemo(() => {
    const types = new Set(products.map(p => p.type))
    return Array.from(types).sort()
  }, [products])

  // Get price range
  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price).filter(p => p > 0)
    if (prices.length === 0) return { min: 0, max: 10000 }
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }, [products])

  // Filter states
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<number>(priceRange.min)
  const [maxPrice, setMaxPrice] = useState<number>(priceRange.max)
  const [showFilters, setShowFilters] = useState(false)

  // Toggle size
  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  // Toggle type
  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedTypes([])
    setMinPrice(priceRange.min)
    setMaxPrice(priceRange.max)
  }

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Size filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some(s => selectedSizes.includes(s))
        if (!hasMatchingSize) return false
      }

      // Type filter
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(product.type)) return false
      }

      // Price filter
      if (product.price > 0) {
        if (product.price < minPrice || product.price > maxPrice) return false
      }

      return true
    })
  }, [products, selectedSizes, selectedTypes, minPrice, maxPrice])

  const hasActiveFilters = selectedSizes.length > 0 || selectedTypes.length > 0 || minPrice > priceRange.min || maxPrice < priceRange.max

  return (
    <div className="space-y-6">
      {/* Filter Toggle Button - Mobile */}
      <div className="lg:hidden">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-[#C67B5C] text-white hover:bg-[#A65D3F]"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg border border-[#E8E4DE] p-4 space-y-5">
            {/* Header with Clear Button */}
            <div className="flex justify-between items-center pb-3 border-b border-[#E8E4DE]">
              <h3 className="font-semibold text-[#2C2418] text-sm uppercase tracking-wide">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#C67B5C] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-[#7A7062] uppercase tracking-wider">Size</h4>
              <div className="flex flex-wrap gap-1">
                {ALL_SIZES.map(size => {
                  const count = products.filter(p => p.sizes.includes(size)).length
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        selectedSizes.includes(size)
                          ? 'bg-[#2C2418] text-white'
                          : 'bg-[#F5F2EE] text-[#5C5346] hover:bg-[#E8E4DE]'
                      }`}
                    >
                      {size} ({count})
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Product Type Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-[#7A7062] uppercase tracking-wider">Category</h4>
              <div className="flex flex-wrap gap-1">
                {productTypes.map(type => {
                  const count = products.filter(p => p.type === type).length
                  return (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        selectedTypes.includes(type)
                          ? 'bg-[#2C2418] text-white'
                          : 'bg-[#F5F2EE] text-[#5C5346] hover:bg-[#E8E4DE]'
                      }`}
                    >
                      {type} ({count})
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-medium text-[#7A7062] uppercase tracking-wider">Price</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm border border-[#E8E4DE] rounded focus:border-[#C67B5C] focus:outline-none"
                  placeholder="Min"
                />
                <span className="text-[#A69E93]">-</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || priceRange.max)}
                  className="w-full px-2 py-1.5 text-sm border border-[#E8E4DE] rounded focus:border-[#C67B5C] focus:outline-none"
                  placeholder="Max"
                />
              </div>
              <p className="text-xs text-[#A69E93]">
                ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Results count */}
          <div className="mb-4 text-sm text-[#7A7062]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {hasActiveFilters && <span className="ml-1">(filtered)</span>}
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
