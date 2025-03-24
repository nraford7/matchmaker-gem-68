
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { UserAvatar } from "./UserAvatar";
import { UserMenuContent } from "./UserMenuContent";

interface UserMenuProps {
  user: User;
  signOut: () => Promise<void>;
}

export const UserMenu = ({ user, signOut }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="hidden md:flex flex-col items-end justify-center cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-sm font-medium">{user.user_metadata.full_name || user.email}</span>
            <span className="text-xs text-muted-foreground">{user.user_metadata.company || ""}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <UserMenuContent user={user} signOut={signOut} />
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <UserAvatar user={user} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <UserMenuContent user={user} signOut={signOut} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
