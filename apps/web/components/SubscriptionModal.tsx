"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap } from "lucide-react"

type SubscriptionModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubscribe: (plan: string) => void
}

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("basic")

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "99",
      period: "month",
      listings: "5",
      features: ["Up to 5 active listings", "Basic property analytics", "Email support", "Standard listing visibility"],
      icon: <Zap className="w-5 h-5" />,
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "199",
      period: "month",
      listings: "15",
      features: [
        "Up to 15 active listings",
        "Advanced analytics & insights",
        "Priority support",
        "Featured listing placement",
        "Lead management tools",
        "Custom branding",
      ],
      icon: <Crown className="w-5 h-5" />,
      popular: true,
    },
    {
      id: "professional",
      name: "Professional",
      price: "399",
      period: "month",
      listings: "Unlimited",
      features: [
        "Unlimited active listings",
        "Premium analytics dashboard",
        "Dedicated account manager",
        "Top listing placement",
        "Advanced lead tools",
        "White-label solution",
        "API access",
      ],
      icon: <Crown className="w-5 h-5" />,
      popular: false,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Your Subscription Plan</DialogTitle>
          <DialogDescription>Select a plan to start listing your properties on Aqaryo</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 mt-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id ? "ring-2 ring-primary border-primary" : "hover:shadow-lg"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  AED {plan.price}
                  <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription>{plan.listings} listings included</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onSubscribe(selectedPlan)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Subscribe to {plans.find((p) => p.id === selectedPlan)?.name} Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionModal
