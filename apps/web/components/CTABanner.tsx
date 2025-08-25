import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const CTABanner = () => {
  return (
    <section>
      <Card className="bg-gradient-to-r from-accent/10 to-secondary/20 border-accent/20">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Create an account to save your favourite listings and get alerts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Never miss out on your dream property. Get instant notifications when new listings match your criteria.
            </p>
          </div>

          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
            Create Account
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

export { CTABanner }
