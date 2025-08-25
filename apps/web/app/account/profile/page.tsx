import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccountSidebar } from "@/components/AccountSidebar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Building, Shield, Star } from "lucide-react"

// Mock profile data
const profileData = {
  name: "Ahmed Al-Rashid",
  email: "ahmed@aqaryo.com",
  phone: "+971 50 123 4567",
  location: "Dubai, UAE",
  userType: "agent",
  company: "Premium Properties LLC",
  license: "RERA-12345",
  experience: "8 years",
  specializations: ["Luxury Properties", "Villas", "Commercial"],
  rating: 4.8,
  totalSales: 156,
  bio: "Experienced real estate agent specializing in luxury properties in Dubai. With over 8 years in the industry, I help clients find their dream homes and investment opportunities.",
  avatar: "/placeholder.svg?height=100&width=100",
}

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />

          <div className="flex-1 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-muted-foreground">Manage your account information and preferences</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={profileData.avatar || "/placeholder.svg"}
                      alt={profileData.name}
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                    <h3 className="font-semibold text-lg">{profileData.name}</h3>
                    <p className="text-muted-foreground">{profileData.company}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{profileData.rating}</span>
                      <span className="text-muted-foreground">({profileData.totalSales} sales)</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span>License: {profileData.license}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData.specializations.map((spec) => (
                        <Badge key={spec} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="mb-2 block">
                          Full Name *
                        </Label>
                        <Input id="name" defaultValue={profileData.name} />
                      </div>
                      <div>
                        <Label htmlFor="email" className="mb-2 block">
                          Email *
                        </Label>
                        <Input id="email" type="email" defaultValue={profileData.email} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="mb-2 block">
                          Phone *
                        </Label>
                        <Input id="phone" type="tel" defaultValue={profileData.phone} />
                      </div>
                      <div>
                        <Label htmlFor="location" className="mb-2 block">
                          Location
                        </Label>
                        <Input id="location" defaultValue={profileData.location} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="mb-2 block">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue={profileData.bio}
                        placeholder="Tell us about yourself and your expertise..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="userType" className="mb-2 block">
                          Account Type
                        </Label>
                        <Select defaultValue={profileData.userType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="agent">Real Estate Agent</SelectItem>
                            <SelectItem value="owner">Property Owner</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="company" className="mb-2 block">
                          Company
                        </Label>
                        <Input id="company" defaultValue={profileData.company} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="license" className="mb-2 block">
                          License Number
                        </Label>
                        <Input id="license" defaultValue={profileData.license} />
                      </div>
                      <div>
                        <Label htmlFor="experience" className="mb-2 block">
                          Years of Experience
                        </Label>
                        <Select defaultValue="8">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 year</SelectItem>
                            <SelectItem value="2">2 years</SelectItem>
                            <SelectItem value="3">3 years</SelectItem>
                            <SelectItem value="5">5 years</SelectItem>
                            <SelectItem value="8">8 years</SelectItem>
                            <SelectItem value="10">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="mb-2 block">
                        Current Password
                      </Label>
                      <Input id="currentPassword" type="password" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="newPassword" className="mb-2 block">
                          New Password
                        </Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="mb-2 block">
                          Confirm Password
                        </Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
