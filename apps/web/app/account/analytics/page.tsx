import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountSidebar } from "@/components/AccountSidebar"
import { Eye, MessageSquare, TrendingUp, Users, Calendar, MapPin } from "lucide-react"

// Mock analytics data
const analyticsData = {
  totalViews: 2847,
  totalInquiries: 156,
  conversionRate: 5.5,
  avgViewTime: "2m 34s",
  viewsThisMonth: [
    120, 145, 132, 167, 189, 201, 178, 156, 143, 167, 189, 201, 178, 156, 143, 167, 189, 201, 178, 156, 143, 167, 189,
    201, 178, 156, 143, 167, 189, 201,
  ],
  inquiriesThisMonth: [5, 7, 4, 8, 9, 12, 8, 6, 5, 8, 9, 12, 8, 6, 5, 8, 9, 12, 8, 6, 5, 8, 9, 12, 8, 6, 5, 8, 9, 12],
  topPerformingListings: [
    { title: "Luxury Penthouse in JBR", views: 445, inquiries: 23, conversion: 5.2 },
    { title: "Luxury Villa in Dubai Hills", views: 234, inquiries: 12, conversion: 5.1 },
    { title: "Modern Apartment in Marina", views: 156, inquiries: 8, conversion: 5.1 },
  ],
  demographics: {
    ageGroups: [
      { range: "25-34", percentage: 35 },
      { range: "35-44", percentage: 28 },
      { range: "45-54", percentage: 22 },
      { range: "55+", percentage: 15 },
    ],
    locations: [
      { city: "Dubai", percentage: 45 },
      { city: "Abu Dhabi", percentage: 25 },
      { city: "Sharjah", percentage: 15 },
      { city: "Other", percentage: 15 },
    ],
  },
}

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Track your listing performance and audience insights</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.totalInquiries}</div>
                  <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. View Time</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.avgViewTime}</div>
                  <p className="text-xs text-muted-foreground">+15s from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Views Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Views This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-1">
                    {analyticsData.viewsThisMonth.map((views, index) => (
                      <div
                        key={index}
                        className="bg-primary rounded-t flex-1"
                        style={{
                          height: `${(views / Math.max(...analyticsData.viewsThisMonth)) * 200}px`,
                          minHeight: "4px",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>15</span>
                    <span>30</span>
                  </div>
                </CardContent>
              </Card>

              {/* Inquiries Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Inquiries This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-1">
                    {analyticsData.inquiriesThisMonth.map((inquiries, index) => (
                      <div
                        key={index}
                        className="bg-secondary rounded-t flex-1"
                        style={{
                          height: `${(inquiries / Math.max(...analyticsData.inquiriesThisMonth)) * 200}px`,
                          minHeight: "4px",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>15</span>
                    <span>30</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Top Performing Listings */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Listings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analyticsData.topPerformingListings.map((listing, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{listing.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {listing.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {listing.inquiries}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{listing.conversion}%</div>
                        <div className="text-xs text-muted-foreground">conversion</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Age Groups
                    </h4>
                    <div className="space-y-2">
                      {analyticsData.demographics.ageGroups.map((group) => (
                        <div key={group.range} className="flex items-center justify-between">
                          <span className="text-sm">{group.range}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${group.percentage}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{group.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Top Locations
                    </h4>
                    <div className="space-y-2">
                      {analyticsData.demographics.locations.map((location) => (
                        <div key={location.city} className="flex items-center justify-between">
                          <span className="text-sm">{location.city}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div
                                className="bg-secondary h-2 rounded-full"
                                style={{ width: `${location.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{location.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
