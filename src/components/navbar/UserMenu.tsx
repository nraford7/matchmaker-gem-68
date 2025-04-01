
import { User } from "@supabase/supabase-js";
import { 
  Popover, 
  PopoverContent
} from "@/components/ui/popover";
import { UserMenuContent } from "./UserMenuContent";
import { UserMenuTrigger } from "./UserMenuTrigger";

interface UserMenuProps {
  user: User;
  signOut: () => Promise<void>;
}

export const UserMenu = ({ user, signOut }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* Profile info popover (hidden on mobile) */}
      <Popover>
        <UserMenuTrigger user={user} variant="profile" />
        <PopoverContent className="w-56" align="end">
          <UserMenuContent user={user} signOut={signOut} />
        </PopoverContent>
      </Popover>
      
      {/* Avatar popover (visible on all screen sizes) */}
      <Popover>
        <UserMenuTrigger user={user} variant="avatar" />
        <PopoverContent className="w-56" align="end">
          <UserMenuContent user={user} signOut={signOut} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
