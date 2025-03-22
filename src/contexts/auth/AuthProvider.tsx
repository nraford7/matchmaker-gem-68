
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { createRandomInvestorProfile } from "@/services/investor/randomProfileServices";
import { initializeSampleData } from "./sampleDataUtils";
import { AuthContextType } from "./authTypes";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

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
              const sampleDataSuccess = await initializeSampleData(user.id);
              
              if (sampleDataSuccess) {
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
