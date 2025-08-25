"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PropertyCard } from "@/components/PropertyCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

type Filters = {
  searchType: "buy" | "rent"
  priceRange: [number, number]
  bedrooms: number
  propertyTypes: string[]
  furnished: boolean | null
  developer: string
}

type ListingsGridProps = {
  filters: Filters
  sortBy: string
  compact?: boolean // Added compact prop for split-screen map view
}

const ListingsGrid = ({ filters, sortBy, compact = false }: ListingsGridProps) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const mockProperties = [
    {
      id: "1",
      title: "2 bed apartment in Dubai Marina",
      price: "AED 110,000 yearly",
      location: "Dubai Marina, Dubai",
      beds: 2,
      baths: 2,
      area: "1,150 sqft",
      tags: ["Furnished", "Sea view"],
      image: "/dubai-marina-apartment.png",
      listedAt: "3 days ago",
      agent: {
        name: "Sarah Ahmed",
        phone: "+971501234567",
        email: "sarah@aqaryo.com",
        company: "Aqaryo Properties",
      },
    },
    {
      id: "2",
      title: "3 bed villa in Arabian Ranches",
      price: "AED 180,000 yearly",
      location: "Arabian Ranches, Dubai",
      beds: 3,
      baths: 3,
      area: "2,200 sqft",
      tags: ["Furnished", "Garden", "Pool"],
      image: "/luxury-villa-arabian-ranches-garden-pool.png",
      listedAt: "1 week ago",
      agent: {
        name: "Ahmed Al Mansouri",
        phone: "+971507654321",
        email: "ahmed@aqaryo.com",
        company: "Aqaryo Properties",
      },
    },
    {
      id: "3",
      title: "1 bed apartment in Downtown",
      price: "AED 85,000 yearly",
      location: "Downtown Dubai, Dubai",
      beds: 1,
      baths: 1,
      area: "750 sqft",
      tags: ["New", "Burj Khalifa view"],
      image: "/dubai-apartment-view.png",
      listedAt: "2 days ago",
      agent: {
        name: "Maria Rodriguez",
        phone: "+971509876543",
        email: "maria@aqaryo.com",
        company: "Aqaryo Properties",
      },
    },
    {
      id: "4",
      title: "4 bed penthouse in JBR",
      price: "AED 350,000 yearly",
      location: "JBR, Dubai",
      beds: 4,
      baths: 4,
      area: "3,500 sqft",
      tags: ["Penthouse", "Beach access", "Furnished"],
      image: "/luxury-penthouse-jbr.png",
      listedAt: "5 days ago",
      agent: {
        name: "David Thompson",
        phone: "+971502468135",
        email: "david@aqaryo.com",
        company: "Aqaryo Properties",
      },
    },
    {
      id: "5",
      title: "Studio apartment in Business Bay",
      price: "AED 45,000 yearly",
      location: "Business Bay, Dubai",
      beds: 0,
      baths: 1,
      area: "450 sqft",
      tags: ["Studio", "Furnished"],
      image: "/modern-studio-business-bay.png",
      listedAt: "1 day ago",
      agent: {
        name: "Fatima Al Zahra",
        phone: "+971503691472",
        email: "fatima@aqaryo.com",
        company: "Aqaryo Properties",
      },
    },
    {
      id: "6",
      title: "5 bed villa in Emirates Hills",
      price: "AED 500,000 yearly",
      location: "Emirates Hills, Dubai",
      beds: 5,
      baths: 6,
      area: "6,000 sqft",
      tags: ["Villa", "Golf course view", "Pool"],
      image: "/luxury-villa-emirates-hills-golf.png",
      listedAt: "4 days ago",
      agent: {
        name: "James Wilson",
        phone: "+971508529637",
        email: "james@aqaryo.com",
        company: "Aqaryo Properties",
      },
    },
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setProperties(mockProperties)
      setLoading(false)
    }, 500)
  }, [filters, sortBy])

  const filteredProperties = properties.filter((property) => {
    // Apply filters
    if (filters.bedrooms > 0 && property.beds !== filters.bedrooms) return false
    if (filters.propertyTypes.length > 0) {
      const propertyType = property.tags.find((tag) =>
        filters.propertyTypes.some(
          (type) =>
            tag.toLowerCase().includes(type.toLowerCase()) || property.title.toLowerCase().includes(type.toLowerCase()),
        ),
      )
      if (
        !propertyType &&
        !filters.propertyTypes.some((type) => property.title.toLowerCase().includes(type.toLowerCase()))
      )
        return false
    }
    if (filters.furnished !== null) {
      const isFurnished = property.tags.includes("Furnished")
      if (filters.furnished !== isFurnished) return false
    }
    return true
  })

  const handleViewDetails = (propertyId: string) => {
    router.push(`/property/${propertyId}`)
  }

  if (loading) {
    return (
      <div className={`grid gap-6 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
        {[...Array(compact ? 3 : 6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className={`bg-muted rounded-t-lg ${compact ? "h-32" : "h-48"}`}></div>
            <CardContent className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
              <div className="flex gap-2">
                <div className="h-3 bg-muted rounded w-12"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (filteredProperties.length === 0) {
    return (
      <Card className="p-12 text-center">
        <CardContent className="space-y-4">
          <div className="text-6xl">🏠</div>
          <h3 className="text-xl font-semibold">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <Button variant="secondary" size="sm">
              Dubai Marina
            </Button>
            <Button variant="secondary" size="sm">
              Downtown Dubai
            </Button>
            <Button variant="secondary" size="sm">
              JBR
            </Button>
            <Button variant="secondary" size="sm">
              Business Bay
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {!compact && (
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">{filteredProperties.length} properties found</p>
        </div>
      )}

      <div className={`grid gap-6 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            onViewDetails={() => handleViewDetails(property.id)}
            compact={compact} // Pass compact prop to PropertyCard
          />
        ))}
      </div>
    </div>
  )
}

export { ListingsGrid }
