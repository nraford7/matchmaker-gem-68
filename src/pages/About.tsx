
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
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
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="font-serif text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-champagne via-champagne to-ivory">
            About The Guild
          </h1>
          <p className="font-serif text-xl text-ivory/80 mb-10">
            The Guild is the UAE's most exclusive investment club, connecting elite investors with exceptional opportunities.
          </p>
          
          <div className="space-y-8 mb-16">
            <p className="text-ivory/90 font-serif">
              Founded by a coalition of the UAE's leading investment offices, The Guild represents a new paradigm in private investment networking. We leverage cutting-edge AI technology to create precise matches between sophisticated investors and vetted opportunities.
            </p>
            
            <p className="text-ivory/90 font-serif">
              Our invitation-only membership ensures that every participant in our ecosystem is rigorously verified, creating an environment of trust and confidentiality essential for high-value transactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-champagne/10 bg-midnight/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all duration-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold mb-4 text-champagne">Our Mission</h3>
                <p className="text-ivory/80 font-serif">
                  To transform how elite investors discover, evaluate, and execute on opportunities by leveraging artificial intelligence while maintaining the highest standards of privacy and security.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-champagne/10 bg-midnight/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all duration-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold mb-4 text-champagne">Our Vision</h3>
                <p className="text-ivory/80 font-serif">
                  To establish the UAE as the global hub for intelligent private investment, creating an ecosystem where capital efficiently finds the most promising opportunities across all sectors and stages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
