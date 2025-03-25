
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface DealRecommendationProps {
  recommendation: string;
}

const DealRecommendation = ({ recommendation }: DealRecommendationProps) => {
  return (
    <div className="bg-primary-50 dark:bg-primary-950/20 rounded-lg p-4">
      <h3 className="text-base font-medium flex items-center mb-2 text-primary">
        <MessageCircle className="h-4 w-4 mr-1" />
        Investor Fit
      </h3>
      <p className="text-sm">{recommendation || "This opportunity would be a good fit for investors focused on this sector with the specified investment parameters."}</p>
    </div>
  );
};

export default DealRecommendation;
