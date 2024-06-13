/**
 * This class represents a standardized API response.
 * It encapsulates the status code, data, and message of a response,
 * and determines whether the request was successful based on the status code.
 *
 * Usage:
 *  const response = new ApiResponse(200, { key: 'value' }, "Request successful");
 *  res.status(response.statusCode).json(response);
 *
 * @param {number} statusCode - HTTP status code of the response.
 * @param {Object} data - The data to be included in the response.
 * @param {string} [message="Success"] - A descriptive message about the response. Defaults to "Success".
 */
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = (statusCode < 400);
    }
}

export { ApiResponse };
