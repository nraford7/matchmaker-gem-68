
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
  X
} from "lucide-react";

const personSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  organization: z.string().optional(),
});

const opportunitySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  sector: z.string().min(1, { message: "Please select a sector" }),
  stage: z.string().min(1, { message: "Please select a stage" }),
  fundingAmount: z.coerce.number().min(1, { message: "Funding amount is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  people: z.array(personSchema).optional(),
});

type Person = z.infer<typeof personSchema>;
type OpportunityFormValues = z.infer<typeof opportunitySchema>;

const UploadOpportunity = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [newPerson, setNewPerson] = useState<Person>({ name: "", role: "", organization: "" });

  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      name: "",
      description: "",
      sector: "",
      stage: "",
      fundingAmount: 0,
      location: "",
      people: [],
    },
  });

  const onSubmit = async (data: OpportunityFormValues) => {
    setIsSubmitting(true);
    
    // Add people to the form data
    data.people = people;
    
    try {
      // In a real app, you would upload the data to your backend here
      console.log("Form data:", data);
      console.log("Selected file:", selectedFile);
      
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAddPerson = () => {
    if (newPerson.name.trim() === "" || newPerson.role.trim() === "") {
      toast.error("Name and role are required for team members");
      return;
    }
    
    setPeople([...people, { ...newPerson }]);
    setNewPerson({ name: "", role: "", organization: "" });
  };

  const handleRemovePerson = (index: number) => {
    const updatedPeople = [...people];
    updatedPeople.splice(index, 1);
    setPeople(updatedPeople);
  };

  const handlePersonChange = (field: keyof Person, value: string) => {
    setNewPerson({
      ...newPerson,
      [field]: value,
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
              Share a new investment opportunity with potential investors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Fintech">Fintech</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                            <SelectItem value="Cleantech">Cleantech</SelectItem>
                            <SelectItem value="AI">Artificial Intelligence</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Stage</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
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

                {/* People Involved Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">People Involved</h3>
                  </div>
                  
                  {/* List of added people */}
                  {people.length > 0 && (
                    <div className="space-y-2">
                      {people.map((person, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{person.name}</p>
                              <p className="text-sm text-muted-foreground">{person.role}</p>
                              {person.organization && (
                                <p className="text-xs text-muted-foreground">
                                  <Building2Icon className="inline h-3 w-3 mr-1" />
                                  {person.organization}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemovePerson(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Form to add new person */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-dashed rounded-md">
                    <div>
                      <FormLabel htmlFor="personName">Name</FormLabel>
                      <Input
                        id="personName"
                        placeholder="John Doe"
                        value={newPerson.name}
                        onChange={(e) => handlePersonChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="personRole">Role</FormLabel>
                      <Input
                        id="personRole"
                        placeholder="CEO, Investor, Advisor"
                        value={newPerson.role}
                        onChange={(e) => handlePersonChange('role', e.target.value)}
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="personOrg">Organization (Optional)</FormLabel>
                      <Input
                        id="personOrg"
                        placeholder="Company Name"
                        value={newPerson.organization || ''}
                        onChange={(e) => handlePersonChange('organization', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddPerson}
                    className="w-full"
                  >
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    Add Person
                  </Button>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="pitchDeck">Pitch Deck (PDF)</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        Drag and drop your pitch deck, or
                      </p>
                      <Button type="button" variant="outline" onClick={() => document.getElementById("pitchDeck")?.click()}>
                        Browse files
                      </Button>
                      <input
                        id="pitchDeck"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <div className="mt-4 text-sm flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-primary" />
                          <span>Selected file: {selectedFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
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
