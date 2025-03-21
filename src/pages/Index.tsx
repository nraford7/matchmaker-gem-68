
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Rocket, Trophy, BarChart4, Briefcase } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          InvestorMatch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Find your next investment opportunity with AI-powered matching that understands your preferences
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="gap-2">
            Go to Dashboard <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-lg border bg-card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
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

        <div className="rounded-lg border bg-card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart4 className="h-6 w-6 text-primary" />
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Tailored Matches</h3>
          <p className="text-muted-foreground">
            Get matched with opportunities that align with your investment thesis and criteria.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Opportunity Insights</h3>
          <p className="text-muted-foreground">
            Understand why each opportunity matches your criteria with detailed explanations.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
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
          <Button size="lg" variant="outline" className="gap-2">
            Explore Your Dashboard <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
