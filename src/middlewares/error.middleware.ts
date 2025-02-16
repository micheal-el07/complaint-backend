import { Request, Response, NextFunction } from "express";

// Global error handler middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error caught in error handler middleware:", err.message);

  const statusCode = 500;
  const errorMessage =
    statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    status: "error",
    message: err.message ? err.message : errorMessage,
  });
};

// import { NextFunction, Request, Response } from "express";
// import { CustomError } from "../utils/customError";

// export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   // Handled errors
//   if(err instanceof CustomError) {
//     const { statusCode, errors, logging } = err;
//     if(logging) {
//       console.error(JSON.stringify({
//         code: err.statusCode,
//         errors: err.errors,
//         stack: err.stack,
//       }, null, 2));
//     }

//     return res.status(statusCode).send({ errors });
//   }

//   // Unhandled errors
//   console.error(JSON.stringify(err, null, 2));
//   return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
// };

export default errorHandler;
