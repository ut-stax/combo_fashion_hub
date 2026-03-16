import ProductFilter from "@/components/product-filter"
import { getProducts } from "@/lib/firebase-products"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-6 md:space-y-8">

      <h1 className="text-2xl md:text-3xl font-bold text-[#2C2418]">
        All Products
      </h1>

      <ProductFilter products={products} />

    </div>
  )
}
