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
exports.destroyPost = exports.getPostById = exports.getPostByUserId = exports.createPost = void 0;
const knex_1 = __importDefault(require("../database/knex"));
const createPost = (user_id, title, body) => __awaiter(void 0, void 0, void 0, function* () {
    const [post] = yield (0, knex_1.default)("posts").insert({ user_id, title, body }).returning("*");
    return post;
});
exports.createPost = createPost;
const getPostByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)("posts").where({ user_id }).returning("*");
});
exports.getPostByUserId = getPostByUserId;
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)("posts").where({ id }).returning("*");
});
exports.getPostById = getPostById;
const destroyPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)("posts").where({ id }).delete();
});
exports.destroyPost = destroyPost;
