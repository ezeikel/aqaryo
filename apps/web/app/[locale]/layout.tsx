import type React from "react"
import type { Metadata } from "next"
import { Poppins, Outfit, Noto_Kufi_Arabic, Cairo } from "next/font/google"
import "../globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { CountryProvider } from "@/contexts/CountryContext"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Analytics } from "@vercel/analytics/next"
import { CurrencyProvider } from "@/contexts/CurrencyContext"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
})

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-noto-kufi-arabic",
  weight: ["400", "500", "600", "700"],
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  
  return {
    title: {
      default: isArabic ? "عقاريو - العقارات الفاخرة في الخليج" : "Aqaryo - Premium Real Estate in the Gulf",
      template: isArabic ? "%s | عقاريو" : "%s | Aqaryo"
    },
    description: isArabic 
      ? "اكتشف العقارات الفاخرة في الإمارات والسعودية وقطر والكويت والبحرين وعمان. عقارات مميزة في دبي مارينا ووسط دبي والرياض والدوحة مع خدمات استشارية متخصصة."
      : "Discover luxury properties across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Find premium real estate in Dubai Marina, Downtown Dubai, Riyadh, Doha, and other prime Gulf locations with expert guidance.",
    keywords: isArabic 
      ? ["عقارات", "عقار", "الإمارات", "دبي", "أبو ظبي", "السعودية", "الرياض", "جدة", "قطر", "الدوحة", "الكويت", "البحرين", "عمان", "عقارات الخليج", "منازل فاخرة", "شقق", "فلل", "عقارات استثمارية", "دبي مارينا", "وسط دبي", "الخليج التجاري", "نخلة الجميرا", "مركز دبي المالي"]
      : ["real estate", "properties", "UAE", "Dubai", "Abu Dhabi", "Saudi Arabia", "Riyadh", "Jeddah", "Qatar", "Doha", "Kuwait", "Bahrain", "Oman", "Gulf properties", "luxury homes", "apartments", "villas", "investment properties", "Dubai Marina", "Downtown Dubai", "Business Bay", "Palm Jumeirah", "DIFC", "West Bay", "The Pearl Qatar"],
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
      locale: isArabic ? "ar_SA" : "en_US",
      alternateLocale: isArabic ? "en_US" : "ar_SA",
      url: `https://aqaryo.com/${locale}`,
      siteName: "Aqaryo",
      title: isArabic ? "عقاريو - العقارات الفاخرة في الخليج" : "Aqaryo - Premium Real Estate in the Gulf",
      description: isArabic 
        ? "اكتشف العقارات الفاخرة في الإمارات والسعودية وقطر والكويت والبحرين وعمان. عقارات مميزة في دبي والرياض والدوحة."
        : "Discover luxury properties across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Premium real estate in Dubai, Riyadh, Doha.",
    },
    twitter: {
      card: "summary_large_image",
      site: "@aqaryo",
      creator: "@aqaryo",
      title: isArabic ? "عقاريو - العقارات الفاخرة في الخليج" : "Aqaryo - Premium Real Estate in the Gulf",
      description: isArabic 
        ? "اكتشف العقارات الفاخرة في الإمارات والسعودية وقطر والكويت والبحرين وعمان. عقارات مميزة في دبي والرياض والدوحة."
        : "Discover luxury properties across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman. Premium real estate in Dubai, Riyadh, Doha.",
    },
    alternates: {
      canonical: `https://aqaryo.com/${locale}`,
      languages: {
        "en-US": "https://aqaryo.com/en",
        "ar-SA": "https://aqaryo.com/ar",
        "x-default": "https://aqaryo.com/en",
      },
    },
    other: {
      "format-detection": "telephone=no",
    },
  }
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  const isRTL = locale === "ar"
  const fontClasses = isRTL ? `${notoKufiArabic.variable} ${cairo.variable}` : `${poppins.variable} ${outfit.variable}`

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className={`${fontClasses} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="msapplication-TileColor" content="#1a365d" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Aqaryo",
              "url": `https://aqaryo.com/${locale}`,
              "logo": "https://aqaryo.com/logo.png",
              "image": "https://aqaryo.com/og-image.jpg",
              "description": isArabic 
                ? "اكتشف العقارات الفاخرة في الإمارات والسعودية وقطر والكويت والبحرين وعمان"
                : "Discover luxury properties across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman",
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "United Arab Emirates"
                },
                {
                  "@type": "Country", 
                  "name": "Saudi Arabia"
                },
                {
                  "@type": "Country",
                  "name": "Qatar"
                },
                {
                  "@type": "Country",
                  "name": "Kuwait"
                },
                {
                  "@type": "Country",
                  "name": "Bahrain"
                },
                {
                  "@type": "Country",
                  "name": "Oman"
                }
              ],
              "serviceType": "Real Estate Services",
              "priceRange": "$$$"
            })
          }}
        />
      </head>
      <body className={isRTL ? "font-arabic" : "font-sans"}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CountryProvider>
            <CurrencyProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </CurrencyProvider>
          </CountryProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
