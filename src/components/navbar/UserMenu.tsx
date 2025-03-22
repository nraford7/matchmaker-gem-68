
import { User } from "@supabase/supabase-js";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserMenuContent } from "./UserMenuContent";

interface UserMenuProps {
  user: User;
  signOut: () => void;
}

export const UserMenu = ({ user, signOut }: UserMenuProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

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
            <Avatar>
              <AvatarFallback>
                {user.user_metadata.full_name 
                  ? getInitials(user.user_metadata.full_name) 
                  : user.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <UserMenuContent user={user} signOut={signOut} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
