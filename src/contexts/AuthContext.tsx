
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Deal } from '@/types';
import { Investor } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: any;
  session: any;
  deals: Deal[];
  activeDeals: Deal[];
  savedDeals: Deal[];
  investorProfile: Investor | null;
  isLoading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeDeals, setActiveDeals] = useState<Deal[]>([]);
  const [savedDeals, setSavedDeals] = useState<Deal[]>([]);
  const [investorProfile, setInvestorProfile] = useState<Investor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await loadInvestorProfile(session.user.id);
          const dealsData = await loadDeals();
          setDeals(dealsData);

          const activeDealsData = await fetchActiveDeals();
          setActiveDeals(activeDealsData);

          const savedDealsData = await fetchSavedDeals();
          setSavedDeals(savedDealsData);
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();

    supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_IN') {
        setUser(currentSession?.user ?? null);
        setSession(currentSession);
        loadInvestorProfile(currentSession?.user.id);
        loadDeals().then(setDeals);
        fetchActiveDeals().then(setActiveDeals);
        fetchSavedDeals().then(setSavedDeals);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        setInvestorProfile(null);
        setDeals([]);
        setActiveDeals([]);
        setSavedDeals([]);
      }
    });
  }, []);

  const loadDeals = async () => {
  try {
    // Change "opportunities" to "deals"
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      throw error;
    }

    // Map the database fields to our frontend types
    const mappedDeals = data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      dealType: item.deal_type,
      checkSizeRequired: item.check_size_required,
      sectorTags: item.sector_tags,
      sector: item.sector_tags?.[0], // For backward compatibility
      stage: item.stage,
      location: item.geographies?.[0], // For backward compatibility
      fundingAmount: item.check_size_required, // For backward compatibility
      createdAt: item.created_at,
    }));

    return mappedDeals;
  } catch (error) {
    console.error("Error loading deals:", error);
    return [];
  }
};

  const loadInvestorProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('investor_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching investor profile:", error);
        setInvestorProfile(null);
        return;
      }

      setInvestorProfile({
        id: data.id,
        name: data.name,
        email: data.email,
        company: data.company || "",
        avatar_url: data.avatar_url,
        preferred_stages: data.preferred_stages || [],
        preferred_geographies: data.preferred_geographies || [],
        check_size_min: data.check_size_min || 0,
        check_size_max: data.check_size_max || 0,
        investment_thesis: data.investment_thesis || "",
        deal_count: data.deal_count || 0,
        sector_tags: data.context_sectors || [] // Map context_sectors to sector_tags
      });
    } catch (error) {
      console.error("Error loading investor profile:", error);
      setInvestorProfile(null);
    }
  };

  const signIn = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      toast.success('Check your email for the sign-in link!');
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast.success('Signed out successfully!');
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    }
  };

  const fetchActiveDeals = async () => {
  try {
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Map the data...
    const mappedDeals = data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      dealType: item.deal_type,
      checkSizeRequired: item.check_size_required,
      sectorTags: item.sector_tags,
      sector: item.sector_tags?.[0], // For backward compatibility
      stage: item.stage,
      location: item.geographies?.[0], // For backward compatibility
      fundingAmount: item.check_size_required, // For backward compatibility
      createdAt: item.created_at,
    }));

    return mappedDeals;
  } catch (error) {
    console.error("Error fetching active deals:", error);
    return [];
  }
};

const fetchSavedDeals = async () => {
  try {
    const { data, error } = await supabase
      .from("saved_deals") // Changed from saved_opportunities
      .select(`
        id,
        deal_id,
        deals:deal_id (*)
      `)
      .eq("user_id", user?.id);

    if (error) {
      throw error;
    }

    // Map the data...
    const mappedDeals = data.map((item) => ({
      id: item.deals.id,
      name: item.deals.name,
      description: item.deals.description,
      dealType: item.deals.deal_type,
      checkSizeRequired: item.deals.check_size_required,
      sectorTags: item.deals.sector_tags,
      sector: item.deals.sector_tags?.[0], // For backward compatibility
      stage: item.deals.stage,
      location: item.deals.geographies?.[0], // For backward compatibility
      fundingAmount: item.deals.check_size_required, // For backward compatibility
      createdAt: item.deals.created_at,
      // Simple match score simulation for now
      matchScore: Math.random() * 0.3 + 0.6,
      matchExplanation: "Based on your sector and stage preferences"
    }));

    return mappedDeals;
  } catch (error) {
    console.error("Error fetching saved deals:", error);
    return [];
  }
};

  const value: AuthContextType = {
    user,
    session,
    deals,
    activeDeals,
    savedDeals,
    investorProfile,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
