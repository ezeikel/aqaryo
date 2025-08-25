"use client"

import { useState } from "react"
import { Home, Car, Wifi, Utensils, Waves, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

type FiltersModalProps = {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: any) => void
}

const amenities = [
  { id: "pool", name: "Pool", icon: Waves },
  { id: "gym", name: "Gym", icon: Dumbbell },
  { id: "parking", name: "Parking", icon: Car },
  { id: "wifi", name: "WiFi", icon: Wifi },
  { id: "kitchen", name: "Kitchen", icon: Utensils },
  { id: "furnished", name: "Furnished", icon: Home },
]

const propertyTypes = [
  { id: "any", name: "Any type" },
  { id: "apartment", name: "Apartment" },
  { id: "villa", name: "Villa" },
  { id: "townhouse", name: "Townhouse" },
  { id: "penthouse", name: "Penthouse" },
  { id: "studio", name: "Studio" },
]

const FiltersModal = ({ isOpen, onClose, onApplyFilters }: FiltersModalProps) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedPropertyType, setSelectedPropertyType] = useState("any")
  const [priceRange, setPriceRange] = useState([50000, 5000000])
  const [bedrooms, setBedrooms] = useState("any")
  const [bathrooms, setBathrooms] = useState("any")

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const handleClearAll = () => {
    setSelectedAmenities([])
    setSelectedPropertyType("any")
    setPriceRange([50000, 5000000])
    setBedrooms("any")
    setBathrooms("any")
  }

  const handleApplyFilters = () => {
    const filters = {
      amenities: selectedAmenities,
      propertyType: selectedPropertyType,
      priceRange,
      bedrooms,
      bathrooms,
    }
    onApplyFilters(filters)
    onClose()
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedAmenities.length > 0) count++
    if (selectedPropertyType !== "any") count++
    if (priceRange[0] !== 50000 || priceRange[1] !== 5000000) count++
    if (bedrooms !== "any") count++
    if (bathrooms !== "any") count++
    return count
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Filters</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-8">
          {/* Recommended Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenities.map((amenity) => {
                const Icon = amenity.icon
                const isSelected = selectedAmenities.includes(amenity.id)
                return (
                  <button
                    key={amenity.id}
                    onClick={() => handleAmenityToggle(amenity.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover:border-gray-400 ${
                      isSelected ? "border-black bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">{amenity.name}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Type of property</h3>
            <div className="flex flex-wrap gap-3">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedPropertyType(type.id)}
                  className={`px-6 py-3 rounded-full border-2 transition-all hover:border-gray-400 ${
                    selectedPropertyType === type.id ? "border-black bg-gray-50" : "border-gray-200"
                  }`}
                >
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">Bedrooms</Label>
              <div className="flex flex-wrap gap-2">
                {["any", "1", "2", "3", "4", "5+"].map((bed) => (
                  <button
                    key={bed}
                    onClick={() => setBedrooms(bed)}
                    className={`px-4 py-2 rounded-full border-2 transition-all hover:border-gray-400 ${
                      bedrooms === bed ? "border-black bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{bed}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold mb-4 block">Bathrooms</Label>
              <div className="flex flex-wrap gap-2">
                {["any", "1", "2", "3", "4+"].map((bath) => (
                  <button
                    key={bath}
                    onClick={() => setBathrooms(bath)}
                    className={`px-4 py-2 rounded-full border-2 transition-all hover:border-gray-400 ${
                      bathrooms === bath ? "border-black bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <span className="text-sm font-medium capitalize">{bath}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Price range</h3>
            <p className="text-sm text-muted-foreground mb-6">Yearly rent, includes all fees</p>

            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000000}
              min={10000}
              step={10000}
              className="mb-4"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Minimum</Label>
                <Input value={`AED ${priceRange[0].toLocaleString()}`} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Maximum</Label>
                <Input value={`AED ${priceRange[1].toLocaleString()}+`} readOnly className="mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex items-center justify-between bg-white">
          <Button variant="ghost" onClick={handleClearAll}>
            Clear all
          </Button>
          <Button onClick={handleApplyFilters} className="bg-black text-white hover:bg-gray-800">
            Show properties
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-white text-black px-2 py-1 rounded-full text-xs">{getActiveFiltersCount()}</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FiltersModal
