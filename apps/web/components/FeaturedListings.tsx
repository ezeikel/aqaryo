import { PropertyCard } from "@/components/PropertyCard"
import { TranslatedText } from "@/components/ui/TranslatedText"

const FeaturedListings = () => {
  const featuredProperties = [
    {
      title: "2 bed apartment in Dubai Marina",
      price: "AED 110,000 yearly",
      location: "Dubai Marina, Dubai",
      beds: 2,
      baths: 2,
      area: "1,150 sqft",
      tags: ["Furnished", "Sea view"],
      image: "/dubai-marina-apartment.png",
      listedAt: "3 days ago",
    },
    {
      title: "3 bed villa in Arabian Ranches",
      price: "AED 180,000 yearly",
      location: "Arabian Ranches, Dubai",
      beds: 3,
      baths: 3,
      area: "2,200 sqft",
      tags: ["Furnished", "Garden", "Pool"],
      image: "/luxury-villa-arabian-ranches-garden-pool.png",
      listedAt: "1 week ago",
    },
    {
      title: "1 bed apartment in Downtown",
      price: "AED 85,000 yearly",
      location: "Downtown Dubai, Dubai",
      beds: 1,
      baths: 1,
      area: "750 sqft",
      tags: ["New", "Burj Khalifa view"],
      image: "/dubai-apartment-view.png",
      listedAt: "2 days ago",
    },
    {
      title: "4 bed penthouse in JBR",
      price: "AED 350,000 yearly",
      location: "JBR, Dubai",
      beds: 4,
      baths: 4,
      area: "3,500 sqft",
      tags: ["Penthouse", "Beach access", "Furnished"],
      image: "/luxury-penthouse-jbr.png",
      listedAt: "5 days ago",
    },
  ]

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <TranslatedText 
          t="featuredListings.title"
          as="h2"
          className="text-3xl font-bold text-foreground"
          fallback="Featured Listings"
        />
        <TranslatedText 
          t="featuredListings.subtitle"
          as="p"
          className="text-muted-foreground"
          fallback="Discover our handpicked selection of premium properties"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProperties.map((property, index) => (
          <PropertyCard
            key={index}
            {...property}
          />
        ))}
      </div>
    </section>
  )
}

export { FeaturedListings }
