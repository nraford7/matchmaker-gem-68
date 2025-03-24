
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight } from "lucide-react";
import { NetworkSharedDeal } from "@/types";
import { useNavigate } from "react-router-dom";
import { SharedDealItem } from "./SharedDealItem";
import { fetchRecommendationsForUser } from "@/services/investor";
import { NetworkHighlightsEmpty } from "./NetworkHighlightsEmpty";
import { NetworkHighlightsLoading } from "./NetworkHighlightsLoading";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const DEALS_PER_PAGE = 4;

export const NetworkHighlights = () => {
  const [sharedDeals, setSharedDeals] = useState<NetworkSharedDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadSharedDeals = async () => {
      setLoading(true);
      try {
        const deals = await fetchRecommendationsForUser();
        setSharedDeals(deals);
      } catch (error) {
        console.error("Error loading shared deals:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSharedDeals();
  }, []);
  
  const viewAllDeals = () => {
    navigate("/network?tab=shared");
  };
  
  if (loading) {
    return <NetworkHighlightsLoading />;
  }
  
  if (sharedDeals.length === 0) {
    return <NetworkHighlightsEmpty />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(sharedDeals.length / DEALS_PER_PAGE);
  const startIndex = (currentPage - 1) * DEALS_PER_PAGE;
  const paginatedDeals = sharedDeals.slice(startIndex, startIndex + DEALS_PER_PAGE);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Network Highlights</CardTitle>
          </div>
          <CardDescription>
            Deals shared with you by investors in your network
          </CardDescription>
        </div>
        {sharedDeals.length > DEALS_PER_PAGE && (
          <button 
            onClick={viewAllDeals}
            className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {paginatedDeals.map((deal) => (
            <SharedDealItem key={deal.id} deal={deal} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  isDisabled={currentPage === 1}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  isDisabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
};
