class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    err.message = err.message || "internal server error";
    err.statusCode = err.statusCode || 500;
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keys)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if (err.code === "JsonWebTokenError") {
        const message = "json web token is invalid, try again";
        err = new ErrorHandler(message, 400)
    }
    if (err.code === "TokenExpiresError") {
        const message = "json web token is expires, try again";
        err = new ErrorHandler(message, 400)
    }
    if (err.code === "CastError") {
        const message = `invalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }
    const ErrorMessage = err.errors ? Object.values(err.errors).map((error) => error.message).join(" ") : err.message
    return res.status(err.statusCode).json({
        success: false,
        message: ErrorMessage
    })
}
module.exports = { errorHandler, ErrorHandler }