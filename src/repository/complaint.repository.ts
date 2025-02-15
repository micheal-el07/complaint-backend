import ComplaintModel from "../models/complaint.model";
import { ComplaintAttributes, ComplaintCreationAttributes } from "../types/db";

// Fetch all complaints
export const getAllComplaintsFromDB = async (): Promise<
  ComplaintAttributes[]
> => {
  return await ComplaintModel.findAll();
};

// Fetch a complaint by ID
export const getComplaintByIdFromDB = async (
  id: string
): Promise<ComplaintAttributes | null> => {
  return await ComplaintModel.findByPk(id);
};

// Create a new complaint
export const createComplaintToDB = async (
  data: ComplaintCreationAttributes
): Promise<ComplaintAttributes> => {
  return await ComplaintModel.create(data);
};

// Update an existing complaint
export const updateComplaintToDB = async (
  id: string,
  data: Partial<ComplaintAttributes>
): Promise<ComplaintAttributes | null> => {
  const [updatedRows] = await ComplaintModel.update(data, {
    where: { id },
  });

  // Find and return updated complaint
  return await ComplaintModel.findByPk(id);
};

// Delete a complaint
export const deleteComplaintFromDB = async (id: string): Promise<void> => {
  await ComplaintModel.destroy({ where: { id } });
};
