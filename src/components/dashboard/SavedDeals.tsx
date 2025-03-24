import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/opportunities";
import { Bookmark } from "lucide-react";

interface SavedDealsProps {
  savedDeals: Opportunity[];
  loading: boolean;
}

export const SavedDeals = ({ savedDeals, loading }: SavedDealsProps) => {
  return (
    <Tabs defaultValue="saved" className="w-full mb-6">
      <TabsContent value="saved" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Your Saved Deals</CardTitle>
            </div>
            <CardDescription>
              Opportunities you've saved for later
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-6 text-center h-full">
                <p className="text-lg text-muted-foreground">
                  Loading saved deals...
                </p>
              </div>
            ) : savedDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                {savedDeals.map((deal) => (
                  <div 
                    key={deal.id} 
                    className="flex"
                  >
                    <div className="flex-1 flex flex-col">
                      <OpportunityList 
                        opportunities={[deal]} 
                        showMatchScore={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <p className="text-lg text-muted-foreground mb-4">
                  You haven't saved any opportunities yet
                </p>
                <Button variant="outline">Browse Opportunities</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
