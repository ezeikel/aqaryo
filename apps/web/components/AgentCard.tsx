"use client"

import { Star, Phone, Mail, MessageCircle, Award, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Agent = {
  id: string
  name: string
  title: string
  company: string
  image: string
  rating: number
  reviewCount: number
  nationality: string
  languages: string[]
  specializations: string[]
  forSale: number
  forRent: number
  responseTime: string
  experience: string
  isSuper: boolean
  phone: string
  email: string
}

type AgentCardProps = {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${agent.name}, I'm interested in your real estate services. Please contact me.`,
    )
    const phoneNumber = agent.phone.replace(/[^0-9]/g, "")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleCall = () => {
    window.open(`tel:${agent.phone}`, "_self")
  }

  const handleEmail = () => {
    window.open(`mailto:${agent.email}`, "_self")
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 pt-0">
      <CardContent className="p-6">
        {/* Agent Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={agent.image || "/placeholder.svg"}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{agent.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{agent.title}</p>
            <p className="text-sm font-medium text-primary">{agent.company}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{agent.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({agent.reviewCount} reviews)</span>
          </div>
          {agent.isSuper && (
            <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">
              <Award className="w-3 h-3 mr-1" />
              SUPER
            </Badge>
          )}
        </div>

        {/* Agent Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Nationality:</span>
            <span className="font-medium">{agent.nationality}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Languages:</span>
            <span className="font-medium">{agent.languages.join(", ")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Response time:</span>
            <span className="font-medium">{agent.responseTime}</span>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Specializations:</p>
          <div className="flex flex-wrap gap-1">
            {agent.specializations.map((spec) => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="font-semibold text-lg">{agent.forSale}</div>
            <div className="text-xs text-muted-foreground">For Sale</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{agent.forRent}</div>
            <div className="text-xs text-muted-foreground">For Rent</div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCall}
            className="flex items-center justify-center gap-1 bg-transparent"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">Call</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEmail}
            className="flex items-center justify-center gap-1 bg-transparent"
          >
            <Mail className="w-3 h-3" />
            <span className="hidden sm:inline">Email</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1 text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
          >
            <MessageCircle className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
