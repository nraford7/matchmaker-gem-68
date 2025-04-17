
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <Avatar>
      <AvatarFallback className="bg-crimson text-ivory">
        {user.user_metadata.full_name 
          ? getInitials(user.user_metadata.full_name) 
          : user.email?.charAt(0).toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
};
