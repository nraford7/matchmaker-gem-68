
import { Shield, Brain, Zap, Lock, ChevronRight, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PublicDeals = () => {
  // Sample deal data to showcase different stages
  const sampleDeals = [
    {
      title: "AI-Powered Healthcare",
      stage: "Pre-Seed",
      description: "Revolutionizing patient care through advanced machine learning.",
      returns: "18-22%",
      minInvestment: "$25,000"
    },
    {
      title: "Sustainable Energy Storage",
      stage: "Seed",
      description: "Next-generation battery technology for renewable energy systems.",
      returns: "15-20%",
      minInvestment: "$50,000"
    },
    {
      title: "Quantum Computing Platform",
      stage: "Series A",
      description: "Commercial applications of quantum algorithms for enterprise clients.",
      returns: "22-30%",
      minInvestment: "$100,000"
    },
    {
      title: "Vertical Farming Network",
      stage: "Series B",
      description: "Urban agriculture solutions with 90% less water consumption.",
      returns: "16-24%",
      minInvestment: "$250,000"
    },
    {
      title: "Fintech Payment Infrastructure",
      stage: "Growth",
      description: "Cross-border blockchain payment solutions for institutional clients.",
      returns: "14-19%",
      minInvestment: "$500,000"
    },
    {
      title: "Space Manufacturing",
      stage: "Late Stage",
      description: "Zero-gravity manufacturing of advanced materials and pharmaceuticals.",
      returns: "12-16%",
      minInvestment: "$1,000,000"
    },
  ];

  return (
    <div className="relative bg-[#0B0B0B] min-h-screen px-4 md:px-8 lg:px-16">
      {/* Stars background - identical to PublicAI page */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-ivory/80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto py-16 relative z-10 max-w-6xl">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="font-serif text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-champagne via-champagne to-ivory">
            Investment Opportunities
          </h1>
          <p className="font-serif text-xl text-ivory/80 mb-10">
            Discover curated investment opportunities available exclusively to Guild members.
            Our team vets each deal to ensure quality and potential for exceptional returns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sampleDeals.map((deal, index) => (
            <Card key={index} className="border border-champagne/10 bg-midnight/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all duration-200">
              <CardContent className="p-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-champagne">{deal.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs bg-crimson/10 text-crimson border border-crimson/20 inline-block">
                      {deal.stage}
                    </span>
                  </div>
                  <p className="text-ivory/70 mb-6">{deal.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-ivory/60 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Expected IRR
                      </p>
                      <p className="text-champagne font-semibold">{deal.returns}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ivory/60 flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Minimum
                      </p>
                      <p className="text-champagne font-semibold">{deal.minInvestment}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-auto">
                    <Shield className="h-4 w-4 text-crimson mr-1" />
                    <span className="text-sm text-champagne/70">Members Only</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-midnight/30 rounded-xl border border-champagne/10 p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4 text-champagne">Ready to Access Premium Opportunities?</h2>
            <p className="text-ivory/70 mb-6">
              Guild membership provides access to our full portfolio of vetted investment opportunities,
              AI-powered matching, and a network of elite investors.
            </p>
            <Link to="/apply">
              <Button variant="default" size="lg" className="px-8 flex items-center gap-2">
                Apply for Membership
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicDeals;
