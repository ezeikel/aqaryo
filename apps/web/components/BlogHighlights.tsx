import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const BlogHighlights = () => {
  const blogPosts = [
    {
      id: "buying-in-uae", // Added id for linking to blog posts
      title: "Buying in the UAE",
      excerpt: "Complete guide to purchasing property in the United Arab Emirates as a foreign investor.",
      image: "/uae-property-guide-dubai.png",
      readTime: "5 min read",
    },
    {
      id: "freehold-vs-leasehold", // Added id for linking to blog posts
      title: "Freehold vs Leasehold",
      excerpt: "Understanding the key differences between freehold and leasehold properties in the Gulf.",
      image: "/property-ownership-types.png",
      readTime: "3 min read",
    },
    {
      id: "renting-as-expat", // Added id for linking to blog posts
      title: "Renting as a New Expat",
      excerpt: "Essential tips for expatriates looking to rent their first property in Dubai or Riyadh.",
      image: "/dubai-expat-apartment-keys.png",
      readTime: "4 min read",
    },
  ]

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Property Guides</h2>
        <p className="text-muted-foreground">Expert insights to help you make informed decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow overflow-hidden p-0">
            <div className="relative">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium">{post.readTime}</div>
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>

              <Link href={`/blog/${post.id}`}>
                <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export { BlogHighlights }
