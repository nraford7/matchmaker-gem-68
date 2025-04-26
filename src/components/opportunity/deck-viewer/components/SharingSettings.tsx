import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { shareDealWithInvestor } from "@/services/investor/recommendations/createRecommendation";
import { RecommendedInvestors } from "./sharing/RecommendedInvestors";
import { NetworkInvestors } from "./sharing/NetworkInvestors";
import { VisibilitySettings } from "./sharing/VisibilitySettings";

interface SharingSettingsProps {
  onBack: () => void;
  dealId: string;
  recommendation: string;
}

export const SharingSettings: React.FC<SharingSettingsProps> = ({ onBack, dealId, recommendation }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sharingOption, setSharingOption] = useState("selected");
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);

  const toggleInvestorSelection = (investorId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedInvestors(prev => 
      prev.includes(investorId) 
        ? prev.filter(id => id !== investorId) 
        : [...prev, investorId]
    );
  };

  const recommendedInvestors = [
    { 
      id: "1", 
      name: "John Smith", 
      company: "Venture Capital Inc.", 
      match: "95%",
      rationale: "Strong track record in tech startups with similar market positioning."
    },
    { 
      id: "2", 
      name: "Sarah Johnson", 
      company: "Growth Fund Partners", 
      match: "87%",
      rationale: "Expertise in scaling enterprise SaaS companies in your sector."
    },
    { 
      id: "3", 
      name: "Mike Wilson", 
      company: "Tech Investments LLC", 
      match: "82%",
      rationale: "Proven investment history in emerging technologies with high growth potential."
    }
  ];

  const networkInvestors = [
    { id: "4", name: "Alice Brown", company: "Innovation Capital" },
    { id: "5", name: "David Lee", company: "Future Ventures" }
  ];

  const handleShareDeal = async () => {
    if (selectedInvestors.length === 0 && sharingOption === "selected") {
      toast.error("Please select at least one investor");
      return;
    }

    try {
      const sharePromises = selectedInvestors.map(investorId => 
        shareDealWithInvestor(dealId, investorId, recommendation)
      );

      await Promise.all(sharePromises);
      toast.success("Deal shared successfully");
      navigate("/deals", { state: { activeTab: "active" } });
    } catch (error) {
      console.error("Error sharing deal:", error);
      toast.error("Failed to share deal");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium">Who would you like to share this deal with?</h4>
        
        <RecommendedInvestors
          investors={recommendedInvestors}
          selectedInvestors={selectedInvestors}
          onToggleSelection={toggleInvestorSelection}
        />

        <NetworkInvestors
          investors={networkInvestors}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedInvestors={selectedInvestors}
          onToggleSelection={toggleInvestorSelection}
        />

        <VisibilitySettings
          sharingOption={sharingOption}
          onSharingOptionChange={setSharingOption}
        />
      </div>

      <div className="flex justify-between gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleShareDeal}>
          <Share className="h-4 w-4 mr-2" />
          Share Deal
        </Button>
      </div>
    </div>
  );
};
