"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Building, Star } from "lucide-react"

type Developer = {
  id: string
  name: string
  logo: string
  description: string
  location: string
  projectsCount: number
  rating: number
  specialties: string[]
  featuredProjects: string[]
}

const developers: Developer[] = [
  {
    id: "1",
    name: "Emaar Properties",
    logo: "/emaar-logo.png",
    description:
      "Leading real estate developer in the UAE, known for iconic projects like Burj Khalifa and Dubai Mall.",
    location: "Dubai, UAE",
    projectsCount: 45,
    rating: 4.8,
    specialties: ["Luxury Residential", "Commercial", "Mixed-Use"],
    featuredProjects: ["Downtown Dubai", "Dubai Hills Estate", "Emaar Beachfront"],
  },
  {
    id: "2",
    name: "DAMAC Properties",
    logo: "/generic-luxury-developer-logo.png",
    description: "Luxury real estate developer specializing in high-end residential and commercial properties.",
    location: "Dubai, UAE",
    projectsCount: 38,
    rating: 4.6,
    specialties: ["Luxury Villas", "High-rise Apartments", "Golf Communities"],
    featuredProjects: ["DAMAC Hills", "AKOYA Oxygen", "DAMAC Lagoons"],
  },
  {
    id: "3",
    name: "Nakheel",
    logo: "/placeholder-irplw.png",
    description: "Dubai-based developer famous for creating Palm Jumeirah and other innovative waterfront communities.",
    location: "Dubai, UAE",
    projectsCount: 28,
    rating: 4.7,
    specialties: ["Waterfront Communities", "Islands", "Retail"],
    featuredProjects: ["Palm Jumeirah", "The World Islands", "Dragon City"],
  },
  {
    id: "4",
    name: "Aldar Properties",
    logo: "/aldar-logo.png",
    description: "Abu Dhabi's leading real estate developer, creating sustainable communities and landmarks.",
    location: "Abu Dhabi, UAE",
    projectsCount: 32,
    rating: 4.5,
    specialties: ["Sustainable Communities", "Mixed-Use", "Infrastructure"],
    featuredProjects: ["Yas Island", "Al Raha Beach", "Saadiyat Island"],
  },
  {
    id: "5",
    name: "Dubai Properties",
    logo: "/dubai-properties-logo.png",
    description: "Government-backed developer focused on creating integrated communities across Dubai.",
    location: "Dubai, UAE",
    projectsCount: 25,
    rating: 4.4,
    specialties: ["Integrated Communities", "Affordable Housing", "Commercial"],
    featuredProjects: ["Jumeirah Beach Residence", "Business Bay", "Dubai Wharf"],
  },
  {
    id: "6",
    name: "Sobha Realty",
    logo: "/generic-geometric-logo.png",
    description: "Premium developer known for luxury residences and attention to detail in construction.",
    location: "Dubai, UAE",
    projectsCount: 18,
    rating: 4.9,
    specialties: ["Luxury Residences", "Premium Finishes", "Golf Communities"],
    featuredProjects: ["Sobha Hartland", "District One", "Sobha Creek Vistas"],
  },
]

const DevelopersPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties")

  const filteredDevelopers = developers.filter((developer) => {
    const matchesSearch =
      developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      developer.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = locationFilter === "All Locations" || developer.location.includes(locationFilter)
    const matchesSpecialty =
      specialtyFilter === "All Specialties" || developer.specialties.some((s) => s.includes(specialtyFilter))

    return matchesSearch && matchesLocation && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-muted/30 to-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Top Property Developers</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover leading real estate developers across the Gulf region. Find your perfect development partner.
            </p>

            {/* Search and Filters */}
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search developers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Locations">All Locations</SelectItem>
                    <SelectItem value="Dubai">Dubai</SelectItem>
                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Specialties">All Specialties</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                    <SelectItem value="Waterfront">Waterfront</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDevelopers.map((developer) => (
              <Card key={developer.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Logo and Rating */}
                    <div className="flex items-start justify-between">
                      <img
                        src={developer.logo || "/placeholder.svg"}
                        alt={`${developer.name} logo`}
                        className="h-12 w-auto object-contain"
                      />
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{developer.rating}</span>
                      </div>
                    </div>

                    {/* Developer Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {developer.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {developer.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="w-4 h-4" />
                        {developer.projectsCount} Projects
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3">{developer.description}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {developer.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Featured Projects */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Featured Projects:</h4>
                      <div className="text-xs text-muted-foreground">
                        {developer.featuredProjects.slice(0, 2).join(", ")}
                        {developer.featuredProjects.length > 2 && "..."}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      View Projects
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDevelopers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No developers found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export { DevelopersPage }
