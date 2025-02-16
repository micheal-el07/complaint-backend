"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error caught in error handler middleware:", err.message);
    const statusCode = err.status || 500;
    const errorMessage = statusCode === 500 ? "Internal Server Error" : err.message;
    res.status(statusCode).json({
        status: "error",
        message: errorMessage,
    });
};
exports.default = errorHandler;
