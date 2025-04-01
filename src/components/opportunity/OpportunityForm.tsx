
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUploadSection } from "@/components/opportunity/FileUploadSection";
import { OpportunityDetailsSection } from "@/components/opportunity/OpportunityDetailsSection";
import { StakeholdersSection } from "@/components/opportunity/StakeholdersSection";
import { opportunitySchema, sectors, Stakeholder, OpportunityFormValues } from "@/components/opportunity/types";
import { useDocumentProcessor } from "@/hooks/useDocumentProcessor";

export const OpportunityForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [newStakeholder, setNewStakeholder] = useState<Stakeholder>({ name: "", role: "", organization: "" });
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

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

  const { selectedFile, isProcessing, hasProcessed, documentUrl, handleFileChange } = useDocumentProcessor(
    form, 
    setStakeholders, 
    setSelectedSectors
  );

  const onSubmit = async (data: OpportunityFormValues) => {
    setIsSubmitting(true);
    
    data.stakeholders = stakeholders;
    
    try {
      if (documentUrl) {
        console.log("Including document URL in submission:", documentUrl);
      }
      
      console.log("Form data:", data);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Opportunity successfully uploaded", {
        description: "Your deal has been added to the platform",
      });
      
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

  const toggleSector = (sector: string) => {
    setSelectedSectors(current => {
      const updated = current.includes(sector) 
        ? current.filter(s => s !== sector)
        : [...current, sector];
      
      form.setValue("sectors", updated, { shouldValidate: true });
      
      return updated;
    });
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FileUploadSection
          selectedFile={selectedFile}
          isProcessing={isProcessing}
          hasProcessed={hasProcessed}
          onFileChange={handleFileChange}
        />

        <OpportunityDetailsSection 
          form={form}
          selectedSectors={selectedSectors}
          toggleSector={toggleSector}
          sectors={sectors}
        />

        <StakeholdersSection
          stakeholders={stakeholders}
          handleRemoveStakeholder={handleRemoveStakeholder}
          newStakeholder={newStakeholder}
          handleStakeholderChange={handleStakeholderChange}
          handleAddStakeholder={handleAddStakeholder}
        />

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
  );
};
