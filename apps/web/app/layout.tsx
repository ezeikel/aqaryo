import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aqaryo - Premium Real Estate in the Gulf",
  description: "Discover luxury properties across UAE, Saudi Arabia, and the Gulf region",
  generator: 'v0.app'
}

// only renders when a locale is missing from a URL segment
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
