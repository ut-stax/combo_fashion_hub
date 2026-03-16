"use client"

import { useState } from "react"
import { Product } from "@/types/product"
import { addProduct, updateProduct } from "@/lib/firebase-products"

interface Props {
  product?: Product
  onSuccess: () => void
  onCancel: () => void
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

export default function ProductForm({ product, onSuccess, onCancel }: Props) {
  const [type, setType] = useState(product?.type || "")
  const [description, setDescription] = useState(product?.description || "")
  const [imageUrls, setImageUrls] = useState<string[]>(product?.image ? [product.image] : [])
  const [newImageUrl, setNewImageUrl] = useState("")
  const [selectedSizes, setSelectedSizes] = useState<string[]>(product?.sizes || [])
  const [price, setPrice] = useState<number | "">(product?.price || "")
  const [colors, setColors] = useState<string[]>(product?.colors || [])
  const [newColorName, setNewColorName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Extract image URL from imgbb embed code
  const extractImageUrl = (input: string): string => {
    // Check if input is embed code
    if (input.includes('<img') && input.includes('src=')) {
      // Try to extract src from img tag
      const srcMatch = input.match(/src=["']([^"']+)["']/)
      if (srcMatch && srcMatch[1]) {
        return srcMatch[1]
      }
    }
    // Check if it's just a URL
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input
    }
    return input
  }

  const handleImageUrlChange = (value: string) => {
    setNewImageUrl(value)
  }

  const handleImageUrlBlur = () => {
    if (newImageUrl.trim()) {
      const extractedUrl = extractImageUrl(newImageUrl.trim())
      setNewImageUrl(extractedUrl)
    }
  }

  // Add a new image
  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      setError("Please enter an image URL")
      return
    }
    const extractedUrl = extractImageUrl(newImageUrl.trim())
    
    // Validate URL format
    try {
      new URL(extractedUrl)
    } catch {
      setError("Please enter a valid image URL or embed code")
      return
    }
    
