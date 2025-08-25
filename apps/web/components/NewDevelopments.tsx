"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const NewDevelopments = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const developments = [
    {
      developer: "Emaar",
      projectName: "Creek Harbour",
      startingPrice: "AED 1.2M",
      location: "Dubai Creek, Dubai",
      image: "/emaar-creek-harbour.png",
    },
    {
      developer: "Damac",
      projectName: "Aykon City",
      startingPrice: "AED 950K",
      location: "Business Bay, Dubai",
      image: "/placeholder-c0m3o.png",
    },
    {
      developer: "Aldar",
      projectName: "Yas Island Residences",
      startingPrice: "AED 1.8M",
      location: "Yas Island, Abu Dhabi",
      image: "/aldar-yas-island-luxury.png",
    },
    {
      developer: "Sobha",
      projectName: "Hartland Greens",
      startingPrice: "AED 2.1M",
      location: "Mohammed Bin Rashid City, Dubai",
      image: "/sobha-hartland-greens-villas.png",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % developments.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + developments.length) % developments.length)
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">New Developments</h2>
          <p className="text-muted-foreground">Explore the latest projects from top developers</p>
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
          style={{ transform: `translateX(-${currentIndex * (100 / Math.min(developments.length, 3))}%)` }}
        >
          {developments.map((dev, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 hover:shadow-lg transition-shadow p-0 overflow-hidden"
            >
              <div className="relative">
                <img src={dev.image || "/placeholder.svg"} alt={dev.projectName} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3">
                  <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium">{dev.developer}</div>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{dev.projectName}</h3>
                  <p className="text-muted-foreground text-sm">{dev.location}</p>
                  <p className="text-xl font-bold text-primary">Starting from {dev.startingPrice}</p>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  View Development
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { NewDevelopments }
