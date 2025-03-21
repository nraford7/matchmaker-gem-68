
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Simple centered content */}
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-3xl text-center">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            EMIR Invest
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            AI powered, investor-led, exclusive opportunity concierge
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <LogIn className="h-4 w-4" />
              Log In
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
