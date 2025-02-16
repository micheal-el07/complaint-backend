import axios from "axios";
import { ClassificationError } from "../utils/customError";
import { ClassificationResponse } from "../types/classification.type";

// Send request to Text Classification API categorize the description
export async function descriptionClassification(description: string) {
  try {
    const response = await axios.post<ClassificationResponse>(
      process.env.TEXT_CLASSIFICATION_SERVICE || "http://127.0.0.7:8000/classify",
      {
        text: description,
        labels: ["billing", "service", "technical"],
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new ClassificationError(
        `Classification API Error: ${
          error.response?.data?.message || "Service unavailable"
        }`
      );
    }
    throw new ClassificationError();
  }
}