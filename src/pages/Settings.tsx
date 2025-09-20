import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  MessageSquare, 
  Camera, 
  Globe, 
  Upload, 
  Bell, 
  Mail, 
  Slack, 
  Shield,
  Info,
  Users,
  Calendar
} from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">System Configuration</h1>
          </div>
          <p className="text-muted-foreground">Configure monitoring settings and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monitoring Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Monitoring Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Toggles */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Active Platforms</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-neon-blue" />
                      <div>
                        <div className="font-medium">Telegram</div>
                        <div className="text-xs text-muted-foreground">Monitor channels and groups</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Camera className="w-5 h-5 text-neon-blue" />
                      <div>
                        <div className="font-medium">Instagram</div>
                        <div className="text-xs text-muted-foreground">Scan posts and stories</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-neon-blue" />
                      <div>
                        <div className="font-medium">Web Crawling</div>
                        <div className="text-xs text-muted-foreground">Monitor websites and domains</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              {/* File Upload */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Official Registry</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Hotel Registry CSV</div>
                      <Badge variant="outline" className="text-xs">Updated 2 days ago</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="file" accept=".csv,.xlsx" className="flex-1" />
                      <Button size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload official Goa Tourism Department hotel list
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Alert Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Channels */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-neon-blue" />
                      <div>
                        <div className="font-medium">Email Alerts</div>
                        <div className="text-xs text-muted-foreground">cyberpatrol@goa.gov.in</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-neon-blue" />
                      <div>
                        <div className="font-medium">Telegram Bot</div>
                        <div className="text-xs text-muted-foreground">Real-time notifications</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Slack className="w-5 h-5 text-neon-blue" />
                      <div>
                        <div className="font-medium">Slack Integration</div>
                        <div className="text-xs text-muted-foreground">Team collaboration</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Alert Thresholds */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Alert Thresholds</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">High Risk Score</div>
                      <Badge variant="destructive" className="text-xs">≥ 80</Badge>
                    </div>
                    <Input type="number" defaultValue="80" min="0" max="100" />
                  </div>
                  
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Medium Risk Score</div>
                      <Badge variant="secondary" className="text-xs">50-79</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" defaultValue="50" min="0" max="100" placeholder="Min" />
                      <Input type="number" defaultValue="79" min="0" max="100" placeholder="Max" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>About Goa Cyber Patrol</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">System Overview</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Goa Cyber Patrol is an AI-enabled cybersecurity monitoring system designed to detect and prevent 
                    online scams, fake hotel bookings, and digital exploitation targeting Goa's tourism sector. 
                    Built with advanced machine learning algorithms for real-time threat detection.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Version</span>
                      <Badge variant="outline">v2.1.0</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="text-foreground">January 15, 2025</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deployment</span>
                      <Badge variant="outline" className="text-risk-low border-risk-low">Production</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Real-time threat monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>Multi-platform scanning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span>Fake hotel detection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-primary" />
                      <span>Intelligent alerting system</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Evidence management</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground">
                      <strong>Built during Hackathon 2025</strong><br />
                      Developed to enhance cybersecurity measures for Goa's digital tourism ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button size="lg" className="px-8">
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}