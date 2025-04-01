
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { PopoverTrigger } from "@/components/ui/popover";
import { UserAvatar } from "./UserAvatar";

interface UserMenuTriggerProps {
  user: User;
  variant: "avatar" | "profile";
}

export const UserMenuTrigger = ({ user, variant }: UserMenuTriggerProps) => {
  if (variant === "avatar") {
    return (
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <UserAvatar user={user} />
        </Button>
      </PopoverTrigger>
    );
  }

  return (
    <PopoverTrigger asChild>
      <div className="hidden md:flex flex-col items-end justify-center cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-sm font-medium">{user.user_metadata.full_name || user.email}</span>
        <span className="text-xs text-muted-foreground">{user.user_metadata.company || ""}</span>
      </div>
    </PopoverTrigger>
  );
};
