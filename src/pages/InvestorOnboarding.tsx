
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

// Schema for Part 1: Structured Context Intake
const structuredIntakeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role/Entity Type is required"),
  sourceOfWealth: z.string().min(1, "Source of wealth is required"),
  aum: z.string().min(1, "Estimated AUM/Net Worth is required"),
  checkSizeRange: z.string().min(1, "Check size range is required"),
  preferredAssetClasses: z.string().min(1, "Preferred asset classes is required"),
  sectorFocus: z.string().min(1, "Sector focus is required"),
  fundStructure: z.string().min(1, "Fund structure is required"),
  timeHorizon: z.string().min(1, "Investment time horizon is required"),
  preferredStage: z.string().min(1, "Preferred deal stage is required"),
  esgValues: z.string().optional(),
});

// Schema for Part 2: Story-Based Questionnaire
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
        name: combinedData.name,
        email: user?.email || "",
        company: combinedData.fundStructure,
        preferred_stages: combinedData.preferredStage.split(',').map((s: string) => s.trim()),
        preferred_geographies: [], // Not collected in this form
        check_size_min: parseInt(combinedData.checkSizeRange.split('-')[0]) || 0,
        check_size_max: parseInt(combinedData.checkSizeRange.split('-')[1]) || 0,
        investment_thesis: combinedData.investmentMotivation,
        deal_count: 0,
        sector_tags: combinedData.sectorFocus.split(',').map((s: string) => s.trim()),
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
            <CardTitle>Part 1: Structured Context Intake</CardTitle>
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
                      <FormLabel>Name / Investor ID</FormLabel>
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
                      <FormLabel>Role / Entity Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Are you investing as an individual, through a family office, fund, or firm?"
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
                      <FormLabel>Source(s) of Wealth</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="How did you acquire or build your capital? (e.g. business sale, inheritance, career earnings)"
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
                      <FormLabel>Estimated AUM / Net Worth</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your AUM or net worth" {...field} />
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
                      <FormLabel>Typical Check Size Range</FormLabel>
                      <FormControl>
                        <Input placeholder="What is your usual investment size per deal?" {...field} />
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
                      <FormLabel>Preferred Asset Classes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g. Startups, funds, real estate, public equities, private credit"
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
                      <FormLabel>Sector or Theme Focus</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Are there specific industries or themes you are drawn to?"
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
                      <FormLabel>Fund or Entity Structure</FormLabel>
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
                      <FormLabel>Investment Time Horizon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Typical hold period or exit horizon"
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
                      <FormLabel>Preferred Deal Stage or Geography</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter preferred stages or regions" {...field} />
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
                      <FormLabel>ESG / Values Alignment (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Do ethical, religious, or environmental values guide your investment decisions?"
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
            <CardTitle>Part 2: Story-Based Questionnaire</CardTitle>
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
                      <FormLabel>Tell me about one of the most interesting investments you've made</FormLabel>
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
                      <FormLabel>What's your usual process when you evaluate a new opportunity?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Do you follow a set of criteria, rely on instinct, or trust others?"
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
                      <FormLabel>Can you remember a time you passed on an opportunity and later regretted it (or didn't)?</FormLabel>
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
                      <FormLabel>How did you respond during the last market drop or financial crisis?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Did you make any changes or stick to your plan?"
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
                      <FormLabel>Do you have a general rule about how much you're willing to allocate to any one investment?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What determines that amount?"
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
                      <FormLabel>Tell me about a time when an investment went wrong</FormLabel>
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
                      <FormLabel>How important is it for you to personally know the founders, fund managers, or operators you invest with?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Do you meet them, vet them, or delegate that?"
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
                      <FormLabel>Do you prefer to manage your portfolio directly or work through advisors or partners?</FormLabel>
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
                      <FormLabel>What kind of sectors or asset types do you naturally gravitate toward—and why?</FormLabel>
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
                      <FormLabel>How do you decide when to exit an investment?</FormLabel>
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
                      <FormLabel>What kind of reporting or updates do you expect from your investments?</FormLabel>
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
                      <FormLabel>What motivates you to invest?</FormLabel>
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
