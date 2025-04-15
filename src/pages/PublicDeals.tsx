
const PublicDeals = () => {
  return (
    <div className="relative bg-[#0B0B0B] min-h-screen">
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

      <div className="container mx-auto py-16 relative z-10">
        <h1 className="font-serif text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-champagne via-champagne to-ivory">
          Investment Opportunities
        </h1>
        <p className="font-serif text-xl text-ivory/80 mb-10">
          Discover curated investment opportunities available exclusively to Guild members.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-champagne/30">
              <CardHeader className="bg-gradient-to-r from-midnight to-midnight/80 border-b border-champagne/10">
                <CardTitle>Premium Opportunity {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-ivory/80 mb-4">
                  Access exclusive investment deals with vetted companies showing exceptional growth potential.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-champagne/70">Members Only</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-crimson/10 text-crimson border border-crimson/20">
                    {["Pre-Seed", "Seed", "Series A", "Series B", "Growth", "Late Stage"][i % 6]}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicDeals;
