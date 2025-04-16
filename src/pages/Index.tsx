
import React from 'react';

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
            
            <div className="container mx-auto py-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  {
                    title: "Confidential, Invite-Only",
                    description: "Our exclusive platform ensures that sensitive investment opportunities remain private and are only shared with qualified investors.",
                    features: [
                      "Invitation-only access to top-tier deals",
                      "End-to-end encryption for sensitive materials", 
                      "Verified investor network with NDA protection"
                    ]
                  }, {
                    title: "Deep Understanding",
                    description: "The Guild's AI builds a comprehensive model of your investment strategy and preferences to find exactly what you're looking for.",
                    features: [
                      "Intuitive preference profile building",
                      "Contextual understanding of investment goals",
                      "Continuous learning from your feedback"
                    ]
                  }, {
                    title: "Smart Matching",
                    description: "Our AI-powered algorithm analyzes your investment preferences and matches you with the most relevant opportunities.",
                    features: [
                      "Multi-factor analysis of investment criteria",
                      "Personalized match scores for each opportunity", 
                      "Plain-language explanations for matches"
                    ]
                  }, {
                    title: "Bespoke Service, AI Empowered",
                    description: "Combining personal service with cutting-edge AI technology to deliver a custom investment experience tailored to your exact needs.",
                    features: [
                      "Personal investment concierge backed by AI",
                      "Custom deal flow curated to your requirements", 
                      "Proactive opportunity identification"
                    ]
                  }
                ].map((section, index) => (
                  <div 
                    key={index} 
                    className="rounded-3xl border border-champagne/10 bg-gradient-to-br from-[#0B0B0B]/90 to-[#0B0B0B]/70 backdrop-blur-sm p-12 transition-all duration-300 hover:border-champagne/20 hover:shadow-[0_0_15px_rgba(247,231,206,0.1)]"
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <h3 className="text-2xl font-semibold text-ivory font-serif tracking-wide">{section.title}</h3>
                    </div>
                    <p className="text-champagne/80 mb-8 text-lg font-serif leading-relaxed">
                      {section.description}
                    </p>
                    <ul className="space-y-4 font-serif">
                      {section.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-base text-ivory/90">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
