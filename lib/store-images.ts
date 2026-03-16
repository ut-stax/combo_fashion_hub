// Store Images Configuration
// Updated with actual shop images

export const STORE_IMAGES = {
  // Hero Section - Owner image
  hero: "/shop/owner.jpeg",
  
  // Shop Info Section - Exterior images
  exterior: "/shop/Front_Exterior.png",
  
  // Store Location Section
  location: "/shop/Exterior1.jpeg",
  
  // Interior Gallery - 12 images
  interior: [
    "/shop/Interior1.jpeg",
    "/shop/Interior2.jpeg",
    "/shop/Interior3.jpeg",
    "/shop/Interior4.jpeg",
    "/shop/Interior5.jpeg",
    "/shop/Interior6.jpeg",
    "/shop/Interior7.jpeg",
    "/shop/Interior8.jpeg",
    "/shop/Interior9.jpeg",
    "/shop/Interior10.jpeg",
    "/shop/Interior11.jpeg",
    "/shop/Interior12.jpeg",
  ]
} as const

export type StoreImageKey = keyof typeof STORE_IMAGES
