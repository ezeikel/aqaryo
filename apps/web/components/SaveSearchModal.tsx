"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bookmark, Check } from "lucide-react"

type Filters = {
  searchType: "buy" | "rent"
  location: string
  priceRange: [number, number]
  bedrooms: number
  propertyTypes: string[]
  furnished: boolean | null
  developer: string
}

type SaveSearchModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchCriteria: Filters
  searchQuery: string
}

const SaveSearchModal = ({ open, onOpenChange, searchCriteria, searchQuery }: SaveSearchModalProps) => {
  const [searchName, setSearchName] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches") || "[]")
    const newSearch = {
      id: Date.now().toString(),
      name: searchName || `${searchCriteria.searchType} in ${searchCriteria.location || "Dubai"}`,
      criteria: searchCriteria,
      query: searchQuery,
      createdAt: new Date().toISOString(),
    }

    savedSearches.push(newSearch)
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches))

    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setSearchName("")
      onOpenChange(false)
    }, 2000)
  }

  const generateSearchSummary = () => {
    const parts = []
    if (searchQuery) parts.push(`"${searchQuery}"`)
    if (searchCriteria.location) parts.push(`in ${searchCriteria.location}`)
    if (searchCriteria.bedrooms > 0) parts.push(`${searchCriteria.bedrooms} bed`)
    if (searchCriteria.propertyTypes.length > 0) parts.push(searchCriteria.propertyTypes.join(", "))
    if (searchCriteria.furnished !== null) parts.push(searchCriteria.furnished ? "Furnished" : "Unfurnished")

    return parts.length > 0 ? parts.join(" • ") : "All properties"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-accent" />
            Save Search
          </DialogTitle>
          <DialogDescription>
            Save this search to quickly access it later and get notified of new listings.
          </DialogDescription>
        </DialogHeader>

        {!saved ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-name">Search Name (Optional)</Label>
              <Input
                id="search-name"
                placeholder="e.g., 2 bed apartments in Marina"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Search Summary:</p>
              <p className="text-sm text-muted-foreground">
                {searchCriteria.searchType === "buy" ? "Properties for sale" : "Properties for rent"} •{" "}
                {generateSearchSummary()}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Save Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Search Saved!</h3>
            <p className="text-muted-foreground">You can access your saved searches from your account dashboard.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { SaveSearchModal }
