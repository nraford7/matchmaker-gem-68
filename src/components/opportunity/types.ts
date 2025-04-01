
import { z } from "zod";

export const stakeholderSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  organization: z.string().optional(),
});

export const opportunitySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  sectors: z.array(z.string()).min(1, { message: "Please select at least one sector" }),
  stage: z.string().min(1, { message: "Please select a stage" }),
  fundingAmount: z.coerce.number().min(1, { message: "Funding amount is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  stakeholders: z.array(stakeholderSchema).optional(),
});

export type Stakeholder = z.infer<typeof stakeholderSchema>;
export type OpportunityFormValues = z.infer<typeof opportunitySchema>;

export const sectors = [
  { id: "software", label: "Software" },
  { id: "healthcare", label: "Healthcare" },
  { id: "fintech", label: "Fintech" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "cleantech", label: "Cleantech" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "education", label: "Education" },
  { id: "other", label: "Other" },
];

export const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/ykc7xsfxeii8eggdjpu94xsen7sxbhmm";
