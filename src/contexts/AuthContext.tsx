
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Investor } from '@/types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isLoading: boolean; // Added for backwards compatibility
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  investorProfile: Investor | null; // Added to fix Preferences.tsx error
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [investorProfile, setInvestorProfile] = useState<Investor | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Fetch investor profile if user is authenticated
        if (session?.user) {
          fetchInvestorProfile(session.user.id);
        } else {
          setInvestorProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Fetch investor profile if user is authenticated
      if (session?.user) {
        fetchInvestorProfile(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Fetch investor profile from database
  const fetchInvestorProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('investor_profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching investor profile:', error);
        return;
      }
      
      if (data) {
        setInvestorProfile({
          id: data.id,
          name: data.name,
          email: data.email || '',
          company: data.company || '',
          avatar_url: data.avatar_url || '',
          preferred_stages: data.preferred_stages || [],
          preferred_geographies: data.preferred_geographies || [],
          check_size_min: data.check_size_min || 0,
          check_size_max: data.check_size_max || 0,
          investment_thesis: data.investment_thesis || '',
          deal_count: data.deal_count || 0,
          sector_tags: data.context_sectors || []
        });
      }
    } catch (error) {
      console.error('Error in fetchInvestorProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error: any) {
      console.error('Error resetting password:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    loading,
    isLoading: loading, // Added for backwards compatibility
    signIn,
    signUp,
    signOut,
    resetPassword,
    investorProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
