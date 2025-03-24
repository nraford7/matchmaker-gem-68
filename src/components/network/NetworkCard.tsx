
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Handshake,
  MessageSquare,
  Share2,
  ChevronDown,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NetworkInvestor } from "@/types";

interface NetworkCardProps {
  investor: NetworkInvestor;
  isFollowing: boolean;
  onToggleFollow: (id: string) => void;
}

export const NetworkCard = ({ investor, isFollowing, onToggleFollow }: NetworkCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/investor/${investor.id}`);
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 cursor-pointer" onClick={handleViewProfile}>
              <AvatarImage src={investor.avatar_url || investor.avatar} alt={investor.name} />
              <AvatarFallback className="text-sm">{investor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 
                className="font-medium text-base hover:text-primary cursor-pointer" 
                onClick={handleViewProfile}
              >
                {investor.name}
              </h3>
              <p className="text-xs text-muted-foreground">{investor.company}</p>
              
              <div className="flex flex-wrap gap-1 mt-1.5">
                {(investor.sector_tags || investor.contextSectors || []).slice(0, 3).map(sector => (
                  <div 
                    key={sector} 
                    className="bg-muted text-xs px-1.5 py-0.5 rounded-full text-[10px]"
                  >
                    {sector}
                  </div>
                ))}
                {(investor.sector_tags || investor.contextSectors || []).length > 3 && (
                  <div className="text-[10px] text-muted-foreground">
                    +{(investor.sector_tags || investor.contextSectors || []).length - 3} more
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <Button 
              variant={isFollowing ? "outline" : "default"}
              onClick={() => onToggleFollow(investor.id)}
              className="h-7 text-xs px-3"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs px-2">
                  Actions
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-xs">
                <DropdownMenuItem className="gap-1.5 text-xs" onClick={handleViewProfile}>
                  <Users className="h-3 w-3" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-1.5 text-xs">
                  <MessageSquare className="h-3 w-3" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-1.5 text-xs">
                  <Share2 className="h-3 w-3" />
                  Share Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t flex items-center justify-between">
          <div className="text-xs">
            <span className="font-medium">{investor.deal_count || investor.dealCount}</span> deals in portfolio
          </div>
          <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={handleViewProfile}>
            View Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