    setImageUrls(prev => [...prev, extractedUrl])
    setNewImageUrl("")
    setError("")
  }

  // Remove an image
  const handleRemoveImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  // Handle adding a new color
  const handleAddColor = () => {
    if (!newColorName.trim()) {
      setError("Please enter a color name")
      return
    }
    setColors(prev => [...prev, newColorName.trim()])
    setNewColorName("")
    setError("")
  }

  // Handle removing a color
  const handleRemoveColor = (index: number) => {
    setColors(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate required fields
      if (!type.trim()) {
        setError("Product type is required")
        setLoading(false)
        return
      }
      if (!description.trim()) {
        setError("Description is required")
        setLoading(false)
        return
      }
      if (selectedSizes.length === 0) {
        setError("At least one size is required")
        setLoading(false)
        return
      }
      if (!price || price <= 0) {
        setError("Price is required")
        setLoading(false)
        return
      }
      if (imageUrls.length === 0) {
        setError("At least one image is required")
        setLoading(false)
        return
      }

      // Validate image URL format
      try {
        new URL(imageUrls[0])
      } catch {
        setError("Please enter a valid image URL or embed code")
        setLoading(false)
        return
      }

      // Save product data
      const productData = {
        type: type.trim(),
        description: description.trim(),
        image: imageUrls[0], // Primary image
        images: imageUrls.length > 1 ? imageUrls : undefined, // Additional images
        sizes: selectedSizes,
        price: Number(price),
        colors: colors.length > 0 ? colors : undefined,
      }

      let success = false

      if (product?.id) {
        // Update existing product
        const result = await updateProduct(product.id, productData)
        success = result
      } else {
        // Add new product
        const result = await addProduct(productData)
        success = result !== null
      }

      if (success) {
        onSuccess()
      } else {
        setError("Failed to save product. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="bg-[#2C2418] text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm text-[#B8AFA2]">
          {product ? "Update product details" : "Fill in the product details below"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-[#2C2418] mb-2">
            Product Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 border border-[#E0D6C8] rounded-lg focus:ring-2 focus:ring-[#C67B5C] focus:border-transparent"
            placeholder="e.g., Men Kurta, Women Saree, Kids Dress"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#2C2418] mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-[#E0D6C8] rounded-lg focus:ring-2 focus:ring-[#C67B5C] focus:border-transparent resize-none"
            placeholder="Describe the product..."
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-[#2C2418] mb-2">
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
            className="w-full px-4 py-3 border border-[#E0D6C8] rounded-lg focus:ring-2 focus:ring-[#C67B5C] focus:border-transparent"
            placeholder="Enter price in Rupees (e.g., 500)"
            min="0"
          />
          <p className="text-xs text-[#7A7062] mt-1">
            💡 Enter only numeric value. ₹ symbol will be added automatically.
          </p>
        </div>

        {/* Available Sizes */}
        <div>
          <label className="block text-sm font-medium text-[#2C2418] mb-2">
            Available Sizes <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedSizes.includes(size)
                    ? "bg-[#C67B5C] text-white"
                    : "bg-[#F5EDE3] text-[#7A7062] hover:bg-[#E8DFD0]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {selectedSizes.length > 0 && (
            <p className="text-xs text-[#7A7062] mt-2">
              Selected: {selectedSizes.join(", ")}
            </p>
          )}
        </div>

        {/* Colors - Multiple Color Options */}
        <div>
          <label className="block text-sm font-medium text-[#2C2418] mb-2">
            Colors <span className="text-[#7A7062]">(Optional)</span>
          </label>
          <p className="text-xs text-[#7A7062] mb-3">
            Add different color options available for this product.
          </p>
          
          {/* Add new color form */}
          <div className="bg-[#FAF6F1] rounded-lg p-4 space-y-3">
            <input
              type="text"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              className="w-full px-3 py-2 border border-[#E0D6C8] rounded-lg focus:ring-2 focus:ring-[#C67B5C] focus:border-transparent text-sm"
              placeholder="Color name (e.g., Red, Blue, Green)"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="w-full py-2 bg-[#C67B5C] text-white rounded-lg hover:bg-[#A65D3F] transition-colors text-sm font-medium"
            >
              + Add Color
            </button>
          </div>

          {/* Display added colors */}
          {colors.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-[#7A7062]">Added colors:</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((colorName, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 bg-[#F5EDE3] px-3 py-2 rounded-lg"
                  >
                    <span className="text-sm font-medium text-[#2C2418]">
                      {colorName}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Images - Multiple Product Images */}
        <div>
          <label className="block text-sm font-medium text-[#2C2418] mb-2">
            Images <span className="text-red-500">*</span>
          </label>
          
          {/* Add new image form */}
          <div className="space-y-2">
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => handleImageUrlChange(e.target.value)}
              onBlur={handleImageUrlBlur}
              className="w-full px-4 py-3 border border-[#E0D6C8] rounded-lg focus:ring-2 focus:ring-[#C67B5C] focus:border-transparent"
              placeholder="Paste imgbb embed code or image URL"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="w-full py-3 bg-[#2C2418] text-white rounded-lg hover:bg-[#3D3428] transition-colors font-medium"
            >
              + Add Image
            </button>
            <p className="text-xs text-[#7A7062]">
              💡 Paste the full imgbb embed code or just the image URL. Click "Add Image" to add multiple photos.
            </p>
          </div>
          
          {/* Display added images */}
          {imageUrls.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-[#7A7062]">Added images ({imageUrls.length}):</p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {imageUrls.map((url, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-square rounded-lg overflow-hidden bg-[#F5EDE3] border border-[#E0D6C8] group"
                  >
                    <img 
                      src={url} 
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#C67B5C] text-white text-xs px-2 py-0.5 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#E0D6C8]">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-[#7A7062] hover:text-[#2C2418] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-[#C67B5C] text-white rounded-lg font-medium hover:bg-[#A65D3F] transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  )
}
