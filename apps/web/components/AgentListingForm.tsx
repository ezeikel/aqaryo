"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, X, Info, CheckCircle, AlertCircle, Crown } from "lucide-react"
import Link from "next/link"
import AddressAutocomplete from "./AddressAutocomplete"
import SubscriptionModal from "./SubscriptionModal"

const AgentListingForm = () => {
  const [hasValidSubscription, setHasValidSubscription] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [userSubscription, setUserSubscription] = useState({
    plan: null,
    listingsUsed: 0,
    listingsLimit: 0,
    status: "inactive",
  })

  const [formData, setFormData] = useState({
    // Agent Details
    agentName: "",
    licenseId: "",
    email: "",
    phone: "",
    agencyName: "",

    // Property Details
    title: "",
    address: "",
    price: "",
    description: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",

    // Additional Details
    listingDate: "",
    openHouseDate: "",
    openHouseTime: "",

    // Features
    features: [] as string[],

    // Files
    images: [] as File[],
    floorPlans: [] as File[],
    documents: [] as File[],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const propertyTypes = ["Apartment", "Villa", "Townhouse", "Penthouse", "Studio", "Office", "Retail", "Warehouse"]
  const availableFeatures = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Balcony",
    "Garden",
    "Maid's Room",
    "Study Room",
    "Storage",
    "Security",
    "Concierge",
    "Elevator",
    "Central AC",
  ]

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleFileUpload = (type: "images" | "floorPlans" | "documents", files: FileList | null) => {
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], ...Array.from(files)],
      }))
    }
  }

  const removeFile = (type: "images" | "floorPlans" | "documents", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check subscription before allowing submission
    if (!hasValidSubscription || userSubscription.status !== "active") {
      setShowSubscriptionModal(true)
      return
    }

    if (userSubscription.listingsUsed >= userSubscription.listingsLimit) {
      alert("You've reached your listing limit. Please upgrade your subscription to add more listings.")
      setShowSubscriptionModal(true)
      return
    }

    console.log("[v0] Agent listing form submitted:", formData)
    // Handle form submission
  }

  const handleSubscribe = async (planId: string) => {
    console.log("[v0] Subscribing to plan:", planId)
    // Here you would integrate with Stripe to create subscription
    // For now, simulate successful subscription
    setHasValidSubscription(true)
    setUserSubscription({
      plan: planId,
      listingsUsed: 0,
      listingsLimit: planId === "basic" ? 5 : planId === "premium" ? 15 : 999,
      status: "active",
    })
    setShowSubscriptionModal(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Agent Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agentName" className="mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="agentName"
                    value={formData.agentName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, agentName: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseId" className="mb-2 block">
                    License/ID Number *
                  </Label>
                  <Input
                    id="licenseId"
                    value={formData.licenseId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, licenseId: e.target.value }))}
                    placeholder="Enter license number"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="agencyName" className="mb-2 block">
                    Agency Name (Optional)
                  </Label>
                  <Input
                    id="agencyName"
                    value={formData.agencyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, agencyName: e.target.value }))}
                    placeholder="Enter agency name"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Property Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="mb-2 block">
                    Property Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Luxury 2BR Apartment in Dubai Marina"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="mb-2 block">
                    Address *
                  </Label>
                  <AddressAutocomplete
                    id="address"
                    value={formData.address}
                    onChange={(value) => setFormData((prev) => ({ ...prev, address: value }))}
                    placeholder="Enter complete address"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="mb-2 block">
                      Price (AED) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g., 2500000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyType" className="mb-2 block">
                      Property Type *
                    </Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms" className="mb-2 block">
                      Bedrooms
                    </Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms" className="mb-2 block">
                      Bathrooms
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area" className="mb-2 block">
                      Area (sqft)
                    </Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                      placeholder="1200"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="mb-2 block">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the property, its features, and location benefits..."
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Features & Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label htmlFor={feature} className="text-sm cursor-pointer">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Listing Schedule</h3>
              <div className="grid md:grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="listingDate" className="mb-2 block">
                    Listing Date
                  </Label>
                  <Input
                    id="listingDate"
                    type="date"
                    value={formData.listingDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, listingDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Card className="border-dashed border-muted-foreground/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  Open House (Optional)
                </CardTitle>
                <CardDescription className="text-sm">
                  Schedule an open house viewing to attract more potential buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="openHouseDate" className="mb-2 block">
                      Open House Date
                    </Label>
                    <Input
                      id="openHouseDate"
                      type="date"
                      value={formData.openHouseDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, openHouseDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="openHouseTime" className="mb-2 block">
                      Open House Time
                    </Label>
                    <Input
                      id="openHouseTime"
                      type="time"
                      value={formData.openHouseTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, openHouseTime: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Upload Files</h3>

              {/* Property Images */}
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Property Images *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload property images (Max 10 files)</p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload("images", e.target.files)}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {formData.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.images.map((file, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {file.name}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => removeFile("images", index)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Floor Plans */}
                <div>
                  <Label className="mb-2 block">Floor Plans (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("floorPlans", e.target.files)}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {formData.floorPlans.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.floorPlans.map((file, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {file.name}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => removeFile("floorPlans", index)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Compliance Documents */}
                <div>
                  <Label className="mb-2 block">License & Compliance Documents *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload license, permits, and compliance documents
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("documents", e.target.files)}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.documents.map((file, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {file.name}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => removeFile("documents", index)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {!hasValidSubscription && (
        <Alert className="mx-4 mt-4 border-orange-200 bg-orange-50">
          <Crown className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Subscription Required:</strong> You need an active subscription to submit property listings.{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-orange-600 underline"
              onClick={() => setShowSubscriptionModal(true)}
            >
              Choose a plan
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/list-property" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Agent Listing</h1>
              <p className="text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-muted rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1 && "Agent Information"}
                    {currentStep === 2 && "Property Details"}
                    {currentStep === 3 && "Features & Schedule"}
                    {currentStep === 4 && "Upload Files"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Provide your professional details and licensing information"}
                    {currentStep === 2 && "Enter comprehensive property information"}
                    {currentStep === 3 && "Select amenities and set viewing schedule"}
                    {currentStep === 4 && "Upload property images and required documents"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    {renderStep()}

                    <div className="flex justify-between mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </Button>

                      {currentStep < totalSteps ? (
                        <Button
                          type="button"
                          onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          disabled={!hasValidSubscription}
                        >
                          Submit Listing
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {hasValidSubscription && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-primary" />
                      Subscription Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <Badge variant="secondary">{userSubscription.plan}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Listings Used:</span>
                        <span>
                          {userSubscription.listingsUsed}/{userSubscription.listingsLimit}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">High-Quality Images</p>
                      <p className="text-muted-foreground">
                        Upload 8-10 professional photos showing all rooms and key features
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Detailed Description</p>
                      <p className="text-muted-foreground">
                        Include location benefits, nearby amenities, and unique selling points
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Competitive Pricing</p>
                      <p className="text-muted-foreground">
                        Research similar properties in the area for accurate pricing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Compliance Reminder
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    Ensure all required licenses and permits are current and uploaded. Listings without proper
                    documentation will be rejected.
                  </p>
                  <p className="text-muted-foreground">Review process typically takes 24-48 hours.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  )
}

export default AgentListingForm
