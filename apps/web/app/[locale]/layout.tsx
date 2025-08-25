import type React from "react"
import type { Metadata } from "next"
import { Poppins, Outfit, Cairo, Noto_Sans_Arabic } from "next/font/google"
import "../globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { CountryProvider } from "@/contexts/CountryContext"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Analytics } from "@vercel/analytics/react"

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

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-noto-arabic",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Aqaryo - Find Your Next Move",
  description: "Discover homes, apartments, and investment properties across the Gulf",
  generator: "v0.app",
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
  const fontClasses = isRTL ? `${cairo.variable} ${notoSansArabic.variable}` : `${poppins.variable} ${outfit.variable}`

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className={`${fontClasses} antialiased`}>
      <body className={isRTL ? "font-arabic" : "font-sans"}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CountryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </CountryProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
