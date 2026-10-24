import logger from "../../pkg/logger/logger.js";


export async function globalErrorHandler(error, req, res, _next) {

    logger.error({
        error: error,
        stack: error.stack,
        correlationId: req.correlationId,
    })

    if (error.isOperationError === true) {
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