"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ListingsGrid } from "@/components/ListingsGrid"
import { MapView } from "@/components/MapView"
import { SaveSearchModal } from "@/components/SaveSearchModal"
import { EmailAlertModal } from "@/components/EmailAlertModal"
import FiltersModal from "@/components/FiltersModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Map, Grid3X3, SlidersHorizontal, Search, Bell, Bookmark, MapPin, Home } from "lucide-react"

type Filters = {
  searchType: "buy" | "rent"
  location: string
  priceRange: [number, number]
  bedrooms: number
  propertyTypes: string[]
  furnished: boolean | null
  developer: string
  amenities: string[]
}

const SearchResultsPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [showFiltersModal, setShowFiltersModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [filters, setFilters] = useState<Filters>({
    searchType: (searchParams.get("type") as "buy" | "rent") || "buy",
    location: searchParams.get("location") || "",
    priceRange: [50000, 5000000],
    bedrooms: Number(searchParams.get("beds")) || 0,
    propertyTypes: searchParams.get("propertyTypes")?.split(",") || [],
    furnished:
      searchParams.get("furnished") === "true" ? true : searchParams.get("furnished") === "false" ? false : null,
    developer: searchParams.get("developer") || "",
    amenities: searchParams.get("amenities")?.split(",") || [],
  })

  const handleSearch = () => {
    // Implement search logic here
  }

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
  }, [searchParams])

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleFiltersModalApply = (modalFilters: any) => {
    const updatedFilters = {
      ...filters,
      amenities: modalFilters.amenities || [],
      propertyTypes: modalFilters.propertyType !== "any" ? [modalFilters.propertyType] : [],
      priceRange: modalFilters.priceRange || [50000, 5000000],
      bedrooms: modalFilters.bedrooms !== "any" ? Number(modalFilters.bedrooms) : 0,
    }
    setFilters(updatedFilters)
  }

  const clearAllFilters = () => {
    setFilters({
      searchType: "buy",
      location: "",
      priceRange: [50000, 5000000],
      bedrooms: 0,
      propertyTypes: [],
      furnished: null,
      developer: "",
      amenities: [],
    })
    setSearchQuery("")
    router.push("/search")
  }

  const activeFiltersCount = [
    filters.location,
    filters.bedrooms > 0,
    filters.propertyTypes.length > 0,
    filters.furnished !== null,
    filters.developer,
    filters.amenities.length > 0,
    searchQuery,
  ].filter(Boolean).length

  return (
    <div className="bg-background">
      {/* Search Header */}
      <div className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Enter location, community, or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Select
                value={filters.searchType}
                onValueChange={(value: "buy" | "rent") => handleFilterChange({ searchType: value })}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Select
              value={filters.bedrooms.toString()}
              onValueChange={(value) => handleFilterChange({ bedrooms: Number(value) })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any beds</SelectItem>
                <SelectItem value="1">1 bed</SelectItem>
                <SelectItem value="2">2 beds</SelectItem>
                <SelectItem value="3">3 beds</SelectItem>
                <SelectItem value="4">4+ beds</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.propertyTypes[0] || "Any type"}
              onValueChange={(value) => handleFilterChange({ propertyTypes: value ? [value] : [] })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any type">Any type</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              Price (AED)
            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowFiltersModal(true)}>
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            )}
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Home className="w-4 h-4" />
            <span>Properties</span>
            <span>›</span>
            <span>For {filters.searchType}</span>
            {filters.location && (
              <>
                <span>›</span>
                <span>{filters.location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">
              Properties for {filters.searchType} {filters.location && `in ${filters.location}`}
            </h1>
            <p className="text-muted-foreground">3,247 properties found</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Search & Alert Buttons */}
            <Button variant="outline" size="sm" onClick={() => setShowSaveModal(true)}>
              <Bookmark className="w-4 h-4 mr-2" />
              Save Search
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowAlertModal(true)}>
              <Bell className="w-4 h-4 mr-2" />
              Create Alert
            </Button>

            {/* View Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "map"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Map className="w-4 h-4" />
              </button>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Listed</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {searchQuery && <Badge variant="secondary">"{searchQuery}" ×</Badge>}
                  {filters.location && (
                    <Badge variant="secondary">
                      <MapPin className="w-3 h-3 mr-1" />
                      {filters.location} ×
                    </Badge>
                  )}
                  {filters.bedrooms > 0 && <Badge variant="secondary">{filters.bedrooms} bed ×</Badge>}
                  {filters.propertyTypes.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type} ×
                    </Badge>
                  ))}
                  {filters.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity} ×
                    </Badge>
                  ))}
                  {filters.furnished !== null && (
                    <Badge variant="secondary">{filters.furnished ? "Furnished" : "Unfurnished"} ×</Badge>
                  )}
                  {filters.developer && <Badge variant="secondary">{filters.developer} ×</Badge>}
                </div>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="w-full">
          {viewMode === "grid" ? (
            <ListingsGrid filters={filters} sortBy={sortBy} />
          ) : (
            <div className="flex gap-6 min-h-[600px]">
              {/* Property List - Left Side */}
              <div className="w-1/2 overflow-y-auto max-h-[80vh]">
                <ListingsGrid filters={filters} sortBy={sortBy} compact={true} />
              </div>
              {/* Map - Right Side */}
              <div className="w-1/2">
                <MapView filters={filters} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <SaveSearchModal
        open={showSaveModal}
        onOpenChange={setShowSaveModal}
        searchCriteria={filters}
        searchQuery={searchQuery}
      />
      <EmailAlertModal
        open={showAlertModal}
        onOpenChange={setShowAlertModal}
        searchCriteria={filters}
        searchQuery={searchQuery}
      />
      <FiltersModal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        onApplyFilters={handleFiltersModalApply}
      />
    </div>
  )
}

export { SearchResultsPage }
