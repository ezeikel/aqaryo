import { Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentCard } from "@/components/AgentCard"

// Mock data for agents
const mockAgents = [
  {
    id: "1",
    name: "Sarah Ahmed",
    title: "Senior Property Consultant",
    company: "Emirates Real Estate",
    image: "/agent-sarah-ahmed.png",
    rating: 4.9,
    reviewCount: 127,
    nationality: "UAE",
    languages: ["English", "Arabic"],
    specializations: ["Luxury Properties", "Downtown Dubai"],
    forSale: 23,
    forRent: 15,
    responseTime: "Within 1 hour",
    experience: "8 years",
    isSuper: true,
    phone: "+971 50 123 4567",
    email: "sarah.ahmed@emiratesre.com",
  },
  {
    id: "2",
    name: "Mohammed Hassan",
    title: "Property Investment Advisor",
    company: "Dubai Properties Group",
    image: "/agent-mohammed-hassan.png",
    rating: 4.8,
    reviewCount: 89,
    nationality: "Egypt",
    languages: ["Arabic", "English", "French"],
    specializations: ["Investment Properties", "Dubai Marina"],
    forSale: 31,
    forRent: 8,
    responseTime: "Within 2 hours",
    experience: "12 years",
    isSuper: true,
    phone: "+971 55 987 6543",
    email: "m.hassan@dpgroup.ae",
  },
  {
    id: "3",
    name: "Priya Sharma",
    title: "Residential Specialist",
    company: "Global Realty",
    image: "/agent-priya-sharma.png",
    rating: 4.7,
    reviewCount: 156,
    nationality: "India",
    languages: ["English", "Hindi", "Urdu"],
    specializations: ["Family Homes", "Dubai Hills Estate"],
    forSale: 18,
    forRent: 27,
    responseTime: "Within 30 minutes",
    experience: "6 years",
    isSuper: false,
    phone: "+971 52 456 7890",
    email: "priya.sharma@globalrealty.ae",
  },
  {
    id: "4",
    name: "James Wilson",
    title: "Commercial Property Expert",
    company: "Business Bay Realty",
    image: "/agent-james-wilson.png",
    rating: 4.9,
    reviewCount: 203,
    nationality: "UK",
    languages: ["English"],
    specializations: ["Commercial Properties", "Business Bay"],
    forSale: 45,
    forRent: 12,
    responseTime: "Within 1 hour",
    experience: "15 years",
    isSuper: true,
    phone: "+971 50 789 0123",
    email: "james.wilson@bbr.ae",
  },
  {
    id: "5",
    name: "Fatima Al Zahra",
    title: "Luxury Property Consultant",
    company: "Prestige Properties",
    image: "/agent-fatima-al-zahra.png",
    rating: 4.8,
    reviewCount: 94,
    nationality: "UAE",
    languages: ["Arabic", "English"],
    specializations: ["Luxury Villas", "Palm Jumeirah"],
    forSale: 12,
    forRent: 6,
    responseTime: "Within 45 minutes",
    experience: "10 years",
    isSuper: true,
    phone: "+971 55 234 5678",
    email: "fatima.alzahra@prestige.ae",
  },
  {
    id: "6",
    name: "David Chen",
    title: "Property Advisor",
    company: "Metro Realty",
    image: "/agent-david-chen.png",
    rating: 4.6,
    reviewCount: 67,
    nationality: "Singapore",
    languages: ["English", "Mandarin"],
    specializations: ["Apartments", "DIFC"],
    forSale: 19,
    forRent: 22,
    responseTime: "Within 2 hours",
    experience: "5 years",
    isSuper: false,
    phone: "+971 52 345 6789",
    email: "david.chen@metrorealty.ae",
  },
]

const mockCompanies = [
  {
    id: "1",
    name: "Emirates Real Estate",
    logo: "/placeholder.svg",
    rating: 4.8,
    agentCount: 45,
    activeListings: 234,
    specializations: ["Luxury Properties", "Commercial"],
    established: "2010",
  },
  {
    id: "2",
    name: "Dubai Properties Group",
    logo: "/placeholder.svg",
    rating: 4.7,
    agentCount: 67,
    activeListings: 189,
    specializations: ["Investment", "Residential"],
    established: "2008",
  },
  {
    id: "3",
    name: "Global Realty",
    logo: "/placeholder.svg",
    rating: 4.6,
    agentCount: 32,
    activeListings: 156,
    specializations: ["Family Homes", "Apartments"],
    established: "2015",
  },
]

export default function FindAgentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/dubai-luxury-development-hero.png')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find your agent to find a home</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Connect with Dubai's top real estate professionals
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="agents" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="agents" className="text-lg py-3">
                  Agents
                </TabsTrigger>
                <TabsTrigger value="companies" className="text-lg py-3">
                  Companies
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agents">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Enter location or agent name" className="pl-10" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Service needed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential-sale">Residential For Sale</SelectItem>
                        <SelectItem value="residential-rent">Residential For Rent</SelectItem>
                        <SelectItem value="commercial-sale">Commercial For Sale</SelectItem>
                        <SelectItem value="commercial-rent">Commercial For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="mandarin">Mandarin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="companies">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Enter location or company name" className="pl-10" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">Luxury Properties</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* SuperAgent Section */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Find your SuperAgent</h2>
              <p className="text-lg text-muted-foreground mb-6">
                The most responsive agents with up-to-date and improved accuracy on the properties you are searching
                for.
              </p>
              <Button variant="outline" size="lg">
                Learn more
              </Button>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2023%2C%202025%2C%2003_31_38%20PM-kIspv5m0RYlzjMmzr3UH8XaFVeXjtq.png"
                  alt="SuperAgent illustration"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="agents" className="w-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Featured Agents</h2>
                <p className="text-muted-foreground">{mockAgents.length} agents found in Dubai</p>
              </div>
              <div className="flex gap-4">
                <Select defaultValue="rating">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="listings">Most Listings</SelectItem>
                    <SelectItem value="response">Fastest Response</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="agents">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="companies">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCompanies.map((company) => (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{company.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{company.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Agents:</span>
                          <span className="font-medium">{company.agentCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Active Listings:</span>
                          <span className="font-medium">{company.activeListings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Established:</span>
                          <span className="font-medium">{company.established}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {company.specializations.map((spec) => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-transparent" variant="outline">
                        View Company Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
