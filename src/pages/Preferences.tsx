
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Investor } from "@/types";
import { fetchCurrentInvestorProfile, updateInvestorProfile } from "@/services/investorService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { TabsContainer } from "@/components/preferences/TabsContainer";
import { PreferenceSidebar } from "@/components/preferences/PreferenceSidebar";

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
        toast.success("Your preferences have been saved successfully");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };
  
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
              <TabsContainer />
            </div>
            
            <div>
              <PreferenceSidebar isSaving={isSaving} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Preferences;
