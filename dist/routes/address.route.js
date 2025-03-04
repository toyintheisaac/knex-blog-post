"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_controller_1 = require("../controllers/address.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
const address_validation_1 = require("../validations/address.validation");
const validate_middleware_1 = require("../middlewares/validate.middleware");
router.post("/addresses", (0, validate_middleware_1.validateRequest)(address_validation_1.createAddressSchema), (0, express_async_handler_1.default)(address_controller_1.createAddress));
router.get("/addresses/:userId", (0, express_async_handler_1.default)(address_controller_1.fetchAddress));
router.patch("/addresses/:userId", (0, validate_middleware_1.validateRequest)(address_validation_1.updateAddressSchema), (0, express_async_handler_1.default)(address_controller_1.updateAddress));
exports.default = router;
