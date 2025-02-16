import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Global error handler middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Global error handler: ", err.message);

  if (err instanceof z.ZodError) {
    res.status(400).json({ status: false, message: err.errors });
    return;
  }

  const statusCode = err._code ? err._code : 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message ? err.message : "Internal Server Error",
  });
};

export default errorHandler;
