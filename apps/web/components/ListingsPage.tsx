"use client"

import { useState } from "react"
import { FilterSidebar } from "@/components/FilterSidebar"
import { ListingsGrid } from "@/components/ListingsGrid"
import { MapView } from "@/components/MapView"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map, Grid3X3, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type ListingsPageProps = {
  searchType: "buy" | "rent"
}

type Filters = {
  searchType: "buy" | "rent"
  priceRange: [number, number]
  bedrooms: number
  propertyTypes: string[]
  furnished: boolean | null
  developer: string
}

const ListingsPage = ({ searchType }: ListingsPageProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState<Filters>({
    searchType,
    priceRange: [0, 1000000],
    bedrooms: 0,
    propertyTypes: [],
    furnished: null,
    developer: "",
  })

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Properties for {searchType === "buy" ? "Sale" : "Rent"}
        </h1>
        <p className="text-muted-foreground">
          {searchType === "buy" ? "Find your perfect home to purchase" : "Discover rental properties across the Gulf"}
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Mobile Filter Toggle */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
            </SheetContent>
          </Sheet>

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
                viewMode === "map" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {viewMode === "grid" ? <ListingsGrid filters={filters} sortBy={sortBy} /> : <MapView filters={filters} />}
        </div>
      </div>
    </div>
  )
}

export { ListingsPage }
