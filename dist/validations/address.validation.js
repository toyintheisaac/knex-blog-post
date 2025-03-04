"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.createAddressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createAddressSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
});
exports.updateAddressSchema = joi_1.default.object({
    address: joi_1.default.string().required(),
});
