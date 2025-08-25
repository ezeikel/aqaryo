"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Calendar, Calculator, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Agent = {
  name: string
  company: string
  phone: string
  email: string
  image: string
}

type Property = {
  title: string
  price: string
}

type ContactAgentSidebarProps = {
  agent: Agent
  property: Property
}

const ContactAgentSidebar = ({ agent, property }: ContactAgentSidebarProps) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in ${property.title}. Please contact me with more details.`,
  })
  const [mortgageCalc, setMortgageCalc] = useState({
    price: 110000,
    deposit: 22000,
    term: 25,
    rate: 3.5,
  })
  const { toast } = useToast()

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      description: "Your message has been sent to the agent",
      duration: 3000,
    })
    setContactForm({ name: "", email: "", phone: "", message: "" })
  }

  const calculateMortgage = () => {
    const principal = mortgageCalc.price - mortgageCalc.deposit
    const monthlyRate = mortgageCalc.rate / 100 / 12
    const numPayments = mortgageCalc.term * 12

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    return isNaN(monthlyPayment) ? 0 : monthlyPayment
  }

  return (
    <div className="space-y-6 sticky top-8">
      {/* Agent Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Agent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={agent.image || "/placeholder.svg"} alt={agent.name} />
              <AvatarFallback>
                {agent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{agent.name}</p>
              <p className="text-sm text-muted-foreground">{agent.company}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a href={`tel:${agent.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                {agent.phone}
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a
                href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${encodeURIComponent(property.title)}. Please contact me with more details.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                {agent.phone}
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a href={`mailto:${agent.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                {agent.email}
              </a>
            </Button>
          </div>

          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Viewing
          </Button>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Send Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="Your phone"
              value={contactForm.phone}
              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
            />
            <Textarea
              placeholder="Your message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              rows={4}
              required
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Mortgage Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Mortgage Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Property Price (AED)</label>
              <Input
                type="number"
                value={mortgageCalc.price}
                onChange={(e) => setMortgageCalc({ ...mortgageCalc, price: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Deposit (AED)</label>
              <Input
                type="number"
                value={mortgageCalc.deposit}
                onChange={(e) => setMortgageCalc({ ...mortgageCalc, deposit: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Term (years)</label>
              <Input
                type="number"
                value={mortgageCalc.term}
                onChange={(e) => setMortgageCalc({ ...mortgageCalc, term: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <Input
                type="number"
                step="0.1"
                value={mortgageCalc.rate}
                onChange={(e) => setMortgageCalc({ ...mortgageCalc, rate: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Monthly Payment</p>
            <p className="text-2xl font-bold text-primary">
              AED {calculateMortgage().toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { ContactAgentSidebar }
