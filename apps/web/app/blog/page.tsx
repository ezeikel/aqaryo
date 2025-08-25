import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

const BlogPage = () => {
  const featuredPost = {
    id: "buying-in-uae-2024",
    title: "Complete Guide to Buying Property in the UAE as a Foreign Investor",
    excerpt:
      "Everything you need to know about purchasing real estate in Dubai, Abu Dhabi, and other Emirates as an international buyer in 2024.",
    image: "/uae-property-guide-dubai.png",
    readTime: "8 min read",
    date: "December 15, 2024",
    author: "Sarah Al-Mansouri",
    category: "Investment Guide",
    featured: true,
  }

  const blogPosts = [
    {
      id: "buying-in-uae",
      title: "Buying in the UAE",
      excerpt: "Complete guide to purchasing property in the United Arab Emirates as a foreign investor.",
      image: "/uae-property-guide-dubai.png",
      readTime: "5 min read",
      date: "December 10, 2024",
      author: "Ahmed Hassan",
      category: "Buying Guide",
    },
    {
      id: "freehold-vs-leasehold",
      title: "Freehold vs Leasehold Properties",
      excerpt: "Understanding the key differences between freehold and leasehold properties in the Gulf region.",
      image: "/property-ownership-types.png",
      readTime: "3 min read",
      date: "December 8, 2024",
      author: "Fatima Al-Zahra",
      category: "Legal",
    },
    {
      id: "renting-as-expat",
      title: "Renting as a New Expat",
      excerpt: "Essential tips for expatriates looking to rent their first property in Dubai or other major cities.",
      image: "/dubai-expat-apartment-keys.png",
      readTime: "4 min read",
      date: "December 5, 2024",
      author: "Michael Johnson",
      category: "Renting Guide",
    },
    {
      id: "dubai-property-trends-2024",
      title: "Dubai Property Market Trends 2024",
      excerpt: "Analysis of the latest trends, prices, and opportunities in Dubai's real estate market.",
      image: "/dubai-property-market.png",
      readTime: "6 min read",
      date: "December 3, 2024",
      author: "Layla Mahmoud",
      category: "Market Analysis",
    },
    {
      id: "mortgage-guide-uae",
      title: "Getting a Mortgage in the UAE",
      excerpt: "Step-by-step guide to securing property financing as an expat or UAE national.",
      image: "/placeholder-g0prs.png",
      readTime: "7 min read",
      date: "November 28, 2024",
      author: "Omar Al-Rashid",
      category: "Finance",
    },
    {
      id: "off-plan-properties",
      title: "Investing in Off-Plan Properties",
      excerpt: "Pros, cons, and key considerations when buying properties before construction completion.",
      image: "/dubai-construction.png",
      readTime: "5 min read",
      date: "November 25, 2024",
      author: "Nadia Khalil",
      category: "Investment",
    },
  ]

  const categories = ["All", "Buying Guide", "Renting Guide", "Investment", "Legal", "Market Analysis", "Finance"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Property Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert guides, market insights, and practical advice for your real estate journey
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.id}`}>
                  <Button className="w-full md:w-auto mt-4">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow overflow-hidden p-0">
                <div className="relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium">{post.readTime}</div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>

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
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
