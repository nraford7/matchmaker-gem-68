
import { Investor, Opportunity } from "@/types";

export const mockInvestor: Investor = {
  id: "inv-1",
  name: "Jane Smith",
  email: "jane@acmecapital.com",
  contextSectors: ["Fintech", "Health Tech", "SaaS"],
  preferredStages: ["Seed", "Series A"],
  checkSizeMin: 500000,
  checkSizeMax: 2000000,
  preferredGeographies: ["US", "Europe"],
  investmentThesis: "Looking for innovative technology companies with strong founding teams and clear path to profitability. Focus on B2B SaaS, fintech infrastructure, and digital health solutions."
};

export const mockOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    name: "FinanceAI",
    description: "AI-powered financial analysis platform for small businesses. Our platform automates financial reporting, forecasting, and provides actionable insights to improve cash flow and profitability.",
    sector: "Fintech",
    stage: "Series A",
    fundingAmount: 3500000,
    location: "New York, US",
    createdAt: new Date(2023, 6, 15).toISOString(),
    matchScore: 0.92,
    matchExplanation: "Strong sector match (Fintech) and stage match (Series A). Located in your preferred geography."
  },
  {
    id: "opp-2",
    name: "MedTech Solutions",
    description: "Remote patient monitoring platform for chronic disease management. Our solution combines wearable devices with a mobile app to help doctors monitor patients and intervene early when needed.",
    sector: "Health Tech",
    stage: "Seed",
    fundingAmount: 1200000,
    location: "Boston, US",
    createdAt: new Date(2023, 7, 2).toISOString(),
    matchScore: 0.87,
    matchExplanation: "Good sector match (Health Tech) and stage match (Seed). Funding amount within your range."
  },
  {
    id: "opp-3",
    name: "CloudOps",
    description: "DevOps automation platform for cloud infrastructure. Our solution helps engineering teams deploy, monitor, and optimize their cloud resources more efficiently, reducing costs and improving reliability.",
    sector: "SaaS",
    stage: "Series A",
    fundingAmount: 4500000,
    location: "Berlin, Germany",
    createdAt: new Date(2023, 7, 10).toISOString(),
    matchScore: 0.78,
    matchExplanation: "Sector match (SaaS) and located in your preferred geography. Funding amount slightly above your range."
  },
  {
    id: "opp-4",
    name: "RetailTech",
    description: "AI-powered inventory management system for retail businesses. Our platform predicts demand, optimizes stock levels, and reduces waste through smart forecasting.",
    sector: "Retail Tech",
    stage: "Series A",
    fundingAmount: 2800000,
    location: "London, UK",
    createdAt: new Date(2023, 7, 5).toISOString(),
    matchScore: 0.65,
    matchExplanation: "Stage match (Series A) and in preferred geography, but sector (Retail Tech) is outside your focus areas."
  },
  {
    id: "opp-5",
    name: "GreenEnergy",
    description: "Renewable energy optimization platform for commercial buildings. Our solution uses AI to optimize energy usage, integrate renewables, and reduce carbon footprint.",
    sector: "CleanTech",
    stage: "Seed",
    fundingAmount: 800000,
    location: "San Francisco, US",
    createdAt: new Date(2023, 7, 8).toISOString(),
    matchScore: 0.62,
    matchExplanation: "Stage match (Seed) and funding in your range, but sector (CleanTech) is outside your focus areas."
  },
  {
    id: "opp-6",
    name: "Supply Chain AI",
    description: "AI-driven supply chain optimization platform. Our solution helps manufacturers and distributors predict disruptions, optimize inventory, and improve delivery reliability.",
    sector: "Supply Chain",
    stage: "Series A",
    fundingAmount: 3200000,
    location: "Chicago, US",
    createdAt: new Date(2023, 6, 20).toISOString(),
    matchScore: 0.58,
    matchExplanation: "Stage match (Series A) and in preferred geography, but sector (Supply Chain) is outside your focus areas."
  }
];
