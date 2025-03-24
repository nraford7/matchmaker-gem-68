
import { v4 as uuidv4 } from "uuid";
import { Investor, Deal } from "@/types";

// Mock investor data
export const mockInvestor: Investor = {
  id: uuidv4(),
  name: "Jane Smith",
  email: "jane.smith@example.com",
  company: "Capital Ventures",
  avatar_url: "https://i.pravatar.cc/150?img=5",
  sector_tags: ["Fintech", "SaaS", "Healthcare"], // Used to be contextSectors
  preferred_stages: ["Seed", "Series A"],
  preferred_geographies: ["United States", "Europe"],
  check_size_min: 500000,
  check_size_max: 2000000,
  investment_thesis: "Backing founders who are building the future of finance and healthcare technology.",
  deal_count: 12
};

// Mock deals data
export const mockDeals: Deal[] = [
  {
    id: uuidv4(),
    name: "FinTech AI Platform",
    description: "AI-powered financial analytics platform helping businesses make smarter financial decisions through predictive modeling and risk assessment.",
    dealType: "Equity",
    checkSizeRequired: 1500000,
    sectorTags: ["Fintech", "AI", "Analytics"],
    sector: "Fintech", // For backward compatibility
    geographies: ["United States"],
    location: "United States", // For backward compatibility
    stage: "Series A",
    timeHorizon: "5-7 years",
    fundingAmount: 1500000, // For backward compatibility
    createdAt: new Date().toISOString(),
    matchScore: 0.85,
    matchExplanation: "Strong match based on your sector focus and investment range"
  },
  {
    id: uuidv4(),
    name: "Health Tech Platform",
    description: "Digital health platform connecting patients with healthcare providers through telemedicine, appointment scheduling, and electronic health records.",
    dealType: "Equity",
    checkSizeRequired: 2500000,
    sectorTags: ["Health Tech", "Telemedicine"],
    sector: "Health Tech", // For backward compatibility
    geographies: ["United States", "Canada"],
    location: "United States", // For backward compatibility
    stage: "Series A",
    timeHorizon: "5-7 years",
    fundingAmount: 2500000, // For backward compatibility
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    matchScore: 0.72,
    matchExplanation: "Good match based on your stage preference and check size"
  },
  {
    id: uuidv4(),
    name: "Enterprise SaaS Solution",
    description: "Cloud-based enterprise software offering workflow automation, team collaboration, and business intelligence tools for mid-size companies.",
    dealType: "Equity",
    checkSizeRequired: 1800000,
    sectorTags: ["SaaS", "Enterprise Software"],
    sector: "SaaS", // For backward compatibility
    geographies: ["Europe", "United Kingdom"],
    location: "Europe", // For backward compatibility
    stage: "Series B",
    timeHorizon: "3-5 years",
    fundingAmount: 1800000, // For backward compatibility
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    matchScore: 0.68,
    matchExplanation: "Moderate match based on your sector interests"
  },
  {
    id: uuidv4(),
    name: "Sustainable Energy Tech",
    description: "Developing innovative battery technology for renewable energy storage solutions, focusing on increasing efficiency and reducing costs.",
    dealType: "Equity",
    checkSizeRequired: 3000000,
    sectorTags: ["CleanTech", "Energy"],
    sector: "CleanTech", // For backward compatibility
    geographies: ["Germany", "France"],
    location: "Germany", // For backward compatibility
    stage: "Series A",
    timeHorizon: "7-10 years",
    fundingAmount: 3000000, // For backward compatibility
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    matchScore: 0.62,
    matchExplanation: "Moderate match based on your investment range"
  },
  {
    id: uuidv4(),
    name: "E-commerce Marketplace",
    description: "Niche B2B marketplace connecting sustainable product manufacturers with retailers, focusing on supply chain transparency and ethical sourcing.",
    dealType: "Equity",
    checkSizeRequired: 1200000,
    sectorTags: ["E-commerce", "Retail"],
    sector: "E-commerce", // For backward compatibility
    geographies: ["United States", "Australia"],
    location: "United States", // For backward compatibility
    stage: "Seed",
    timeHorizon: "5-7 years",
    fundingAmount: 1200000, // For backward compatibility
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    matchScore: 0.78,
    matchExplanation: "Good match based on your preferred stage and sector"
  },
  {
    id: uuidv4(),
    name: "EdTech Learning Platform",
    description: "Adaptive learning platform using AI to personalize educational content for K-12 students, offering real-time feedback and progress tracking.",
    dealType: "Equity",
    checkSizeRequired: 800000,
    sectorTags: ["EdTech", "AI"],
    sector: "EdTech", // For backward compatibility
    geographies: ["India", "Southeast Asia"],
    location: "India", // For backward compatibility
    stage: "Seed",
    timeHorizon: "5-7 years",
    fundingAmount: 800000, // For backward compatibility
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    matchScore: 0.64,
    matchExplanation: "Moderate match based on your check size range"
  }
];
