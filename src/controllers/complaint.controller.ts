import { NextFunction, Request, Response } from "express";
import {
  createComplaint,
  deleteComplaintById,
  getAllComplaints,
  getComplaintById,
  updateComplaintById,
} from "../services/complaint.service";
import {
  createComplaintSchema,
  updateComplaintSchema,
} from "../validation/complaintValidator";

// Get all complaints
export const getAllComplaintsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const complaints = await getAllComplaints();

    res.status(200).json({ data: complaints });
  } catch (error: any) {
    console.error("Error occured in getAllComplaintsController: ", error);
    next(error);
  }
};

export const getComplaintByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const complaint = await getComplaintById(id);

    res.status(200).json({ data: complaint });
  } catch (error: any) {
    console.error("Error occured in getComplaintByIdController: ", error);
    next(error);
  }
};

// Create a new complaint
export const createComplaintController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = createComplaintSchema.parse(req.body);
    const newComplaint = await createComplaint(validatedData);

    res.status(201).json({ data: newComplaint });
  } catch (error: any) {
    console.error("Error occured in createComplaintsController: ", error);
    next(error);
  }
};

export const updateComplaintController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = updateComplaintSchema.parse(req.body);
    const { id } = req.params;

    const updatedComplaint = await updateComplaintById(id, validatedData);

    res.status(200).json({ data: updatedComplaint });
  } catch (error: any) {
    console.error("Error occured in updateComplaintController: ", error);
    next(error);
  }
};

// Delete a complaint
export const deleteComplaintController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteComplaintById(id);

    res.status(204);
  } catch (error: any) {
    console.error("Error occured in getAllComplaintsController: ", error);
    next(error);
  }
};
