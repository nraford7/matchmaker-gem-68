
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

const ApplyForMembership = () => {
  return (
    <div className="relative bg-background min-h-screen px-4 md:px-8 lg:px-16">
      <div className="container mx-auto py-16 relative z-10 max-w-6xl">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-border bg-card hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all duration-200">
            <CardHeader className="text-center border-b border-border">
              <div className="mx-auto w-12 h-12 rounded-full bg-crimson flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-ivory" />
              </div>
              <CardTitle className="font-serif text-4xl text-foreground">Apply for Membership</CardTitle>
              <CardDescription className="font-serif text-lg text-muted-foreground">
                The Guild is an invitation-only network. Please provide your information to be considered for membership.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input className="bg-background border-input text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input className="bg-background border-input text-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input className="bg-background border-input text-foreground" type="email" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company/Organization</label>
                  <Input className="bg-background border-input text-foreground" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Investment Focus</label>
                  <Input className="bg-background border-input text-foreground" placeholder="e.g., Venture Capital, Real Estate, Private Equity" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Typical Investment Size (USD)</label>
                  <Input className="bg-background border-input text-foreground" placeholder="e.g., $500K - $2M" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="default">Submit Application</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center text-muted-foreground text-sm font-serif">
            <p>All applications are reviewed by our membership committee. We typically respond within 5 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForMembership;
