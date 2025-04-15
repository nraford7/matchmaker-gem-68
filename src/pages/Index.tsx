import { Button } from "@/components/ui/button";
import { ChevronRight, Rocket, Trophy, BarChart4, Briefcase, Sparkles, Zap, Shield, Key, Handshake, UserRound } from "lucide-react";

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      <div className="relative bg-obsidian min-h-screen">
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
        
        <div className="absolute inset-0 bg-grid-black/[0.05] -z-10" />
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            
            <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-champagne via-champagne to-ivory">
              The Guild
            </h1>
            
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-ivory/90 mb-16 max-w-2xl">The UAE's most exclusive investment club, by invitation only, for the world's most successful investors</h2>
            
            <p className="font-serif text-xl text-champagne/80 mb-12">Brought to you by:</p>
            
            <div className="flex flex-wrap justify-center gap-16 mb-16 max-w-3xl">
              <img 
                src="/lovable-uploads/e33a00a9-24d5-4673-ab73-5b76d5d26d3d.png" 
                alt="Emirates Family Office Association" 
                className="h-14 w-auto bg-white p-2 rounded-md" 
              />
              <img 
                src="/lovable-uploads/bc7f0867-82b2-4c0c-acb3-f2093e96736f.png" 
                alt="Abu Dhabi Investment Office" 
                className="h-14 w-auto bg-white p-2 rounded-md" 
              />
              <img 
                src="/lovable-uploads/1c565d4e-6fdd-4731-bb38-e49923afff82.png" 
                alt="EMIR" 
                className="h-14 w-auto bg-white p-2 rounded-md" 
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 bg-midnight/30 border border-champagne/10 rounded-2xl backdrop-blur-sm w-full mt-16">
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
                  <div className="text-4xl md:text-5xl font-bold text-champagne mb-3 font-sans">{stat.value}</div>
                  <div className="text-base text-ivory/80 font-serif">{stat.label}</div>
                </div>)}
            </div>
          </div>
          
          <div className="container mx-auto py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-champagne/10 bg-midnight/20 backdrop-blur-sm p-10 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson/90 to-crimson flex items-center justify-center text-ivory">
                    <Shield className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-ivory font-serif">Confidential, Invite-Only</h3>
                </div>
                <p className="text-champagne/80 mb-6 text-lg font-serif">
                  Our exclusive platform ensures that sensitive investment opportunities remain private and are only shared with qualified investors.
                </p>
                <ul className="space-y-3 font-serif">
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Invitation-only access to top-tier deals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">End-to-end encryption for sensitive materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Verified investor network with NDA protection</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-champagne/10 bg-midnight/20 backdrop-blur-sm p-10 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson/90 to-crimson flex items-center justify-center text-ivory">
                    <BarChart4 className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-ivory font-serif">Deep Understanding</h3>
                </div>
                <p className="text-champagne/80 mb-6 text-lg font-serif">The Guild's AI builds a comprehensive model of your investment strategy and preferences to find exactly what you're looking for.</p>
                <ul className="space-y-3 font-serif">
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Intuitive preference profile building</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Contextual understanding of investment goals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Continuous learning from your feedback</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-champagne/10 bg-midnight/20 backdrop-blur-sm p-10 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson/90 to-crimson flex items-center justify-center text-ivory">
                    <Trophy className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-ivory font-serif">Smart Matching</h3>
                </div>
                <p className="text-champagne/80 mb-6 text-lg font-serif">
                  Our AI-powered algorithm analyzes your investment preferences and matches you with the most relevant opportunities.
                </p>
                <ul className="space-y-3 font-serif">
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Multi-factor analysis of investment criteria</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Personalized match scores for each opportunity</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Plain-language explanations for matches</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-2xl border border-champagne/10 bg-midnight/20 backdrop-blur-sm p-10 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson/90 to-crimson flex items-center justify-center text-ivory">
                    <UserRound className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-ivory font-serif">Bespoke Service, AI Empowered</h3>
                </div>
                <p className="text-champagne/80 mb-6 text-lg font-serif">
                  Combining personal service with cutting-edge AI technology to deliver a custom investment experience tailored to your exact needs.
                </p>
                <ul className="space-y-3 font-serif">
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Personal investment concierge backed by AI</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Custom deal flow curated to your requirements</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="h-5 w-5 text-crimson" />
                    <span className="text-base text-ivory/90">Proactive opportunity identification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
