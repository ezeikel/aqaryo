"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, Check, Mail } from "lucide-react"

type Filters = {
  searchType: "buy" | "rent"
  location: string
  priceRange: [number, number]
  bedrooms: number
  propertyTypes: string[]
  furnished: boolean | null
  developer: string
}

type EmailAlertModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchCriteria: Filters
  searchQuery: string
}

const EmailAlertModal = ({ open, onOpenChange, searchCriteria, searchQuery }: EmailAlertModalProps) => {
  const [email, setEmail] = useState("")
  const [frequency, setFrequency] = useState("daily")
  const [instantAlerts, setInstantAlerts] = useState(true)
  const [created, setCreated] = useState(false)

  const handleCreateAlert = () => {
    const alerts = JSON.parse(localStorage.getItem("emailAlerts") || "[]")
    const newAlert = {
      id: Date.now().toString(),
      email,
      frequency,
      instantAlerts,
      criteria: searchCriteria,
      query: searchQuery,
      createdAt: new Date().toISOString(),
      active: true,
    }

    alerts.push(newAlert)
    localStorage.setItem("emailAlerts", JSON.stringify(alerts))

    setCreated(true)
    setTimeout(() => {
      setCreated(false)
      setEmail("")
      setFrequency("daily")
      setInstantAlerts(true)
      onOpenChange(false)
    }, 3000)
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
            <Bell className="w-5 h-5 text-accent" />
            Create Email Alert
          </DialogTitle>
          <DialogDescription>Get notified when new properties matching your criteria are listed.</DialogDescription>
        </DialogHeader>

        {!created ? (
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Alert for:</p>
              <p className="text-sm text-muted-foreground">
                {searchCriteria.searchType === "buy" ? "Properties for sale" : "Properties for rent"} •{" "}
                {generateSearchSummary()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Email Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant (as soon as listed)</SelectItem>
                  <SelectItem value="daily">Daily summary</SelectItem>
                  <SelectItem value="weekly">Weekly summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="instant-alerts" checked={instantAlerts} onCheckedChange={setInstantAlerts} />
              <Label htmlFor="instant-alerts" className="text-sm">
                Also send instant alerts for premium properties
              </Label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleCreateAlert}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!email}
              >
                <Mail className="w-4 h-4 mr-2" />
                Create Alert
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Alert Created!</h3>
            <p className="text-muted-foreground mb-4">
              We'll send you an email at <strong>{email}</strong> when new properties match your criteria.
            </p>
            <p className="text-xs text-muted-foreground">You can manage your alerts from your account settings.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { EmailAlertModal }
