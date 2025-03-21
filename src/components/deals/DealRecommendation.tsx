
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DealRecommendationProps {
  recommendation: string;
}

const DealRecommendation = ({ recommendation }: DealRecommendationProps) => {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Why We Think You'll Like This</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{recommendation}</p>
      </CardContent>
    </Card>
  );
};

export default DealRecommendation;
