"use client"

import { useState, useEffect } from "react"
import { STORE_IMAGES } from "@/lib/store-images"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

// Fisher-Yates shuffle algorithm
function shuffleArray(array: readonly string[]): string[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function StoreGallery() {
  const [mounted, setMounted] = useState(false)
  const [shuffledImages, setShuffledImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Shuffle images on mount
    const shuffled = shuffleArray(STORE_IMAGES.interior)
    setShuffledImages(shuffled)
    setMounted(true)
  }, [])

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImageIndex(null)
  }

  const goToPrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(prev => prev === 0 ? shuffledImages.length - 1 : prev! - 1)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(prev => prev === shuffledImages.length - 1 ? 0 : prev! + 1)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <section className="py-6 md:py-10 bg-[#FAF6F1]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 md:space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2C2418]">
            Our Store
          </h2>
          <p className="text-[#7A7062] text-sm md:text-lg max-w-xl mx-auto">
            Explore our beautiful store space and find your perfect style
          </p>
        </div>

        {/* Pinterest-style Masonry using CSS columns */}
        <div 
          className="masonry-grid columns-2 md:columns-3 lg:columns-4"
          style={{
            columnGap: '12px'
          }}
        >
          {shuffledImages.map((image, index) => {
            // Create varied heights for irregular layout
            const heights = [
              'h-48 md:h-56 lg:h-64',
              'h-56 md:h-64 lg:h-72',
              'h-40 md:h-48 lg:h-56',
              'h-64 md:h-72 lg:h-80',
              'h-44 md:h-52 lg:h-60',
              'h-52 md:h-60 lg:h-68',
              'h-36 md:h-44 lg:h-52',
              'h-60 md:h-68 lg:h-76',
              'h-48 md:h-56 lg:h-64',
              'h-56 md:h-64 lg:h-72',
              'h-40 md:h-48 lg:h-56',
              'h-52 md:h-60 lg:h-68'
            ]
            const heightClass = heights[index % heights.length]
            
            return (
            <div 
              key={index}
              className={`masonry-item ${heightClass} cursor-pointer`}
              style={{
                breakInside: 'avoid',
                marginBottom: '12px',
                overflow: 'hidden',
                borderRadius: '12px'
              }}
              onClick={() => openModal(index)}
            >
              <img
                src={image}
                alt={`Store Interior ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                style={{
                  display: 'block',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => {
                  const img = e.currentTarget as HTMLImageElement
                  img.style.transform = 'scale(1.03)'
                  img.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)'
                }}
                onMouseOut={(e) => {
                  const img = e.currentTarget as HTMLImageElement
                  img.style.transform = 'scale(1)'
                  img.style.boxShadow = 'none'
                }}
              />
            </div>
            )
          })}
        </div>

      </div>

      {/* Gallery Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">Store Gallery</DialogTitle>
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl"
            >
              ×
            </button>

            {/* Previous button */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl"
            >
              ‹
            </button>

            {/* Image */}
            {selectedImageIndex !== null && (
              <img
                src={shuffledImages[selectedImageIndex]}
                alt={`Store Interior ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}

            {/* Next button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl"
            >
              ›
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {selectedImageIndex !== null ? selectedImageIndex + 1 : 0} / {shuffledImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
