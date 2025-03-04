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
exports.getUserByEmail = exports.getUserCount = exports.createUser = exports.getUserWithAddress = exports.getUserById = exports.getUsers = void 0;
const knex_1 = __importDefault(require("../database/knex"));
const getUsers = (page, pageSize) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, knex_1.default)("users").select("*").limit(pageSize).offset(page * pageSize); });
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, knex_1.default)("users").where({ id }).first(); });
exports.getUserById = getUserById;
const getUserWithAddress = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)("users")
        .leftJoin("addresses", "users.id", "addresses.user_id")
        .select("users.id", "users.name", "users.email", "addresses.address")
        .where("users.id", userId)
        .first();
});
exports.getUserWithAddress = getUserWithAddress;
const createUser = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = yield (0, knex_1.default)("users").insert({ name, email }).returning("*");
    return user;
});
exports.createUser = createUser;
const getUserCount = () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, knex_1.default)("users").count("* as count").first(); });
exports.getUserCount = getUserCount;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)("users").where({ email }).first();
});
exports.getUserByEmail = getUserByEmail;
