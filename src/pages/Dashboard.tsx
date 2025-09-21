import { AlertTriangle, Search, Shield, Hotel, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AlertsFeed } from "@/components/dashboard/AlertsFeed";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import cyberHeroImage from "@/assets/cyber-hero.jpg";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Define the API URL
      const apiUrl = "http://localhost:8000/dashboard/stats";
      
      const response = await fetch(apiUrl);
      console.log("response :- ",response)
      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data.data : ",data.data.overview)
      // Assuming data.data holds the stats object
      if (data.status === "success" && data.data) {
        setStatsData(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch data.");
      }
    } catch (e) {
      console.error("Error fetching dashboard stats:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  console.log(statsData)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-48 bg-cover bg-center cyber-grid"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${cyberHeroImage})` 
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Cyber Patrol Command Center
            </h1>
            <p className="text-xl text-gray-300">
              Real-time threat monitoring for Goa tourism and security
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-risk-low rounded-full pulse-alert"></div>
              <span className="text-sm text-gray-300">System Online • All Scanners Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Posts Scanned Today"
            value={loading ? " " : statsData.overview.total_posts_scanned}
            change={{ value: "+15%", type: "increase" }}
            icon={<Search className="w-8 h-8 text-primary" />}
          />
          <StatsCard
            title="Suspicious Content"
            value={loading ? " " : statsData.overview.suspicious_content}
            change={{ value: "+8%", type: "increase" }}
            icon={<AlertTriangle className="w-8 h-8 text-risk-medium" />}
            variant="warning"
          />
          <StatsCard
            title="High-Risk Alerts"
            value={loading ? " " : statsData.overview.high_risk_alerts}
            change={{ value: "+23%", type: "increase" }}
            icon={<Shield className="w-8 h-8 text-risk-high" />}
            variant="danger"
          />
          <StatsCard
            title="Fake Hotels Detected"
            value={loading ? " " : statsData.overview.fake_hotels_detected}
            change={{ value: "-5%", type: "decrease" }}
            icon={<Hotel className="w-8 h-8 text-info" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Feed - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AlertsFeed />
          </div>

          {/* Category Chart - Takes 1 column */}
          <div className="lg:col-span-1">
            <CategoryChart />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-card rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Quick Intelligence Summary</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="font-medium text-foreground mb-1">Trending Threats</div>
              <div className="text-muted-foreground">Loan scam activity increased 23% in last 24h</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="font-medium text-foreground mb-1">Geographic Hotspots</div>
              <div className="text-muted-foreground">Calangute, Baga showing high fake hotel activity</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="font-medium text-foreground mb-1">Platform Analysis</div>
              <div className="text-muted-foreground">Telegram channels most active for scam promotion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}