import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Bookmark, Heart } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock blog post data - in production this would come from a CMS or database
const getBlogPost = (slug: string) => {
  const posts = {
    "buying-in-uae": {
      id: "buying-in-uae",
      title: "Complete Guide to Buying Property in the UAE",
      excerpt:
        "Everything you need to know about purchasing real estate in Dubai, Abu Dhabi, and other Emirates as an international buyer.",
      content: `
        <h2>Introduction</h2>
        <p>The United Arab Emirates has become one of the world's most attractive destinations for property investment. With its strategic location, tax-free environment, and world-class infrastructure, the UAE offers unique opportunities for both residential and commercial real estate investments.</p>
        
        <h2>Legal Framework for Foreign Ownership</h2>
        <p>Foreign nationals can own freehold properties in designated areas across the UAE. These areas include popular locations in Dubai such as Dubai Marina, Downtown Dubai, and Palm Jumeirah, as well as areas in Abu Dhabi like Al Reem Island and Saadiyat Island.</p>
        
        <h2>Key Steps in the Buying Process</h2>
        <ol>
          <li><strong>Property Search:</strong> Identify suitable properties through licensed real estate agents or reputable property portals.</li>
          <li><strong>Due Diligence:</strong> Verify property ownership, check for any liens or disputes, and ensure all documentation is in order.</li>
          <li><strong>Reservation:</strong> Pay a reservation fee (typically 1-5% of property value) to secure the property.</li>
          <li><strong>Sales Agreement:</strong> Sign the Sale and Purchase Agreement (SPA) and pay 10% of the property value.</li>
          <li><strong>Mortgage Approval:</strong> If financing is required, obtain mortgage pre-approval from a UAE bank.</li>
          <li><strong>Final Payment:</strong> Complete the remaining payment and transfer ownership at the Dubai Land Department or relevant authority.</li>
        </ol>
        
        <h2>Financing Options</h2>
        <p>UAE banks offer mortgages to both residents and non-residents, though terms may vary. Non-residents typically need to provide a higher down payment (usually 30-50%) and may face higher interest rates. Popular banks offering property financing include Emirates NBD, ADCB, and Mashreq Bank.</p>
        
        <h2>Additional Costs to Consider</h2>
        <ul>
          <li>Dubai Land Department fee: 4% of property value</li>
          <li>Real estate agent commission: 2-5% of property value</li>
          <li>Mortgage arrangement fee: 1-2% of loan amount</li>
          <li>Property valuation: AED 2,500-5,000</li>
          <li>Legal fees: AED 5,000-15,000</li>
        </ul>
        
        <h2>Popular Investment Areas</h2>
        <p>Dubai Marina, Downtown Dubai, Business Bay, and Dubai Hills Estate are among the most popular areas for property investment, offering high rental yields and capital appreciation potential.</p>
        
        <h2>Conclusion</h2>
        <p>Buying property in the UAE can be a rewarding investment when done correctly. It's essential to work with licensed professionals, conduct thorough due diligence, and understand all associated costs and legal requirements.</p>
      `,
      image: "/uae-property-guide-dubai.png",
      readTime: "8 min read",
      date: "December 10, 2024",
      author: "Ahmed Hassan",
      category: "Buying Guide",
      tags: ["UAE", "Property Investment", "Dubai", "Foreign Ownership", "Real Estate"],
    },
    "freehold-vs-leasehold": {
      id: "freehold-vs-leasehold",
      title: "Freehold vs Leasehold Properties: What You Need to Know",
      excerpt:
        "Understanding the key differences between freehold and leasehold properties in the Gulf region and their implications for investors.",
      content: `
        <h2>Understanding Property Ownership Types</h2>
        <p>When investing in real estate in the UAE, it's crucial to understand the difference between freehold and leasehold properties, as this affects your ownership rights, investment potential, and long-term financial planning.</p>
        
        <h2>Freehold Properties</h2>
        <p>Freehold ownership grants you complete ownership of both the property and the land it sits on. This is the most comprehensive form of property ownership available to foreign investors in the UAE.</p>
        
        <h3>Benefits of Freehold Ownership:</h3>
        <ul>
          <li>Permanent ownership with no time restrictions</li>
          <li>Right to sell, lease, or mortgage the property</li>
          <li>Potential for capital appreciation</li>
          <li>Eligibility for UAE residence visa</li>
          <li>Freedom to modify or renovate (subject to regulations)</li>
        </ul>
        
        <h2>Leasehold Properties</h2>
        <p>Leasehold properties grant you ownership rights for a specific period, typically 99 years in the UAE. While you own the property, the land remains owned by the original landowner or government.</p>
        
        <h3>Characteristics of Leasehold:</h3>
        <ul>
          <li>Fixed-term ownership (usually 99 years)</li>
          <li>Lower initial purchase price compared to freehold</li>
          <li>Potential for lease renewal (subject to terms)</li>
          <li>Some restrictions on modifications</li>
          <li>May require ground rent payments</li>
        </ul>
        
        <h2>Investment Considerations</h2>
        <p>Freehold properties generally offer better long-term investment potential due to permanent ownership rights and typically higher resale values. However, leasehold properties can provide entry into premium locations at lower initial costs.</p>
        
        <h2>Popular Freehold Areas in Dubai</h2>
        <ul>
          <li>Dubai Marina</li>
          <li>Downtown Dubai</li>
          <li>Palm Jumeirah</li>
          <li>Dubai Hills Estate</li>
          <li>Business Bay</li>
        </ul>
        
        <h2>Making the Right Choice</h2>
        <p>Your choice between freehold and leasehold should depend on your investment goals, budget, and long-term plans. Consult with qualified real estate professionals to make an informed decision.</p>
      `,
      image: "/property-ownership-types.png",
      readTime: "6 min read",
      date: "December 8, 2024",
      author: "Fatima Al-Zahra",
      category: "Legal",
      tags: ["Freehold", "Leasehold", "Property Ownership", "Investment", "Legal"],
    },
  }

  return posts[slug as keyof typeof posts] || null
}

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = [
    {
      id: "mortgage-guide-uae",
      title: "Getting a Mortgage in the UAE",
      image: "/mortgage-documents.png",
      readTime: "7 min read",
    },
    {
      id: "dubai-property-trends-2024",
      title: "Dubai Property Market Trends 2024",
      image: "/dubai-market-trends.png",
      readTime: "6 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="space-y-6 mb-8">
            <div className="space-y-4">
              <Badge variant="secondary">{post.category}</Badge>
              <h1 className="text-4xl font-bold text-foreground leading-tight">{post.title}</h1>
              <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} className="space-y-6 text-foreground" />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Related Posts */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="bg-white/90 px-2 py-1 rounded text-xs font-medium">{relatedPost.readTime}</div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{relatedPost.title}</h4>
                    <Link href={`/blog/${relatedPost.id}`}>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80 mt-2"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostPage
