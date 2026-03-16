"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Product } from "@/types/product"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { SHOP_LOCATION } from "@/lib/shop-location"

interface Props {
  product: Product
  images?: string[]
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ProductModal({ product, images, open, setOpen }: Props) {
  // Use product images or fallback to main image
  const allImages = images && images.length > 0 
    ? images 
    : product.images && product.images.length > 0 
      ? product.images 
      : [product.image]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const goToPreviousImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))
      setIsTransitioning(false)
    }, 150)
  }

  const goToNextImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))
      setIsTransitioning(false)
    }, 150)
  }

  // Reset image index when modal opens
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [product.id])

  return (
    <>
      {/* Fullscreen Image View */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl z-10"
            onClick={() => setIsFullscreen(false)}
          >
            ×
          </button>
          
          {/* Fullscreen Image */}
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] p-4">
            <img
              src={allImages[currentImageIndex]}
              alt={`${product.type} - Fullscreen`}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Navigation in Fullscreen */}
          {allImages.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl"
              >
                ‹
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>

      {/* Mobile: Full screen modal, Desktop: Normal modal */}
      <DialogContent className="max-w-3xl w-[95%] sm:w-full sm:max-w-3xl p-0 overflow-hidden rounded-lg sm:rounded-xl max-h-[95vh] sm:max-h-[85vh]">

        <DialogTitle className="sr-only">{product.type}</DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-[95vh] md:max-h-[90vh]">
          
          {/* IMAGE SECTION - Full width on mobile, half on desktop */}
          <div className="relative w-full min-h-[300px] md:h-auto md:min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            {/* Clickable Image for Fullscreen */}
            <div 
              className="relative w-full h-[50vh] md:h-full max-h-[400px] md:max-h-[550px] aspect-[3/4] md:aspect-auto cursor-zoom-in"
              onClick={() => setIsFullscreen(true)}
            >
              <Image
                src={allImages[currentImageIndex]}
                alt={`${product.type} - Image ${currentImageIndex + 1}`}
                fill
                className={`object-contain transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                key={currentImageIndex}
              />
              {/* Click hint */}
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-70">
                Click to enlarge
              </div>
            </div>
            
                        {/* Navigation - show only if multiple images */}
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={goToPreviousImage} 
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-gray-800 font-bold text-xl z-10"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  onClick={goToNextImage} 
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-gray-800 font-bold text-xl z-10"
                  aria-label="Next image"
                >
                  ›
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C67B5C]">
                Fashion
              </span>
            </div>
          </div>


          {/* CONTENT SECTION - Scrollable on mobile */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 bg-white overflow-y-auto h-full max-h-[47vh] sm:max-h-[90vh]">
            
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 pr-8">
                {product.type}
              </h2>
              <div className="h-1 w-14 sm:w-16 bg-[#C67B5C] rounded-full" />
            </div>


            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>


            {/* Price */}
            {product.price !== undefined && product.price > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Starting From
                </h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C67B5C]">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            )}

            {/* Always show contact message */}
            <p className="text-xs text-gray-400 italic">
              * Contact us for Discount
            </p>


            {/* Sizes */}
            <div className="space-y-2">
              <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Badge key={size} variant="secondary" className="px-3 py-1 text-xs sm:text-sm">
                    {size}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 text-xs sm:text-sm border-[#C67B5C] text-[#C67B5C]">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}


            {/* Shop Info */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Visit Store for More
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{SHOP_LOCATION.name}</p>
                <p>{SHOP_LOCATION.address}</p>
              </div>
            </div>


            {/* Contact */}
            <div className="flex gap-3 pt-2">
              <a
                href={`tel:${SHOP_LOCATION.phone}`}
                className="flex-1 px-4 py-2.5 bg-[#C67B5C] text-white text-center rounded-lg font-medium hover:bg-[#A65D3F] transition-colors"
              >
                📞 Call Now
              </a>
              <a
                href={`https://wa.me/${SHOP_LOCATION.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in this product:\n\n*${product.type}*\n\n${product.description}\n\nAvailable Sizes: ${product.sizes.join(', ')}\n\nImage: ${product.image}\n\nPlease share more details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 bg-green-500 text-white text-center rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
