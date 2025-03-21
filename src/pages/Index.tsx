
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Rocket, Trophy, BarChart4, Briefcase, ArrowRight, Sparkles, Zap, ArrowUpRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section with Background Gradient */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container mx-auto py-16 md:py-24">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Powered Investment Matching</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              InvestorMatch
            </h1>
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
          
          {/* Animated Cards */}
          <div className="w-full overflow-hidden py-4 md:py-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {[
                  {
                    title: "AI-Powered Match",
                    score: "98%",
                    type: "SaaS",
                    name: "CloudSuite Analytics",
                    desc: "Enterprise analytics platform with AI-driven insights",
                    color: "from-blue-500 to-indigo-700"
                  },
                  {
                    title: "New Opportunity",
                    score: "93%",
                    type: "FinTech",
                    name: "PaymentFlow",
                    desc: "Next-gen payment infrastructure for global commerce",
                    color: "from-emerald-500 to-teal-700"
                  },
                  {
                    title: "Trending Deal",
                    score: "97%",
                    type: "HealthTech",
                    name: "MediConnect",
                    desc: "Remote patient monitoring and telehealth platform",
                    color: "from-purple-500 to-indigo-700"
                  },
                  {
                    title: "Hot Investment",
                    score: "92%",
                    type: "CleanTech",
                    name: "EcoEnergy",
                    desc: "Sustainable energy solutions for residential markets",
                    color: "from-amber-500 to-orange-700"
                  },
                  {
                    title: "Rising Star",
                    score: "95%",
                    type: "EdTech",
                    name: "LearnSphere",
                    desc: "Adaptive learning platform for digital education",
                    color: "from-pink-500 to-rose-700"
                  }
                ].map((card, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-sm text-muted-foreground">
                            {card.title}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-white text-xs font-medium bg-gradient-to-r ${card.color}`}>
                            {card.score} match
                          </div>
                        </div>
                        <div className="mb-2 text-xs uppercase font-semibold text-muted-foreground">
                          {card.type}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          View Details <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="relative static" />
                <CarouselNext className="relative static" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <Zap className="h-3.5 w-3.5" />
            <span>Smart Investment Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Perfect Investment Match</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines AI with expert insights to help you find opportunities that align with your investment thesis.
          </p>
        </div>

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
              <h3 className="text-2xl font-semibold">Visualize Your Preferences</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              See a visual representation of your investment criteria and how opportunities align with your strategy.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Interactive radar charts of preferences</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Portfolio distribution analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                <span>Opportunity fit visualization</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
          {[
            { value: "500+", label: "Active Deals" },
            { value: "98%", label: "Match Accuracy" },
            { value: "$2.4B", label: "Total Invested" },
            { value: "3,200+", label: "Investors" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-xl border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Tailored Matches</h3>
            <p className="text-muted-foreground">
              Get matched with opportunities that align with your investment thesis and criteria.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                <Rocket className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Opportunity Insights</h3>
            <p className="text-muted-foreground">
              Understand why each opportunity matches your criteria with detailed explanations.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Efficient Deal Flow</h3>
            <p className="text-muted-foreground">
              Streamline your deal flow process and focus on the opportunities that matter most.
            </p>
          </div>
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
  );
};

export default Index;
