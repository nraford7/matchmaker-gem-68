
import { toast } from "sonner";

export const triggerMakeAutomation = async (
  documentUrl: string,
  makeWebhookUrl: string
): Promise<any | null> => {
  try {
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentUrl,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Make.com webhook error:", response.statusText);
      toast.error("Failed to process document");
      return null;
    }
  } catch (error) {
    console.error("Error triggering Make.com automation:", error);
    toast.error("Failed to process document");
    return null;
  }
};
