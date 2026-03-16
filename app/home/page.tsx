import ProductGrid from "@/components/product-grid"
import { getProducts } from "@/lib/firebase-products"
import StoreLocationSection from "@/components/store-location-section"
import StoreGallery from "@/components/store-gallery"
import HeroSlideshow from "@/components/hero-slideshow"
import SloganDisplay from "@/components/slogan-display"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SHOP_LOCATION } from "@/lib/shop-location"
import { STORE_IMAGES } from "@/lib/store-images"

// Shuffle array function for random selection
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default async function HomePage() {
  const allProducts = await getProducts()
  const previewProducts = shuffleArray(allProducts).slice(0, 4)
  // Get product images for slideshow
  const productImages = allProducts.map(p => p.image)

  return (
    <div className="space-y-0 md:space-y-0">

      {/* Hero Section with Slideshow */}
      <HeroSlideshow productImages={productImages} />

      {/* Products Preview Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-10">

        {/* Section title */}
        <div className="text-center space-y-3 md:space-y-4">

          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2418]">
            Latest Products
          </h2>

          <p className="text-[#7A7062] text-sm md:text-base">
            Discover some of the newest arrivals in our store
          </p>

        </div>

        {/* Products */}
        <ProductGrid products={previewProducts} />

        {/* Button */}
        <div className="text-center">

          <Link href="/products">
            <Button className="bg-[#C67B5C] text-white hover:bg-[#A65D3F] font-medium">
              View All Products
            </Button>
          </Link>

        </div>

      </div>


      {/* Store Gallery - Interior Images */}
      <StoreGallery />


      {/* Shop Information Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

          <div className="space-y-4 md:space-y-6">

            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold text-[#2C2418]">
                Visit Our Store
              </h2>
              <div className="h-1 w-20 md:w-24 bg-[#C67B5C] rounded-full" />
            </div>

            <p className="text-base md:text-lg text-[#5A4A3A] leading-relaxed">
              Welcome to <strong>{SHOP_LOCATION.name}</strong>, your ultimate destination for trendy fashion in Gwalior! We offer a wide range of stylish clothing for men at affordable prices.
            </p>

            {/* Dynamic Slogan */}
            <SloganDisplay />

            <p className="text-[#7A7062] text-sm md:text-base">
              Visit our shop to explore new arrivals and find your perfect style!
            </p>

          </div>


          <div className="relative h-64 md:h-80 lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">

            <Image
              src={STORE_IMAGES.exterior}
              alt="Shop Exterior"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <p className="font-semibold text-[#2C2418]">Combo Fashion Hub</p>
              <p className="text-sm text-[#7A7062]">Open Today</p>
            </div>

          </div>

        </div>

      </section>


      {/* Store Location Section */}
      <StoreLocationSection />


      {/* Contact Section */}
      <section id="contact" className="py-10 md:py-20 bg-gradient-to-b from-white to-[#FAF6F1]">

        <div className="max-w-5xl mx-auto text-center px-4 md:px-6 space-y-8 md:space-y-12">

          <div className="space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-[#2C2418]">
              Get In Touch
            </h2>
            <p className="text-[#7A7062] text-base md:text-lg max-w-xl mx-auto">
              Have questions about our products? We'd love to hear from you!
            </p>
          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">

            {/* Shiva Sharma - Call */}
            <a 
              href="tel:+916263679148"
              className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E0D6C8] hover:border-[#C67B5C] flex flex-col items-center gap-2 md:gap-3"
            >
              <div className="w-10 md:w-14 h-10 md:h-14 bg-[#C67B5C] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform text-sm md:text-base">
                CALL
              </div>
              <span className="font-semibold text-[#2C2418] text-xs md:text-base">Call Us</span>
              <span className="text-[10px] md:text-sm text-[#7A7062]">Shiva Sharma</span>
              <span className="text-[#C67B5C] font-medium text-[10px] md:text-sm">+91 6263679148</span>
            </a>

            {/* Nikhil Sharma - Call */}
            <a 
              href="tel:+919244066696"
              className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E0D6C8] hover:border-[#8B9A6D] flex flex-col items-center gap-2 md:gap-3"
            >
              <div className="w-10 md:w-14 h-10 md:h-14 bg-[#8B9A6D] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform text-sm md:text-base">
                CALL
              </div>
              <span className="font-semibold text-[#2C2418] text-xs md:text-base">Call Us</span>
              <span className="text-[10px] md:text-sm text-[#7A7062]">Nikhil Sharma</span>
              <span className="text-[#8B9A6D] font-medium text-[10px] md:text-sm">+91 9244066696</span>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/916263679148"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E0D6C8] hover:border-[#25D366] flex flex-col items-center gap-2 md:gap-3"
            >
              <div className="w-10 md:w-14 h-10 md:h-14 bg-[#25D366] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform text-sm md:text-base">
                WA
              </div>
              <span className="font-semibold text-[#2C2418] text-xs md:text-base">WhatsApp</span>
              <span className="text-[10px] md:text-sm text-[#7A7062]">Chat with us</span>
              <span className="text-[#25D366] font-medium text-[10px] md:text-sm">Click to chat</span>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/combo_fashion_hub_gwl"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E0D6C8] hover:border-[#E1306C] flex flex-col items-center gap-2 md:gap-3"
            >
              <div className="w-10 md:w-14 h-10 md:h-14 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform text-sm md:text-base">
                IG
              </div>
              <span className="font-semibold text-[#2C2418] text-xs md:text-base">Instagram</span>
              <span className="text-[10px] md:text-sm text-[#7A7062]">Follow us</span>
              <span className="text-[#E1306C] font-medium text-[10px] md:text-sm">@combo_fashion_hub_gwl</span>
            </a>

          </div>

          {/* Email Card */}
          <div className="p-5 md:p-8 bg-[#2C2418] rounded-2xl md:rounded-3xl shadow-xl max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-white text-lg md:text-xl font-semibold mb-1 md:mb-2">
                  📧 Email Us
                </h3>
                <p className="text-[#B8AFA2] text-sm md:text-base">
                  For any inquiries, feel free to email us
                </p>
              </div>
              <a 
                href="mailto:combofashionhub@gmail468.com"
                className="px-5 md:px-8 py-3 md:py-4 bg-[#C67B5C] hover:bg-[#A65D3F] text-white font-semibold rounded-xl md:rounded-2xl transition-all hover:scale-105 shadow-lg text-xs md:text-base"
              >
                combofashionhub@gmail468.com
              </a>
            </div>
          </div>

        </div>

      </section>

    </div>
  )
}
