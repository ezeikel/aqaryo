import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
            <p className="text-muted-foreground">Sorry, we couldn't find the page you're looking for.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/buy">
                <Search className="w-4 h-4 mr-2" />
                Search properties
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
