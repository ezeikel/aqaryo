import { Hero } from "@/components/Hero"
import { FeaturedListings } from "@/components/FeaturedListings"
import { NewDevelopments } from "@/components/NewDevelopments"
import { CTABanner } from "@/components/CTABanner"
import { BlogHighlights } from "@/components/BlogHighlights"

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-16">
        <FeaturedListings />
        <NewDevelopments />
        <CTABanner />
        <BlogHighlights />
      </div>
    </div>
  )
}

export default HomePage
