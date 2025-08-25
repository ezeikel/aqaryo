"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Bed, Bath, Square, Phone, Mail, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PropertyCardProps = {
  title: string
  price: string
  location: string
  beds: number
  baths: number
  area: string
  tags: string[]
  image: string
  listedAt: string
  onViewDetails?: () => void
  compact?: boolean // Added compact prop for map view layout
  agent?: {
    name: string
    phone: string
    email: string
    company: string
  }
}

const PropertyCard = ({
  title,
  price,
  location,
  beds,
  baths,
  area,
  tags,
  image,
  listedAt,
  onViewDetails,
  compact = false, // Default compact to false
  agent = {
    name: "Sarah Ahmed",
    phone: "+971501234567",
    email: "sarah@aqaryo.com",
    company: "Aqaryo Properties",
  },
}: PropertyCardProps) => {
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      description: isSaved ? "Property removed from saved" : "Property saved successfully",
      duration: 2000,
    })
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${agent.name}, I'm interested in the property: ${title} (${price}) located in ${location}. Can you provide more details?`,
    )
    const whatsappUrl = `https://wa.me/${agent.phone.replace(/[^0-9]/g, "")}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`Inquiry about ${title}`)
    const body = encodeURIComponent(
      `Hi ${agent.name},\n\nI'm interested in the property: ${title} (${price}) located in ${location}.\n\nCould you please provide more details?\n\nThank you.`,
    )
    window.location.href = `mailto:${agent.email}?subject=${subject}&body=${body}`
  }

  const handleCall = () => {
    window.location.href = `tel:${agent.phone}`
  }

  if (compact) {
    return (
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0">
        <div className="flex">
          <div className="relative w-32 flex-shrink-0 h-full">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Button
              variant="ghost"
              size="sm"
              className={`absolute top-2 right-2 p-1 rounded-full bg-white/90 hover:bg-white ${
                isSaved ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={handleSave}
            >
              <Heart className={`w-3 h-3 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>

          <CardContent className="flex-1 p-3 space-y-2">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-muted-foreground font-medium">{price.split(" ")[0]}</span>
                {(() => {
                  const parts = price.split(" ")
                  const currency = parts[0]
                  const restParts = parts.slice(1)
                  const lastPart = restParts[restParts.length - 1]
                  const isLastPartPeriod =
                    lastPart &&
                    (lastPart.toLowerCase().includes("yearly") ||
                      lastPart.toLowerCase().includes("monthly") ||
                      lastPart.toLowerCase().includes("week"))

                  if (isLastPartPeriod && restParts.length > 1) {
                    const amount = restParts.slice(0, -1).join(" ")
                    const period = lastPart
                    return (
                      <>
                        <span className="text-lg font-bold text-primary">{amount}</span>
                        <span className="text-xs text-muted-foreground font-medium">{period}</span>
                      </>
                    )
                  } else {
                    return <span className="text-lg font-bold text-primary">{restParts.join(" ")}</span>
                  }
                })()}
              </div>
              <p className="text-muted-foreground text-xs">{location}</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="w-3 h-3" />
                <span>{beds}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-3 h-3" />
                <span>{baths}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="w-3 h-3" />
                <span>{area}</span>
              </div>
            </div>

            <div className="flex gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1 py-0">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent hover:bg-muted text-xs"
              onClick={() => {
                console.log("[v0] View Details clicked for:", title)
                if (onViewDetails) {
                  onViewDetails()
                } else {
                  console.log("[v0] No onViewDetails handler provided")
                }
              }}
            >
              View Details
            </Button>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white ${
            isSaved ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={handleSave}
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
        </Button>
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {listedAt}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3 md:p-4 space-y-2 md:space-y-3">
        <div className="space-y-1 md:space-y-2">
          <h3 className="font-semibold text-base md:text-lg line-clamp-1">{title}</h3>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-xs md:text-sm text-muted-foreground font-medium">{price.split(" ")[0]}</span>
            {(() => {
              const parts = price.split(" ")
              const currency = parts[0]
              const restParts = parts.slice(1)
              const lastPart = restParts[restParts.length - 1]
              const isLastPartPeriod =
                lastPart &&
                (lastPart.toLowerCase().includes("yearly") ||
                  lastPart.toLowerCase().includes("monthly") ||
                  lastPart.toLowerCase().includes("week"))

              if (isLastPartPeriod && restParts.length > 1) {
                const amount = restParts.slice(0, -1).join(" ")
                const period = lastPart
                return (
                  <>
                    <span className="text-xl md:text-2xl font-bold text-primary">{amount}</span>
                    <span className="text-sm md:text-base text-muted-foreground font-medium">{period}</span>
                  </>
                )
              } else {
                return <span className="text-xl md:text-2xl font-bold text-primary">{restParts.join(" ")}</span>
              }
            })()}
          </div>
          {price.toLowerCase().includes("yearly") && (
            <p className="text-xs text-muted-foreground">
              (AED {Math.round(Number.parseInt(price.replace(/[^0-9]/g, "")) / 12).toLocaleString()}/month)
            </p>
          )}
          <p className="text-muted-foreground text-xs md:text-sm">{location}</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-3 h-3 md:w-4 md:h-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3 h-3 md:w-4 md:h-4" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-3 h-3 md:w-4 md:h-4" />
            <span>{area}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 md:gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground">{agent.name}</p>
              <p className="text-xs text-muted-foreground">{agent.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 md:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCall}
              className="flex items-center justify-center gap-1 text-xs bg-transparent px-1 md:px-3"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden md:inline">Call</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmail}
              className="flex items-center justify-center gap-1 text-xs bg-transparent px-1 md:px-3"
            >
              <Mail className="w-3 h-3" />
              <span className="hidden md:inline">Email</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-1 text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100 px-1 md:px-3"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="hidden md:inline">WhatsApp</span>
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent hover:bg-muted"
          onClick={() => {
            console.log("[v0] View Details clicked for:", title)
            if (onViewDetails) {
              onViewDetails()
            } else {
              console.log("[v0] No onViewDetails handler provided")
            }
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

export { PropertyCard }
