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

export type CustomErrorContent = {
  message: string;
  context?: { [key: string]: any };
};

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: CustomErrorContent[];
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default class NotFoundError extends CustomError {
    private static readonly _statusCode = 404;
    private readonly _code: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };
  
    constructor(params?: {code?: number, message?: string, logging?: boolean, context?: { [key: string]: any }}) {
      const { code, message, logging } = params || {};
      
      super(message || "Bad request");
      this._code = code || NotFoundError._statusCode;
      this._logging = logging || false;
      this._context = params?.context || {};
  
      // Only because we are extending a built in class
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
    get errors() {
      return [{ message: this.message, context: this._context }];
    }
  
    get statusCode() {
      return this._code;
    }
  
    get logging() {
      return this._logging;
    }
  }