
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { Filter, Settings, LogOut } from "lucide-react";

interface UserMenuContentProps {
  user: User;
  signOut: () => Promise<void>;
}

export const UserMenuContent = ({ user, signOut }: UserMenuContentProps) => {
  return (
    <>
      <div className="space-y-1">
        <h4 className="font-medium leading-none mb-2">{user.user_metadata.full_name || user.email}</h4>
        <p className="text-xs text-muted-foreground">{user.user_metadata.company || ""}</p>
      </div>
      <div className="mt-4 space-y-2">
        <Link 
          to="/preferences" 
          className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors"
        >
          <Filter className="h-4 w-4" />
          Preferences
        </Link>
        <Link 
          to="/account" 
          className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors"
        >
          <Settings className="h-4 w-4" />
          Account settings
        </Link>
        <div className="border-t my-2"></div>
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-2 w-full rounded-md p-2 text-sm hover:bg-accent transition-colors text-red-500"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );
};
