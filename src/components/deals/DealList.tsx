
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Deal } from "@/types";
import DealActions from "./DealActions";
import { DealIntroducer } from "./DealIntroducer";
import { DealTags } from "./DealTags";
import { DealMetrics } from "./DealMetrics";

interface DealListProps {
  deals: Deal[];
  showMatchScore?: boolean;
}

export const DealList = ({ deals, showMatchScore = false }: DealListProps) => {
  const location = useLocation();
  
  return (
    <div className="space-y-4">
      {deals.map((deal) => (
        <Link 
          key={deal.id} 
          to={`/deals/${deal.id}`}
          state={{ from: location.pathname }}
          className="block hover:no-underline focus:outline-none"
        >
          <Card className="border border-border transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                        {deal.name}
                      </h3>
                      {deal.introducedById && (
                        <DealIntroducer introducerId={deal.introducedById} />
                      )}
                    </div>
                  </div>
                  
                  <DealTags sectorTags={deal.sectorTags} stage={deal.stage} />
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {deal.description || "No description available"}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {deal.location || deal.geographies?.join(', ') || "Global"}
                  </div>
                </div>
                
                <div className="flex flex-col justify-between border-l-0 md:border-l pl-0 md:pl-4 relative">
                  <div className="absolute top-0 right-0">
                    <DealActions dealId={deal.id} dealName={deal.name} />
                  </div>
                  
                  <DealMetrics 
                    checkSizeRequired={deal.checkSizeRequired}
                    IRR={deal.IRR}
                    matchScore={showMatchScore ? deal.matchScore : undefined}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
