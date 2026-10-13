export class AppError extends Error {
    statusCode;
    isOperationError;

    constructor(message, statusCode, isOperationError = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperationError = isOperationError
        Error.captureStackTrace(this, this.constructor);
    }

}
