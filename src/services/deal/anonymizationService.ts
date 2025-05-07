import { Deal, PrivacyLevel } from "@/types/deal";

// Function to anonymize a deal based on its privacy level
export const anonymizeDeal = (deal: Deal, privacyLevel?: PrivacyLevel): Deal => {
  if (!privacyLevel || privacyLevel === "OPEN") {
    return { ...deal };
  }
  
  // Base anonymization for both CONFIDENTIAL and INVITATION_ONLY
  const anonymized: Deal = {
    ...deal,
    name: anonymizeName(deal.name, deal.sectorTags),
    description: anonymizeDescription(deal.description || "", privacyLevel)
  };

  // For INVITATION_ONLY, anonymize more details
  if (privacyLevel === "INVITATION_ONLY") {
    return {
      ...anonymized,
      IRR: undefined, // Hide IRR
      timeHorizon: undefined, // Hide time horizon
      // Keep location but make it more general
      location: generalizeLocation(deal.location),
      // Show a range instead of exact amount
      checkSizeRequired: deal.checkSizeRequired 
        ? roundToRange(deal.checkSizeRequired) 
        : undefined
    };
  }
  
  return anonymized;
};

// Helper function to anonymize company name
const anonymizeName = (name: string, sectors?: string[]): string => {
  if (!name) return "Anonymous Company";
  
  // Use sector if available
  if (sectors && sectors.length > 0) {
    return `${sectors[0]} Company`;
  }
  
  // Otherwise, try to extract industry from name or use generic
  const words = name.split(" ");
  if (words.length > 1) {
    return `${words[0]} in ${words[1]}`;
  }
  
  return "Confidential Opportunity";
};

// Helper function to anonymize description
const anonymizeDescription = (description: string, privacyLevel: PrivacyLevel): string => {
  if (!description) return "Confidential opportunity details available upon registration.";
  
  if (privacyLevel === "CONFIDENTIAL") {
    // For CONFIDENTIAL, show first sentence and truncate
    const firstSentence = description.split(".")[0];
    if (firstSentence.length > 100) {
      return firstSentence.substring(0, 100) + "... (Register to see full details)";
    }
    return firstSentence + "... (Register to see full details)";
  }
  
  // For INVITATION_ONLY, show just a general description
  return "This is a highly confidential investment opportunity. Please register interest to request access to the details.";
};

// Helper function to generalize location
const generalizeLocation = (location?: string): string | undefined => {
  if (!location) return undefined;
  
  // Extract just the country or region
  const parts = location.split(",");
  if (parts.length > 1) {
    return parts[parts.length - 1].trim();
  }
  
  return location;
};

// Helper function to round to range
const roundToRange = (amount: number): number => {
  // Round to nearest million and return as a range
  const millions = Math.round(amount / 1000000);
  return millions * 1000000;
};
