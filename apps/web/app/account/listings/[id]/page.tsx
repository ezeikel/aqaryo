import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSidebar } from "@/components/AccountSidebar"
import { Eye, MessageSquare, Edit, Share2, BarChart3, Calendar, MapPin, Bed, Bath, Square } from "lucide-react"

// Mock listing data
const listing = {
  id: "1",
  title: "Luxury Villa in Dubai Hills Estate",
  price: "AED 2,500,000",
  location: "Dubai Hills Estate, Dubai",
  status: "active",
  views: 234,
  inquiries: 12,
  dateCreated: "2024-01-15",
  images: ["/luxury-villa-arabian-ranches-garden-pool.png", "/dubai-villa-skyline.png", "/dubai-apartment-view.png"],
  beds: 4,
  baths: 3,
  area: "3,200 sqft",
  description:
    "Stunning luxury villa located in the prestigious Dubai Hills Estate. This property features modern architecture, spacious living areas, and a beautiful garden with pool.",
  amenities: ["Swimming Pool", "Garden", "Parking", "Security", "Gym", "Playground"],
  agent: {
    name: "Ahmed Al-Rashid",
    phone: "+971 50 123 4567",
    email: "ahmed@aqaryo.com",
  },
}

// Mock analytics data
const analytics = {
  viewsThisWeek: [45, 52, 38, 61, 42, 55, 48],
  inquiriesThisWeek: [2, 3, 1, 4, 2, 3, 2],
  topSources: [
    { source: "Direct", visits: 89, percentage: 38 },
    { source: "Google", visits: 67, percentage: 29 },
    { source: "Social Media", visits: 45, percentage: 19 },
    { source: "Referral", visits: 33, percentage: 14 },
  ],
}

const inquiries = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+971 55 987 6543",
    message: "I'm interested in viewing this property. When would be a good time?",
    date: "2024-01-28",
    status: "new",
  },
  {
    id: 2,
    name: "Mohammed Hassan",
    email: "mohammed@email.com",
    phone: "+971 50 456 7890",
    message: "Is the price negotiable? I'm a serious buyer.",
    date: "2024-01-27",
    status: "replied",
  },
]

const ListingDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{listing.title}</h1>
                  <Badge variant={listing.status === "active" ? "default" : "secondary"}>{listing.status}</Badge>
                </div>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Listing
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{listing.views}</p>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{listing.inquiries}</p>
                      <p className="text-sm text-muted-foreground">Inquiries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">4.2%</p>
                      <p className="text-sm text-muted-foreground">Conversion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">13</p>
                      <p className="text-sm text-muted-foreground">Days Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Property Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-muted-foreground" />
                          <span>{listing.beds} Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="w-4 h-4 text-muted-foreground" />
                          <span>{listing.baths} Bathrooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Square className="w-4 h-4 text-muted-foreground" />
                          <span>{listing.area}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-muted-foreground">{listing.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {listing.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Images */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {listing.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Property ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Views This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {analytics.viewsThisWeek.map((views, index) => (
                          <div key={index} className="flex flex-col items-center gap-2">
                            <div
                              className="bg-primary rounded-t w-8"
                              style={{ height: `${(views / Math.max(...analytics.viewsThisWeek)) * 200}px` }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analytics.topSources.map((source) => (
                        <div key={source.source} className="flex items-center justify-between">
                          <span className="font-medium">{source.source}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${source.percentage}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">{source.visits}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="inquiries" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{inquiry.name}</h4>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                            <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={inquiry.status === "new" ? "default" : "secondary"}>{inquiry.status}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(inquiry.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-3">{inquiry.message}</p>
                        <div className="flex gap-2">
                          <Button size="sm">Reply</Button>
                          <Button size="sm" variant="outline">
                            Mark as Read
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail
