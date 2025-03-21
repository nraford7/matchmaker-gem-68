
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, TrendingUp, Users } from "lucide-react";
import { EnhancedOpportunity } from "@/pages/DealDetails";
import { formatCurrency } from "@/lib/utils";

interface DealOverviewProps {
  deal: EnhancedOpportunity;
}

const DealOverview = ({ deal }: DealOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{deal.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Funding Amount</p>
            <p className="text-lg font-medium">
              ${(deal.fundingAmount / 1000000).toFixed(1)}M
            </p>
          </div>
          {deal.foundedYear && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Founded</p>
              <p className="text-lg font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {deal.foundedYear}
              </p>
            </div>
          )}
          {deal.businessModel && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Business Model</p>
              <p className="text-lg font-medium flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {deal.businessModel}
              </p>
            </div>
          )}
          {deal.teamSize && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Team Size</p>
              <p className="text-lg font-medium flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {deal.teamSize} employees
              </p>
            </div>
          )}
          {deal.revenue && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Annual Revenue</p>
              <p className="text-lg font-medium">
                ${formatCurrency(deal.revenue)}
              </p>
            </div>
          )}
          {deal.growth && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">YoY Growth</p>
              <p className="text-lg font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {deal.growth}
              </p>
            </div>
          )}
          {deal.projectedIRR && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Projected IRR</p>
              <p className="text-lg font-medium">
                {deal.projectedIRR}
              </p>
            </div>
          )}
        </div>
        
        {deal.competitors && deal.competitors.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-2">Competitors</p>
            <div className="flex flex-wrap gap-2">
              {deal.competitors.map((competitor, index) => (
                <Badge key={index} variant="outline">{competitor}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DealOverview;
