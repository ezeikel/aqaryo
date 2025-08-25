import { AccountSidebar } from "@/components/AccountSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Bed, Bath, Square, Phone, MessageCircle, Mail } from "lucide-react"

// Mock saved properties data
const savedProperties = [
  {
    id: 1,
    title: "Luxury Villa in Arabian Ranches",
    location: "Arabian Ranches, Dubai",
    price: "AED 2,500,000 yearly",
    image: "/luxury-villa-arabian-ranches-garden-pool.png",
    beds: 4,
    baths: 3,
    area: "3,200 sqft",
    type: "Villa",
    savedDate: "2024-01-15",
    agent: {
      name: "Sarah Johnson",
      phone: "+971 50 123 4567",
      email: "sarah@aqaryo.com",
    },
  },
  {
    id: 2,
    title: "Modern Apartment in Dubai Marina",
    location: "Dubai Marina, Dubai",
    price: "AED 120,000 yearly",
    image: "/dubai-marina-apartment.png",
    beds: 2,
    baths: 2,
    area: "1,200 sqft",
    type: "Apartment",
    savedDate: "2024-01-12",
    agent: {
      name: "Ahmed Al-Rashid",
      phone: "+971 50 987 6543",
      email: "ahmed@aqaryo.com",
    },
  },
]

export default function SavedPropertiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <AccountSidebar />

        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Saved Properties</h1>
            <p className="text-muted-foreground">Properties you've saved for later</p>
          </div>

          <div className="space-y-6">
            {savedProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-80 flex-shrink-0">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-64 object-cover"
                      />
                      <Button variant="ghost" size="sm" className="absolute top-3 right-3 bg-white/90 hover:bg-white">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <p className="text-2xl font-bold text-primary">{property.price}</p>
                        </div>
                        <Badge variant="secondary">{property.type}</Badge>
                      </div>

                      <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{property.beds} beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{property.baths} baths</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="w-4 h-4" />
                          <span>{property.area}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Saved on {new Date(property.savedDate).toLocaleDateString()}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            WhatsApp
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </Button>
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
