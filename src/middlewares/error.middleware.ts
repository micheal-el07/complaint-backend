import { Request, Response, NextFunction } from "express";

// Custom error interface
interface CustomError extends Error {
  status?: number;
}

// Global error handler middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Global error handler: ", err.message);

  const statusCode = err._code || 500;
  const errorMessage =
    statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    status: "error",
    message: err.message ? err.message : errorMessage,
  });
};

export default errorHandler;
