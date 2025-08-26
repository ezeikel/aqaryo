"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Globe, ChevronDown, MapPin, DollarSign } from "lucide-react"
import { AuthModal } from "@/components/AuthModals"
import { useCountry } from "@/contexts/CountryContext"
import { useCurrency } from "@/contexts/CurrencyContext"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "signup" }>({
    isOpen: false,
    mode: "login",
  })

  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isRTL = locale === "ar"

  const { country, setCountry, countries } = useCountry()
  const { displayCurrency, setDisplayCurrency, currencies, isLoading } = useCurrency()

  const navItems = [
    { label: t("navigation.search"), href: "/search" },
    { label: t("navigation.buy"), href: "/buy" },
    { label: t("navigation.rent"), href: "/rent" },
    { label: t("navigation.listProperty"), href: "/list-property" },
  ]

  const exploreItems = [
    { label: t("navigation.findAgent"), href: "/find-agent" },
    { label: t("navigation.developers"), href: "/developers" },
    { label: t("navigation.blog"), href: "/blog" },
  ]

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthModal({ isOpen: true, mode })
    setIsOpen(false)
  }

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: "login" })
  }

  const switchAuthMode = (mode: "login" | "signup") => {
    setAuthModal({ isOpen: true, mode })
  }

  const handleLanguageChange = (newLocale: "en" | "ar") => {
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = countries.find((c) => c.code === countryCode)
    if (selectedCountry) {
      setCountry(selectedCountry)
    }
  }

  const handleCurrencyChange = (currencyCode: string) => {
    const selectedCurrency = currencies.find((c) => c.code === currencyCode)
    if (selectedCurrency) {
      setDisplayCurrency(selectedCurrency)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className={`text-2xl font-bold text-foreground ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}>
                Aqaryo
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Explore dropdown for Blog and Developers */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}
                  >
                    {t("navigation.explore")}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {exploreItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className={`w-full ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right side actions */}
            <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
              {/* Country switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{country.flag}</span>
                    <span className="text-xs">{country.currency}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {countries.map((c) => (
                    <DropdownMenuItem key={c.code} onClick={() => handleCountryChange(c.code)}>
                      <span className="mr-2">{c.flag}</span>
                      {locale === "ar" ? c.nameAr : c.name}
                      <span className="ml-auto text-xs text-muted-foreground">{c.currency}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>


              {/* Currency switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{displayCurrency.flag}</span>
                    <span className="text-xs">{displayCurrency.code}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {currencies.map((currency) => (
                    <DropdownMenuItem key={currency.code} onClick={() => handleCurrencyChange(currency.code)}>
                      <span className="mr-2">{currency.flag}</span>
                      {currency.name}
                      <span className="ml-auto text-xs text-muted-foreground">{currency.symbol}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{locale === "en" ? "EN" : "ع"}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                    <span className="font-english-heading">{t("navigation.english")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
                    <span className="font-arabic-heading">{t("navigation.arabic")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Auth buttons - desktop */}
              <div className={`hidden md:flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                <Button variant="ghost" size="sm" onClick={() => openAuthModal("login")} className={isRTL ? 'font-arabic-heading' : 'font-english-heading'}>
                  {t("navigation.login")}
                </Button>
                <Button
                  size="sm"
                  className={`bg-primary text-primary-foreground hover:bg-primary/90 ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}
                  onClick={() => openAuthModal("signup")}
                >
                  {t("navigation.signUp")}
                </Button>
              </div>

              {/* Mobile menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={isRTL ? "left" : "right"}
                  className={`w-80 ${isRTL ? "[&>button]:left-4 [&>button]:right-auto" : ""}`}
                >
                  <div className="flex flex-col h-full">
                    {/* Top section - Settings */}
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center space-x-2">
                        {/* Country switcher - compact */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <span className="text-sm">{country.flag}</span>
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {countries.map((c) => (
                              <DropdownMenuItem key={c.code} onClick={() => handleCountryChange(c.code)}>
                                <span className="mr-2">{c.flag}</span>
                                {locale === "ar" ? c.nameAr : c.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Currency switcher - compact */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <DollarSign className="h-3 w-3 mr-1" />
                              <span className="text-sm">{displayCurrency.code}</span>
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {currencies.map((currency) => (
                              <DropdownMenuItem key={currency.code} onClick={() => handleCurrencyChange(currency.code)}>
                                <span className="mr-2">{currency.flag}</span>
                                {currency.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Language toggle - compact */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Globe className="h-3 w-3 mr-1" />
                              <span className="text-sm">{locale === "en" ? "EN" : "ع"}</span>
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                              <span className="font-english-heading">{t("navigation.english")}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
                              <span className="font-arabic-heading">{t("navigation.arabic")}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Main navigation */}
                    <nav className="flex-1 py-4">
                      <div className="space-y-1">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-3 py-3 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Explore section */}
                      <div className="mt-6 pt-4 border-t">
                        <div className={`px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}>
                          {t("navigation.explore")}
                        </div>
                        <div className="space-y-1">
                          {exploreItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </nav>

                    {/* Auth buttons - bottom */}
                    <div className="border-t pt-4 pb-6 px-4">
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className={`w-full bg-transparent ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}
                          onClick={() => openAuthModal("login")}
                        >
                          {t("navigation.login")}
                        </Button>
                        <Button
                          className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 ${isRTL ? 'font-arabic-heading' : 'font-english-heading'}`}
                          onClick={() => openAuthModal("signup")}
                        >
                          {t("navigation.signUp")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
        onSwitchMode={switchAuthMode}
      />
    </>
  )
}

export { Header }
