import { SHOP_LOCATION } from "./shop-location"

export function openShopDirections() {
  // Use the Google Maps share link for the shop
  const url = "https://maps.app.goo.gl/gT9KbJwiwnsZtnbW9"

  if (typeof window !== "undefined") {
    window.open(url, "_blank")
  }
}
