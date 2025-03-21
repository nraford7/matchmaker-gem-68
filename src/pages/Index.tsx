
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col min-h-[85vh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                AI-Powered Investment Opportunity Matching
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Find your next investment with our intelligent matching engine. We analyze your preferences and investment thesis to connect you with the most promising opportunities.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/dashboard">
                  <Button className="w-full min-[400px]:w-auto">Go to Dashboard</Button>
                </Link>
                <Link to="/preferences">
                  <Button variant="outline" className="w-full min-[400px]:w-auto">
                    Set Preferences
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-full min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Investment Analysis"
                  className="object-cover rounded-lg shadow-xl"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted-foreground/20 px-3 py-1 text-sm">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Smart Matching Technology
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform uses advanced AI to understand your investment preferences and match you with relevant opportunities.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="grid gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                1
              </div>
              <h3 className="text-xl font-bold">Define Preferences</h3>
              <p className="text-muted-foreground">
                Set your investment criteria including sectors, stages, check sizes, and geographic preferences.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                2
              </div>
              <h3 className="text-xl font-bold">AI Matching</h3>
              <p className="text-muted-foreground">
                Our algorithms analyze opportunities and rank them based on how well they match your criteria.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                3
              </div>
              <h3 className="text-xl font-bold">Discover & Connect</h3>
              <p className="text-muted-foreground">
                Review personalized matches, understand why they're a good fit, and connect with promising startups.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
