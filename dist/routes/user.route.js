"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
const user_validation_1 = require("../validations/user.validation");
const validate_middleware_1 = require("../middlewares/validate.middleware");
router.get("/users", (0, express_async_handler_1.default)(user_controller_1.fetchUsers));
router.get("/users/count", (0, express_async_handler_1.default)(user_controller_1.countUsers));
router.get("/users/:id", (0, express_async_handler_1.default)(user_controller_1.fetchUserById));
router.post("/users", (0, validate_middleware_1.validateRequest)(user_validation_1.createUser), (0, express_async_handler_1.default)(user_controller_1.addUser));
exports.default = router;
