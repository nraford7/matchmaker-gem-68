
import { Building, Loader2, UserPlus, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { NetworkInvestor } from "@/types";

interface ProfileAvatarProps {
  investor: NetworkInvestor;
  isFollowing: boolean;
  followingLoading: boolean;
  onToggleFollow: () => void;
}

export const ProfileAvatar = ({ 
  investor, 
  isFollowing, 
  followingLoading, 
  onToggleFollow 
}: ProfileAvatarProps) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={investor.avatar || undefined} alt={investor.name} />
        <AvatarFallback className="text-xl">{investor.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <CardTitle>{investor.name}</CardTitle>
        <CardDescription className="flex items-center mt-1">
          <Building className="h-3.5 w-3.5 mr-1" />
          {investor.company}
        </CardDescription>
      </div>
      <Button 
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        onClick={onToggleFollow}
        disabled={followingLoading}
        className="shrink-0"
      >
        {followingLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isFollowing ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Following
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4 mr-1" />
            Follow
          </>
        )}
      </Button>
    </div>
  );
};
