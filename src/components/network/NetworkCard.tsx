
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
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Avatar className="h-14 w-14 cursor-pointer" onClick={handleViewProfile}>
              <AvatarImage src={investor.avatar || undefined} alt={investor.name} />
              <AvatarFallback className="text-lg">{investor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 
                className="font-medium text-lg hover:text-primary cursor-pointer" 
                onClick={handleViewProfile}
              >
                {investor.name}
              </h3>
              <p className="text-muted-foreground">{investor.company}</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {investor.sectors.map(sector => (
                  <div 
                    key={sector} 
                    className="bg-muted text-xs px-2 py-1 rounded-full"
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Button 
              variant={isFollowing ? "outline" : "default"}
              onClick={() => onToggleFollow(investor.id)}
              className="h-9"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 h-7">
                  Actions
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2" onClick={handleViewProfile}>
                  <Users className="h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{investor.dealCount}</span> deals in portfolio
          </div>
          <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleViewProfile}>
            View Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
