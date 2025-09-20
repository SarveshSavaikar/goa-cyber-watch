import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease";
  };
  icon: React.ReactNode;
  variant?: "default" | "danger" | "warning" | "success";
}

export function StatsCard({ title, value, change, icon, variant = "default" }: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return "border-risk-high/30 bg-risk-high/5 risk-high-glow";
      case "warning":
        return "border-risk-medium/30 bg-risk-medium/5 risk-medium-glow";
      case "success":
        return "border-risk-low/30 bg-risk-low/5 risk-low-glow";
      default:
        return "border-border";
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:scale-105 ${getVariantStyles()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                {change.type === "increase" ? (
                  <TrendingUp className="w-4 h-4 text-risk-high" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-risk-low" />
                )}
                <Badge 
                  variant={change.type === "increase" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {change.value}
                </Badge>
              </div>
            )}
          </div>
          <div className="text-3xl opacity-80">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}