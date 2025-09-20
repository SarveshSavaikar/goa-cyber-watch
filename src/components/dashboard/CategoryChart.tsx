import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Loan Scams", value: 35, color: "hsl(var(--risk-high))" },
  { name: "Job Scams", value: 25, color: "hsl(var(--risk-medium))" },
  { name: "Fake Hotels", value: 20, color: "hsl(var(--neon-blue))" },
  { name: "Gambling", value: 12, color: "hsl(var(--warning))" },
  { name: "Prostitution", value: 8, color: "hsl(var(--risk-low))" },
];

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

export function CategoryChart() {
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
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
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