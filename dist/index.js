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
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const address_route_1 = __importDefault(require("./routes/address.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const knex_1 = __importDefault(require("./database/knex")); // Knex instance
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/api", user_route_1.default);
app.use("/api", address_route_1.default);
app.use("/api", post_route_1.default);
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.server = server;
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n🔄 Shutting down gracefully...");
    try {
        yield knex_1.default.destroy();
        console.log("Database connection closed");
        server.close(() => {
            console.log("Server closed");
            process.exit(0);
        });
    }
    catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
    }
});
// Handle termination signals
process.on("SIGINT", shutdown); // Ctrl+C 
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    shutdown();
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Promise Rejection at:", promise, "reason:", reason);
    shutdown();
});
