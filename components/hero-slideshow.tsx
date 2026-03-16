"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SHOP_LOCATION } from "@/lib/shop-location"
import { STORE_IMAGES } from "@/lib/store-images"

interface HeroSlideshowProps {
  productImages: string[]
}

export default function HeroSlideshow({ productImages }: HeroSlideshowProps) {
  // First slide is always owner image
  const ownerImage = STORE_IMAGES.hero
  
  // Gather all images for slideshow (after owner): products + interiors + exteriors
  const slideshowImages = [
    ...productImages,
    ...STORE_IMAGES.interior,
    STORE_IMAGES.exterior,
    STORE_IMAGES.location
  ]
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSlideshowActive, setIsSlideshowActive] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Start slideshow after 20-25 seconds
  useEffect(() => {
    const delay = 20000 + Math.random() * 5000 // 20-25 seconds
    const timer = setTimeout(() => {
      setIsSlideshowActive(true)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Slideshow effect
  useEffect(() => {
    if (!isSlideshowActive || slideshowImages.length === 0) return
    
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % slideshowImages.length)
        setIsTransitioning(false)
      }, 800) // Transition duration
    }, 5000) // 5 seconds per slide
    
    return () => clearInterval(interval)
  }, [isSlideshowActive, slideshowImages.length])
  
  const currentImage = isSlideshowActive ? slideshowImages[currentSlide] : ownerImage
  const isOwnerImage = !isSlideshowActive
  
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      
      {/* Background Image with Transitions */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <Image
            src={currentImage}
            alt="Combo Fashion Hub"
            fill
            className="object-cover"
            priority
            key={currentImage}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2418]/80 via-[#2C2418]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 px-4 md:px-8 py-12 md:py-16 items-center relative z-10 w-full">
        
        {/* Left - Text Content */}
        <div className="space-y-4 md:space-y-6 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in">
            Welcome to
            <span className="block text-[#C67B5C]">Combo Fashion Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-lg animate-fade-in-delay">
            Your one-stop destination for trendy fashion in Gwalior. 
            We offer the latest collection of clothing for men.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-delay-2">
            <Link href="/products">
              <Button className="bg-[#C67B5C] text-white hover:bg-[#A65D3F] font-medium h-12 px-8 shadow-lg hover:shadow-xl transition-all">
                Shop Now
              </Button>
            </Link>
            <a
              href={SHOP_LOCATION.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white hover:bg-white hover:text-[#2C2418] rounded-lg font-medium transition-all text-center"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Right - Empty on mobile, hidden on desktop */}
        <div className="hidden lg:block">
        </div>
      </div>

      {/* Slide Indicator */}
      {isSlideshowActive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slideshowImages.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === idx ? 'bg-[#C67B5C] w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
