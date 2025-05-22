import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateInvestorProfile } from "@/services/investor/profileServices";
import { useAuth } from "@/contexts/AuthContext";

// Define steps for the questionnaire
enum OnboardingStep {
  STRUCTURED_INTAKE = 0,
  STORY_BASED = 1,
  COMPLETE = 2,
}

// Schema for Part 1: Structured Context Intake - All fields are now optional
const structuredIntakeSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  sourceOfWealth: z.string().optional(),
  aum: z.string().optional(),
  checkSizeRange: z.string().optional(),
  preferredAssetClasses: z.string().optional(),
  sectorFocus: z.string().optional(),
  fundStructure: z.string().optional(),
  timeHorizon: z.string().optional(),
  preferredStage: z.string().optional(),
  esgValues: z.string().optional(),
});

// Schema for Part 2: Story-Based Questionnaire - Already optional
const storyBasedSchema = z.object({
  interestingInvestment: z.string().optional(),
  evaluationProcess: z.string().optional(),
  missedOpportunity: z.string().optional(),
  marketCrisisResponse: z.string().optional(),
  allocationRule: z.string().optional(),
  investmentFailure: z.string().optional(),
  founderRelationship: z.string().optional(),
  portfolioManagement: z.string().optional(),
  sectorPreference: z.string().optional(),
  exitDecision: z.string().optional(),
  reportingExpectations: z.string().optional(),
  investmentMotivation: z.string().optional(),
});

const InvestorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.STRUCTURED_INTAKE);
  const [formData, setFormData] = useState<any>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form for Structured Intake
  const structuredIntakeForm = useForm<z.infer<typeof structuredIntakeSchema>>({
    resolver: zodResolver(structuredIntakeSchema),
    defaultValues: {
      name: "",
      role: "",
      sourceOfWealth: "",
      aum: "",
      checkSizeRange: "",
      preferredAssetClasses: "",
      sectorFocus: "",
      fundStructure: "",
      timeHorizon: "",
      preferredStage: "",
      esgValues: "",
    },
  });

  // Form for Story-Based Questionnaire
  const storyBasedForm = useForm<z.infer<typeof storyBasedSchema>>({
    resolver: zodResolver(storyBasedSchema),
    defaultValues: {
      interestingInvestment: "",
      evaluationProcess: "",
      missedOpportunity: "",
      marketCrisisResponse: "",
      allocationRule: "",
      investmentFailure: "",
      founderRelationship: "",
      portfolioManagement: "",
      sectorPreference: "",
      exitDecision: "",
      reportingExpectations: "",
      investmentMotivation: "",
    },
  });

  const onSubmitStructuredIntake = (data: z.infer<typeof structuredIntakeSchema>) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(OnboardingStep.STORY_BASED);
    window.scrollTo(0, 0);
  };

  const onSubmitStoryBased = async (data: z.infer<typeof storyBasedSchema>) => {
    const combinedData = { ...formData, ...data };
    setFormData(combinedData);
    
    try {
      // Process data to match investor profile structure
      const profileData = {
        name: combinedData.name || user?.email?.split('@')[0] || "Investor",
        email: user?.email || "",
        company: combinedData.fundStructure || "",
        preferred_stages: combinedData.preferredStage ? combinedData.preferredStage.split(',').map((s: string) => s.trim()) : [],
        preferred_geographies: [], // Not collected in this form
        check_size_min: combinedData.checkSizeRange ? parseInt(combinedData.checkSizeRange.split('-')[0]) || 0 : 0,
        check_size_max: combinedData.checkSizeRange ? parseInt(combinedData.checkSizeRange.split('-')[1]) || 0 : 0,
        investment_thesis: combinedData.investmentMotivation || "",
        deal_count: 0,
        sector_tags: combinedData.sectorFocus ? combinedData.sectorFocus.split(',').map((s: string) => s.trim()) : [],
      };
      
      await updateInvestorProfile(profileData);
      
      toast.success("Investor profile created successfully!");
      setCurrentStep(OnboardingStep.COMPLETE);
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error("Failed to create investor profile. Please try again.");
      console.error("Error creating investor profile:", error);
    }
  };

  const handleComplete = () => {
    navigate("/network");
  };

  return (
    <div className="container mx-auto pt-24 py-6 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Investor Onboarding</h1>
        <p className="text-muted-foreground mt-2">
          Complete this questionnaire to set up your investor profile
        </p>
      </div>

      {currentStep === OnboardingStep.STRUCTURED_INTAKE && (
        <Card>
          <CardHeader>
            <CardTitle>Part 1: About You and Your Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...structuredIntakeForm}>
              <form
                onSubmit={structuredIntakeForm.handleSubmit(onSubmitStructuredIntake)}
                className="space-y-6"
              >
                <FormField
                  control={structuredIntakeForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your name or investment identity?</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you invest - as an individual, through a family office, or another entity?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Individual investor, family office, investment fund, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="sourceOfWealth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you build your capital?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Business sale, inheritance, career earnings, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="aum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your estimated AUM or net worth?</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter amount or range" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="checkSizeRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your typical investment size per deal?</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter amount or range" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="preferredAssetClasses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which asset classes do you prefer to invest in?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Startups, funds, real estate, public equities, private credit, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="sectorFocus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which industries or themes are you most drawn to?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tech, healthcare, sustainability, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="fundStructure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your fund or entity structure?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Evergreen family office, 10-year VC fund, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="timeHorizon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your typical investment time horizon?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1-3 years, 5-10 years, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="preferredStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which deal stages or geographies do you prefer?</FormLabel>
                      <FormControl>
                        <Input placeholder="Seed, Series A, North America, Europe, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={structuredIntakeForm.control}
                  name="esgValues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do any ethical, religious, or environmental values guide your investments? (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Impact investing, faith-based criteria, ESG considerations, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Continue to Part 2</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {currentStep === OnboardingStep.STORY_BASED && (
        <Card>
          <CardHeader>
            <CardTitle>Part 2: Your Investment Story</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...storyBasedForm}>
              <form
                onSubmit={storyBasedForm.handleSubmit(onSubmitStoryBased)}
                className="space-y-6"
              >
                <FormField
                  control={storyBasedForm.control}
                  name="interestingInvestment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Could you share one of your most interesting investments?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What drew you to it? How much did you invest? How did you decide to go ahead?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="evaluationProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you typically evaluate new investment opportunities?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Do you follow set criteria, rely on instinct, or trust others?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="missedOpportunity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Have you ever passed on an opportunity and later regretted it?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What happened? How did you feel or respond afterward?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="marketCrisisResponse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How did you handle the last market drop or financial crisis?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Did you make changes or stick to your plan?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="allocationRule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have rules about how much to allocate to a single investment?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What factors determine that amount?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="investmentFailure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Can you tell us about a time when an investment didn't work out?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What did you do in response? What did you learn?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="founderRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How important is your relationship with founders or fund managers?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Do you meet them personally, vet them, or delegate that?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="portfolioManagement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you manage your portfolio directly or work through advisors?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How involved are you in day-to-day decisions?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="sectorPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What sectors or assets do you naturally gravitate toward and why?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Is it due to familiarity, values, perceived opportunity, or past experience?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="exitDecision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you decide when it's time to exit an investment?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Do you follow a target return, market signal, or instinct?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="reportingExpectations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What kind of updates do you expect from your investments?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Do you track performance closely or prefer a hands-off approach?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={storyBasedForm.control}
                  name="investmentMotivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What motivates you most about investing?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Is it financial return, legacy, excitement, impact, or intellectual interest?"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full" 
                    onClick={() => setCurrentStep(OnboardingStep.STRUCTURED_INTAKE)}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {currentStep === OnboardingStep.COMPLETE && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Created Successfully!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Thank you for completing the investor onboarding process. Your profile has been created and you can now access additional investor features.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleComplete} className="w-full">
              Return to Network
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default InvestorOnboarding;
