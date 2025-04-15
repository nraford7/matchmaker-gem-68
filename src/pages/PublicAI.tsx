import { Shield, Brain, Zap, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PublicAI = () => {
  return (
    <div className="relative bg-[#0B0B0B] min-h-screen px-4 md:px-8 lg:px-16">
      {/* Stars background */}
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
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-champagne via-champagne to-ivory">
            AI-Powered Investing
          </h1>
          <p className="font-serif text-xl text-ivory/80 mb-10">
            Learn how The Guild uses artificial intelligence to optimize investment matching and portfolio management.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: <Brain className="w-10 h-10 text-crimson" />,
                title: "Deep Learning Algorithms",
                description: "Our proprietary AI models analyze thousands of data points to identify the perfect matches between investors and opportunities."
              },
              {
                icon: <Shield className="w-10 h-10 text-crimson" />,
                title: "Private & Secure",
                description: "All data is encrypted and processed with the highest security standards, ensuring your investment strategy remains confidential."
              },
              {
                icon: <Zap className="w-10 h-10 text-crimson" />,
                title: "Rapid Processing",
                description: "Real-time analysis and matching to help you discover opportunities before they become widely available."
              },
              {
                icon: <Lock className="w-10 h-10 text-crimson" />,
                title: "Exclusive Access",
                description: "Members gain privileged access to AI insights and recommendations not available anywhere else."
              }
            ].map((feature, index) => (
              <Card key={index} className="border border-champagne/10 bg-midnight/20">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-obsidian border border-crimson/20">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-champagne">{feature.title}</h3>
                    <p className="text-ivory/70">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/apply">
              <Button variant="default" size="lg" className="px-8">
                Apply for Membership
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicAI;
