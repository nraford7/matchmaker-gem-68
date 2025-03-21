
// This file re-exports all the feedback service functions from their individual files
import { submitPositiveFeedback } from "./feedback/positiveFeedback";
import { submitNegativeFeedback } from "./feedback/negativeFeedback";
import { removeFeedback } from "./feedback/removeFeedback";
import { getFeedbackStatus } from "./feedback/getFeedbackStatus";
import { dispatchFeedbackEvent } from "./feedback/feedbackUtils";

// Re-export all the functions
export {
  submitPositiveFeedback,
  submitNegativeFeedback,
  removeFeedback,
  getFeedbackStatus,
  dispatchFeedbackEvent
};
