"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        client: "sqlite3",
        connection: { filename: "./db.sqlite" },
        useNullAsDefault: true,
        migrations: {
            directory: "../migrations",
        },
    }
};
exports.default = config;
