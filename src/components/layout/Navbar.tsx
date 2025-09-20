import { Shield, Settings, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: Shield },
  { path: "/evidence", label: "Evidence Logs" },
  { path: "/hotels", label: "Fake Hotels" },
  { path: "/alerts", label: "Alerts" },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-glow">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Goa Cyber Patrol</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Threat Monitoring</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`
                }
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center risk-high-glow"
              >
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}