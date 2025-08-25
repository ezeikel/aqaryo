"use client"

import { PropertyCard } from "@/components/PropertyCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

type SimilarPropertiesProps = {
  currentPropertyId: string
}

const SimilarProperties = ({ currentPropertyId }: SimilarPropertiesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const similarProperties = [
    {
      title: "3 bed villa in Arabian Ranches",
      price: "AED 180,000 yearly",
      location: "Arabian Ranches, Dubai",
      beds: 3,
      baths: 3,
      area: "2,200 sqft",
      tags: ["Furnished", "Garden", "Pool"],
      image: "/luxury-villa-arabian-ranches-garden-pool.png",
      listedAt: "1 week ago",
    },
    {
      title: "1 bed apartment in Downtown",
      price: "AED 85,000 yearly",
      location: "Downtown Dubai, Dubai",
      beds: 1,
      baths: 1,
      area: "750 sqft",
      tags: ["New", "Burj Khalifa view"],
      image: "/dubai-apartment-view.png",
      listedAt: "2 days ago",
    },
    {
      title: "4 bed penthouse in JBR",
      price: "AED 350,000 yearly",
      location: "JBR, Dubai",
      beds: 4,
      baths: 4,
      area: "3,500 sqft",
      tags: ["Penthouse", "Beach access", "Furnished"],
      image: "/luxury-penthouse-jbr.png",
      listedAt: "5 days ago",
    },
    {
      title: "Studio apartment in Business Bay",
      price: "AED 45,000 yearly",
      location: "Business Bay, Dubai",
      beds: 0,
      baths: 1,
      area: "450 sqft",
      tags: ["Studio", "Furnished"],
      image: "/modern-studio-business-bay.png",
      listedAt: "1 day ago",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, similarProperties.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Math.max(1, similarProperties.length - 2)) % Math.max(1, similarProperties.length - 2),
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Similar Properties</h2>
          <p className="text-muted-foreground">You might also be interested in these properties</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
        >
          {similarProperties.map((property, index) => (
            <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
              <PropertyCard {...property} onViewDetails={() => console.log("View details for", property.title)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { SimilarProperties }
