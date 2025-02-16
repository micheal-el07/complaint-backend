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
import descriptionClassification from "../client/descriptionClassification";
import NotFoundError from "../utils/customError";

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
    console.error("Error in service/getAllComplaints : ", error);
    throw error;
  }
};

// Fetching a complaint by ID logic
export const getComplaintById = async (
  id: string
): Promise<Complaint | null> => {
  try {
    const complaintFromDb = await getComplaintByIdFromDB(id);

    // Throw not found error if no matching data found
    if (!complaintFromDb) {
      throw new NotFoundError({
        code: 404,
        message: `Complaint with ID ${id} not found`,
        logging: true,
      });
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
    console.error("Error in service/getComplaintById : ", error);
    throw error;
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
    console.error("Error in service/createComplaint : ", error);
    throw error;
  }
};

// Updating a complaint by ID logic
export const updateComplaintById = async (
  id: string,
  data: Partial<Complaint>
): Promise<Complaint> => {
  try {
    const existingComplaint = await getComplaintByIdFromDB(id);

    // Throw not found error if no matching data found
    if (!existingComplaint) {
      throw new NotFoundError({
        code: 404,
        message: `Complaint with ID ${id} not found`,
        logging: true,
      });
    }

    let updatedData: Partial<Complaint> = { ...data };

    // If the description is updated, classify the new description
    if (data.description) {
      const classification = await descriptionClassification(data.description);

      if (!classification || !classification.category) {
        throw new Error("Failed to classify complaint description");
      }

      updatedData.category =
        classification.category as ComplaintAttributes["category"];
    }

    const updatedComplaint = await updateComplaintToDB(id, updatedData);

    if (!updatedComplaint) {
      throw new Error("Failed to update complaint.");
    }

    return updatedComplaint;
  } catch (error: any) {
    console.error("Error in service/updateComplaintById : ", error);
    throw error;
  }
};

// Deleting a complaint by ID logic
export const deleteComplaintById = async (id: string): Promise<void> => {
  try {
    const existingComplaint = await getComplaintByIdFromDB(id);

    if (!existingComplaint) {
      throw new NotFoundError({
        code: 404,
        message: `Second Complaint with ID ${id} not found`,
        logging: true,
      });
    }

    return await deleteComplaintFromDB(id);
  } catch (error: any) {
    console.error("Error in service/deleteComplaintById : ", error);
    throw error;
  }
};
