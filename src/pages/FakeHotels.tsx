import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Hotel, AlertTriangle, CheckCircle, XCircle, Upload, ExternalLink } from "lucide-react";

interface FakeHotelEntry {
  id: string;
  domain: string;
  claimedHotel: string;
  matchStatus: "verified" | "mismatch" | "suspicious";
  riskScore: number;
  detectedIssues: string[];
  evidence: {
    phoneNumber?: string;
    email?: string;
    address?: string;
    pricing?: string;
  };
}

const mockFakeHotels: FakeHotelEntry[] = [
  {
    id: "FH001",
    domain: "goa-luxury-resorts.net",
    claimedHotel: "Taj Holiday Village Resort & Spa",
    matchStatus: "mismatch",
    riskScore: 89,
    detectedIssues: ["Domain not owned by Taj", "Fake contact details", "Suspicious pricing"],
    evidence: {
      phoneNumber: "+91-8888888888",
      email: "booking@goa-luxury-resorts.net",
      address: "Fake Address, Goa",
      pricing: "₹2,999/night (Official: ₹15,000+)"
    }
  },
  {
    id: "FH002", 
    domain: "goacasinopalace.com",
    claimedHotel: "Casino Palms Resort",
    matchStatus: "suspicious",
    riskScore: 67,
    detectedIssues: ["Unverified ownership", "Missing tourism license"],
    evidence: {
      phoneNumber: "+91-9999999999",
      email: "info@goacasinopalace.com",
      address: "Baga Beach, North Goa"
    }
  },
  {
    id: "FH003",
    domain: "theleelaofficialgoa.in",
    claimedHotel: "The Leela Goa",
    matchStatus: "verified",
    riskScore: 15,
    detectedIssues: [],
    evidence: {
      phoneNumber: "+91-832-6621234",
      email: "reservations@theleela.com",
      address: "Mobor Beach, Cavelossim, Goa"
    }
  }
];

export default function FakeHotels() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-risk-low" />;
      case "mismatch":
        return <XCircle className="w-5 h-5 text-risk-high" />;
      case "suspicious":
        return <AlertTriangle className="w-5 h-5 text-risk-medium" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="outline" className="text-risk-low border-risk-low">Verified</Badge>;
      case "mismatch":
        return <Badge variant="destructive">Fake Detected</Badge>;
      case "suspicious":
        return <Badge variant="secondary" className="text-risk-medium border-risk-medium">Suspicious</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-risk-high";
    if (score >= 40) return "text-risk-medium";
    return "text-risk-low";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Hotel className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Fake Hotel Detector</h1>
          </div>
          <p className="text-muted-foreground">Cross-verification of hotel booking websites with official Goa tourism registry</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Official Resort Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input 
                type="file" 
                accept=".csv,.xlsx" 
                className="flex-1"
                placeholder="Upload official hotel list..."
              />
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Registry
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Upload the official Goa Tourism Department hotel registry for cross-verification
            </p>
          </CardContent>
        </Card>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Alert className="border-risk-high/30 bg-risk-high/5">
            <XCircle className="h-4 w-4 text-risk-high" />
            <AlertDescription className="text-risk-high font-medium">
              2 Fake Hotels Detected
            </AlertDescription>
          </Alert>
          <Alert className="border-risk-medium/30 bg-risk-medium/5">
            <AlertTriangle className="h-4 w-4 text-risk-medium" />
            <AlertDescription className="text-risk-medium font-medium">
              1 Suspicious Domain
            </AlertDescription>
          </Alert>
          <Alert className="border-risk-low/30 bg-risk-low/5">
            <CheckCircle className="h-4 w-4 text-risk-low" />
            <AlertDescription className="text-risk-low font-medium">
              1 Verified Hotel
            </AlertDescription>
          </Alert>
        </div>

        {/* Hotel Analysis Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hotel Verification Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockFakeHotels.map((hotel) => (
                <div key={hotel.id} className="border rounded-lg p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(hotel.matchStatus)}
                        <h3 className="text-lg font-semibold text-foreground">{hotel.claimedHotel}</h3>
                        {getStatusBadge(hotel.matchStatus)}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>{hotel.domain}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getRiskColor(hotel.riskScore)}`}>
                        {hotel.riskScore}
                      </div>
                      <div className="text-xs text-muted-foreground">Risk Score</div>
                    </div>
                  </div>

                  {/* Issues */}
                  {hotel.detectedIssues.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Detected Issues:</h4>
                      <div className="flex flex-wrap gap-2">
                        {hotel.detectedIssues.map((issue, idx) => (
                          <Badge key={idx} variant="destructive" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Evidence */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Extracted Information:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hotel.evidence.phoneNumber && (
                        <div className="bg-secondary/30 p-3 rounded-md">
                          <div className="text-xs text-muted-foreground">Phone Number</div>
                          <div className="text-sm font-medium">{hotel.evidence.phoneNumber}</div>
                        </div>
                      )}
                      {hotel.evidence.email && (
                        <div className="bg-secondary/30 p-3 rounded-md">
                          <div className="text-xs text-muted-foreground">Email</div>
                          <div className="text-sm font-medium">{hotel.evidence.email}</div>
                        </div>
                      )}
                      {hotel.evidence.address && (
                        <div className="bg-secondary/30 p-3 rounded-md">
                          <div className="text-xs text-muted-foreground">Address</div>
                          <div className="text-sm font-medium">{hotel.evidence.address}</div>
                        </div>
                      )}
                      {hotel.evidence.pricing && (
                        <div className="bg-secondary/30 p-3 rounded-md">
                          <div className="text-xs text-muted-foreground">Pricing</div>
                          <div className="text-sm font-medium">{hotel.evidence.pricing}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Badge variant="outline" className="text-xs">
                      Case ID: {hotel.id}
                    </Badge>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        View Screenshot
                      </Button>
                      <Button variant="outline" size="sm">
                        Report to Tourism Dept
                      </Button>
                      {hotel.matchStatus === "mismatch" && (
                        <Button size="sm" className="bg-risk-high hover:bg-risk-high/90">
                          Flag as Scam
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}