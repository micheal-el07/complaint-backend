import NotFoundError, { CustomError } from "../utils/customError";
import ComplaintModel, {
  ComplaintAttributes,
  ComplaintCreationAttributes,
} from "../models/complaint.model";

// Fetch all complaints
export const getAllComplaintsFromDB = async (): Promise<
  ComplaintAttributes[]
> => {
  try {
    return await ComplaintModel.findAll();
  } catch (error) {
    throw error;
  }
};

// Fetch a complaint by ID
export const getComplaintByIdFromDB = async (
  id: string
): Promise<ComplaintAttributes | null> => {
  try {
    return await ComplaintModel.findByPk(id);
  } catch (error) {
    throw error;
  }
};

// Create a new complaint
export const createComplaintToDB = async (
  data: ComplaintCreationAttributes
): Promise<ComplaintAttributes> => {
  try {
    return await ComplaintModel.create(data);
  } catch (error) {
    // throw error;
    throw Error("Database error")
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

    return await ComplaintModel.findByPk(id);
  } catch (error) {
    throw error;
  }
};

// Delete a complaint
export const deleteComplaintFromDB = async (id: string): Promise<void> => {
  try {
    await ComplaintModel.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};
