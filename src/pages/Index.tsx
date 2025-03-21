import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Rocket, Trophy, BarChart4, Briefcase, ArrowRight, Sparkles, Zap, ArrowUpRight, Shield, Key, Handshake, UserRound } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
const Index = () => {
  return <div className="relative overflow-x-hidden">
      {/* Hero Section with Background Gradient */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container mx-auto py-16 md:py-24">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Powered Investment Matching</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              OpportunityMatcher
            </h1>
            <h2 className="text-2xl font-medium text-muted-foreground mb-10">
              by EMIR
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-10">
              Find your next investment opportunity with precision AI matching that understands 
              your preferences and highlights deals that matter most to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/upload">
                <Button size="lg" variant="outline" className="gap-2">
                  Upload Opportunity <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Removed Carousel Section */}
          
          {/* Features Section */}
          <div className="container mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center text-primary-foreground">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Smart Matching</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our AI-powered algorithm analyzes your investment preferences and matches you with the most relevant opportunities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Multi-factor analysis of investment criteria</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Personalized match scores for each opportunity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Plain-language explanations for matches</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center text-primary-foreground">
                    <BarChart4 className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Deep Understanding</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our platform builds a comprehensive model of your investment strategy and preferences to find exactly what you're looking for.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Intuitive preference profile building</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Contextual understanding of investment goals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Continuous learning from your feedback</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center text-primary-foreground">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Confidential, Invite-Only</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our exclusive platform ensures that sensitive investment opportunities remain private and are only shared with qualified investors.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Invitation-only access to top-tier deals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>End-to-end encryption for sensitive materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Verified investor network with NDA protection</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center text-primary-foreground">
                    <UserRound className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Bespoke Service, AI Empowered</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Combining personal service with cutting-edge AI technology to deliver a custom investment experience tailored to your exact needs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Personal investment concierge backed by AI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Custom deal flow curated to your requirements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Proactive opportunity identification</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
              {[{
              value: "500+",
              label: "Active Deals"
            }, {
              value: "98%",
              label: "Match Accuracy"
            }, {
              value: "$2.4B",
              label: "Total Invested"
            }, {
              value: "3,200+",
              label: "Investors"
            }].map((stat, index) => <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>)}
            </div>

            <div className="flex justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  Explore Your Dashboard <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;