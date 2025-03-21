
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types";
import { OpportunityList } from "@/components/opportunities";

interface SavedDealsProps {
  savedDeals: Opportunity[];
  loading: boolean;
}

export const SavedDeals = ({ savedDeals, loading }: SavedDealsProps) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Your Saved Deals</h2>
        <p className="text-muted-foreground">
          Opportunities you've saved for later
        </p>
      </div>
      
      <Tabs defaultValue="saved" className="w-full mb-6">
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-lg text-muted-foreground">
                    Loading saved deals...
                  </p>
                </div>
              ) : savedDeals.length > 0 ? (
                <OpportunityList opportunities={savedDeals} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
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
    </>
  );
};
