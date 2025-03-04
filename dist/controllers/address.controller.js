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
exports.updateAddress = exports.fetchAddress = exports.createAddress = void 0;
const address_model_1 = require("../models/address.model");
const apiResponse_util_1 = __importDefault(require("../utils/apiResponse.util"));
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, userId } = req.body;
        // check for existing address
        const existingAddress = yield (0, address_model_1.getAddressByUserId)(userId);
        if (existingAddress) {
            new apiResponse_util_1.default(null, "User already has an address").errorResponse(res, apiResponse_util_1.default.ERROR);
            return;
        }
        const userAddress = yield (0, address_model_1.insertAddress)(userId, address);
        const response = new apiResponse_util_1.default({
            userAddress,
        }, `Address Added successfully`);
        response.successResponse(res, apiResponse_util_1.default.SUCCESS_WITH_DATA);
    }
    catch (error) {
        console.error("Error adding address:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.createAddress = createAddress;
const fetchAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const userAddress = yield (0, address_model_1.getAddressByUserId)(userId);
        if (!userAddress) {
            new apiResponse_util_1.default(null, "User does not have address").errorResponse(res, apiResponse_util_1.default.ERROR);
            return;
        }
        new apiResponse_util_1.default({
            userAddress,
        }, "Fetch successful").successResponse(res, apiResponse_util_1.default.SUCCESS);
    }
    catch (error) {
        console.error("Error fetching address:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.fetchAddress = fetchAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const { address } = req.body;
        const userAddress = yield (0, address_model_1.getAddressByUserId)(userId);
        if (!userAddress) {
            new apiResponse_util_1.default(null, "User does not have address").errorResponse(res, apiResponse_util_1.default.ERROR);
            return;
        }
        const updatedAddress = yield (0, address_model_1.updateUserAddress)(userId, address);
        new apiResponse_util_1.default({ updatedAddress }, "Address updated successfully").successResponse(res, apiResponse_util_1.default.SUCCESS);
    }
    catch (error) {
        console.error("Error updating address:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.updateAddress = updateAddress;
