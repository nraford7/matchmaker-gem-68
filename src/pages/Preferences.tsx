
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { PreferenceSidebar, TabsContainer } from "@/components/preferences";
import { fetchCurrentInvestorProfile, updateInvestorProfile } from "@/services/investor";
import { Investor } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const Preferences = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<Investor>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      company: "",
      avatar_url: "",
      preferred_stages: [],
      preferred_geographies: [],
      check_size_min: 0,
      check_size_max: 0,
      investment_thesis: "",
      deal_count: 0,
      sector_tags: [] // Added for contextSectors field
    }
  });
  
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const profile = await fetchCurrentInvestorProfile();
          if (profile) {
            form.reset({
              ...profile,
              // Make sure we handle any legacy property naming
              sector_tags: profile.sector_tags || []
            });
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, [user, form]);
  
  const onSubmit = async (data: Investor) => {
    try {
      const success = await updateInvestorProfile(data);
      if (success) {
        toast.success("Preferences saved successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences");
    }
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Investor Preferences</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <PreferenceSidebar />
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <TabsContainer 
              form={form} 
              onSubmit={onSubmit} 
              isLoading={isLoading} 
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
