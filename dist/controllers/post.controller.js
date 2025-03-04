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
exports.destroy = exports.fetchPosts = exports.createUserPost = void 0;
const post_model_1 = require("../models/post.model");
const apiResponse_util_1 = __importDefault(require("../utils/apiResponse.util"));
const createUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, body } = req.body;
        const post = yield (0, post_model_1.createPost)(userId, title, body);
        const response = new apiResponse_util_1.default({
            post,
        }, `Post Added successfully`);
        response.successResponse(res, apiResponse_util_1.default.SUCCESS_WITH_DATA);
    }
    catch (error) {
        console.error("Error adding Post:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.createUserPost = createUserPost;
const fetchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.query.userId);
        const userPosts = yield (0, post_model_1.getPostByUserId)(userId);
        if (!userPosts || userPosts.length === 0) {
            new apiResponse_util_1.default(null, "User does not have posts").errorResponse(res, apiResponse_util_1.default.ERROR);
            return;
        }
        new apiResponse_util_1.default({
            userPosts,
        }, "Fetch successful").successResponse(res, apiResponse_util_1.default.SUCCESS);
    }
    catch (error) {
        console.error("Error fetching post:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.fetchPosts = fetchPosts;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const post = yield (0, post_model_1.getPostById)(id);
        if (!post) {
            new apiResponse_util_1.default(null, "Post does not exist").errorResponse(res, apiResponse_util_1.default.ERROR);
            return;
        }
        yield (0, post_model_1.destroyPost)(id);
        new apiResponse_util_1.default(null, "Post Deleted successfully").successResponse(res, apiResponse_util_1.default.SUCCESS);
    }
    catch (error) {
        console.error("Error deleting post:", error);
        new apiResponse_util_1.default(null, "An unexpected error occurred").errorResponse(res, apiResponse_util_1.default.ERROR);
    }
});
exports.destroy = destroy;
