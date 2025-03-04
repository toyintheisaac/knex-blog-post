"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(data, message) {
        this.data = data;
        this.message = message;
    }
    successResponse(res, statusCode = ApiResponse.SUCCESS) {
        return res.status(statusCode).json({
            success: true,
            message: this.message || "Success processing request",
            data: this.data,
        });
    }
    errorResponse(res, statusCode = ApiResponse.ERROR) {
        return res.status(statusCode).json({
            success: false,
            message: this.message || "Error processing request",
            data: this.data,
        });
    }
    customErrorResponse(res, statusCode = ApiResponse.ERROR) {
        return res.status(statusCode).json({
            success: false,
            message: this.message || 'Error processing request'
        });
    }
    validationFailedResponse(res, errors, statusCode = ApiResponse.FAILED_VALIDATION) {
        const formattedErrors = errors.map((error) => ({
            message: error.message,
            path: error.path,
        }));
        return res.status(statusCode).json({
            success: false,
            message: this.message || 'Validation failed',
            errors: formattedErrors,
        });
    }
    unauthorizedAccessResponse(res, statusCode = ApiResponse.UNAUTHORIZED) {
        return res.status(statusCode).json({
            success: false,
            message: this.message || 'UnAuthorized User'
        });
    }
}
ApiResponse.UNAUTHORIZED = 401;
ApiResponse.SUCCESS = 200;
ApiResponse.SUCCESS_WITH_DATA = 201;
ApiResponse.ERROR = 400;
ApiResponse.FAILED_VALIDATION = 422;
exports.default = ApiResponse;
