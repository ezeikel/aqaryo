import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccountSidebar } from "@/components/AccountSidebar"
import { Eye, MessageSquare, Edit, Trash2, Plus, Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock listings data
const listings = [
  {
    id: "1",
    title: "Luxury Villa in Dubai Hills Estate",
    price: "AED 2,500,000",
    location: "Dubai Hills Estate, Dubai",
    status: "active",
    views: 234,
    inquiries: 12,
    dateCreated: "2024-01-15",
    image: "/luxury-villa-arabian-ranches-garden-pool.png",
    beds: 4,
    baths: 3,
    area: "3,200 sqft",
  },
  {
    id: "2",
    title: "Modern Apartment in Dubai Marina",
    price: "AED 1,200,000",
    location: "Dubai Marina, Dubai",
    status: "pending",
    views: 156,
    inquiries: 8,
    dateCreated: "2024-01-20",
    image: "/dubai-marina-apartment.png",
    beds: 2,
    baths: 2,
    area: "1,400 sqft",
  },
  {
    id: "3",
    title: "Luxury Penthouse in JBR",
    price: "AED 3,800,000",
    location: "Jumeirah Beach Residence, Dubai",
    status: "active",
    views: 445,
    inquiries: 23,
    dateCreated: "2024-01-10",
    image: "/luxury-penthouse-jbr.png",
    beds: 3,
    baths: 4,
    area: "2,800 sqft",
  },
  {
    id: "4",
    title: "Spacious Villa with Pool",
    price: "AED 1,800,000",
    location: "Arabian Ranches, Dubai",
    status: "draft",
    views: 0,
    inquiries: 0,
    dateCreated: "2024-01-25",
    image: "/dubai-villa-skyline.png",
    beds: 5,
    baths: 4,
    area: "4,200 sqft",
  },
]

const MyListings = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">My Listings</h1>
                <p className="text-muted-foreground">Manage and track your property listings</p>
              </div>
              <Button asChild>
                <Link href="/list-property">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Search listings..." className="pl-10" />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Listings Grid */}
            <div className="grid gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Image */}
                      <div className="w-64 h-48 flex-shrink-0">
                        <img
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold">{listing.title}</h3>
                              <Badge
                                variant={
                                  listing.status === "active"
                                    ? "default"
                                    : listing.status === "pending"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {listing.status}
                              </Badge>
                            </div>
                            <p className="text-2xl font-bold text-primary mb-2">{listing.price}</p>
                            <p className="text-muted-foreground mb-3">{listing.location}</p>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                              <span>{listing.beds} beds</span>
                              <span>{listing.baths} baths</span>
                              <span>{listing.area}</span>
                            </div>

                            <div className="flex items-center gap-6 text-sm">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {listing.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {listing.inquiries} inquiries
                              </span>
                              <span className="text-muted-foreground">
                                Created: {new Date(listing.dateCreated).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/account/listings/${listing.id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
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
    </div>
  )
}

export default MyListings
