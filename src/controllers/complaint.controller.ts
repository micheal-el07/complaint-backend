import { Request, Response } from "express";
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
import { z } from "zod";

// Get all complaints
export const getAllComplaintsController = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res.status(500).json({
      message: "Error occured in getAllComplaintsController.",
      error: error.message? error.message : error,
    });
  }
};

export const getComplaintByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const complaint = await getComplaintById(id);

    if (complaint == null) {
      res.status(404).json({ message: `No complaint with ID ${id} found.` });
      return;
    }

    res.status(200).json({
      data: complaint,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error occured in getComplaintByIdController.",
      error: error.message? error.message : error,
    });
  }
};

// Create a new complaint
export const createComplaintController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Same can throw Zod error
    const validatedData = createComplaintSchema.parse(req.body);
    const newComplaint = await createComplaint(validatedData);

    if (!newComplaint) {
      res.status(400).json({
        message: "Error occured while creating complaint.",
      });
      return;
    }

    res.status(201).json({ data: newComplaint });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    res.status(500).json({
      message: "Error occured in createComplaintsController.",
      error: error.message? error.message : error,
    });
  }
};

export const updateComplaintController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // This can throw Zod error
    const validatedData = updateComplaintSchema.parse(req.body);
    const { id } = req.params;

    const updatedComplaint = await updateComplaintById(id, validatedData);

    res.status(200).json({
      data: updatedComplaint,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }
    res.status(500).json({
      message: "Error occured in updateComplaintController.",
      error: error.message? error.message : error,
    });
  }
};

// Delete a complaint
export const deleteComplaintController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    // const existingComplaint = await getComplaintById(id);

    // if (!existingComplaint) {
    //   res.status(404).json({ message: "Complaint not found" });
    //   return;
    // }

    await deleteComplaintById(id);

    res.status(204);
  } catch (error: any) {
    const code = error.statusCode? error.statusCode : 500
    console.log(error, " is error");
    res.status(code).json({
      message: "Error occured in deleteComplaintsController.",
      error: error.message? error.message : error,
    });
  }
};
