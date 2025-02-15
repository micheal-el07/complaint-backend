import { Request, Response, NextFunction } from "express";

// Custom error interface
interface CustomError extends Error {
  status?: number;
}

// Global error handler middleware
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error caught in error handler middleware:", err.message);

  const statusCode = err.status || 500;
  const errorMessage =
    statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    status: "error",
    message: errorMessage,
  });
};

export default errorHandler;
