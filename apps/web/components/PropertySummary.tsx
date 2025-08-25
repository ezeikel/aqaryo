import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, MapPin, Calendar, Home } from "lucide-react"

type Property = {
  title: string
  price: string
  location: string
  beds: number
  baths: number
  area: string
  propertyType: string
  furnished: boolean
  tags: string[]
  listedAt: string
}

type PropertySummaryProps = {
  property: Property
}

const PropertySummary = ({ property }: PropertySummaryProps) => {
  const getPriceBreakdown = () => {
    const priceParts = property.price.split(" ")
    const currency = priceParts[0] // AED
    const amount = priceParts[1] // 1,600,000
    const period = priceParts.slice(2).join(" ") // yearly

    // Calculate monthly breakdown if it's a yearly price
    let monthlyBreakdown = ""
    if (period.toLowerCase().includes("yearly") || period.toLowerCase().includes("year")) {
      const numericAmount = Number.parseFloat(amount.replace(/,/g, ""))
      const monthlyAmount = Math.round(numericAmount / 12)
      monthlyBreakdown = `${currency} ${monthlyAmount.toLocaleString()}/mo`
    }

    return { currency, amount, period, monthlyBreakdown }
  }

  const { currency, amount, period, monthlyBreakdown } = getPriceBreakdown()

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">{property.title}</h1>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{property.location}</span>
      </div>

      {/* Price - Most Prominent */}
      <div className="py-4 border-y border-border">
        <div className="flex items-baseline gap-2">
          <span className="text-xl text-muted-foreground font-medium">{currency}</span>
          <span className="text-4xl md:text-5xl font-bold text-foreground">{amount}</span>
          <span className="text-xl text-muted-foreground font-medium">{period}</span>
        </div>
        {monthlyBreakdown && (
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">({monthlyBreakdown})</span>
          </div>
        )}
      </div>

      {/* Property Details Grid */}
      <div className="flex flex-wrap gap-6 md:gap-8">
        <div className="flex items-center gap-3 min-w-0">
          <Bed className="w-5 h-5 text-muted-foreground" />
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold">{property.beds}</span>
            <span className="text-sm text-muted-foreground">bedrooms</span>
          </div>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <Bath className="w-5 h-5 text-muted-foreground" />
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold">{property.baths}</span>
            <span className="text-sm text-muted-foreground">bathrooms</span>
          </div>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <Square className="w-5 h-5 text-muted-foreground" />
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold">{property.area}</span>
            <span className="text-sm text-muted-foreground">area</span>
          </div>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <Home className="w-5 h-5 text-muted-foreground" />
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{property.propertyType}</span>
            <span className="text-sm text-muted-foreground">property type</span>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Listed {property.listedAt}</span>
        </div>
        <div>
          <span className="text-muted-foreground">{property.furnished ? "Furnished" : "Unfurnished"}</span>
        </div>
      </div>

      {/* Tags */}
      {property.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {property.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export { PropertySummary }
