import {
  ComplaintAttributes,
  ComplaintCreationAttributes,
} from "../types/complaint.type";
import {
  createComplaintToDB,
  deleteComplaintFromDB,
  getAllComplaintsFromDB,
  getComplaintByIdFromDB,
  updateComplaintToDB,
} from "../repository/complaint.repository";
import { Complaint, CreateComplaint } from "../validation/complaintValidator";
import { ClassificationError } from "../utils/customError";
import { descriptionClassification } from "../client/decriptionClassification";




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
    console.error("Error in getAllComplaints service function:", error);
    throw new Error(
      error.message ||
        "Error occured in service/complaint.service.ts getAllComplaints function."
    );
  }
};

// Fetching a complaint by ID logic
export const getComplaintById = async (
  id: string
): Promise<Complaint | null> => {
  try {
    const complaintFromDb = await getComplaintByIdFromDB(id);
    console.log(complaintFromDb);
    if (!complaintFromDb) {
      // throw new Error("Failed to fetch complaint from database.");
      return null;
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
    const classification = await descriptionClassification(data.description);

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
      error.message ?? "Error occured in createComplaint service function."
    );
  }
};

// Updating a complaint by ID logic
export const updateComplaintById = async (
  id: string,
  newComplaintInput: Partial<Complaint>
): Promise<Complaint> => {
  try {
    const existingComplaint = await getComplaintByIdFromDB(id);

    if (!existingComplaint) {
      throw new Error(`Complaint with ID ${id} not found`);
    }

    let newComplaint: Partial<Complaint> = { ...newComplaintInput };

    // If description is updated, classify the new description
    if (newComplaint.description) {
      const classification = await descriptionClassification(
        newComplaint.description
      );

      if (!classification || !classification.category) {
        throw new Error("Failed to classify complaint description");
      }

      newComplaint.category =
        classification.category as ComplaintAttributes["category"];
    }

    const updatedComplaint = await updateComplaintToDB(id, newComplaint);

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
