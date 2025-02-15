import { Router } from "express";
import {
  createComplaintController,
  getComplaintByIdController,
  getAllComplaintsController,
  updateComplaintController,
  deleteComplaintController,
} from "../controllers/complaint.controller";

const router = Router();

router.get("/", getAllComplaintsController);
router.post("/", createComplaintController);
router.get("/:id", getComplaintByIdController);
router.patch("/:id", updateComplaintController);
router.delete("/:id", deleteComplaintController)

export default router;
