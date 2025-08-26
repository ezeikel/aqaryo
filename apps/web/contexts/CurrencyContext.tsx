"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useCountry } from "./CountryContext"
import fx from "money"

type Currency = {
  code: string
  name: string
  symbol: string
  flag: string
}

const currencies: Currency[] = [
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س", flag: "🇸🇦" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", flag: "🇶🇦" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼" },
  { code: "BHD", name: "Bahraini Dinar", symbol: "د.ب", flag: "🇧🇭" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع", flag: "🇴🇲" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰" },
  { code: "EGP", name: "Egyptian Pound", symbol: "ج.م", flag: "🇪🇬" },
]

type ExchangeRates = Record<string, number>

type CurrencyContextType = {
  displayCurrency: Currency
  setDisplayCurrency: (currency: Currency) => void
  currencies: Currency[]
  exchangeRates: ExchangeRates
  convertPrice: (price: number, fromCurrency?: string) => { amount: number; formatted: string; original: string }
  isLoading: boolean
  lastUpdated: Date | null
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { country } = useCountry()
  const [displayCurrency, setDisplayCurrencyState] = useState<Currency>(
    currencies.find((c) => c.code === country.currency) || currencies[0],
  )
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({})
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const savedCurrency = localStorage.getItem("aqaryo-display-currency")
    if (savedCurrency) {
      const found = currencies.find((c) => c.code === savedCurrency)
      if (found) {
        setDisplayCurrencyState(found)
      }
    }
  }, [])

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        const data = await response.json()

        if (data.rates) {
          const ratesWithUSD = { USD: 1, ...data.rates }
          setExchangeRates(ratesWithUSD)
          setLastUpdated(new Date())

          fx.rates = ratesWithUSD
          fx.base = "USD"

          localStorage.setItem(
            "aqaryo-exchange-rates",
            JSON.stringify({
              rates: ratesWithUSD,
              timestamp: Date.now(),
            }),
          )
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error)

        const cached = localStorage.getItem("aqaryo-exchange-rates")
        if (cached) {
          const { rates, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setExchangeRates(rates)
            setLastUpdated(new Date(timestamp))

            fx.rates = rates
            fx.base = "USD"

            console.log("[v0] Using cached exchange rates")
            setIsLoading(false)
            return
          }
        }

        const fallbackRates = {
          USD: 1,
          AED: 3.67,
          SAR: 3.75,
          QAR: 3.64,
          KWD: 0.31,
          BHD: 0.38,
          OMR: 0.38,
          EUR: 0.92,
          GBP: 0.79,
          INR: 83.12,
          PKR: 278.5,
          EGP: 48.95,
        }

        setExchangeRates(fallbackRates)
        setLastUpdated(new Date())

        fx.rates = fallbackRates
        fx.base = "USD"
      } finally {
        setIsLoading(false)
      }
    }

    fetchExchangeRates()
    const interval = setInterval(fetchExchangeRates, 3600000)
    return () => clearInterval(interval)
  }, [])

  const setDisplayCurrency = (newCurrency: Currency) => {
    setDisplayCurrencyState(newCurrency)
    localStorage.setItem("aqaryo-display-currency", newCurrency.code)
  }

  const convertPrice = (price: number, fromCurrency?: string) => {
    const baseCurrency = fromCurrency || country.currency

    try {
      let convertedAmount: number

      if (baseCurrency === displayCurrency.code) {
        convertedAmount = price
      } else {
        convertedAmount = fx.convert(price, { from: baseCurrency, to: displayCurrency.code })
      }

      const originalCurrency = currencies.find((c) => c.code === baseCurrency)
      const originalFormatted = `${originalCurrency?.symbol || baseCurrency} ${Math.round(price).toLocaleString()}`

      let formattedAmount: string
      if (["KWD", "BHD", "OMR"].includes(displayCurrency.code)) {
        formattedAmount = `${displayCurrency.symbol} ${convertedAmount.toFixed(3).replace(/\.?0+$/, "")}`
      } else {
        formattedAmount = `${displayCurrency.symbol} ${Math.round(convertedAmount).toLocaleString()}`
      }

      return {
        amount: convertedAmount,
        formatted: formattedAmount,
        original: originalFormatted,
      }
    } catch (error) {
      console.error("Currency conversion error:", error)
      const originalCurrency = currencies.find((c) => c.code === baseCurrency)
      const fallbackFormatted = `${originalCurrency?.symbol || baseCurrency} ${Math.round(price).toLocaleString()}`

      return {
        amount: price,
        formatted: fallbackFormatted,
        original: fallbackFormatted,
      }
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        displayCurrency,
        setDisplayCurrency,
        currencies,
        exchangeRates,
        convertPrice,
        isLoading,
        lastUpdated,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

export const formatPrice = (price: number, fromCurrency?: string) => {
  return { price, currency: fromCurrency }
}
