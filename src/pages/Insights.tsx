
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, LineChart, AreaChart, PieChart, Pie, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartPie, TrendingUp, Filter } from "lucide-react";

const sectorData = [
  { name: "Fintech", value: 28 },
  { name: "Healthcare", value: 22 },
  { name: "Consumer", value: 16 },
  { name: "Enterprise", value: 12 },
  { name: "Climate", value: 10 },
  { name: "Other", value: 12 },
];

const monthlyDeals = [
  { month: 'Jan', deals: 12, funding: 24 },
  { month: 'Feb', deals: 19, funding: 38 },
  { month: 'Mar', deals: 15, funding: 30 },
  { month: 'Apr', deals: 21, funding: 42 },
  { month: 'May', deals: 25, funding: 50 },
  { month: 'Jun', deals: 18, funding: 36 },
  { month: 'Jul', deals: 22, funding: 44 },
  { month: 'Aug', deals: 26, funding: 52 },
  { month: 'Sep', deals: 23, funding: 46 },
  { month: 'Oct', deals: 28, funding: 56 },
  { month: 'Nov', deals: 24, funding: 48 },
  { month: 'Dec', deals: 30, funding: 60 },
];

const stageData = [
  { name: "Seed", value: 35 },
  { name: "Series A", value: 25 },
  { name: "Series B", value: 18 },
  { name: "Series C+", value: 12 },
  { name: "Growth", value: 10 },
];

const trendsData = [
  { month: 'Jan', fintech: 14, healthcare: 10, enterprise: 8, climate: 6 },
  { month: 'Feb', fintech: 16, healthcare: 12, enterprise: 9, climate: 8 },
  { month: 'Mar', fintech: 18, healthcare: 13, enterprise: 10, climate: 9 },
  { month: 'Apr', fintech: 16, healthcare: 14, enterprise: 11, climate: 10 },
  { month: 'May', fintech: 19, healthcare: 15, enterprise: 12, climate: 12 },
  { month: 'Jun', fintech: 22, healthcare: 16, enterprise: 14, climate: 14 },
  { month: 'Jul', fintech: 24, healthcare: 18, enterprise: 15, climate: 16 },
  { month: 'Aug', fintech: 26, healthcare: 20, enterprise: 16, climate: 18 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#9BD0F5'];

const Insights = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Platform Insights</h1>
        <p className="text-muted-foreground">
          Anonymized analytics showing deal flow trends and investment patterns
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="stages">Stages</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">253</div>
                <p className="text-xs text-muted-foreground">+18% from last quarter</p>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyDeals}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="deals" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.8M</div>
                <p className="text-xs text-muted-foreground">+5% from last quarter</p>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyDeals}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="funding" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sector Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sectors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sectorData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Number of Deals" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution by Investment Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {stageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sector Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trendsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="fintech" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="healthcare" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="enterprise" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    <Area type="monotone" dataKey="climate" stackId="1" stroke="#ff8042" fill="#ff8042" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insights;
