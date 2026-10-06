import logger from "../logger/logger.js";

export async function globalErrorHandler (error, req, res, next){
    logger.error(error);

    if(error.isOperationError===true){
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
        });
    }
    return res.status(500).json({
        message: 'Something went wrong',
        success: false,
    });
}


export class AppError extends Error {
    statusCode;
    isOperationError;
    constructor(message,statusCode,isOperationError=true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperationError = isOperationError
        Error.captureStackTrace(this, this.constructor);
    }

}
