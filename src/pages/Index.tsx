
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, Mail } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Simple centered content */}
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-3xl text-center">
          <h1 className="text-6xl font-bold mb-6 text-black">
            EMIR Invest
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            AI powered, investor-led, exclusive opportunity concierge
          </p>
          
          <div className="flex flex-col gap-4 max-w-sm mx-auto mb-8">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 bg-gray-800 hover:bg-gray-900 text-white">
              <LogIn className="h-4 w-4" />
              Log In
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100">
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
