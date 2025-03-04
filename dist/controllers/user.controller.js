"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countUsers = exports.addUser = exports.fetchUserById = exports.fetchUsers = void 0;
const user_model_1 = require("../models/user.model");
const apiResponse_util_1 = __importDefault(require("../utils/apiResponse.util"));
const fetchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = Number(req.query.pageNumber) || 0;
        const pageSize = Number(req.query.pageSize) || 10;
        if (pageNumber < 0 || pageSize < 1) {
            new apiResponse_util_1.default(null, "Invalid pagination parameters").errorResponse(res, apiResponse_util_1.default.ERROR);
            return;
        }
        const users = yield (0, user_model_1.getUsers)(pageNumber, pageSize);
        new apiResponse_util_1.default({
            users,
            pagination: { pageNumber, pageSize }
        }, "Fetch successful").successResponse(res, apiResponse_util_1.default.SUCCESS);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.fetchUsers = fetchUsers;
const fetchUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.id);
        if (!userId || isNaN(userId)) {
            new apiResponse_util_1.default(null, "Invalid user ID").errorResponse(res, apiResponse_util_1.default.FAILED_VALIDATION);
            return;
        }
        const user = yield (0, user_model_1.getUserWithAddress)(userId);
        if (!user) {
            new apiResponse_util_1.default(null, "User not found").errorResponse(res, apiResponse_util_1.default.ERROR);
            return;
        }
        new apiResponse_util_1.default({ user }, "Fetch successful").successResponse(res, apiResponse_util_1.default.SUCCESS);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.fetchUserById = fetchUserById;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        // check if email already exist 
        const existingUser = yield (0, user_model_1.getUserByEmail)(email);
        if (existingUser) {
            const response = new apiResponse_util_1.default(null, "Email already in use");
            response.errorResponse(res, apiResponse_util_1.default.FAILED_VALIDATION);
            return;
        }
        const user = yield (0, user_model_1.createUser)(name, email);
        const response = new apiResponse_util_1.default({
            user,
        }, `User Added successfully`);
        response.successResponse(res, apiResponse_util_1.default.SUCCESS_WITH_DATA);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.addUser = addUser;
const countUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, user_model_1.getUserCount)();
        const response = new apiResponse_util_1.default(count, `Counts`);
        response.successResponse(res, apiResponse_util_1.default.SUCCESS);
    }
    catch (error) {
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.countUsers = countUsers;
