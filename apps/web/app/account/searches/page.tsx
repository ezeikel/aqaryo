import { AccountSidebar } from "@/components/AccountSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Bell, Trash2, Edit } from "lucide-react"

// Mock saved searches data
const savedSearches = [
  {
    id: 1,
    name: "Dubai Marina Apartments",
    location: "Dubai Marina",
    propertyType: "Apartment",
    priceRange: "AED 80,000 - 150,000",
    bedrooms: "2-3",
    createdDate: "2024-01-10",
    alertsEnabled: true,
    newMatches: 5,
  },
  {
    id: 2,
    name: "Villas in Arabian Ranches",
    location: "Arabian Ranches",
    propertyType: "Villa",
    priceRange: "AED 2,000,000 - 3,500,000",
    bedrooms: "4+",
    createdDate: "2024-01-08",
    alertsEnabled: false,
    newMatches: 2,
  },
]

export default function SavedSearchesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <AccountSidebar />

        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Saved Searches</h1>
            <p className="text-muted-foreground">Your saved property searches and alerts</p>
          </div>

          <div className="grid gap-6">
            {savedSearches.map((search) => (
              <Card key={search.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      {search.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {search.newMatches > 0 && <Badge variant="default">{search.newMatches} new</Badge>}
                      {search.alertsEnabled && (
                        <Badge variant="secondary">
                          <Bell className="w-3 h-3 mr-1" />
                          Alerts On
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{search.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <span>
                        <strong>Type:</strong> {search.propertyType}
                      </span>
                      <span>
                        <strong>Price:</strong> {search.priceRange}
                      </span>
                      <span>
                        <strong>Bedrooms:</strong> {search.bedrooms}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        Created {new Date(search.createdDate).toLocaleDateString()}
                      </span>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bell className="w-4 h-4 mr-1" />
                          {search.alertsEnabled ? "Disable Alerts" : "Enable Alerts"}
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
