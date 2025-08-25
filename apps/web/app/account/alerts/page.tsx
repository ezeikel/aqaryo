import { AccountSidebar } from "@/components/AccountSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, MessageSquare, Settings } from "lucide-react"

// Mock alerts data
const alertSettings = [
  {
    id: 1,
    title: "New Property Matches",
    description: "Get notified when new properties match your saved searches",
    enabled: true,
    channels: ["email", "push"],
  },
  {
    id: 2,
    title: "Price Changes",
    description: "Alert me when prices change on saved properties",
    enabled: true,
    channels: ["email"],
  },
  {
    id: 3,
    title: "Open House Notifications",
    description: "Notify me about upcoming open houses for saved properties",
    enabled: false,
    channels: ["push"],
  },
  {
    id: 4,
    title: "Market Updates",
    description: "Weekly market insights and trends in your areas of interest",
    enabled: true,
    channels: ["email"],
  },
]

export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <AccountSidebar />

        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Manage how you receive property updates</p>
          </div>

          <div className="space-y-6">
            {alertSettings.map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        {alert.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                    <Switch checked={alert.enabled} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Notification channels:</span>
                    <div className="flex gap-2">
                      {alert.channels.includes("email") && (
                        <Badge variant="secondary">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Badge>
                      )}
                      {alert.channels.includes("push") && (
                        <Badge variant="secondary">
                          <Bell className="w-3 h-3 mr-1" />
                          Push
                        </Badge>
                      )}
                      {alert.channels.includes("sms") && (
                        <Badge variant="secondary">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          SMS
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
