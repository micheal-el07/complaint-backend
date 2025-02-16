import { ClassificationError } from "../utils/customError";
import axios from "axios";

// Interface for classifyText() response object
interface ClassificationResponse {
  category: string;
}

// Send request to another service to get the category of the description
export default async function descriptionClassification(text: string) {
  try {
    const response = await axios.post<ClassificationResponse>(
      String(process.env.TEXT_CLASSIFICATION_SERVICE),
      {
        text: text,
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
    throw new ClassificationError("Unexpected error in classifyText function");
  }
}
