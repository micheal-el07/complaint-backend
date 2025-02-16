import { NextFunction, Request, Response } from "express";
import { z } from "zod";
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
import { CustomError, NotFoundError } from "../utils/customError";

// Get all complaints
export const getAllComplaintsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const complaints = await getAllComplaints();

    if (!complaints) {
      res.status(400).json({
        message: "Error occured while fetching all complaints.",
      });
      return;
    }

    res.status(200).json({
      data: complaints,
    });
  } catch (error: any) {
    next(error)
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

    if (complaint == null) {
      res
        .status(404)
        .json({ message: `No complaint with ID ${id} found.` });
      return;
    }

    res.status(200).json({
      data: complaint,
    });
  } catch (error: any) {
    next(error)
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

    if (!newComplaint) {
      res.status(400).json({
        message: "Error occured while creating complaint.",
      });
      return;
    }

    res.status(201).json({newComplaint});
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation failed.", errors: error.errors });
      return;
    }
    next(error)
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

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully.",
      data: updatedComplaint,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Validation failed.", errors: error.errors });
      return;
    }
    next(error)
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
    const existingComplaint = await getComplaintById(id);

    if (!existingComplaint) {
      res.status(404).json({ successs: false, message: "Complaint not found" });
      return;
    }

    await deleteComplaintById(id);

    res.status(204).json({ message: "Complaint deleted successfully" });
  } catch (error: any) {
    next(error)
  }
};
