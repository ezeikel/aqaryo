"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { useCountry } from "@/contexts/CountryContext"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export const Footer = () => {
  const t = useTranslations()
  const { country } = useCountry()

  const footerSections = [
    {
      title: t("navigation.buy"),
      links: [
        { label: t("navigation.search"), href: "/search?type=buy" },
        { label: t("footer.buy.newProperties"), href: "/search?type=buy&status=new" },
        { label: t("footer.buy.commercialProperties"), href: "/search?type=commercial" },
        { label: t("footer.buy.luxuryProperties"), href: "/search?type=buy&category=luxury" },
        { label: t("footer.buy.investmentProperties"), href: "/search?type=investment" },
      ],
    },
    {
      title: t("navigation.rent"),
      links: [
        { label: t("footer.rent.searchRentals"), href: "/search?type=rent" },
        { label: t("footer.rent.commercialRentals"), href: "/search?type=commercial-rent" },
        { label: t("footer.rent.shortTermRentals"), href: "/search?type=short-term" },
        { label: t("footer.rent.studentAccommodation"), href: "/search?type=student" },
      ],
    },
    {
      title: t("footer.sections.sell"),
      links: [
        { label: t("navigation.listProperty"), href: "/list-property" },
        { label: t("navigation.findAgent"), href: "/find-agent" },
        { label: t("footer.sell.propertyValuation"), href: "/valuation" },
        { label: t("footer.sell.sellingGuide"), href: "/guides/selling" },
        { label: t("footer.sell.marketTrends"), href: "/market-trends" },
      ],
    },
    {
      title: t("footer.sections.resources"),
      links: [
        { label: t("navigation.blog"), href: "/blog" },
        { label: t("navigation.developers"), href: "/developers" },
        { label: t("footer.resources.mortgageCalculator"), href: "/tools/mortgage-calculator" },
        { label: t("footer.resources.buyingGuide"), href: "/guides/buying" },
        { label: t("footer.resources.rentingGuide"), href: "/guides/renting" },
      ],
    },
    {
      title: t("footer.sections.locations"),
      links: [
        { label: "Dubai", href: "/locations/dubai" },
        { label: "Abu Dhabi", href: "/locations/abu-dhabi" },
        { label: "Sharjah", href: "/locations/sharjah" },
        { label: "Riyadh", href: "/locations/riyadh" },
        { label: "Doha", href: "/locations/doha" },
      ],
    },
    {
      title: t("footer.sections.company"),
      links: [
        { label: t("footer.company.aboutUs"), href: "/about" },
        { label: t("footer.company.careers"), href: "/careers" },
        { label: t("footer.company.contactUs"), href: "/contact" },
        { label: t("footer.company.pressCenter"), href: "/press" },
        { label: t("footer.company.investorRelations"), href: "/investors" },
      ],
    },
  ]

  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* App Download Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.app.downloadApp")}</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">{t("footer.app.downloadOn")}</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">{t("footer.app.getItOn")}</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("footer.app.followUs")}</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                {t("footer.legal.termsConditions")}
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                {t("footer.legal.privacyPolicy")}
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                {t("footer.legal.cookiePolicy")}
              </Link>
              <Link href="/sitemap" className="hover:text-foreground transition-colors">
                {t("footer.legal.sitemap")}
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2025 Aqaryo. {t("footer.legal.allRightsReserved")}</span>
              <div className="flex items-center gap-1">
                <span className="text-lg">{country.flag}</span>
                <span>{country.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
