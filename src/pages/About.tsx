
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, HandshakeIcon, GlobeIcon, BriefcaseIcon } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian via-midnight to-obsidian">
      <div className="container mx-auto py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-champagne">About The Guild</h1>
          <p className="text-lg text-ivory/80 mb-10">
            The Guild is the UAE's most exclusive investment club, connecting elite investors with exceptional opportunities.
          </p>
          
          <div className="space-y-8 mb-16">
            <p className="text-ivory/90">
              Founded by a coalition of the UAE's leading investment offices, The Guild represents a new paradigm in private investment networking. We leverage cutting-edge AI technology to create precise matches between sophisticated investors and vetted opportunities.
            </p>
            
            <p className="text-ivory/90">
              Our invitation-only membership ensures that every participant in our ecosystem is rigorously verified, creating an environment of trust and confidentiality essential for high-value transactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="border border-champagne/10 bg-midnight/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-champagne">Our Mission</h3>
                <p className="text-ivory/80">
                  To transform how elite investors discover, evaluate, and execute on opportunities by leveraging artificial intelligence while maintaining the highest standards of privacy and security.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-champagne/10 bg-midnight/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-champagne">Our Vision</h3>
                <p className="text-ivory/80">
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
