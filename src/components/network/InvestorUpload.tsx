
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { processCSVFile, processJSONFile } from "@/services/investor/importServices";
import { toast } from "sonner";

export const InvestorUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      let success = false;
      
      // Process based on file type
      if (file.name.endsWith(".csv")) {
        success = await processCSVFile(file);
      } else if (file.name.endsWith(".json")) {
        success = await processJSONFile(file);
      } else {
        toast.error("Unsupported file format. Please upload CSV or JSON files.");
        setIsUploading(false);
        return;
      }
      
      if (success) {
        setIsOpen(false);
        // Reload the page after successful import to show new data
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to process file");
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = "";
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import Investors
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Investor Profiles</DialogTitle>
          <DialogDescription>
            Upload a CSV or JSON file containing investor profile data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid w-full items-center gap-2">
            <label htmlFor="file-upload" className="text-sm font-medium">
              File Format
            </label>
            <p className="text-sm text-muted-foreground">
              Files should include at minimum the "name" and "email" fields. Other supported fields: contextSectors, preferredStages, preferredGeographies, checkSizeMin, checkSizeMax, investmentThesis.
            </p>
            <p className="text-sm text-muted-foreground">
              For CSV files, use semicolons (;) to separate multiple values in array fields like contextSectors.
            </p>
          </div>
          
          <div className="grid w-full gap-2">
            <label 
              htmlFor="file-upload" 
              className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background p-4 text-center hover:bg-accent hover:text-accent-foreground"
            >
              <Upload className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">
                Click to upload CSV or JSON
              </span>
              <span className="text-xs text-muted-foreground">
                {isUploading ? "Uploading..." : "Supported formats: CSV, JSON"}
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.json"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
