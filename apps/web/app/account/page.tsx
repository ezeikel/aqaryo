import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AccountSidebar } from "@/components/AccountSidebar"
import { Eye, MessageSquare, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const dashboardStats = {
  totalListings: 12,
  activeListings: 8,
  totalViews: 2847,
  totalInquiries: 156,
  thisMonthViews: 892,
  thisMonthInquiries: 43,
}

const recentListings = [
  {
    id: "1",
    title: "Luxury Villa in Dubai Hills",
    price: "AED 2,500,000",
    status: "active",
    views: 234,
    inquiries: 12,
    image: "/luxury-villa-arabian-ranches-garden-pool.png",
  },
  {
    id: "2",
    title: "Modern Apartment in Marina",
    price: "AED 1,200,000",
    status: "pending",
    views: 156,
    inquiries: 8,
    image: "/dubai-marina-apartment.png",
  },
  {
    id: "3",
    title: "Penthouse in JBR",
    price: "AED 3,800,000",
    status: "active",
    views: 445,
    inquiries: 23,
    image: "/luxury-penthouse-jbr.png",
  },
]

const recentActivity = [
  { type: "inquiry", message: "New inquiry for Luxury Villa in Dubai Hills", time: "2 hours ago" },
  { type: "view", message: "Your listing received 15 new views", time: "4 hours ago" },
  { type: "listing", message: "Modern Apartment in Marina was approved", time: "1 day ago" },
  { type: "inquiry", message: "New inquiry for Penthouse in JBR", time: "2 days ago" },
]

const AccountDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening with your listings.</p>
              </div>
              <Button asChild>
                <Link href="/list-property">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm bg-card/50">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                    <div className="text-3xl font-semibold">{dashboardStats.totalListings}</div>
                    <p className="text-sm text-muted-foreground">{dashboardStats.activeListings} active</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card/50">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <div className="text-3xl font-semibold">{dashboardStats.totalViews.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">+{dashboardStats.thisMonthViews} this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card/50">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Inquiries</p>
                    <div className="text-3xl font-semibold">{dashboardStats.totalInquiries}</div>
                    <p className="text-sm text-muted-foreground">+{dashboardStats.thisMonthInquiries} this month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card/50">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                    <div className="text-3xl font-semibold">2.4h</div>
                    <p className="text-sm text-muted-foreground">-0.5h from last month</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Listings */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Listings</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/account/listings">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentListings.map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{listing.title}</h4>
                        <p className="text-sm text-muted-foreground">{listing.price}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {listing.views}
                          </span>
                          <span className="text-xs flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {listing.inquiries}
                          </span>
                        </div>
                      </div>
                      <Badge variant={listing.status === "active" ? "default" : "secondary"}>{listing.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDashboard
