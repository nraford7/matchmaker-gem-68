
import { MAKE_AUTOMATION_WEBHOOK_TOKEN } from "@/config/constants";

export const triggerMakeAutomation = async (documentUrl: string, webhookUrl: string) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAKE_AUTOMATION_WEBHOOK_TOKEN}`
      },
      body: JSON.stringify({ documentUrl })
    });

    if (!response.ok) {
      throw new Error('Webhook request failed');
    }

    return await response.json();
  } catch (error) {
    console.error("Make.com webhook error:", error);
    // Removed toast
    return null;
  }
};
