
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@/components/navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import ApplyForMembership from "./pages/ApplyForMembership";
import Dashboard from "./pages/Dashboard";
import Preferences from "./pages/Preferences";
import UploadOpportunity from "./pages/UploadOpportunity";
import Insights from "./pages/Insights";
import Deals from "./pages/Deals";
import DealDetails from "./pages/DealDetails";
import Network from "./pages/Network";
import InvestorProfile from "./pages/InvestorProfile";
import InvestorOnboarding from "./pages/InvestorOnboarding";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import PublicDeals from "./pages/PublicDeals";
import PublicAI from "./pages/PublicAI";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<ApplyForMembership />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/deals" element={
              <ProtectedRoute>
                <Deals />
              </ProtectedRoute>
            } />
            <Route path="/deals/:id" element={
              <ProtectedRoute>
                <DealDetails />
              </ProtectedRoute>
            } />
            <Route path="/preferences" element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <UploadOpportunity />
              </ProtectedRoute>
            } />
            <Route path="/insights" element={
              <ProtectedRoute>
                <Insights />
              </ProtectedRoute>
            } />
            <Route path="/network" element={
              <ProtectedRoute>
                <Network />
              </ProtectedRoute>
            } />
            <Route path="/investor/:id" element={
              <ProtectedRoute>
                <InvestorProfile />
              </ProtectedRoute>
            } />
            <Route path="/investor-onboarding" element={
              <ProtectedRoute>
                <InvestorOnboarding />
              </ProtectedRoute>
            } />
            <Route path="/public-deals" element={<PublicDeals />} />
            <Route path="/public-ai" element={<PublicAI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
