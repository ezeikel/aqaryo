import { AccountSidebar } from "@/components/AccountSidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, MapPin, Clock } from "lucide-react"

// Mock viewing history data
const viewingHistory = [
  {
    id: 1,
    title: "Luxury Penthouse in JBR",
    location: "Jumeirah Beach Residence, Dubai",
    price: "AED 4,500,000",
    image: "/luxury-penthouse-jbr.png",
    viewedDate: "2024-01-15T14:30:00",
    viewCount: 3,
  },
  {
    id: 2,
    title: "Modern Villa in Emirates Hills",
    location: "Emirates Hills, Dubai",
    price: "AED 8,200,000",
    image: "/dubai-villa-skyline.png",
    viewedDate: "2024-01-14T10:15:00",
    viewCount: 1,
  },
  {
    id: 3,
    title: "Apartment with Marina View",
    location: "Dubai Marina, Dubai",
    price: "AED 1,800,000",
    image: "/dubai-marina-apartment.png",
    viewedDate: "2024-01-12T16:45:00",
    viewCount: 2,
  },
]

export default function ViewingHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <AccountSidebar />

        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Viewing History</h1>
            <p className="text-muted-foreground">Properties you've recently viewed</p>
          </div>

          <div className="space-y-4">
            {viewingHistory.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-48 flex-shrink-0">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <p className="text-xl font-bold text-primary mb-3">{property.price}</p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {new Date(property.viewedDate).toLocaleDateString()} at{" "}
                                {new Date(property.viewedDate).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>
                                Viewed {property.viewCount} time{property.viewCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
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
