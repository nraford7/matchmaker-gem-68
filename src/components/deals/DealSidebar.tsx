import { EnhancedDeal } from "@/types/deal";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { InterestRequestsPanel } from "./InterestRequestsPanel";

interface DealSidebarProps {
  deal: EnhancedDeal;
}

const DealSidebar = ({ deal }: DealSidebarProps) => {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnership = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user && deal.uploaderId === userData.user.id) {
        setIsOwner(true);
      }
    };

    checkOwnership();
  }, [deal.uploaderId]);

  return (
    <>
      <Card className="bg-white">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Deal Metrics</h3>
          <div className="space-y-4">
            {deal.checkSizeRequired && (
              <div>
                <h4 className="text-sm font-semibold">Check Size Required</h4>
                <p className="text-sm text-muted-foreground">
                  ${deal.checkSizeRequired.toLocaleString()}
                </p>
              </div>
            )}
            
            {deal.IRR && (
              <div>
                <h4 className="text-sm font-semibold">IRR</h4>
                <p className="text-sm text-muted-foreground">{deal.IRR}%</p>
              </div>
            )}
            
            {deal.timeHorizon && (
              <div>
                <h4 className="text-sm font-semibold">Time Horizon</h4>
                <p className="text-sm text-muted-foreground">{deal.timeHorizon}</p>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <h4 className="text-sm font-semibold">Involvement Model</h4>
          <p className="text-sm text-muted-foreground">{deal.involvementModel || "Not specified"}</p>
          <Separator className="my-4" />
          <h4 className="text-sm font-semibold">Exit Style</h4>
          <p className="text-sm text-muted-foreground">{deal.exitStyle || "Not specified"}</p>
        </CardContent>
      </Card>
      
      {/* Show interest requests panel for deal originators */}
      {isOwner && deal.privacyLevel === "INVITATION_ONLY" && (
        <div className="mt-6">
          <InterestRequestsPanel dealId={deal.id} />
        </div>
      )}

      {/* If there's a pitchDeckUrl, show pitch deck download */}
      {deal.pitchDeckUrl && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="space-y-4">
              <a
                href={deal.pitchDeckUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Download Pitch Deck
              </a>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* If there's a contactEmail, show contact info */}
      {deal.contactEmail && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <p className="text-sm">
                <a
                  href={`mailto:${deal.contactEmail}`}
                  className="text-primary hover:underline"
                >
                  {deal.contactEmail}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DealSidebar;
