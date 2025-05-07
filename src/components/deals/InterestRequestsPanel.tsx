
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2, UserPlus } from "lucide-react";
import { approveInterest, rejectInterest, getPendingRegistrations } from "@/services/deal/interestRegistrationService";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface InterestRequestsPanelProps {
  dealId: string;
}

interface InterestRequest {
  id: string;
  user_id: string;
  created_at: string;
  profiles: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

export const InterestRequestsPanel: React.FC<InterestRequestsPanelProps> = ({ dealId }) => {
  const [requests, setRequests] = useState<InterestRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<string[]>([]);

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      const data = await getPendingRegistrations(dealId);
      setRequests(data);
      setLoading(false);
    };

    loadRequests();

    // Refresh every 30 seconds
    const interval = setInterval(loadRequests, 30000);
    return () => clearInterval(interval);
  }, [dealId]);

  const handleApprove = async (requestId: string) => {
    setProcessingIds(prev => [...prev, requestId]);
    const success = await approveInterest(requestId);
    if (success) {
      setRequests(prev => prev.filter(req => req.id !== requestId));
    }
    setProcessingIds(prev => prev.filter(id => id !== requestId));
  };

  const handleReject = async (requestId: string) => {
    setProcessingIds(prev => [...prev, requestId]);
    const success = await rejectInterest(requestId);
    if (success) {
      setRequests(prev => prev.filter(req => req.id !== requestId));
    }
    setProcessingIds(prev => prev.filter(id => id !== requestId));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <UserPlus className="h-5 w-5 mr-2 text-primary" />
              Interest Requests
            </CardTitle>
            <CardDescription>
              Approve or reject investors requesting access to this deal
            </CardDescription>
          </div>
          {requests.length > 0 && (
            <Badge variant="secondary">{requests.length} pending</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pending access requests
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map(request => {
              const isProcessing = processingIds.includes(request.id);
              const initials = request.profiles.name
                ? request.profiles.name.split(' ').map(n => n[0]).join('').toUpperCase()
                : '??';
              
              return (
                <div 
                  key={request.id} 
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {request.profiles.name || 'Anonymous Investor'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.profiles.email || ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleReject(request.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                      onClick={() => handleApprove(request.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
