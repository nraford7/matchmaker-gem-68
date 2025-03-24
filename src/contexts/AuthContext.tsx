import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { createRandomInvestorProfile } from "@/services/investor/randomProfileServices";
import { createSampleSharedDeals } from "@/services/investor";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
  }>;
  signUp: (email: string, password: string, userData: { 
    full_name?: string;
    company?: string;
  }) => Promise<{
    error: Error | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  // Helper function to create active deals for a new user
  const createSampleActiveDeals = async (userId: string) => {
    try {
      console.log("Creating sample active deals for user:", userId);
      
      // Get random opportunities
      const { data: opportunities } = await supabase
        .from("opportunities")
        .select("id, name")
        .limit(10);
        
      if (!opportunities || opportunities.length === 0) {
        console.error("No opportunities found for creating active deals");
        return false;
      }
      
      // Create 3 active deals
      const stages = ["Initial Review", "Due Diligence", "Term Sheet", "Final Negotiation"];
      const sampleNotes = [
        "Interesting technology with strong market potential",
        "Need to verify customer metrics and growth projections",
        "Team has impressive backgrounds, meeting scheduled for next week",
        "Waiting for financial documents and competitive analysis"
      ];
      
      const activeDeals = [];
      
      // Select 3 random opportunities for active deals
      const selectedOpps = opportunities.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      for (let i = 0; i < selectedOpps.length; i++) {
        activeDeals.push({
          user_id: userId,
          opportunity_id: selectedOpps[i].id,
          stage: stages[Math.floor(Math.random() * stages.length)],
          notes: sampleNotes[Math.floor(Math.random() * sampleNotes.length)]
        });
      }
      
      const { error } = await supabase
        .from("active_deals")
        .insert(activeDeals);
        
      if (error) {
        console.error("Error creating sample active deals:", error);
        return false;
      }
      
      console.log(`Created ${activeDeals.length} sample active deals`);
      return true;
    } catch (error) {
      console.error("Error in createSampleActiveDeals:", error);
      return false;
    }
  };
  
  // Helper function to create saved opportunities for a new user
  const createSampleSavedDeals = async (userId: string) => {
    try {
      console.log("Creating sample saved deals for user:", userId);
      
      // Get random opportunities (different from active deals if possible)
      const { data: opportunities } = await supabase
        .from("opportunities")
        .select("id")
        .limit(20);
        
      if (!opportunities || opportunities.length === 0) {
        console.error("No opportunities found for creating saved deals");
        return false;
      }
      
      // Create 4 saved opportunities
      const savedDeals = [];
      
      // Select 4 random opportunities for saved deals
      const selectedOpps = opportunities.sort(() => 0.5 - Math.random()).slice(0, 4);
      
      for (let i = 0; i < selectedOpps.length; i++) {
        savedDeals.push({
          user_id: userId,
          opportunity_id: selectedOpps[i].id
        });
      }
      
      const { error } = await supabase
        .from("saved_opportunities")
        .insert(savedDeals);
        
      if (error) {
        console.error("Error creating sample saved deals:", error);
        return false;
      }
      
      console.log(`Created ${savedDeals.length} sample saved deals`);
      return true;
    } catch (error) {
      console.error("Error in createSampleSavedDeals:", error);
      return false;
    }
  };
  
  // Helper function to create past deals for a new user
  const createSamplePastDeals = async (userId: string) => {
    try {
      console.log("Creating sample past deals for user:", userId);
      
      // Get random opportunities (different from active and saved if possible)
      const { data: opportunities } = await supabase
        .from("opportunities")
        .select("id, funding_amount")
        .limit(15);
        
      if (!opportunities || opportunities.length === 0) {
        console.error("No opportunities found for creating past deals");
        return false;
      }
      
      // Create 3 past deals
      const pastDeals = [];
      const sampleNotes = [
        "Successfully closed this deal with favorable terms",
        "Great founding team, expecting strong returns",
        "Strategic investment in our core focus area",
        "Co-invested with top-tier VCs"
      ];
      
      // Select 3 random opportunities for past deals
      const selectedOpps = opportunities.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // Create dates from 1-12 months ago
      for (let i = 0; i < selectedOpps.length; i++) {
        const monthsAgo = Math.floor(Math.random() * 12) + 1;
        const completionDate = new Date();
        completionDate.setMonth(completionDate.getMonth() - monthsAgo);
        
        // Calculate a random investment amount (20-50% of the funding amount)
        const fundingAmount = Number(selectedOpps[i].funding_amount);
        const percentage = (Math.floor(Math.random() * 31) + 20) / 100; // 20-50%
        const investmentAmount = Math.round(fundingAmount * percentage);
        
        pastDeals.push({
          user_id: userId,
          opportunity_id: selectedOpps[i].id,
          final_amount: investmentAmount,
          completion_date: completionDate.toISOString(),
          notes: sampleNotes[Math.floor(Math.random() * sampleNotes.length)]
        });
      }
      
      const { error } = await supabase
        .from("past_deals")
        .insert(pastDeals);
        
      if (error) {
        console.error("Error creating sample past deals:", error);
        return false;
      }
      
      console.log(`Created ${pastDeals.length} sample past deals`);
      return true;
    } catch (error) {
      console.error("Error in createSamplePastDeals:", error);
      return false;
    }
  };
  
  // Helper function to make the user follow random investors
  const followRandomInvestors = async (userId: string) => {
    try {
      console.log("Setting up random investor follows for user:", userId);
      
      // Get random investors to follow
      const { data: investors } = await supabase
        .from("investor_profiles")
        .select("id")
        .neq("id", userId)
        .limit(20);
        
      if (!investors || investors.length === 0) {
        console.error("No investors found to follow");
        return false;
      }
      
      // Follow 4-6 random investors
      const followCount = Math.floor(Math.random() * 3) + 4; // 4-6
      const connections = [];
      
      // Select random investors to follow
      const selectedInvestors = investors.sort(() => 0.5 - Math.random()).slice(0, followCount);
      
      for (let i = 0; i < selectedInvestors.length; i++) {
        connections.push({
          follower_id: userId,
          following_id: selectedInvestors[i].id
        });
      }
      
      const { error } = await supabase
        .from("investor_connections")
        .insert(connections);
        
      if (error) {
        console.error("Error following random investors:", error);
        return false;
      }
      
      console.log(`Now following ${connections.length} random investors`);
      return true;
    } catch (error) {
      console.error("Error in followRandomInvestors:", error);
      return false;
    }
  };

  // Find opportunities for authenticated user
  const findOpportunities = async () => {
    if (!user || !expirationDate || new Date() > expirationDate) {
      setOpportunities([]);
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .limit(10);

      if (error) {
        console.error('Error fetching opportunities:', error);
        return [];
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Transform data into opportunities
      const formattedOpportunities = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        fundingAmount: item.check_size_required,
        sector: item.sector_tags?.[0] || 'General',
        stage: item.stage || 'Not specified',
        location: item.geographies?.[0] || 'Global',
        matchScore: 0.78 + (Math.random() * 0.1),
        matchExplanation: 'Based on your preferred sectors and stage focus',
        createdAt: item.created_at
      }));

      setOpportunities(formattedOpportunities);
      return formattedOpportunities;
    } catch (error) {
      console.error('Error in findOpportunities:', error);
      return [];
    }
  };

  // Find and check if a deal is in active deals
  const checkActiveDeal = async (dealId: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from("active_deals")
        .select("*")
        .eq("deal_id", dealId)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking active deal:', error);
      }

      return !!data;
    } catch (error) {
      console.error('Error in checkActiveDeal:', error);
      return false;
    }
  };

  // Find and check if a deal is saved
  const checkSavedDeal = async (dealId: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from("saved_deals")
        .select("*")
        .eq("deal_id", dealId)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking saved deal:', error);
      }

      return !!data;
    } catch (error) {
      console.error('Error in checkSavedDeal:', error);
      return false;
    }
  };

  // Check if a deal has been completed
  const checkCompletedDeal = async (dealId: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from("past_deals")
        .select("*")
        .eq("deal_id", dealId)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking completed deal:', error);
      }

      return !!data ? { completed: true, amount: data.final_amount } : false;
    } catch (error) {
      console.error('Error in checkCompletedDeal:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Handle new user sign up
        if (event === 'SIGNED_IN' && isNewUser && currentSession?.user) {
          try {
            const { user } = currentSession;
            const userData = user.user_metadata;
            const fullName = userData?.full_name || user.email?.split('@')[0] || 'Investor';
            
            console.log("Creating random profile for new user:", user.id);
            
            // Create random investor profile
            const profileSuccess = await createRandomInvestorProfile(
              user.id, 
              fullName, 
              user.email || ''
            );
            
            if (profileSuccess) {
              toast.success("Random investor profile created!");
              
              // Create sample shared deals
              console.log("Creating sample data for new user");
              
              // Execute all sample data creation in parallel
              const [sharedDealsSuccess, activeDealsSuccess, savedDealsSuccess, pastDealsSuccess, followSuccess] = await Promise.all([
                createSampleSharedDeals(),
                createSampleActiveDeals(user.id),
                createSampleSavedDeals(user.id),
                createSamplePastDeals(user.id),
                followRandomInvestors(user.id)
              ]);
              
              if (sharedDealsSuccess && activeDealsSuccess && savedDealsSuccess && pastDealsSuccess && followSuccess) {
                toast.success("Your account is ready with sample data!");
              } else {
                console.warn("Some sample data creation failed");
              }
            }
            
            setIsNewUser(false);
          } catch (error) {
            console.error("Error setting up new user:", error);
          }
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isNewUser, navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (!error) {
        navigate("/dashboard");
      }
      
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, userData: { 
    full_name?: string;
    company?: string;
  }) => {
    try {
      setIsNewUser(true); // Flag that this is a new user sign up
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (!error) {
        navigate("/dashboard");
      }

      return { error };
    } catch (error) {
      setIsNewUser(false);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    opportunities,
    findOpportunities,
    checkActiveDeal,
    checkSavedDeal,
    checkCompletedDeal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
