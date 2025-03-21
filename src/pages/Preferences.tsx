
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mockInvestor } from "@/data/mockData";
import { PreferenceVisualizer } from "@/components/PreferenceVisualizer";

const Preferences = () => {
  const [investor] = useState(mockInvestor);
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Preferences</h1>
          <p className="text-muted-foreground">
            Manage your investment criteria to improve match quality
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="sectors" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="sectors">Sectors & Industries</TabsTrigger>
              <TabsTrigger value="stages">Investment Stages</TabsTrigger>
              <TabsTrigger value="checks">Check Size</TabsTrigger>
              <TabsTrigger value="geo">Geography</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sectors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferred Sectors</CardTitle>
                  <CardDescription>
                    Select the sectors and industries you're most interested in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Fintech", "Health Tech", "SaaS", "AI/ML", "Cybersecurity", 
                      "EdTech", "CleanTech", "E-commerce", "Gaming", "IoT", 
                      "Consumer Tech", "Enterprise Software"].map((sector) => (
                      <div key={sector} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={sector}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked={investor.preferredSectors.includes(sector)}
                        />
                        <Label htmlFor={sector}>{sector}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Stages</CardTitle>
                  <CardDescription>
                    Select the stages you typically invest in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Growth"].map((stage) => (
                      <div key={stage} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={stage}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked={investor.preferredStages.includes(stage)}
                        />
                        <Label htmlFor={stage}>{stage}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="checks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Check Size</CardTitle>
                  <CardDescription>
                    Define your minimum and maximum investment amounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="minCheck">Minimum ($)</Label>
                      <Input 
                        id="minCheck" 
                        type="number" 
                        defaultValue={investor.checkSizeMin} 
                        min={0}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxCheck">Maximum ($)</Label>
                      <Input 
                        id="maxCheck" 
                        type="number" 
                        defaultValue={investor.checkSizeMax} 
                        min={0}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="geo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Focus</CardTitle>
                  <CardDescription>
                    Select the regions where you prefer to invest
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["US", "Canada", "Europe", "UK", "Asia", "Latin America", "Africa", "Middle East", "Australia"].map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={region}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked={investor.preferredGeographies.includes(region)}
                        />
                        <Label htmlFor={region}>{region}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preference Visualization</CardTitle>
              <CardDescription>
                See a visual representation of your investment criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreferenceVisualizer investor={investor} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
