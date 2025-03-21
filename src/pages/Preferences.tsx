
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { PreferenceVisualizer } from "@/components/PreferenceVisualizer";
import { Investor } from "@/types";
import { fetchCurrentInvestorProfile, updateInvestorProfile } from "@/services/investorService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Preferences = () => {
  const { user } = useAuth();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const form = useForm<Investor>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      preferredSectors: [],
      preferredStages: [],
      checkSizeMin: 0,
      checkSizeMax: 0,
      preferredGeographies: [],
      investmentThesis: ""
    }
  });
  
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const investorData = await fetchCurrentInvestorProfile();
        if (investorData) {
          setInvestor(investorData);
          form.reset(investorData);
        }
      } catch (error) {
        console.error("Error loading investor profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, form]);
  
  const handleSave = async (data: Investor) => {
    setIsSaving(true);
    try {
      const success = await updateInvestorProfile(data);
      if (success) {
        setInvestor(data);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const sectors = ["Fintech", "Health Tech", "SaaS", "AI/ML", "Cybersecurity", 
    "EdTech", "CleanTech", "E-commerce", "Gaming", "IoT", 
    "Consumer Tech", "Enterprise Software"];
    
  const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Growth"];
  
  const regions = ["US", "Canada", "Europe", "UK", "Asia", "Latin America", "Africa", "Middle East", "Australia"];
  
  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to access your preferences</h1>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your preferences...</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Preferences</h1>
          <p className="text-muted-foreground">
            Manage your investment criteria to improve match quality
          </p>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="sectors">Sectors</TabsTrigger>
                  <TabsTrigger value="stages">Investment Stages</TabsTrigger>
                  <TabsTrigger value="checks">Check Size</TabsTrigger>
                  <TabsTrigger value="geo">Geography</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>
                        Update your profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="investmentThesis"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Investment Thesis</FormLabel>
                              <FormControl>
                                <textarea 
                                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="Describe your investment philosophy"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
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
                        {sectors.map((sector) => (
                          <div key={sector} className="flex items-center space-x-2">
                            <Checkbox 
                              id={sector}
                              checked={form.watch("preferredSectors").includes(sector)}
                              onCheckedChange={(checked) => {
                                const current = form.getValues("preferredSectors");
                                if (checked) {
                                  form.setValue("preferredSectors", [...current, sector]);
                                } else {
                                  form.setValue("preferredSectors", current.filter(s => s !== sector));
                                }
                              }}
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
                        {stages.map((stage) => (
                          <div key={stage} className="flex items-center space-x-2">
                            <Checkbox 
                              id={stage}
                              checked={form.watch("preferredStages").includes(stage)}
                              onCheckedChange={(checked) => {
                                const current = form.getValues("preferredStages");
                                if (checked) {
                                  form.setValue("preferredStages", [...current, stage]);
                                } else {
                                  form.setValue("preferredStages", current.filter(s => s !== stage));
                                }
                              }}
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
                        <FormField
                          control={form.control}
                          name="checkSizeMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={0}
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="checkSizeMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum ($)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={0}
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
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
                        {regions.map((region) => (
                          <div key={region} className="flex items-center space-x-2">
                            <Checkbox 
                              id={region}
                              checked={form.watch("preferredGeographies").includes(region)}
                              onCheckedChange={(checked) => {
                                const current = form.getValues("preferredGeographies");
                                if (checked) {
                                  form.setValue("preferredGeographies", [...current, region]);
                                } else {
                                  form.setValue("preferredGeographies", current.filter(r => r !== region));
                                }
                              }}
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
                  <PreferenceVisualizer investor={form.getValues()} />
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Preferences;
