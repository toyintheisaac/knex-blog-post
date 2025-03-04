"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const apiResponse_util_1 = __importDefault(require("../utils/apiResponse.util"));
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const response = new apiResponse_util_1.default(null, error.details[0].message);
            response.validationFailedResponse(res, error.details, apiResponse_util_1.default.FAILED_VALIDATION);
            return;
        }
        next();
    };
};
exports.validateRequest = validateRequest;
