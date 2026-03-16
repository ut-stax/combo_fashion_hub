// Shop Slogans for Combo Fashion Hub
// These are displayed randomly on the home and landing pages

export const SLOGANS = [
  "Gwalior ka style, Combo Fashion Hub ke saath.",
  "Gwalior aa gaye ho, to Combo Fashion Hub zaroor aana.",
  "Scindia ki nagri ka style destination – Combo Fashion Hub.",
  "Fashion ka naya sur, Combo Fashion Hub se.",
  "Gwalior ka fashion hub – Combo Fashion Hub.",
  "Style aur culture ka perfect Combo sirf – Combo Fashion Hub.",
  "Gwalior ka fashion fort – Combo Fashion Hub.",
  "Har season ka style, Combo Fashion Hub ke saath.",
] as const

export type Slogan = (typeof SLOGANS)[number]

// Get a random slogan
export function getRandomSlogan(): Slogan {
  const index = Math.floor(Math.random() * SLOGANS.length)
  return SLOGANS[index]
}
