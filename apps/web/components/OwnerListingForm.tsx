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
import { ArrowLeft, Upload, X, Info, CheckCircle, AlertCircle, Users, Crown } from "lucide-react"
import Link from "next/link"
import SubscriptionModal from "./SubscriptionModal"

const OwnerListingForm = () => {
  const [hasValidSubscription, setHasValidSubscription] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [userSubscription, setUserSubscription] = useState({
    plan: null,
    listingsUsed: 0,
    listingsLimit: 0,
    status: "inactive",
  })

  const [formData, setFormData] = useState({
    // Owner Details
    ownerName: "",
    email: "",
    phone: "",
    relationship: "",

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
    viewingSchedule: "",

    // Features
    features: [] as string[],

    // Files
    images: [] as File[],
    floorPlans: [] as File[],
    documents: [] as File[],

    // Agent Help
    wantAgentHelp: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const propertyTypes = ["Apartment", "Villa", "Townhouse", "Penthouse", "Studio"]
  const relationshipTypes = ["Owner", "Authorized Representative", "Power of Attorney"]
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

    console.log("[v0] Owner listing form submitted:", formData)
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
              <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerName" className="mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ownerName: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="relationship" className="mb-2 block">
                    Relationship to Property *
                  </Label>
                  <Select
                    value={formData.relationship}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, relationship: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              </div>
            </div>

            {/* Agent Help Option */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 mb-2">Need help from a professional agent?</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Our certified agents can help you price, market, and sell your property more effectively.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wantAgentHelp"
                      checked={formData.wantAgentHelp}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, wantAgentHelp: checked as boolean }))
                      }
                    />
                    <Label htmlFor="wantAgentHelp" className="text-sm cursor-pointer">
                      Yes, I'd like to connect with an agent
                    </Label>
                  </div>
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
                    placeholder="e.g., Beautiful 2BR Apartment with Sea View"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="mb-2 block">
                    Address *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
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
                    placeholder="Describe your property, its best features, and what makes it special..."
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
              <h3 className="text-lg font-semibold mb-4">Viewing Schedule</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="listingDate" className="mb-2 block">
                    Available From
                  </Label>
                  <Input
                    id="listingDate"
                    type="date"
                    value={formData.listingDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, listingDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="viewingSchedule" className="mb-2 block">
                    Preferred Viewing Times
                  </Label>
                  <Input
                    id="viewingSchedule"
                    value={formData.viewingSchedule}
                    onChange={(e) => setFormData((prev) => ({ ...prev, viewingSchedule: e.target.value }))}
                    placeholder="e.g., Weekends 10AM-6PM"
                  />
                </div>
              </div>
            </div>
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

                {/* Ownership Documents */}
                <div>
                  <Label className="mb-2 block">Ownership Documents (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload title deed, ownership proof, or authorization documents
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
              <h1 className="text-2xl font-bold">Owner Listing</h1>
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
              className="h-2 bg-primary rounded-full transition-all duration-300"
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
                    {currentStep === 1 && "Owner Information"}
                    {currentStep === 2 && "Property Details"}
                    {currentStep === 3 && "Features & Schedule"}
                    {currentStep === 4 && "Upload Files"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Tell us about yourself and your relationship to the property"}
                    {currentStep === 2 && "Provide detailed information about your property"}
                    {currentStep === 3 && "Select amenities and set viewing preferences"}
                    {currentStep === 4 && "Upload property images and supporting documents"}
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
                    Owner's Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Great Photos</p>
                      <p className="text-muted-foreground">
                        Take photos during daylight hours, clean and declutter first
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Honest Description</p>
                      <p className="text-muted-foreground">
                        Highlight unique features and be transparent about any issues
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Fair Pricing</p>
                      <p className="text-muted-foreground">
                        Research similar properties in your area for competitive pricing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Safety Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">• Always verify buyer identity before viewings</p>
                  <p className="text-muted-foreground">• Consider having someone present during viewings</p>
                  <p className="text-muted-foreground">• Use secure payment methods for transactions</p>
                  <p className="text-muted-foreground">• Keep personal documents secure</p>
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

export default OwnerListingForm
