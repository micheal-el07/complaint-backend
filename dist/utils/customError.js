"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = exports.ClassificationError = void 0;
class ClassificationError extends Error {
    constructor(message = "Failed to classify complaint description") {
        super(message);
        this.name = "ClassificationError";
    }
}
exports.ClassificationError = ClassificationError;
class DatabaseError extends Error {
    constructor(message = "Database operation failed") {
        super(message);
        this.name = "DatabaseError";
    }
}
exports.DatabaseError = DatabaseError;
