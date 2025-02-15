import { mapSequelizeError } from "../utils/dbErrorMapper";
import ComplaintModel from "../models/complaint.model";
import { ComplaintAttributes, ComplaintCreationAttributes } from "../types/db";
import { CustomError } from "../utils/customError";

// Fetch all complaints
export const getAllComplaintsFromDB = async (): Promise<
  ComplaintAttributes[]
> => {
  try {
    return await ComplaintModel.findAll();
  } catch (error) {
    console.error("Database error in getAllComplaintsFromDB: ", error);

    // Call mapSequelizeError function to map the error with specific error
    throw mapSequelizeError(error);
  }
};

// Fetch complaint with specific ID
export const getComplaintByIdFromDB = async (
  id: string
): Promise<ComplaintAttributes | null> => {
  try {
    return await ComplaintModel.findByPk(id);
  } catch (error) {
    console.error("Database error in getComplaintByIdFromDB:", error);
    throw mapSequelizeError(error);
  }
};

// Store a new complaint
export const createComplaintToDB = async (
  data: ComplaintCreationAttributes
): Promise<ComplaintAttributes> => {
  try {
    return await ComplaintModel.create(data);
  } catch (error) {
    console.error("Database error in createComplaintToDB: ", error);
    throw mapSequelizeError(error);
  }
};

// Update an existing complaint by ID
export const updateComplaintToDB = async (
  id: string,
  data: Partial<ComplaintAttributes>
): Promise<ComplaintAttributes | null> => {
  try {
    const [updatedRows, updatedComplaint] = await ComplaintModel.update(data, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new Error("No complaint found with the given ID.");
    }

    return updatedComplaint[0];
  } catch (error) {
    console.error("Database error in updateComplaintInDB:", error);
    throw mapSequelizeError(error);
  }
};

// Delete a complaint by ID
export const deleteComplaintFromDB = async (id: string): Promise<void> => {
  try {
    await ComplaintModel.destroy({ where: { id } });
  } catch (error) {
    console.error("Database error in updateComplaintToDB: ", error);
    throw mapSequelizeError(error);
  }
};
