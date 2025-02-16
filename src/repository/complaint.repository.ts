import {
  ComplaintModel,
  ComplaintAttributes,
  ComplaintCreationAttributes,
} from "../types/complaint.type";

// Fetch all complaints
export const getAllComplaintsFromDB = async (): Promise<
  ComplaintAttributes[]
> => {
  try {
    throw Error("db");
    return await ComplaintModel.findAll();
  } catch (error: any) {
    throw Error(error.error);
  }
};

// Fetch a complaint by ID
export const getComplaintByIdFromDB = async (
  id: string
): Promise<ComplaintAttributes | null> => {
  try {
    return await ComplaintModel.findByPk(id);
  } catch (error) {
    throw new Error("Failed to getComplaintByIdFromD");
  }
};

// Create a new complaint
export const createComplaintToDB = async (
  data: ComplaintCreationAttributes
): Promise<ComplaintAttributes> => {
  try {
    return await ComplaintModel.create(data);
  } catch (error) {
    throw new Error("Failed to createComplaintToDB");
  }
};

// Update an existing complaint
export const updateComplaintToDB = async (
  id: string,
  data: Partial<ComplaintAttributes>
): Promise<ComplaintAttributes | null> => {
  try {
    const [updatedRows] = await ComplaintModel.update(data, {
      where: { id },
    });

    // Find and return updated complaint
    return await ComplaintModel.findByPk(id);
  } catch (error) {
    throw new Error("Failed to updateComplaintToDB");
  }
};

// Delete a complaint
export const deleteComplaintFromDB = async (id: string): Promise<void> => {
  try {
    await ComplaintModel.destroy({ where: { id } });
  } catch (error) {
    throw new Error("Failed to deleteComplaintFromDB");
  }
};
