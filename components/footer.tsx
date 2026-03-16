"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { SHOP_LOCATION } from "@/lib/shop-location"

export default function Footer() {
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  // For landing page - show simplified footer with no internal links
  if (isLandingPage) {
    return (
      <footer className="bg-[#2C2418] text-[#B8AFA2]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          
          {/* Brand & Contact Info */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            
            {/* Brand */}
            <div>
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-5 border-2 border-[#C67B5C]">
                <Image
                  src="/icons/combo_fashion_hub.png"
                  alt="Combo Fashion Hub Logo"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-3">
                Combo Fashion Hub
              </h3>
              <p className="text-base md:text-lg text-[#8A8075] leading-relaxed">
                Discover the latest fashion collections available at our store.
                Stylish outfits, comfortable clothing and trending designs.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <h4 className="text-white font-semibold text-lg md:text-xl">
                Get In Touch
              </h4>
              
              <div className="space-y-3 text-base md:text-lg">
                <p>
                  <a href="tel:+916263679148" className="hover:text-[#C67B5C] transition">
                    +91 6263679148
                  </a>
                </p>
                <p>
                  <a href="tel:+919244066696" className="hover:text-[#C67B5C] transition">
                    +91 9244066696
                  </a>
                </p>
                <p>
                  <a href="https://wa.me/916263679148" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition">
                    WhatsApp
                  </a>
                </p>
                <p>
                  <a href="https://www.instagram.com/combo_fashion_hub_gwl" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition">
                    Instagram
                  </a>
                </p>
              </div>

              <p className="text-base md:text-lg text-[#8A8075] leading-relaxed pt-2 whitespace-pre-line">
                {SHOP_LOCATION.address}
              </p>
            </div>

          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-[#3D3428] text-center py-5 md:py-6 text-base md:text-lg text-[#6A6055]">
          © 2026 {SHOP_LOCATION.name}. All rights reserved.
        </div>

      </footer>
    )
  }

  // For internal pages - show full footer with navigation
  return (
    <footer className="bg-[#2C2418] text-[#B8AFA2] mt-10 md:mt-20">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-4 border-2 border-[#C67B5C]">
            <Image
              src="/icons/combo_fashion_hub.png"
              alt="Combo Fashion Hub Logo"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <p className="text-sm md:text-base text-[#8A8075]">
            Discover the latest fashion collections available at our store.
            Visit us to explore trendy outfits and stylish collections.
          </p>
        </div>


        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">
            Navigation
          </h3>

          <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
            <li>
              <Link href="/home" className="hover:text-[#C67B5C] transition">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#C67B5C] transition">Products</Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-[#C67B5C] transition">Admin</Link>
            </li>
          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">
            Contact Us
          </h3>

          <ul className="space-y-2 md:space-y-3 text-sm md:text-base">

            <li>
              <a href="tel:+916263679148" className="hover:text-[#C67B5C] transition flex items-center gap-2">
                <span className="font-bold text-xs md:text-sm">CALL</span> <span className="hidden sm:inline">Shiva:</span> +91 6263679148
              </a>
            </li>

            <li>
              <a href="tel:+919244066696" className="hover:text-[#C67B5C] transition flex items-center gap-2">
                <span className="font-bold text-xs md:text-sm">CALL</span> <span className="hidden sm:inline">Nikhil:</span> +91 9244066696
              </a>
            </li>

            <li>
              <a href="https://wa.me/916263679148" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition flex items-center gap-2">
                <span className="font-bold text-xs md:text-sm">WA</span> WhatsApp
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/combo_fashion_hub_gwl" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition flex items-center gap-2">
                <span className="font-bold text-xs md:text-sm">IG</span> Instagram
              </a>
            </li>

            <li className="flex items-center gap-2">
              <span className="font-bold text-xs md:text-sm">EMAIL</span> <span className="hidden sm:inline">combofashionhub@gmail468.com</span>
              <span className="sm:hidden">Email</span>
            </li>

          </ul>
        </div>


        {/* Address */}
        <div>
          <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">
            Store Location
          </h3>

          <p className="text-sm md:text-base text-[#8A8075] leading-relaxed whitespace-pre-line">
            {SHOP_LOCATION.address}
          </p>

        </div>

      </div>


      {/* Bottom copyright */}
      <div className="border-t border-[#3D3428] text-center py-5 md:py-6 text-sm md:text-base text-[#6A6055]">
        © 2026 {SHOP_LOCATION.name}. All rights reserved.
      </div>

    </footer>
  )
}
