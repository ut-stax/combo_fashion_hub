import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { STORE_IMAGES } from "@/lib/store-images"
import { getProducts } from "@/lib/firebase-products"
import SloganDisplay from "@/components/slogan-display"

// Shuffle array function for random selection
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default async function LandingPage() {
  const allProducts = await getProducts()
  const randomProducts = shuffleArray(allProducts).slice(0, 4)

  return (
    <section className="w-full relative min-h-[90vh] lg:min-h-screen flex items-center">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={STORE_IMAGES.hero}
          alt="Fashion Store"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF6F1]/95 via-[#F5EDE3]/90 to-[#E8DFD0]/85" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 px-4 md:px-6 py-8 md:py-14 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div className="space-y-4 md:space-y-6">

          {/* Logo - Smaller size */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-3 border-[#C67B5C] shadow-xl">
            <Image
              src="/icons/combo_fashion_hub.png"
              alt="Combo Fashion Hub Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Shop Name */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C2418]">
            Combo Fashion Hub
          </h1>

          {/* Tagline */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-[#2C2418]">
            Discover Your
            <span className="block text-[#C67B5C]">
              Perfect Style
            </span>
          </h2>

          {/* Dynamic Slogan */}
          <SloganDisplay />

          <p className="text-[#7A7062] max-w-lg text-xs md:text-sm">
            Explore the latest fashion collections available in our store.
            Stylish outfits, comfortable clothing and trending designs.
          </p>

          {/* Login and Sign Up Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">

            <Link href="/login">
              <Button className="bg-[#C67B5C] text-white hover:bg-[#A65D3F] font-medium w-full sm:w-auto text-base h-12 px-6">
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button variant="outline" className="border-2 border-[#C67B5C] text-[#C67B5C] hover:bg-[#C67B5C] hover:text-white w-full sm:w-auto text-base h-12 px-6 font-medium">
                Sign Up
              </Button>
            </Link>

          </div>

        </div>



        {/* RIGHT VISUAL GRID - Product images - Balanced Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-4 h-[600px]">

          {/* Row 1 */}
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src={randomProducts[0]?.image || "/placeholder.svg"}
              alt={randomProducts[0]?.type || "Product"}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow mt-16">
            <Image
              src={randomProducts[1]?.image || "/placeholder.svg"}
              alt={randomProducts[1]?.type || "Product"}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Row 2 */}
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow -mt-8">
            <Image
              src={randomProducts[2]?.image || "/placeholder.svg"}
              alt={randomProducts[2]?.type || "Product"}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow mt-12">
            <Image
              src={randomProducts[3]?.image || "/placeholder.svg"}
              alt={randomProducts[3]?.type || "Product"}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>

        {/* Mobile/Tablet Grid - Staggered Layout */}
        <div className="lg:hidden relative grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">

          {/* Product 1 - Large, spans 2 columns on md+ */}
          <div className="relative h-44 md:h-64 lg:h-72 rounded-xl md:rounded-2xl overflow-hidden shadow-lg col-span-1 md:col-span-1">
            <Image
              src={randomProducts[0]?.image || "/placeholder.svg"}
              alt={randomProducts[0]?.type || "Product"}
              fill
              className="object-cover"
            />
          </div>

          {/* Product 2 - Medium tall */}
          <div className="relative h-32 md:h-48 lg:h-56 rounded-xl md:rounded-2xl overflow-hidden shadow-lg mt-4 md:mt-8">
            <Image
              src={randomProducts[1]?.image || "/placeholder.svg"}
              alt={randomProducts[1]?.type || "Product"}
              fill
              className="object-cover"
            />
          </div>

          {/* Product 3 - Small */}
          <div className="relative h-28 md:h-40 lg:h-48 rounded-xl md:rounded-2xl overflow-hidden shadow-lg mt-2 md:mt-4">
            <Image
              src={randomProducts[2]?.image || "/placeholder.svg"}
              alt={randomProducts[2]?.type || "Product"}
              fill
              className="object-cover"
            />
          </div>

          {/* Product 4 - Tall */}
          <div className="relative h-40 md:h-56 lg:h-64 rounded-xl md:rounded-2xl overflow-hidden shadow-lg mt-2 md:mt-6">
            <Image
              src={randomProducts[3]?.image || "/placeholder.svg"}
              alt={randomProducts[3]?.type || "Product"}
              fill
              className="object-cover"
            />
          </div>

        </div>

      </div>

    </section>
  )
}
