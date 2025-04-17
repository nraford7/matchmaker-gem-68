import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
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
  
  const viewAllDeals = () => navigate("/network?tab=shared");
  
  if (loading) return <NetworkHighlightsLoading />;
  if (sharedDeals.length === 0) return <NetworkHighlightsEmpty />;

  const totalPages = Math.ceil(sharedDeals.length / DEALS_PER_PAGE);
  const startIndex = (currentPage - 1) * DEALS_PER_PAGE;
  const paginatedDeals = sharedDeals.slice(startIndex, startIndex + DEALS_PER_PAGE);
  
  return (
    <Card className="border-none bg-background shadow-none px-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-0">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Network Highlights</CardTitle>
          </div>
          <CardDescription className="mt-1">
            Deals shared with you by investors in your network
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {paginatedDeals.map((deal) => (
            <SharedDealItem key={deal.id} deal={deal} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  isDisabled={currentPage === 1}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
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
