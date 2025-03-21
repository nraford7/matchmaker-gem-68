
import { Handshake, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NetworkInvestor } from "@/types";

interface SuggestedConnectionsProps {
  suggestedConnections: NetworkInvestor[];
  isLoading: boolean;
  onToggleFollow: (id: string) => void;
}

export const SuggestedConnections = ({ 
  suggestedConnections, 
  isLoading, 
  onToggleFollow 
}: SuggestedConnectionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5" />
          Suggested Connections
        </CardTitle>
        <CardDescription>
          Investors you might want to connect with
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : suggestedConnections.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            No more suggested connections available
          </p>
        ) : (
          <div className="space-y-4">
            {suggestedConnections.map(investor => (
              <div key={investor.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{investor.name}</p>
                    <p className="text-xs text-muted-foreground">{investor.company}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onToggleFollow(investor.id)}
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  Follow
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
