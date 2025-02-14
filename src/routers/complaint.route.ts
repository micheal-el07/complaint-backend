import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response): void => {
    res.status(200).json({success: true, data: 1})
})