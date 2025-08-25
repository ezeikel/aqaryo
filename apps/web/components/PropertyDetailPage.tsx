"use client"

import { useState } from "react"
import { PropertyGallery } from "@/components/PropertyGallery"
import { PropertySummary } from "@/components/PropertySummary"
import { PropertyTabs } from "@/components/PropertyTabs"
import { ContactAgentSidebar } from "@/components/ContactAgentSidebar"
import { SimilarProperties } from "@/components/SimilarProperties"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PropertyDetailPageProps = {
  propertyId: string
}

const PropertyDetailPage = ({ propertyId }: PropertyDetailPageProps) => {
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  // Mock property data - in real app this would come from API
  const property = {
    id: propertyId,
    title: "2 bed apartment in Dubai Marina",
    price: "AED 110,000 yearly",
    location: "Dubai Marina, Dubai",
    beds: 2,
    baths: 2,
    area: "1,150 sqft",
    propertyType: "Apartment",
    furnished: true,
    tags: ["Furnished", "Sea view", "Balcony"],
    images: [
      "/dubai-marina-apartment.png",
      "/luxury-villa-arabian-ranches-garden-pool.png",
      "/dubai-apartment-view.png",
      "/luxury-penthouse-jbr.png",
      "/modern-studio-business-bay.png",
    ],
    description:
      "Beautiful 2-bedroom apartment in the heart of Dubai Marina with stunning sea views. This fully furnished unit features modern amenities, spacious living areas, and a private balcony overlooking the marina.",
    features: [
      "Central Air Conditioning",
      "Built-in Wardrobes",
      "Balcony",
      "Gym Access",
      "Swimming Pool",
      "24/7 Security",
      "Covered Parking",
      "Maid's Room",
    ],
    agent: {
      name: "Sarah Ahmed",
      company: "Marina Properties",
      phone: "+971 50 123 4567",
      email: "sarah@marinaproperties.ae",
      image: "/agent-sarah-ahmed.png",
    },
    listedAt: "3 days ago",
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      description: isSaved ? "Property removed from saved" : "Property saved successfully",
      duration: 2000,
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      description: "Property link copied to clipboard",
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to listings
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className={isSaved ? "text-red-500 border-red-200" : ""}
            >
              <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PropertySummary property={property} />
            <PropertyTabs property={property} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <ContactAgentSidebar agent={property.agent} property={property} />
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <SimilarProperties currentPropertyId={property.id} />
        </div>
      </div>
    </div>
  )
}

export { PropertyDetailPage }
