import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Shield, 
  Hotel, 
  DollarSign, 
  MessageSquare, 
  Camera, 
  Globe, 
  Clock,
  RefreshCw,
  Filter
} from "lucide-react";

interface AlertItem {
  id: string;
  type: "scam" | "fake-domain" | "prostitution" | "gambling";
  platform: "telegram" | "instagram" | "web";
  message: string;
  details: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
  status: "new" | "investigating" | "resolved";
}

const mockAlerts: AlertItem[] = [
  {
    id: "A001",
    type: "scam",
    platform: "telegram",
    message: "🚨 Scam on Telegram: 'Quick loan in 10 minutes'",
    details: "Channel @quickloangoa promoting instant loans without documentation. High engagement with potential victims.",
    timestamp: "2 minutes ago",
    priority: "high",
    status: "new"
  },
  {
    id: "A002", 
    type: "fake-domain",
    platform: "web",
    message: "⚠️ Fake domain: goa-luxury-resorts.net",
    details: "Website impersonating official Taj Hotels with fake booking system. Multiple victim reports received.",
    timestamp: "5 minutes ago",
    priority: "high",
    status: "investigating"
  },
  {
    id: "A003",
    type: "prostitution",
    platform: "instagram",
    message: "🔎 Prostitution flagged: '#escort #goanightlife'",
    details: "Instagram account promoting escort services in Goa tourist areas. Using coded language.",
    timestamp: "12 minutes ago",
    priority: "medium",
    status: "new"
  },
  {
    id: "A004",
    type: "gambling",
    platform: "web", 
    message: "🎰 Gambling promotion: casino-goa24.com",
    details: "Illegal online casino targeting tourists. Aggressive social media advertising campaign detected.",
    timestamp: "18 minutes ago",
    priority: "medium",
    status: "new"
  },
  {
    id: "A005",
    type: "scam",
    platform: "telegram",
    message: "💼 Job scam detected: 'Work from home ₹5000/day'",
    details: "Telegram group promoting fake work-from-home opportunities. Requesting upfront payments.",
    timestamp: "25 minutes ago",
    priority: "high",
    status: "resolved"
  }
];

export default function Alerts() {
  const [activeTab, setActiveTab] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "scam":
        return <DollarSign className="w-5 h-5 text-risk-high" />;
      case "fake-domain":
        return <Globe className="w-5 h-5 text-risk-medium" />;
      case "prostitution":
        return <Shield className="w-5 h-5 text-risk-medium" />;
      case "gambling":
        return <DollarSign className="w-5 h-5 text-risk-medium" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "telegram":
        return <MessageSquare className="w-4 h-4" />;
      case "instagram":
        return <Camera className="w-4 h-4" />;
      case "web":
        return <Globe className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-risk-high border-risk-high bg-risk-high/10";
      case "medium":
        return "text-risk-medium border-risk-medium bg-risk-medium/10";
      case "low":
        return "text-risk-low border-risk-low bg-risk-low/10";
      default:
        return "text-muted-foreground border-border";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive" className="pulse-alert">New</Badge>;
      case "investigating":
        return <Badge variant="secondary" className="text-risk-medium">Investigating</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-risk-low">Resolved</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredAlerts = activeTab === "all" 
    ? mockAlerts 
    : activeTab === "high-risk"
    ? mockAlerts.filter(alert => alert.priority === "high")
    : mockAlerts.filter(alert => {
        const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return new Date() > last24h; // Simplified for demo
      });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Real-Time Alert Center</h1>
            <p className="text-muted-foreground">Live monitoring of high-priority cybersecurity threats</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}</span>
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Configure Alerts
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-risk-high/30 bg-risk-high/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-risk-high">
                    {mockAlerts.filter(a => a.priority === "high").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-risk-high" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-risk-medium/30 bg-risk-medium/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Cases</p>
                  <p className="text-2xl font-bold text-risk-medium">
                    {mockAlerts.filter(a => a.status === "investigating").length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-risk-medium" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-info/30 bg-info/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last 24h</p>
                  <p className="text-2xl font-bold text-info">
                    {mockAlerts.length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-risk-low/30 bg-risk-low/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-risk-low">
                    {mockAlerts.filter(a => a.status === "resolved").length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-risk-low" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>Alert Feed</span>
                <div className="w-2 h-2 bg-risk-high rounded-full pulse-alert"></div>
              </CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Alerts</TabsTrigger>
                  <TabsTrigger value="high-risk">High Risk</TabsTrigger>
                  <TabsTrigger value="recent">Last 24h</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.01] cursor-pointer ${getPriorityColor(alert.priority)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h3 className="font-semibold text-foreground">{alert.message}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            {getPlatformIcon(alert.platform)}
                            <span className="text-xs capitalize">{alert.platform}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {alert.id}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(alert.status)}
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {alert.details}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        alert.priority === "high" 
                          ? "text-risk-high border-risk-high" 
                          : alert.priority === "medium"
                          ? "text-risk-medium border-risk-medium"
                          : "text-risk-low border-risk-low"
                      }`}
                    >
                      Priority: {alert.priority.toUpperCase()}
                    </Badge>
                    <div className="space-x-2">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Alerts Found</h3>
                <p className="text-muted-foreground">All systems are secure. No active threats detected.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}