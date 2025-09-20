import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, MessageSquare, Globe, Camera } from "lucide-react";

interface Alert {
  id: string;
  platform: "telegram" | "instagram" | "web";
  snippet: string;
  category: string;
  riskLevel: "high" | "medium" | "low";
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    platform: "telegram",
    snippet: "💰 Quick loan in 10 minutes! No documents needed...",
    category: "Loan Scam",
    riskLevel: "high",
    timestamp: "2 min ago"
  },
  {
    id: "2",
    platform: "instagram",
    snippet: "Work from home, earn ₹5000 daily! Join now...",
    category: "Job Scam",
    riskLevel: "high",
    timestamp: "5 min ago"
  },
  {
    id: "3",
    platform: "web",
    snippet: "goa-luxury-resorts.net - Fake hotel booking site",
    category: "Fake Hotel",
    riskLevel: "medium",
    timestamp: "12 min ago"
  },
  {
    id: "4",
    platform: "telegram",
    snippet: "#escort #goanightlife - Premium services available",
    category: "Prostitution",
    riskLevel: "high",
    timestamp: "18 min ago"
  }
];

export function AlertsFeed() {
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

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case "high":
        return "border-risk-high/30 risk-high-glow";
      case "medium":
        return "border-risk-medium/30 risk-medium-glow";
      case "low":
        return "border-risk-low/30 risk-low-glow";
      default:
        return "";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>Live Threat Feed</span>
            <div className="w-2 h-2 bg-risk-high rounded-full pulse-alert"></div>
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${getRiskStyles(alert.riskLevel)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-muted-foreground">
                  {getPlatformIcon(alert.platform)}
                </div>
                <Badge variant={getRiskBadgeVariant(alert.riskLevel)} className="text-xs">
                  {alert.category}
                </Badge>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{alert.timestamp}</span>
              </div>
            </div>
            <p className="text-sm text-foreground mb-2 line-clamp-2">
              {alert.snippet}
            </p>
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  alert.riskLevel === "high" 
                    ? "text-risk-high border-risk-high" 
                    : alert.riskLevel === "medium" 
                    ? "text-risk-medium border-risk-medium"
                    : "text-risk-low border-risk-low"
                }`}
              >
                Risk: {alert.riskLevel.toUpperCase()}
              </Badge>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                Investigate
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}