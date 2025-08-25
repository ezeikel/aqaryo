import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Home, ArrowRight, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">List Your Property</h1>
            <p className="text-xl text-muted-foreground">Choose how you'd like to list your property on Aqaryo</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Agent Option */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">I am an Agent</CardTitle>
              <CardDescription className="text-base">
                Professional real estate agent with proper licensing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>Licensed professional verification</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>Agency branding and contact details</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Priority listing review</span>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/list-property/agent" className="flex items-center justify-center gap-2">
                    Continue as Agent
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Owner Option */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">I am an Owner</CardTitle>
              <CardDescription className="text-base">Property owner looking to sell or rent directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Home className="w-4 h-4 text-muted-foreground" />
                  <span>Direct owner verification</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>Optional agent connection</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>Guided listing process</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <Link href="/list-property/owner" className="flex items-center justify-center gap-2">
                    Continue as Owner
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Quality Standards & Review Process</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All listings undergo quality review to ensure accuracy and compliance with local regulations. Review
              typically takes 24-48 hours. Incomplete or fraudulent listings will be rejected. By proceeding, you agree
              to our listing standards and terms of service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
