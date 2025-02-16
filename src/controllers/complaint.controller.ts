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

    if (!complaints) {
      // res.status(400).json({
      //   success: false,
      //   message: "Error occured while fetching all complaints.",
      // });
      // return;
      throw new Error(
        "Error while fetching all complaints in getAllComplaints."
      );
    }

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

    if (complaint == null) {
      res.status(404).json({ message: `No complaint with ID ${id} found.` });
      return;
    }

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

    if (!newComplaint) {
      res.status(400).json({
        message: "Failed to create new complaint.",
      });
      return;
    }

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
    // const existingComplaint = await getComplaintById(id);

    // if (!existingComplaint) {
    //   res.status(404).json({ message: `No complaint with ID ${id} found.` });
    //   return;
    // }

    await deleteComplaintById(id);

    res.status(204);
  } catch (error: any) {
    console.error("Error occured in getAllComplaintsController: ", error);
    next(error);
  }
};
