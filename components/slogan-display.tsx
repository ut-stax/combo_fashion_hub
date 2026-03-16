"use client"

import { useState, useEffect } from "react"
import { SLOGANS } from "@/lib/slogans"

export default function SloganDisplay() {
  const [slogan, setSlogan] = useState<string>("")

  useEffect(() => {
    // Randomly select a slogan on client-side mount
    const randomIndex = Math.floor(Math.random() * SLOGANS.length)
    setSlogan(SLOGANS[randomIndex])
  }, [])

  if (!slogan) return null

  return (
    <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#C67B5C] italic animate-fade-in">
      "{slogan}"
    </p>
  )
}
