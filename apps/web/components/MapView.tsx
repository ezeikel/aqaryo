"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Grid3X3 } from "lucide-react"

type Filters = {
  searchType: "buy" | "rent"
  priceRange: [number, number]
  bedrooms: number
  propertyTypes: string[]
  furnished: boolean | null
  developer: string
}

type Property = {
  id: number
  lat: number
  lng: number
  price: string
  title: string
  beds: number
  baths: number
  area: string
  image: string
}

type MapViewProps = {
  filters: Filters
}

const MapView = ({ filters }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [lng] = useState(55.2708)
  const [lat] = useState(25.0657)
  const [zoom] = useState(11)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  // Mock property data with Dubai locations
  const properties: Property[] = [
    {
      id: 1,
      lat: 25.0657,
      lng: 55.1713,
      price: "AED 110,000",
      title: "Dubai Marina Apartment",
      beds: 2,
      baths: 2,
      area: "1,200 sqft",
      image: "/dubai-marina-apartment.png",
    },
    {
      id: 2,
      lat: 25.0424,
      lng: 55.2708,
      price: "AED 180,000",
      title: "Arabian Ranches Villa",
      beds: 4,
      baths: 3,
      area: "2,800 sqft",
      image: "/luxury-villa-arabian-ranches-garden-pool.png",
    },
    {
      id: 3,
      lat: 25.1972,
      lng: 55.2744,
      price: "AED 85,000",
      title: "Downtown Apartment",
      beds: 1,
      baths: 1,
      area: "800 sqft",
      image: "/dubai-apartment-view.png",
    },
    {
      id: 4,
      lat: 25.0778,
      lng: 55.139,
      price: "AED 350,000",
      title: "JBR Penthouse",
      beds: 3,
      baths: 4,
      area: "2,200 sqft",
      image: "/luxury-penthouse-jbr.png",
    },
    {
      id: 5,
      lat: 25.0505,
      lng: 55.1975,
      price: "AED 95,000",
      title: "Business Bay Studio",
      beds: 1,
      baths: 1,
      area: "600 sqft",
      image: "/dubai-villa-skyline.png",
    },
  ]

  useEffect(() => {
    if (map.current) return // initialize map only once

    // Load Mapbox GL JS dynamically
    const loadMapbox = async () => {
      const mapboxgl = await import("mapbox-gl")

      // Set your Mapbox access token here
      mapboxgl.default.accessToken =
        process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example"

      if (mapContainer.current) {
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: [lng, lat],
          zoom: zoom,
          attributionControl: false,
        })

        // Add navigation controls
        map.current.addControl(new mapboxgl.default.NavigationControl(), "top-right")

        // Add property markers
        properties.forEach((property) => {
          // Create custom marker element
          const markerEl = document.createElement("div")
          markerEl.className = "property-marker"
          markerEl.innerHTML = `
            <div class="bg-white border-2 border-accent rounded-full px-3 py-1 text-sm font-semibold text-accent shadow-lg hover:scale-110 transition-transform cursor-pointer">
              ${property.price.split(" ")[1]}
            </div>
          `

          // Add click handler
          markerEl.addEventListener("click", () => {
            setSelectedProperty(property)
          })

          // Create marker
          new mapboxgl.default.Marker(markerEl).setLngLat([property.lng, property.lat]).addTo(map.current)
        })
      }
    }

    loadMapbox().catch(console.error)
  }, [lng, lat, zoom])

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <p className="text-muted-foreground">{properties.length} properties on map</p>
        <Button variant="outline" size="sm">
          <Grid3X3 className="w-4 h-4 mr-2" />
          List View
        </Button>
      </div>

      <div className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />

        {/* Property Details Popup */}
        {selectedProperty && (
          <div className="absolute top-4 left-4 z-10">
            <Card className="w-80 shadow-xl">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={selectedProperty.image || "/placeholder.svg"}
                    alt={selectedProperty.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => setSelectedProperty(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{selectedProperty.title}</h3>
                  <p className="text-2xl font-bold text-accent mb-3">{selectedProperty.price}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span>{selectedProperty.beds} beds</span>
                    <span>{selectedProperty.baths} baths</span>
                    <span>{selectedProperty.area}</span>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx global>{`
        .property-marker {
          cursor: pointer;
        }
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
        }
        .mapboxgl-popup-close-button {
          display: none;
        }
      `}</style>
    </div>
  )
}

export { MapView }
