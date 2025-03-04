import Joi from 'joi';
import { Request, Response, NextFunction } from 'express'; 
import ApiResponse from "../utils/apiResponse.util"; 

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const response = new ApiResponse(null, error.details[0].message);
            response.validationFailedResponse(res, error.details, ApiResponse.FAILED_VALIDATION);
            return;
        }
        next();
    };
};