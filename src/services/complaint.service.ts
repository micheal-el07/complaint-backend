// import { Complaint } from "../types/complaint"
import { title } from "process";
import {
  ComplaintAttributes,
  ComplaintCreationAttributes,
} from "../models/complaint.model";
import {
  createComplaintToDB,
  deleteComplaintFromDB,
  getAllComplaintsFromDB,
  getComplaintByIdFromDB,
  updateComplaintToDB,
} from "../repository/complaint.repository";
import { Complaint, CreateComplaint } from "../validation/complaintValidator";
import axios from "axios";

// Interface for classifyText() response object
interface ClassificationResponse {
  category: string;
}

// Send request to another service to get the category of the description
async function classifyText(text: string) {
  try {
    const response = await axios.post<ClassificationResponse>(
      String(process.env.TEXT_CLASSIFICATION_SERVICE),
      {
        text: text,
        labels: ["billing", "service", "technical"],
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

// Fetching all of the complaints logic
export const getAllComplaints = async (): Promise<Complaint[]> => {
  try {
    const complaintsFromDb = await getAllComplaintsFromDB();

    // Convert raw Sequelize data to Zod-defined `Complaint` type
    const complaints: Complaint[] = complaintsFromDb.map(
      ({ id, title, description, category, createdAt, updatedAt }) => ({
        id,
        title,
        description,
        category,
        createdAt,
        updatedAt,
      })
    );

    return complaints;
  } catch (error: any) {
    console.error("Error fetching all complaints:", error);
    throw new Error(
      error.message || "Error occured in getAllComplaints service function."
    );
  }
};

// Fetching a complaint by ID logic
export const getComplaintById = async (
  id: string
): Promise<Complaint | null> => {
  try {
    const complaintFromDb = await getComplaintByIdFromDB(id);

    if (!complaintFromDb) {
      throw new Error("Failed to fetch complaint from database.");
    }

    const complaint: Complaint = {
      id: complaintFromDb.id,
      title: complaintFromDb.title,
      description: complaintFromDb.description,
      category: complaintFromDb.category,
      createdAt: complaintFromDb.createdAt,
      updatedAt: complaintFromDb.updatedAt,
    };

    return complaint;
  } catch (error: any) {
    console.error("Error creating complaint:", error);
    throw new Error(
      error.message || "Error occured in getComplaintById service function."
    );
  }
};

export const createComplaint = async (
  data: CreateComplaint
): Promise<Complaint | null> => {
  try {
    const classification = await classifyText(data.description);

    if (!classification || !classification.category) {
      throw new Error("Failed to classify complaint description");
    }

    const complaintData: ComplaintCreationAttributes = {
      ...data,
      category: classification.category as ComplaintAttributes["category"],
    };

    return await createComplaintToDB(complaintData);
  } catch (error: any) {
    console.error("Error creating complaint:", error);
    throw new Error(
      error.message || "Error occured in createComplaint service function."
    );
  }
};

// Updating a complaint by ID logic
export const updateComplaintById = async (
  id: string,
  data: Partial<Complaint>
): Promise<Complaint> => {
  try {
    const existingComplaint = await getComplaintByIdFromDB(id);

    if (!existingComplaint) {
      throw new Error(`Complaint with ID ${id} not found`);
    }

    let updatedData: Partial<Complaint> = { ...data };

    // If the description is updated, classify the new description
    if (data.description) {
      const classification = await classifyText(data.description);

      if (!classification || !classification.category) {
        throw new Error("Failed to classify complaint description");
      }

      updatedData.category =
        classification.category as ComplaintAttributes["category"];
    }

    const updatedComplaint = await updateComplaintToDB(id, updatedData);

    if (!updatedComplaint) {
      throw new Error(`Failed to update complaint with ID ${id}`);
    }

    return updatedComplaint;
  } catch (error: any) {
    console.error("Error updating complaint:", error);
    throw new Error(
      error.message || "Error occured in updateComplaintById service function."
    );
  }
};

// Deleting a complaint by ID logic
export const deleteComplaintById = async (id: string): Promise<void> => {
  try {
    const existingComplaint = await getComplaintByIdFromDB(id);

    if (!existingComplaint) {
      throw new Error(`Complaint with ID ${id} not found`);
    }

    return await deleteComplaintFromDB(id);
  } catch (error: any) {
    console.error("Error deleting complaint:", error);
    throw new Error(
      error.message || "Error occured in deleteComplaintById service function."
    );
  }
};
