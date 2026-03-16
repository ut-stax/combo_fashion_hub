"use client"

import Image from "next/image"
import { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Props {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-base">
        No products found. Add your first product!
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-3 text-sm font-semibold">Image</th>
            <th className="text-left p-3 text-sm font-semibold">Product Type</th>
            <th className="text-left p-3 text-sm font-semibold">Price</th>
            <th className="text-left p-3 text-sm font-semibold">Sizes</th>
            <th className="text-right p-3 text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.type}
                    fill
                    className="object-contain"
                  />
                </div>
              </td>
              <td className="p-3">
                <div>
                  <p className="font-medium text-sm">{product.type}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {product.description}
                  </p>
                </div>
              </td>
              <td className="p-3">
                <span className="font-medium text-sm text-[#C67B5C]">
                  ₹{product.price?.toLocaleString() || 'N/A'}
                </span>
              </td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <Badge key={size} variant="secondary" className="text-xs px-1.5 py-0.5">
                      {size}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="p-3 text-right">
                <div className="flex gap-1 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    className="text-xs"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(product.id)}
                    className="text-xs"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
