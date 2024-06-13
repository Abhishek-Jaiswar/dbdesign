/**
 * This class represents a custom API error that can be used in responses.
 * It extends the built-in Error class to include additional information
 * about the error such as HTTP status code, success flag, and error details.
 * 
 * Usage:
 *  throw new ApiError(404, "Resource not found", ["Detail about the error"]);
 * 
 * Parameters:
 *  @param {number} statusCode - HTTP status code of the error.
 *  @param {string} message - A descriptive error message. Defaults to "Something went wrong".
 *  @param {Array} error - An array containing details about the error. Defaults to an empty array.
 *  @param {string} stack - Optional stack trace. If not provided, it will be captured automatically.
 */
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.error = error;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
