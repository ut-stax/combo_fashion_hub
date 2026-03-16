export interface ProductColor {
  name: string
  image: string
}

export interface Product {
  id: string
  type: string
  description: string
  image: string
  images?: string[]
  sizes: string[]
  price: number
  colors?: string[]
}
