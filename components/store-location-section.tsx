"use client"

import { SHOP_LOCATION } from "@/lib/shop-location"
import { STORE_IMAGES } from "@/lib/store-images"
import { openShopDirections } from "@/lib/open-shop-directions"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function StoreLocationSection() {
  return (
    <section className="bg-[#E8DFD0] py-8 md:py-16">

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2C2418]">
            Find Our Store
          </h2>
          <p className="text-[#5A4A3A] text-base md:text-lg">
            Visit us at our store - we'd love to see you!
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

          {/* Left - Image + Address */}
          <div className="space-y-4 md:space-y-6">

            {/* Store Image - Responsive height */}
            <div className="relative aspect-[4/3] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={STORE_IMAGES.location}
                alt="Store Location"
                fill
                className="object-cover object-[center_25%]"
              />
            </div>

            {/* Address - Responsive */}
            <div className="p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-[#2C2418]">
                Store Address
              </h3>
              <p className="text-[#1a1510] text-base md:text-xl font-semibold leading-relaxed whitespace-pre-line">
                {SHOP_LOCATION.address}
              </p>
              <Button 
                onClick={openShopDirections}
                className="bg-[#C67B5C] text-white hover:bg-[#A65D3F] font-medium w-full"
              >
                Get Directions
              </Button>
            </div>

          </div>

          {/* Right - Google Map - Responsive */}
          <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl h-64 md:h-auto md:min-h-[350px] lg:min-h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4272.518448098119!2d78.193573111539!3d26.252170588068115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c76197548b49%3A0x6fe1a76c87c3825a!2sCombo%20fashion%20hub%20store!5e1!3m2!1sen!2sin!4v1773081078937!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              loading="lazy"
              allowFullScreen
            />
          </div>

        </div>

      </div>

    </section>
  )
}
