
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedDeal } from "@/types/deal";

interface DealOverviewProps {
  deal: EnhancedDeal;
}

const DealOverview = ({ deal }: DealOverviewProps) => {
  // Function to capitalize the first letter of each word
  const capitalize = (text: string) => {
    if (!text) return "";
    return text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Description</h3>
          <p className="text-sm">
            {deal.description || "No description provided."}
          </p>
        </div>
        
        {deal.esgTags && deal.esgTags.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-1">ESG / Impact Focus</h3>
            <div className="flex flex-wrap gap-1">
              {deal.esgTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {capitalize(tag)}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {deal.teamSize && (
            <div>
              <h3 className="text-sm font-medium">Team Size</h3>
              <p className="text-sm">{deal.teamSize} employees</p>
            </div>
          )}
          
          {deal.foundedYear && (
            <div>
              <h3 className="text-sm font-medium">Founded</h3>
              <p className="text-sm">{deal.foundedYear}</p>
            </div>
          )}
          
          {deal.revenue && (
            <div>
              <h3 className="text-sm font-medium">Revenue</h3>
              <p className="text-sm">{deal.revenue}</p>
            </div>
          )}
          
          {deal.growth && (
            <div>
              <h3 className="text-sm font-medium">Growth</h3>
              <p className="text-sm">{deal.growth && deal.growth.replace('YoY', '')}</p>
            </div>
          )}
          
          {deal.involvementModel && (
            <div>
              <h3 className="text-sm font-medium">Involvement Model</h3>
              <p className="text-sm">{capitalize(deal.involvementModel)}</p>
            </div>
          )}
          
          {deal.exitStyle && (
            <div>
              <h3 className="text-sm font-medium">Exit Opportunities</h3>
              <p className="text-sm">{capitalize(deal.exitStyle)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DealOverview;
