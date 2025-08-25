import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, User } from "lucide-react"
import Link from "next/link"

export default function ListPropertyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">List Your Property</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">Choose how you'd like to list your property</p>
          </div>
        </div>
      </div>

      {/* Options Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Agent Option */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    <Building className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">I am an Agent</CardTitle>
                  <CardDescription className="text-base">
                    Professional real estate agent with proper licensing
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                    <li>• Access to professional tools</li>
                    <li>• Multiple property listings</li>
                    <li>• Advanced analytics</li>
                    <li>• Lead management system</li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/list-property/agent">Continue as Agent</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Owner Option */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-secondary/10 rounded-full w-fit">
                    <User className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">I am an Owner</CardTitle>
                  <CardDescription className="text-base">
                    Property owner looking to sell or rent directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                    <li>• Simple listing process</li>
                    <li>• Direct buyer contact</li>
                    <li>• No commission fees</li>
                    <li>• Easy property management</li>
                  </ul>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/list-property/owner">Continue as Owner</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
