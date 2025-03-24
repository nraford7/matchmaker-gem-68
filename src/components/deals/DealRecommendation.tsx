
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DealRecommendationProps {
  recommendation: string;
}

const DealRecommendation = ({ recommendation }: DealRecommendationProps) => {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Investor Fit</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{recommendation || "This opportunity would be a good fit for investors focused on this sector with the specified investment parameters."}</p>
      </CardContent>
    </Card>
  );
};

export default DealRecommendation;
