"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LayoutDashboard, Building2, BarChart3, User, Settings, LogOut, Heart, Search, Eye, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

const sellerSidebarItems = [
  {
    title: "Dashboard",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    title: "My Listings",
    href: "/account/listings",
    icon: Building2,
  },
  {
    title: "Analytics",
    href: "/account/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/account/profile",
    icon: User,
  },
]

const buyerSidebarItems = [
  {
    title: "Dashboard",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    title: "Saved Properties",
    href: "/account/saved",
    icon: Heart,
  },
  {
    title: "Saved Searches",
    href: "/account/searches",
    icon: Search,
  },
  {
    title: "Viewing History",
    href: "/account/history",
    icon: Eye,
  },
  {
    title: "Alerts",
    href: "/account/alerts",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/account/profile",
    icon: User,
  },
]

export const AccountSidebar = () => {
  const pathname = usePathname()
  const [isSellerAccount, setIsSellerAccount] = useState(true)

  const sidebarItems = isSellerAccount ? sellerSidebarItems : buyerSidebarItems

  return (
    <Card className="w-64 h-fit p-6 sticky top-8">
      <div className="space-y-2">
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Account</h3>
          <p className="text-sm text-muted-foreground">
            {isSellerAccount ? "Manage your listings" : "Find your perfect property"}
          </p>

          <div className="flex items-center space-x-2 mt-4 p-3 bg-muted/50 rounded-lg">
            <Label htmlFor="account-type" className="text-xs text-muted-foreground">
              Dev: {isSellerAccount ? "Seller" : "Buyer"}
            </Label>
            <Switch id="account-type" checked={isSellerAccount} onCheckedChange={setIsSellerAccount} size="sm" />
          </div>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-secondary")}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="w-4 h-4 mr-3" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="pt-4 mt-6 border-t">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
            <Link href="/account/settings">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </Card>
  )
}
