
import { User, Session } from "@supabase/supabase-js";

export type AuthContextType = {
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
