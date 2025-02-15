export class ClassificationError extends Error {
    constructor(message = "Failed to classify complaint description") {
        super(message);
        this.name = "ClassificationError";
    }
}

export class DatabaseError extends Error {
    constructor(message = "Database operation failed") {
        super(message);
        this.name = "DatabaseError"
    }
}