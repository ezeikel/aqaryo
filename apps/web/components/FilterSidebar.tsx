"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus } from "lucide-react"

type Filters = {
  searchType: "buy" | "rent"
  priceRange: [number, number]
  bedrooms: number
  propertyTypes: string[]
  furnished: boolean | null
  developer: string
}

type FilterSidebarProps = {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
}

const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const propertyTypes = ["Apartment", "Villa", "Townhouse", "Penthouse", "Studio"]
  const developers = ["Emaar", "Damac", "Aldar", "Sobha", "Nakheel", "Dubai Properties"]

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `${(price / 1000).toFixed(0)}K`
    return price.toString()
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked ? [...filters.propertyTypes, type] : filters.propertyTypes.filter((t) => t !== type)
    onFilterChange({ propertyTypes: newTypes })
  }

  const resetFilters = () => {
    onFilterChange({
      priceRange: [0, 1000000],
      bedrooms: 0,
      propertyTypes: [],
      furnished: null,
      developer: "",
    })
  }

  return (
    <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
      {/* Buy/Rent Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => onFilterChange({ searchType: "buy" })}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.searchType === "buy"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => onFilterChange({ searchType: "rent" })}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filters.searchType === "rent"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Rent
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFilterChange({ priceRange: value as [number, number] })}
              max={1000000}
              min={0}
              step={10000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>AED {formatPrice(filters.priceRange[0])}</span>
            <span>AED {formatPrice(filters.priceRange[1])}</span>
          </div>
        </CardContent>
      </Card>

      {/* Bedrooms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bedrooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFilterChange({ bedrooms: Math.max(0, filters.bedrooms - 1) })}
              disabled={filters.bedrooms <= 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-medium px-4">{filters.bedrooms === 0 ? "Any" : filters.bedrooms}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFilterChange({ bedrooms: Math.min(10, filters.bedrooms + 1) })}
              disabled={filters.bedrooms >= 10}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Property Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.propertyTypes.includes(type)}
                onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
              />
              <label
                htmlFor={type}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                onClick={() => handlePropertyTypeChange(type, !filters.propertyTypes.includes(type))}
              >
                {type}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Furnished */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Furnished</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished-yes"
                checked={filters.furnished === true}
                onCheckedChange={(checked) => onFilterChange({ furnished: checked ? true : null })}
              />
              <label htmlFor="furnished-yes" className="text-sm font-medium">
                Furnished
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished-no"
                checked={filters.furnished === false}
                onCheckedChange={(checked) => onFilterChange({ furnished: checked ? false : null })}
              />
              <label htmlFor="furnished-no" className="text-sm font-medium">
                Unfurnished
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Developer</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.developer} onValueChange={(value) => onFilterChange({ developer: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select developer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Developer</SelectItem>
              {developers.map((dev) => (
                <SelectItem key={dev} value={dev}>
                  {dev}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Reset Filters */}
      <Button variant="outline" onClick={resetFilters} className="w-full bg-transparent">
        Reset Filters
      </Button>

      {/* Active Filters */}
      {(filters.propertyTypes.length > 0 || filters.bedrooms > 0 || filters.developer) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.propertyTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handlePropertyTypeChange(type, false)}
                >
                  {type} ×
                </Badge>
              ))}
              {filters.bedrooms > 0 && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => onFilterChange({ bedrooms: 0 })}>
                  {filters.bedrooms} bed ×
                </Badge>
              )}
              {filters.developer && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => onFilterChange({ developer: "" })}>
                  {filters.developer} ×
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { FilterSidebar }
