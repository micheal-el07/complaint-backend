import { Sequelize } from "sequelize";
import * as SequelizeErrors from "sequelize";
import { CustomError, RepositoryError, ValidationError } from "./customError";

// Maps Sequelize errors to custom application errors
export const mapSequelizeError = (error: unknown): Error => {
  if (error instanceof SequelizeErrors.ConnectionError) {
    return new RepositoryError("Database connection failed");
  }
  if (error instanceof SequelizeErrors.TimeoutError) {
    return new RepositoryError("Database request timed out");
  }
  if (error instanceof SequelizeErrors.ValidationError) {
    return new ValidationError("Invalid data provided");
  }
  if (error instanceof SequelizeErrors.UniqueConstraintError) {
    return new ValidationError("Duplicate record not allowed");
  }
  if (error instanceof SequelizeErrors.ForeignKeyConstraintError) {
    return new RepositoryError("Invalid reference to another record");
  }
  if (error instanceof SequelizeErrors.DatabaseError) {
    return new RepositoryError("Invalid database operation");
  }
  if (error instanceof SequelizeErrors.OptimisticLockError) {
    return new RepositoryError("Data was modified by another transaction");
  }
  if (error instanceof CustomError) {
    return error
  }
  return new RepositoryError("Unknown database error occurred");
};