"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
const post_validation_1 = require("../validations/post.validation");
const validate_middleware_1 = require("../middlewares/validate.middleware");
router.post("/posts", (0, validate_middleware_1.validateRequest)(post_validation_1.createPostSchema), (0, express_async_handler_1.default)(post_controller_1.createUserPost));
router.get("/posts", (0, express_async_handler_1.default)(post_controller_1.fetchPosts));
router.delete("/posts/:id", (0, express_async_handler_1.default)(post_controller_1.destroy));
exports.default = router;
