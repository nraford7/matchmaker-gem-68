import React from 'react';
import { ChevronRight, Shield, BarChart4, Trophy, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative bg-background min-h-screen">
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-serif text-7xl md:text-8xl tracking-wider mb-8 text-foreground">
            The Guild
          </h1>
          
          <h2 className="font-serif text-2xl md:text-3xl text-muted-foreground mb-20 max-w-2xl font-thin tracking-wide leading-relaxed">
            The UAE's most successful investment club, for the world's most exclusive investors
          </h2>
          
          <p className="font-serif text-xl text-muted-foreground mb-16 tracking-wider">Brought to you by:</p>
          
          <div className="flex flex-wrap justify-center gap-20 mb-20 max-w-3xl transition-all duration-300 hover:gap-24">
            <img src="/lovable-uploads/e33a00a9-24d5-4673-ab73-5b76d5d26d3d.png" alt="Emirates Family Office Association" className="h-16 w-auto bg-white/95 p-3 rounded-lg transition-all duration-300 hover:bg-white" />
            <img src="/lovable-uploads/bc7f0867-82b2-4c0c-acb3-f2093e96736f.png" alt="Abu Dhabi Investment Office" className="h-16 w-auto bg-white/95 p-3 rounded-lg transition-all duration-300 hover:bg-white" />
            <img src="/lovable-uploads/1c565d4e-6fdd-4731-bb38-e49923afff82.png" alt="EMIR" className="h-16 w-auto bg-white/95 p-3 rounded-lg transition-all duration-300 hover:bg-white" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-16 bg-card border border-border rounded-3xl w-full mt-16 transition-all duration-300 hover:border-primary/30">
            {[
              { value: "500+", label: "Active Deals" },
              { value: "98%", label: "Match Accuracy" },
              { value: "$2.4B", label: "Total Invested" },
              { value: "3,200+", label: "Investors" }
            ].map((stat, index) => (
              <div key={index} className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-numeric tracking-tight">
                  {stat.value}
                </div>
                <div className="text-base text-muted-foreground font-serif tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: <Shield className="h-7 w-7" />,
                title: "Confidential, Invite-Only",
                description: "Our exclusive platform ensures that sensitive investment opportunities remain private and are only shared with qualified investors.",
                features: [
                  <li key="1" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Invitation-only access to top-tier deals</span>
                  </li>,
                  <li key="2" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">End-to-end encryption for sensitive materials</span>
                  </li>,
                  <li key="3" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Verified investor network with NDA protection</span>
                  </li>
                ]
              },
              {
                icon: <BarChart4 className="h-7 w-7" />,
                title: "Deep Understanding",
                description: "The Guild's AI builds a comprehensive model of your investment strategy and preferences to find exactly what you're looking for.",
                features: [
                  <li key="1" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Intuitive preference profile building</span>
                  </li>,
                  <li key="2" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Contextual understanding of investment goals</span>
                  </li>,
                  <li key="3" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Continuous learning from your feedback</span>
                  </li>
                ]
              },
              {
                icon: <Trophy className="h-7 w-7" />,
                title: "Smart Matching",
                description: "Our AI-powered algorithm analyzes your investment preferences and matches you with the most relevant opportunities.",
                features: [
                  <li key="1" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Multi-factor analysis of investment criteria</span>
                  </li>,
                  <li key="2" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Personalized match scores for each opportunity</span>
                  </li>,
                  <li key="3" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Plain-language explanations for matches</span>
                  </li>
                ]
              },
              {
                icon: <UserRound className="h-7 w-7" />,
                title: "Bespoke Service, AI Empowered",
                description: "Combining personal service with cutting-edge AI technology to deliver a custom investment experience tailored to your exact needs.",
                features: [
                  <li key="1" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Personal investment concierge backed by AI</span>
                  </li>,
                  <li key="2" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Custom deal flow curated to your requirements</span>
                  </li>,
                  <li key="3" className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-foreground">Proactive opportunity identification</span>
                  </li>
                ]
              }
            ].map((section, index) => (
              <div 
                key={index} 
                className="rounded-3xl border border-border bg-card p-12 transition-all duration-300 hover:border-primary/30 hover:shadow-hover"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-crimson/10 border border-crimson/20 flex items-center justify-center text-foreground transition-all duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground font-serif tracking-wide">{section.title}</h3>
                </div>
                <p className="text-muted-foreground mb-8 text-lg font-serif leading-relaxed">
                  {section.description}
                </p>
                <ul className="space-y-4 font-serif">
                  {section.features}
                </ul>
              </div>
            ))}
          </div>
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
  );
};

export default Index;
