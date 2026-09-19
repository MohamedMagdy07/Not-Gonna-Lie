export async function globalErrorHandler (error, req, res, next){
    res.status(500).json({
        message: error.message,
        success: false,
        stack: error.stack
    });
}