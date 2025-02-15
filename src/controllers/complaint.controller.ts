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

// Get all complaints
export const getAllComplaintsController = async (
  req: Request,
  res: Response
) => {
  try {
    const complaints = await getAllComplaints();

    if (!complaints) {
      res.status(400).json({
        success: false,
        message: "Error occured while fetching all complaints.",
      });
      return;
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Complaints fetched successfully",
        data: complaints,
      });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error occured in getAllComplaintsController.",
      error: error.message,
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

    if (!complaint) {
      res
        .status(404)
        .json({ success: false, message: `No complaint with ID ${id} found.` });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Complaint fetched successfully",
      data: complaint,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error occured in getComplaintByIdController.",
      error: error.message,
    });
  }
};

// Create a new complaint
export const createComplaintController = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = createComplaintSchema.parse(req.body);
    const newComplaint = await createComplaint(validatedData);

    if (!newComplaint) {
      res.status(400).json({
        success: false,
        message: "Error occured while creating complaint.",
      });
      return;
    }

    res.status(201).json(newComplaint);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error occured in createComplaintsController.",
      error: error.message,
    });
  }
};

export const updateComplaintController = async (
  req: Request,
  res: Response
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
    res.status(500).json({
      success: false,
      message: "Error occured in updateComplaintController.",
      error: error.message,
    });
  }
};

// Delete a complaint
export const deleteComplaintController = async (
  req: Request,
  res: Response
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
    res.status(500).json({
      success: false,
      message: "Error occured in deleteComplaintsController.",
      error: error.message,
    });
  }
};
