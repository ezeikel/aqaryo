"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Country = {
  code: string
  name: string
  nameAr: string
  flag: string
  currency: string
  currencySymbol: string
}

const countries: Country[] = [
  {
    code: "ae",
    name: "United Arab Emirates",
    nameAr: "الإمارات العربية المتحدة",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "د.إ",
  },
  {
    code: "sa",
    name: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    flag: "🇸🇦",
    currency: "SAR",
    currencySymbol: "ر.س",
  },
  {
    code: "qa",
    name: "Qatar",
    nameAr: "قطر",
    flag: "🇶🇦",
    currency: "QAR",
    currencySymbol: "ر.ق",
  },
  {
    code: "kw",
    name: "Kuwait",
    nameAr: "الكويت",
    flag: "🇰🇼",
    currency: "KWD",
    currencySymbol: "د.ك",
  },
  {
    code: "bh",
    name: "Bahrain",
    nameAr: "البحرين",
    flag: "🇧🇭",
    currency: "BHD",
    currencySymbol: "د.ب",
  },
  {
    code: "om",
    name: "Oman",
    nameAr: "عُمان",
    flag: "🇴🇲",
    currency: "OMR",
    currencySymbol: "ر.ع",
  },
]

type CountryContextType = {
  country: Country
  setCountry: (country: Country) => void
  countries: Country[]
  formatPrice: (price: number) => string
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountryState] = useState<Country>(countries[0]) // Default to UAE

  useEffect(() => {
    const savedCountry = localStorage.getItem("aqaryo-country")
    if (savedCountry) {
      const found = countries.find((c) => c.code === savedCountry)
      if (found) {
        setCountryState(found)
      }
    }
  }, [])

  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry)
    localStorage.setItem("aqaryo-country", newCountry.code)
  }

  const formatPrice = (price: number) => {
    return `${country.currencySymbol} ${price.toLocaleString()}`
  }

  return (
    <CountryContext.Provider value={{ country, setCountry, countries, formatPrice }}>
      {children}
    </CountryContext.Provider>
  )
}

export const useCountry = () => {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider")
  }
  return context
}
