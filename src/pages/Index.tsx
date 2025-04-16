import React from 'react';
import { ChevronRight, Shield, BarChart4, Trophy, UserRound } from "lucide-react";

const Index = () => {
  console.log('Current font family:', window.getComputedStyle(document.body).fontFamily);
  
  return (
    <div className="relative overflow-x-hidden">
      <div className="relative bg-[#0B0B0B] min-h-screen">
        {/* Enhanced stars background with varied sizes and animations */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={`star-${i}`} 
              className="star absolute rounded-full bg-ivory/80" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                opacity: Math.random() * 0.9 + 0.1,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4 + 2}s`
              }} 
            />
          ))}
        </div>
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-black/[0.05] -z-10" />
        
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="font-serif text-7xl md:text-8xl tracking-wider mb-8 bg-clip-text text-transparent bg-gradient-to-r from-champagne via-ivory to-champagne font-thin transition-all duration-300 hover:tracking-widest">
              The Guild
            </h1>
            
            <h2 className="font-serif text-2xl md:text-3xl text-ivory/90 mb-20 max-w-2xl font-thin tracking-wide leading-relaxed">
              The UAE's most successful investment club, for the world's most exclusive investors
            </h2>
            
            <p className="font-serif text-xl text-champagne/80 mb-16 tracking-wider">Brought to you by:</p>
            
            <div className="flex flex-wrap justify-center gap-20 mb-20 max-w-3xl transition-all duration-300 hover:gap-24">
              <img src="/lovable-uploads/e33a00a9-24d5-4673-ab73-5b76d5d26d3d.png" alt="Emirates Family Office Association" className="h-16 w-auto bg-white/95 p-3 rounded-lg transition-all duration-300 hover:bg-white" />
              <img src="/lovable-uploads/bc7f0867-82b2-4c0c-acb3-f2093e96736f.png" alt="Abu Dhabi Investment Office" className="h-16 w-auto bg-white/95 p-3 rounded-lg transition-all duration-300 hover:bg-white" />
              <img src="/lovable-uploads/1c565d4e-6fdd-4731-bb38-e49923afff82.png" alt="EMIR" className="h-16 w-auto bg-white/95 p-3 rounded-lg transition-all duration-300 hover:bg-white" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-16 bg-gradient-to-br from-[#0B0B0B]/90 to-[#0B0B0B]/70 border border-champagne/10 rounded-3xl backdrop-blur-sm w-full mt-16 transition-all duration-300 hover:border-champagne/20">
              {[
                { value: "500+", label: "Active Deals" },
                { value: "98%", label: "Match Accuracy" },
                { value: "$2.4B", label: "Total Invested" },
                { value: "3,200+", label: "Investors" }
              ].map((stat, index) => (
                <div key={index} className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-champagne to-ivory mb-4 font-numeric tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-base text-ivory/70 font-serif tracking-wider">{stat.label}</div>
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
                  features: [<li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Invitation-only access to top-tier deals</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">End-to-end encryption for sensitive materials</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Verified investor network with NDA protection</span>
                    </li>]
                }, {
                  icon: <BarChart4 className="h-7 w-7" />,
                  title: "Deep Understanding",
                  description: "The Guild's AI builds a comprehensive model of your investment strategy and preferences to find exactly what you're looking for.",
                  features: [<li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Intuitive preference profile building</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Contextual understanding of investment goals</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Continuous learning from your feedback</span>
                    </li>]
                }, {
                  icon: <Trophy className="h-7 w-7" />,
                  title: "Smart Matching",
                  description: "Our AI-powered algorithm analyzes your investment preferences and matches you with the most relevant opportunities.",
                  features: [<li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Multi-factor analysis of investment criteria</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Personalized match scores for each opportunity</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Plain-language explanations for matches</span>
                    </li>]
                }, {
                  icon: <UserRound className="h-7 w-7" />,
                  title: "Bespoke Service, AI Empowered",
                  description: "Combining personal service with cutting-edge AI technology to deliver a custom investment experience tailored to your exact needs.",
                  features: [<li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Personal investment concierge backed by AI</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Custom deal flow curated to your requirements</span>
                    </li>, <li className="flex items-center gap-3">
                      <ChevronRight className="h-5 w-5 text-crimson" />
                      <span className="text-base text-ivory/90">Proactive opportunity identification</span>
                    </li>]
                }
              ].map((section, index) => (
                <div 
                  key={index} 
                  className="rounded-3xl border border-champagne/10 bg-gradient-to-br from-[#0B0B0B]/90 to-[#0B0B0B]/70 backdrop-blur-sm p-12 transition-all duration-300 hover:border-champagne/20 hover:shadow-[0_0_15px_rgba(247,231,206,0.1)]"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crimson/90 to-crimson flex items-center justify-center text-ivory transition-all duration-300 hover:from-crimson hover:to-crimson/90">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-ivory font-serif tracking-wide">{section.title}</h3>
                  </div>
                  <p className="text-champagne/80 mb-8 text-lg font-serif leading-relaxed">
                    {section.description}
                  </p>
                  <ul className="space-y-4 font-serif">
                    {section.features}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
