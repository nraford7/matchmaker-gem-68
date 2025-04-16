import React from 'react';
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative bg-background min-h-screen">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 animate-fade-in">
          <div className="flex-grow space-y-8 max-w-2xl">
            <h1 className="font-serif text-6xl md:text-7xl tracking-wider text-foreground">
              The Guild
            </h1>
            
            <h2 className="font-serif text-xl md:text-2xl text-muted-foreground font-thin tracking-wide leading-relaxed">
              The UAE's most successful investment club, for the world's most exclusive investors
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 mb-20 bg-card border border-border rounded-xl p-8 w-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              {[
                { value: "500+", label: "Active Deals" },
                { value: "98%", label: "Match Accuracy" },
                { value: "$2.4B", label: "Total Invested" },
                { value: "3,200+", label: "Investors" }
              ].map((stat, index) => (
                <div key={index} className="transform transition-all duration-500 hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-numeric tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-serif tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Confidential, Invite-Only",
                  description: "Our exclusive platform ensures that sensitive investment opportunities remain private and are only shared with qualified investors.",
                  features: [
                    "Invitation-only access to top-tier deals",
                    "End-to-end encryption for sensitive materials",
                    "Verified investor network with NDA protection"
                  ]
                },
                {
                  title: "Deep Understanding",
                  description: "The Guild's AI builds a comprehensive model of your investment strategy and preferences to find exactly what you're looking for.",
                  features: [
                    "Intuitive preference profile building",
                    "Contextual understanding of investment goals",
                    "Continuous learning from your feedback"
                  ]
                }
              ].map((section, index) => (
                <div 
                  key={index} 
                  className="rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  <h3 className="text-2xl font-semibold text-foreground font-serif tracking-wide mb-4">{section.title}</h3>
                  <p className="text-muted-foreground mb-6 text-base font-serif leading-relaxed">
                    {section.description}
                  </p>
                  <ul className="space-y-3 font-serif">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <ChevronRight className="h-4 w-4 text-crimson flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Link to="/apply">
                <Button variant="default" size="lg" className="px-8 py-6 text-base">
                  Apply for Membership
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/3 flex-shrink-0">
            <div className="sticky top-24">
              <p className="font-serif text-lg text-muted-foreground tracking-wider mb-6">Brought to you by:</p>
              
              <div className="flex flex-col gap-6">
                <img src="/lovable-uploads/e33a00a9-24d5-4673-ab73-5b76d5d26d3d.png" alt="Emirates Family Office Association" className="w-full bg-white/95 p-4 rounded-lg shadow-sm transition-all duration-300 hover:bg-white hover:scale-105" />
                <img src="/lovable-uploads/bc7f0867-82b2-4c0c-acb3-f2093e96736f.png" alt="Abu Dhabi Investment Office" className="w-full bg-white/95 p-4 rounded-lg shadow-sm transition-all duration-300 hover:bg-white hover:scale-105" />
                <img src="/lovable-uploads/1c565d4e-6fdd-4731-bb38-e49923afff82.png" alt="EMIR" className="w-full bg-white/95 p-4 rounded-lg shadow-sm transition-all duration-300 hover:bg-white hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
