"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TranslatedText } from "@/components/ui/TranslatedText"
import { Search } from "lucide-react"

const Hero = () => {
  const [searchType, setSearchType] = useState("buy")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set("type", searchType)
    if (location.trim()) {
      params.set("location", location.trim())
      params.set("q", location.trim())
    }
    router.push(`/search?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animated-gradient {
          background: linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.7),
            rgba(30, 41, 59, 0.6),
            rgba(15, 23, 42, 0.7),
            rgba(0, 0, 0, 0.6)
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease-in-out infinite;
        }
      `}</style>

      <section className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/dubai-luxury-development-hero.png')",
          }}
        />
        <div className="absolute inset-0 animated-gradient" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <TranslatedText 
                t="homepage.heroTitle" 
                as="h1" 
                className="text-4xl md:text-6xl font-serif font-bold text-white"
                fallback="Find your next move"
              />
              <TranslatedText 
                t="homepage.heroSubtitle"
                as="p" 
                className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-sans"
                fallback="Discover homes, apartments, and investment properties across the Gulf"
              />
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
              <div className="space-y-4">
                <h2 className="text-lg font-serif font-semibold text-foreground">
                  Search properties for sale and to rent
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter a location (e.g., Dubai Marina, Business Bay)"
                      className="w-full h-12 text-base"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSearchType("buy")}
                      variant={searchType === "buy" ? "default" : "outline"}
                      className="flex-1 sm:flex-none px-6 h-12"
                    >
                      For sale
                    </Button>
                    <Button
                      onClick={() => setSearchType("rent")}
                      variant={searchType === "rent" ? "default" : "outline"}
                      className="flex-1 sm:flex-none px-6 h-12"
                    >
                      To rent
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export { Hero }
