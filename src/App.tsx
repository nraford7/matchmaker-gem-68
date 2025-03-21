
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
