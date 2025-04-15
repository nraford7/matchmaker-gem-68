
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

const ApplyForMembership = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian via-midnight to-obsidian">
      <div className="container mx-auto py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-champagne/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-crimson flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-ivory" />
              </div>
              <CardTitle className="text-2xl">Apply for Membership</CardTitle>
              <CardDescription>
                The Guild is an invitation-only network. Please provide your information to be considered for membership.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-champagne">First Name</label>
                    <Input className="bg-obsidian border-champagne/20 text-ivory" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-champagne">Last Name</label>
                    <Input className="bg-obsidian border-champagne/20 text-ivory" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Email Address</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" type="email" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Company/Organization</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Investment Focus</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" placeholder="e.g., Venture Capital, Real Estate, Private Equity" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Typical Investment Size (USD)</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" placeholder="e.g., $500K - $2M" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Application</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center text-ivory/60 text-sm">
            <p>All applications are reviewed by our membership committee. We typically respond within 5 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForMembership;
