import React, { useEffect, useState } from "react";
import { Deal, PrivacyLevel } from "@/types/deal";
import { checkDealAccess } from "@/services/deal/interestRegistrationService";
import { RegisterInterestButton } from "./RegisterInterestButton";
import { PrivacyBadge } from "./PrivacyBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { anonymizeDeal } from "@/services/deal/anonymizationService";
import { Loader2, AlertTriangle, Lock } from "lucide-react";

interface DealAccessGateProps {
  deal: Deal;
  children: React.ReactNode;
}

export const DealAccessGate: React.FC<DealAccessGateProps> = ({ deal, children }) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const privacyLevel = deal.privacyLevel || "OPEN";

  // Check access when component mounts or deal changes
  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      const { hasAccess: access, status } = await checkDealAccess(deal.id);
      setHasAccess(access);
      setRegistrationStatus(status);
      setIsLoading(false);
    };

    checkAccess();
  }, [deal.id]);

  const handleRegistered = async () => {
    // Recheck access after registration
    const { hasAccess: access, status } = await checkDealAccess(deal.id);
    setHasAccess(access);
    setRegistrationStatus(status);
  };

  // If still loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  // If deal is OPEN or user has access, show the full details
  if (privacyLevel === "OPEN" || hasAccess) {
    return <>{children}</>;
  }

  // Otherwise, show the access gate
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Restricted Access</CardTitle>
              <CardDescription>
                This is a {privacyLevel === "CONFIDENTIAL" ? "confidential" : "invitation only"} deal
              </CardDescription>
            </div>
            <PrivacyBadge privacyLevel={privacyLevel} />
          </div>
        </CardHeader>
        <CardContent>
          {/* Display anonymized deal information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {anonymizeDeal(deal, privacyLevel).name}
            </h2>
            <p className="text-muted-foreground">
              {anonymizeDeal(deal, privacyLevel).description}
            </p>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-muted/50 rounded-full">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {privacyLevel === "CONFIDENTIAL" 
                    ? "Register to View Full Deal Details" 
                    : "Request Access to View Deal Details"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {privacyLevel === "CONFIDENTIAL"
                    ? "You need to register your interest to access the complete information about this deal."
                    : "This deal requires approval from the originator. Request access to be considered."}
                </p>
              </div>

              {registrationStatus === "REGISTERED" && (
                <div className="bg-amber-50 p-4 rounded-md border border-amber-200 flex items-center text-amber-800">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  <p>Your access request is pending approval from the deal originator.</p>
                </div>
              )}

              {registrationStatus === "REJECTED" && (
                <div className="bg-red-50 p-4 rounded-md border border-red-200 flex items-center text-red-800">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  <p>Your access request has been denied by the deal originator.</p>
                </div>
              )}

              {!registrationStatus && (
                <RegisterInterestButton
                  dealId={deal.id}
                  privacyLevel={privacyLevel as PrivacyLevel}
                  onRegistered={handleRegistered}
                  className="w-full md:w-auto"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
