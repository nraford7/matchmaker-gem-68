import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share, Users, UserPlus, Settings } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { shareDealWithInvestor } from "@/services/investor/recommendations/createRecommendation";

interface SharingSettingsProps {
  onBack: () => void;
  dealId: string;
}

export const SharingSettings: React.FC<SharingSettingsProps> = ({ onBack, dealId }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sharingOption, setSharingOption] = useState("selected");
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState("");

  const toggleInvestorSelection = (investorId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    setSelectedInvestors(prev => 
      prev.includes(investorId) 
        ? prev.filter(id => id !== investorId) 
        : [...prev, investorId]
    );
  };

  const isInvestorSelected = (investorId: string): boolean => {
    return selectedInvestors.includes(investorId);
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
        
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-muted-foreground" />
              <h5 className="font-medium">Recommended Investors</h5>
            </div>
            <div className="space-y-3">
              {recommendedInvestors.map(investor => (
                <div key={investor.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{investor.name}</p>
                    <p className="text-sm text-muted-foreground">{investor.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{investor.rationale}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">{investor.match} match</span>
                    <Button 
                      size="sm" 
                      variant={isInvestorSelected(investor.id) ? "default" : "outline"}
                      onClick={(e) => toggleInvestorSelection(investor.id, e)}
                    >
                      {isInvestorSelected(investor.id) ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h5 className="font-medium">Other Investors</h5>
            </div>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search investors in your network..."
              className="w-full"
            />
            <div className="space-y-3">
              {networkInvestors.map(investor => (
                <div key={investor.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{investor.name}</p>
                    <p className="text-sm text-muted-foreground">{investor.company}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant={isInvestorSelected(investor.id) ? "default" : "outline"}
                    onClick={(e) => toggleInvestorSelection(investor.id, e)}
                  >
                    {isInvestorSelected(investor.id) ? "Selected" : "Select"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <h5 className="font-medium">Your Recommendation</h5>
            <Textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Share your reflections on this deal here. It will be shared with each investor you share this deal with."
              className="min-h-[100px]"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <h5 className="font-medium">Visibility Settings</h5>
            </div>
            <RadioGroup 
              value={sharingOption} 
              onValueChange={setSharingOption}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="selected" id="selected" />
                <Label htmlFor="selected">Selected investors only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="followers" id="followers" />
                <Label htmlFor="followers">My network (investors who follow me)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">All investors on the platform</Label>
              </div>
            </RadioGroup>
          </div>
        </Card>
      </div>

      <div className="flex justify-between gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onBack}>Save for later</Button>
        <Button onClick={handleShareDeal}>
          <Share className="h-4 w-4 mr-2" />
          Share Deal
        </Button>
      </div>
    </div>
  );
};
