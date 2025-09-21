import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import React, { useState, useEffect } from 'react';

const data = [
  { name: "Loan Scams", value: 35, color: "hsl(var(--risk-high))" },
  { name: "Job Scams", value: 25, color: "hsl(var(--risk-medium))" },
  { name: "Fake Hotels", value: 20, color: "hsl(var(--neon-blue))" },
  { name: "Gambling", value: 12, color: "hsl(var(--warning))" },
  { name: "Prostitution", value: 8, color: "hsl(var(--risk-low))" },
];


export function CategoryChart() {
  const [fdata, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].value} cases ({Math.round((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100)}%)
        </p>
      </div>
    );
  }
  return null;
};


  useEffect(() => {
    // Define the URL for the API endpoint.
    // Replace 'http://localhost:8000' with your actual backend URL if it's different.
    const API_URL = 'http://localhost:8000/dashboard/category_breakdown';

    // Asynchronous function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result); // Set the fetched data to state
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Failed to fetch data:", error);
        setError(error.message); // Set the error message to state
      } finally {
        // This block runs after the try or catch block, regardless of success or failure
        setLoading(false); // Set loading to false once the request is complete
      }
    };
    console.log("The data of charts :- ",data)
    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once

  // --- Conditional Rendering based on state ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 font-semibold">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Threat Categories</CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of flagged content by type</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fdata}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {fdata.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
            
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {fdata.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-foreground">{item.name}</span>
              </div>
              <span className="text-muted-foreground font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}