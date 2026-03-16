"use client"

import { useState } from "react"
import Image from "next/image"
import { Product } from "@/types/product"
import ProductModal from "./product-modal"
import { Badge } from "@/components/ui/badge"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Get all images for this product (main image + additional images)
  const allImages = [product.image, ...(product.images || [])].filter(Boolean)
  const hoverImage = allImages[1] // Second image for hover

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-[#C67B5C]/30 h-full"
      >
        <div className="relative w-full aspect-[3/4] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
          {/* Main Image */}
          <Image
            src={product.image}
            alt={product.type}
            fill
            className={`object-contain p-2 sm:p-3 transition-all duration-700 ${isHovered && hoverImage ? 'opacity-0' : 'opacity-100'} ${isHovered ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.type} - alternate`}
              fill
              className={`object-contain p-2 sm:p-3 transition-all duration-700 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-medium text-gray-700 shadow-sm">
            View
          </div>
        </div>

        <div className="p-2 sm:p-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#C67B5C] font-semibold">
              Fashion
            </span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 group-hover:text-[#C67B5C] transition-colors duration-300 line-clamp-1">
            {product.type}
          </p>

          <p className="text-[9px] sm:text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>

          {(product.price !== undefined && product.price > 0) && (
            <div className="flex items-center gap-1">
              <span className="text-sm sm:text-base md:text-lg font-bold text-[#C67B5C]">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
          )}

          <p className="text-[9px] sm:text-[10px] text-gray-400 italic">
            * Contact us for Discount
          </p>

          <div className="flex items-center gap-1">
            <span className="text-[9px] sm:text-[10px] text-gray-400">Sizes:</span>
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <span key={size} className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 text-gray-400">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Colors - if available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[9px] sm:text-[10px] text-gray-400">Colors:</span>
              <div className="flex flex-wrap gap-1">
                {product.colors.slice(0, 4).map((color, index) => (
                  <span key={index} className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-[#C67B5C]/10 text-[#C67B5C] rounded">
                    {color}
                  </span>
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] sm:text-xs px-1.5 py-0.5 text-gray-400">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductModal product={product} images={allImages} open={open} setOpen={setOpen} />
    </>
  )
}
