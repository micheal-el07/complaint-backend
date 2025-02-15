export class ClassificationError extends Error {
  constructor(message = "Failed to classify complaint description") {
    super(message);
    this.name = "ClassificationError";
  }
}

export class DatabaseError extends Error {
  constructor(message = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
  }
}

export class BaseError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class RepositoryError extends BaseError {
  constructor(message = "Database operation failed") {
    super(message, 500);
  }
}

export class ValidationError extends BaseError {
  constructor(message = "Invalid input") {
    super(message, 400);
  }
}

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
