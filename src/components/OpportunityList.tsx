
import { useState } from "react";
import { Opportunity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThumbsUp, ThumbsDown, MapPin, MoreHorizontal, Save, Briefcase, Archive, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { saveDeal, activateDeal, completeDeal } from "@/services/opportunityService";

interface OpportunityListProps {
  opportunities: Opportunity[];
  showMatchScore?: boolean;
}

export const OpportunityList = ({ opportunities, showMatchScore = false }: OpportunityListProps) => {
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [stage, setStage] = useState<string>("Initial Contact");
  const [finalAmount, setFinalAmount] = useState<string>("");
  
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No opportunities found</p>
      </div>
    );
  }

  const handleSave = async (id: string) => {
    await saveDeal(id);
  };

  const handleActivate = async (id: string) => {
    const success = await activateDeal(id, stage);
    if (success) {
      setActivatingId(null);
    }
  };

  const handleComplete = async (id: string) => {
    if (!finalAmount || isNaN(Number(finalAmount))) {
      return;
    }
    
    const success = await completeDeal(id, Number(finalAmount));
    if (success) {
      setCompletingId(null);
      setFinalAmount("");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Link to={`/deals/${opportunity.id}`} className="hover:underline">
                <CardTitle className="text-lg">{opportunity.name}</CardTitle>
              </Link>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{opportunity.stage}</Badge>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="grid gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="justify-start gap-2"
                        onClick={() => handleSave(opportunity.id)}
                      >
                        <Save className="h-4 w-4" />
                        Save Deal
                      </Button>
                      
                      <Dialog open={activatingId === opportunity.id} onOpenChange={(open) => !open && setActivatingId(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="justify-start gap-2"
                            onClick={() => setActivatingId(opportunity.id)}
                          >
                            <Briefcase className="h-4 w-4" />
                            Add to Active Deals
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add to Active Deals</DialogTitle>
                            <DialogDescription>
                              Set initial stage for this deal.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="stage">Deal Stage</Label>
                              <Select 
                                value={stage} 
                                onValueChange={setStage}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Initial Contact">Initial Contact</SelectItem>
                                  <SelectItem value="Proposal">Proposal</SelectItem>
                                  <SelectItem value="Due Diligence">Due Diligence</SelectItem>
                                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                                  <SelectItem value="Final Review">Final Review</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => handleActivate(opportunity.id)}>Activate Deal</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={completingId === opportunity.id} onOpenChange={(open) => !open && setCompletingId(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="justify-start gap-2"
                            onClick={() => {
                              setCompletingId(opportunity.id);
                              setFinalAmount(opportunity.fundingAmount.toString());
                            }}
                          >
                            <Archive className="h-4 w-4" />
                            Mark as Completed
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Complete Deal</DialogTitle>
                            <DialogDescription>
                              Enter the final investment amount for this deal.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="amount">Final Amount</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                <Input 
                                  id="amount" 
                                  className="pl-7" 
                                  value={finalAmount}
                                  onChange={(e) => setFinalAmount(e.target.value)}
                                  type="number"
                                />
                              </div>
                              {finalAmount && isNaN(Number(finalAmount)) && (
                                <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  Please enter a valid number
                                </p>
                              )}
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button 
                              onClick={() => handleComplete(opportunity.id)}
                              disabled={!finalAmount || isNaN(Number(finalAmount))}
                            >
                              Complete Deal
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <MapPin className="h-3 w-3" />
              <span>{opportunity.location}</span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <Link to={`/deals/${opportunity.id}`} className="block hover:text-primary transition-colors">
              <p className="text-sm line-clamp-3 mb-3">{opportunity.description}</p>
            </Link>
            
            <div className="flex flex-wrap gap-1 mb-3">
              <Badge variant="secondary">{opportunity.sector}</Badge>
              <Badge variant="secondary">
                ${(opportunity.fundingAmount / 1000000).toFixed(1)}M
              </Badge>
            </div>

            {showMatchScore && opportunity.matchScore !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Match Score</span>
                  <span className="font-medium">{Math.round(opportunity.matchScore * 100)}%</span>
                </div>
                <Progress value={opportunity.matchScore * 100} className="h-2" />
                {opportunity.matchExplanation && (
                  <p className="text-xs text-muted-foreground mt-1">{opportunity.matchExplanation}</p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/deals/${opportunity.id}`}>View Details</Link>
            </Button>
            
            {showMatchScore && (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
