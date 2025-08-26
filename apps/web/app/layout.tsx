import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Aqaryo - Premium Real Estate in the Gulf",
    template: "%s | Aqaryo"
  },
  description: "Discover luxury properties across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Find premium real estate in Dubai Marina, Downtown Dubai, Riyadh, Doha, and other prime Gulf locations with expert guidance.",
  keywords: ["real estate", "properties", "UAE", "Dubai", "Abu Dhabi", "Saudi Arabia", "Riyadh", "Jeddah", "Qatar", "Doha", "Kuwait", "Bahrain", "Oman", "Gulf properties", "luxury homes", "apartments", "villas", "investment properties", "Dubai Marina", "Downtown Dubai", "Business Bay", "Palm Jumeirah", "DIFC", "West Bay", "The Pearl Qatar"],
  authors: [{ name: "Aqaryo" }],
  creator: "Aqaryo",
  publisher: "Aqaryo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aqaryo.com",
    siteName: "Aqaryo",
    title: "Aqaryo - Premium Real Estate in the Gulf",
    description: "Discover luxury properties across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Find premium real estate in Dubai Marina, Downtown Dubai, Riyadh, Doha, and other prime Gulf locations.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aqaryo",
    creator: "@aqaryo",
    title: "Aqaryo - Premium Real Estate in the Gulf",
    description: "Discover luxury properties across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Premium real estate in Dubai, Riyadh, Doha.",
  },
  alternates: {
    canonical: "https://aqaryo.com",
    languages: {
      "en-US": "https://aqaryo.com/en",
      "ar-SA": "https://aqaryo.com/ar",
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["your-social-profile-urls"],
    },
  },
}

// only renders when a locale is missing from a URL segment
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
