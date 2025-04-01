import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  UploadCloud, 
  BriefcaseIcon, 
  InfoIcon, 
  MapPinIcon, 
  DollarSign,
  UsersIcon,
  UserIcon,
  UserPlusIcon, 
  Building2Icon,
  X,
  FileType,
  Loader2,
  FileText
} from "lucide-react";
import { uploadFile, triggerMakeAutomation } from "@/services/fileUploadService";

const stakeholderSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  organization: z.string().optional(),
});

const opportunitySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  sectors: z.array(z.string()).min(1, { message: "Please select at least one sector" }),
  stage: z.string().min(1, { message: "Please select a stage" }),
  fundingAmount: z.coerce.number().min(1, { message: "Funding amount is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  stakeholders: z.array(stakeholderSchema).optional(),
});

type Stakeholder = z.infer<typeof stakeholderSchema>;
type OpportunityFormValues = z.infer<typeof opportunitySchema>;

const sectors = [
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

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/your-webhook-id";

const UploadOpportunity = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [newStakeholder, setNewStakeholder] = useState<Stakeholder>({ name: "", role: "", organization: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      name: "",
      description: "",
      sectors: [],
      stage: "",
      fundingAmount: 0,
      location: "",
      stakeholders: [],
    },
  });

  const onSubmit = async (data: OpportunityFormValues) => {
    setIsSubmitting(true);
    
    // Add stakeholders to the form data
    data.stakeholders = stakeholders;
    
    try {
      // Add the document URL to the data if available
      if (documentUrl) {
        console.log("Including document URL in submission:", documentUrl);
      }
      
      // In a real app, you would upload the data to your backend here
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Opportunity successfully uploaded", {
        description: "Your deal has been added to the platform",
      });
      
      // Navigate to dashboard after successful submission
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to upload opportunity", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      // Start processing the document
      await processDocument(file);
    }
  };

  const processDocument = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // 1. Upload the file to Supabase
      const fileUrl = await uploadFile(file);
      if (!fileUrl) {
        throw new Error("Failed to upload file to storage");
      }
      
      setDocumentUrl(fileUrl);
      console.log("Document uploaded successfully:", fileUrl);
      
      // 2. Trigger Make.com automation with the file URL
      const extractedData = await triggerMakeAutomation(fileUrl, MAKE_WEBHOOK_URL);
      
      if (!extractedData) {
        toast.error("Failed to extract data from document", {
          description: "Please fill out the form manually"
        });
        setIsProcessing(false);
        return;
      }
      
      // 3. Fill the form with extracted data
      form.reset({
        name: extractedData.name || "",
        description: extractedData.description || "",
        sectors: extractedData.sectors || [],
        stage: extractedData.stage || "",
        fundingAmount: extractedData.fundingAmount || 0,
        location: extractedData.location || "",
      });
      
      // Set stakeholders if available
      if (extractedData.stakeholders && Array.isArray(extractedData.stakeholders)) {
        setStakeholders(extractedData.stakeholders);
      }
      
      // Set sectors if available
      if (extractedData.sectors && Array.isArray(extractedData.sectors)) {
        setSelectedSectors(extractedData.sectors);
      }
      
      // Show success message
      toast.success("Document processed successfully", {
        description: "We've analyzed your document and filled out the form. Please review and make any necessary corrections."
      });
      
      setHasProcessed(true);
    } catch (error) {
      console.error("Error processing document:", error);
      toast.error("Failed to process document", {
        description: "Please fill out the form manually"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddStakeholder = () => {
    if (newStakeholder.name.trim() === "" || newStakeholder.role.trim() === "") {
      toast.error("Name and role are required for stakeholders");
      return;
    }
    
    setStakeholders([...stakeholders, { ...newStakeholder }]);
    setNewStakeholder({ name: "", role: "", organization: "" });
  };

  const handleRemoveStakeholder = (index: number) => {
    const updatedStakeholders = [...stakeholders];
    updatedStakeholders.splice(index, 1);
    setStakeholders(updatedStakeholders);
  };

  const handleStakeholderChange = (field: keyof Stakeholder, value: string) => {
    setNewStakeholder({
      ...newStakeholder,
      [field]: value,
    });
  };

  const toggleSector = (sector: string) => {
    setSelectedSectors(current => {
      const updated = current.includes(sector) 
        ? current.filter(s => s !== sector)
        : [...current, sector];
      
      // Update the form value
      form.setValue("sectors", updated, { shouldValidate: true });
      
      return updated;
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
              <CardTitle>Upload New Opportunity</CardTitle>
            </div>
            <CardDescription>
              Upload your pitch document and let AI help you fill out the details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Document Upload Section - Now First */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <FormLabel htmlFor="pitchDeck" className="text-lg font-medium">Upload Pitch Document</FormLabel>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        Drag and drop your pitch document (PDF, PPT, or Word), or
                      </p>
                      <Button type="button" variant="outline" onClick={() => document.getElementById("pitchDeck")?.click()}>
                        Browse files
                      </Button>
                      <input
                        id="pitchDeck"
                        type="file"
                        accept=".pdf,.ppt,.pptx,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <div className="mt-4 text-sm flex items-center gap-2">
                          <FileType className="h-4 w-4 text-primary" />
                          <span>Selected file: {selectedFile.name}</span>
                        </div>
                      )}
                      {isProcessing && (
                        <div className="mt-4 flex items-center gap-2 text-primary">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing document...</span>
                        </div>
                      )}
                      {hasProcessed && (
                        <div className="mt-4 text-sm text-green-600">
                          <span>✓ Document processed. Please review the information below.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Opportunity Details Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <InfoIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Opportunity Details</h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opportunity Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter opportunity name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the opportunity in detail" 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 mt-4">
                    {/* Multi-select sectors using checkboxes */}
                    <FormField
                      control={form.control}
                      name="sectors"
                      render={() => (
                        <FormItem>
                          <FormLabel>Sectors</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {sectors.map((sector) => (
                              <div key={sector.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`sector-${sector.id}`} 
                                  checked={selectedSectors.includes(sector.id)}
                                  onCheckedChange={() => toggleSector(sector.id)}
                                />
                                <label
                                  htmlFor={`sector-${sector.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {sector.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="stage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Funding Stage</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                                <SelectItem value="Seed">Seed</SelectItem>
                                <SelectItem value="Series A">Series A</SelectItem>
                                <SelectItem value="Series B">Series B</SelectItem>
                                <SelectItem value="Series C">Series C</SelectItem>
                                <SelectItem value="Series D+">Series D+</SelectItem>
                                <SelectItem value="Growth">Growth</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fundingAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Funding Amount ($)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="number" 
                                  placeholder="1000000" 
                                  className="pl-10" 
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="City, Country" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Stakeholders Section (renamed from People Involved) */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Stakeholders</h3>
                  </div>
                  
                  {/* List of added stakeholders */}
                  {stakeholders.length > 0 && (
                    <div className="space-y-2">
                      {stakeholders.map((stakeholder, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{stakeholder.name}</p>
                              <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                              {stakeholder.organization && (
                                <p className="text-xs text-muted-foreground">
                                  <Building2Icon className="inline h-3 w-3 mr-1" />
                                  {stakeholder.organization}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemoveStakeholder(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Form to add new stakeholder */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-dashed rounded-md">
                    <div>
                      <FormLabel htmlFor="stakeholderName">Name</FormLabel>
                      <Input
                        id="stakeholderName"
                        placeholder="Person or Company"
                        value={newStakeholder.name}
                        onChange={(e) => handleStakeholderChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="stakeholderRole">Role</FormLabel>
                      <Input
                        id="stakeholderRole"
                        placeholder="Founder, Co-investor, Board Member"
                        value={newStakeholder.role}
                        onChange={(e) => handleStakeholderChange('role', e.target.value)}
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="stakeholderOrg">Organization (Optional)</FormLabel>
                      <Input
                        id="stakeholderOrg"
                        placeholder="Company Name"
                        value={newStakeholder.organization || ''}
                        onChange={(e) => handleStakeholderChange('organization', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddStakeholder}
                    className="w-full"
                  >
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    Add Stakeholder
                  </Button>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Uploading..." : "Upload Opportunity"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadOpportunity;
