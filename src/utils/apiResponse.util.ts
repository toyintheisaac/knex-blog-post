import { Response } from 'express';
 
class ApiResponse {
    static UNAUTHORIZED = 401;
    static SUCCESS = 200;
    static SUCCESS_WITH_DATA = 201;
    static ERROR = 400;
    static FAILED_VALIDATION = 422;   
  
    private data: any;
    private message: string;
  
    constructor(data: any, message: string) {
      this.data = data;
      this.message = message;
    }
  
    successResponse(res: Response, statusCode = ApiResponse.SUCCESS) {
      return res.status(statusCode).json({
        success: true,
        message: this.message || "Success processing request",
        data: this.data,
      });
    }
  
    errorResponse(res: Response, statusCode = ApiResponse.ERROR) {
      return res.status(statusCode).json({
        success: false,
        message: this.message || "Error processing request",
        data: this.data,
      });
    } 
 

  customErrorResponse(res: Response, statusCode = ApiResponse.ERROR) {
      return res.status(statusCode).json({
          success: false,
          message: this.message || 'Error processing request'
      });
  }

  validationFailedResponse(res: Response, errors: any, statusCode = ApiResponse.FAILED_VALIDATION) { 
      const formattedErrors = errors.map((error: any) => ({
          message: error.message,
          path: error.path,
      }));

      return res.status(statusCode).json({
          success: false,
          message: this.message || 'Validation failed',
          errors: formattedErrors,
      });
  }

  unauthorizedAccessResponse(res: Response, statusCode = ApiResponse.UNAUTHORIZED) {
      return res.status(statusCode).json({
          success: false,
          message: this.message || 'UnAuthorized User' 
      });
  }
 
  }

export default ApiResponse;