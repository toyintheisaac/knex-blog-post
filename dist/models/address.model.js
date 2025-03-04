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
exports.updateUserAddress = exports.getAddressByUserId = exports.insertAddress = void 0;
const knex_1 = __importDefault(require("../database/knex"));
const insertAddress = (user_id, address) => __awaiter(void 0, void 0, void 0, function* () {
    const [addresses] = yield (0, knex_1.default)("addresses").insert({ address, user_id }).returning("*");
    return addresses;
});
exports.insertAddress = insertAddress;
const getAddressByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)("addresses").where({ user_id }).first();
});
exports.getAddressByUserId = getAddressByUserId;
const updateUserAddress = (user_id, newAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const [addresses] = yield (0, knex_1.default)("addresses")
        .where({ user_id })
        .update({ address: newAddress })
        .returning("*");
    return addresses;
});
exports.updateUserAddress = updateUserAddress;
