
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Preferences from "./pages/Preferences";
import UploadOpportunity from "./pages/UploadOpportunity";
import Insights from "./pages/Insights";
import Deals from "./pages/Deals";
import DealDetails from "./pages/DealDetails";
import Network from "./pages/Network";
import InvestorProfile from "./pages/InvestorProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative overflow-x-hidden min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
          <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
          <NavBar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/deals/:id" element={<DealDetails />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/upload" element={<UploadOpportunity />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/network" element={<Network />} />
            <Route path="/investor/:id" element={<InvestorProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
