import { Router } from "express";
import complaintRouter from "./complaint.route";

const router = Router();

router.use("/complaints", complaintRouter);

export default router;
