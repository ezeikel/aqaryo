"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Wifi, Car, Dumbbell, Waves } from "lucide-react"

type Property = {
  description: string
  features: string[]
  location: string
}

type PropertyTabsProps = {
  property: Property
}

const PropertyTabs = ({ property }: PropertyTabsProps) => {
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes("wifi") || feature.toLowerCase().includes("internet"))
      return <Wifi className="w-4 h-4" />
    if (feature.toLowerCase().includes("parking") || feature.toLowerCase().includes("garage"))
      return <Car className="w-4 h-4" />
    if (feature.toLowerCase().includes("gym") || feature.toLowerCase().includes("fitness"))
      return <Dumbbell className="w-4 h-4" />
    if (feature.toLowerCase().includes("pool") || feature.toLowerCase().includes("swimming"))
      return <Waves className="w-4 h-4" />
    return <div className="w-4 h-4 rounded-full bg-accent/20" />
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Property Description</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="features" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  {getFeatureIcon(feature)}
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="floorplan" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Floor Plan</h3>
            <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-accent/20 rounded-lg mx-auto flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <p className="text-muted-foreground">Floor plan coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="location" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Location & Map</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="font-medium">{property.location}</span>
              </div>

              <div className="aspect-video bg-gradient-to-br from-muted/30 to-secondary/20 rounded-lg relative overflow-hidden">
                <img
                  src="/dubai-satellite-view.png"
                  alt="Location Map"
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full font-medium shadow-lg">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Property Location
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold">5 min</p>
                  <p className="text-sm text-muted-foreground">to Metro Station</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold">10 min</p>
                  <p className="text-sm text-muted-foreground">to Dubai Mall</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="font-semibold">15 min</p>
                  <p className="text-sm text-muted-foreground">to Airport</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export { PropertyTabs }
