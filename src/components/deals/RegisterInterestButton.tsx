
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { registerInterest } from "@/services/deal/interestRegistrationService";
import { PrivacyLevel } from "@/types/deal";

interface RegisterInterestButtonProps {
  dealId: string;
  privacyLevel: PrivacyLevel;
  onRegistered?: () => void;
  className?: string;
  registrationStatus?: string;
}

export const RegisterInterestButton: React.FC<RegisterInterestButtonProps> = ({
  dealId,
  privacyLevel,
  onRegistered,
  className = "",
  registrationStatus
}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleRegisterInterest = async () => {
    setIsRegistering(true);
    try {
      const success = await registerInterest(dealId);
      if (success && onRegistered) {
        onRegistered();
      }
    } finally {
      setIsRegistering(false);
    }
  };
  
  // If there's a pending registration status
  if (registrationStatus === "REGISTERED") {
    return (
      <Button variant="outline" className={`${className} cursor-not-allowed`} disabled>
        Pending Approval
      </Button>
    );
  }
  
  // If there's a rejected registration status
  if (registrationStatus === "REJECTED") {
    return (
      <Button variant="outline" className={`${className} cursor-not-allowed`} disabled>
        Access Denied
      </Button>
    );
  }

  const buttonText = privacyLevel === "INVITATION_ONLY" 
    ? "Request Access" 
    : "Register Interest";

  return (
    <Button
      onClick={handleRegisterInterest}
      disabled={isRegistering}
      className={className}
    >
      {isRegistering ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Eye className="h-4 w-4 mr-2" />
      )}
      {buttonText}
    </Button>
  );
};
