import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore"
import { db } from "./firebase"
import { Product } from "@/types/product"

const PRODUCTS_COLLECTION = "products"

// Get all products from Firestore
export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION))
    const products: Product[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      products.push({
        id: doc.id,
        type: data.type || "",
        description: data.description || "",
        image: data.imageUrl || "",
        images: data.images || [],
        sizes: data.sizes || [],
        price: data.price || 0,
        colors: data.colors || [],
      })
    })
    
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Add a new product
export async function addProduct(productData: Omit<Product, "id">): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      type: productData.type,
      description: productData.description,
      imageUrl: productData.image,
      images: productData.images || [],
      sizes: productData.sizes,
      price: productData.price,
      colors: productData.colors || [],
      createdAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding product:", error)
    return null
  }
}

// Delete a product
export async function deleteProduct(productId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId))
    return true
  } catch (error) {
    console.error("Error deleting product:", error)
    return false
  }
}

// Update a product
export async function updateProduct(productId: string, productData: Partial<Product>): Promise<boolean> {
  try {
    const updateData: Record<string, unknown> = {}
    
    if (productData.type !== undefined) updateData.type = productData.type
    if (productData.description !== undefined) updateData.description = productData.description
    if (productData.image !== undefined) updateData.imageUrl = productData.image
    if (productData.images !== undefined) updateData.images = productData.images
    if (productData.sizes !== undefined) updateData.sizes = productData.sizes
    if (productData.price !== undefined) updateData.price = productData.price
    if (productData.colors !== undefined) updateData.colors = productData.colors
    
    await updateDoc(doc(db, PRODUCTS_COLLECTION, productId), updateData)
    return true
  } catch (error) {
    console.error("Error updating product:", error)
    return false
  }
}
