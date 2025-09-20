import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, Search, Eye, Download, MessageSquare, Globe, Camera } from "lucide-react";

interface Evidence {
  id: string;
  platform: "telegram" | "instagram" | "web";
  snippet: string;
  category: string;
  riskScore: number;
  timestamp: string;
  keywords: string[];
}

const mockEvidence: Evidence[] = [
  {
    id: "EV001",
    platform: "telegram",
    snippet: "💰 Get instant loan ₹50,000 in 10 minutes! No documents, no credit check needed. Contact now!",
    category: "Loan Scam",
    riskScore: 95,
    timestamp: "2024-01-15 14:30",
    keywords: ["instant loan", "no documents", "quick money"]
  },
  {
    id: "EV002",
    platform: "instagram",
    snippet: "Work from home opportunity! Earn ₹5000 daily by just clicking photos. Join our WhatsApp group.",
    category: "Job Scam",
    riskScore: 87,
    timestamp: "2024-01-15 14:15",
    keywords: ["work from home", "easy money", "WhatsApp group"]
  },
  {
    id: "EV003",
    platform: "web",
    snippet: "Domain: goa-luxury-resorts.net - Claiming to be official Taj Hotel booking site",
    category: "Fake Hotel",
    riskScore: 72,
    timestamp: "2024-01-15 13:45",
    keywords: ["fake domain", "luxury resort", "taj hotel"]
  }
];

export default function EvidenceLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [riskRange, setRiskRange] = useState([0]);

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

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-risk-high";
    if (score >= 50) return "text-risk-medium";
    return "text-risk-low";
  };

  const getRiskBg = (score: number) => {
    if (score >= 80) return "bg-risk-high/10 border-risk-high/30";
    if (score >= 50) return "bg-risk-medium/10 border-risk-medium/30";
    return "bg-risk-low/10 border-risk-low/30";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Evidence Investigation Center</h1>
          <p className="text-muted-foreground">Detailed analysis of flagged content and threat intelligence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Evidence</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Keywords, case ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Platform Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Platform</label>
                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="web">Web</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="loan">Loan Scam</SelectItem>
                      <SelectItem value="job">Job Scam</SelectItem>
                      <SelectItem value="hotel">Fake Hotel</SelectItem>
                      <SelectItem value="gambling">Gambling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Risk Score Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Minimum Risk Score: {riskRange[0]}
                  </label>
                  <Slider
                    value={riskRange}
                    onValueChange={setRiskRange}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Evidence Table */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Evidence Records</CardTitle>
                  <Badge variant="secondary">{mockEvidence.length} records found</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvidence.map((evidence) => (
                    <div
                      key={evidence.id}
                      className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.01] cursor-pointer ${getRiskBg(evidence.riskScore)}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-muted-foreground">
                            {getPlatformIcon(evidence.platform)}
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {evidence.id}
                            </Badge>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {evidence.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getRiskColor(evidence.riskScore)}`}>
                              {evidence.riskScore}
                            </div>
                            <div className="text-xs text-muted-foreground">Risk Score</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-foreground mb-3 leading-relaxed">
                        {evidence.snippet}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {evidence.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Detected: {evidence.timestamp}</span>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm">
                            Generate Report
                          </Button>
                          <Button variant="ghost" size="sm">
                            Flag for Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    Load More Evidence
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}