
const ApplyForMembership = () => {
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
        <div className="max-w-2xl mx-auto">
          <Card className="border border-champagne/10 bg-midnight/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all duration-200">
            <CardHeader className="text-center border-b border-champagne/10">
              <div className="mx-auto w-12 h-12 rounded-full bg-crimson flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-ivory" />
              </div>
              <CardTitle className="font-serif text-4xl bg-clip-text text-transparent bg-gradient-to-r from-champagne via-champagne to-ivory">Apply for Membership</CardTitle>
              <CardDescription className="font-serif text-lg text-ivory/80">
                The Guild is an invitation-only network. Please provide your information to be considered for membership.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-champagne">First Name</label>
                    <Input className="bg-obsidian border-champagne/20 text-ivory" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-champagne">Last Name</label>
                    <Input className="bg-obsidian border-champagne/20 text-ivory" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Email Address</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" type="email" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Company/Organization</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Investment Focus</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" placeholder="e.g., Venture Capital, Real Estate, Private Equity" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-champagne">Typical Investment Size (USD)</label>
                  <Input className="bg-obsidian border-champagne/20 text-ivory" placeholder="e.g., $500K - $2M" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Application</Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center text-ivory/60 text-sm font-serif">
            <p>All applications are reviewed by our membership committee. We typically respond within 5 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForMembership;
