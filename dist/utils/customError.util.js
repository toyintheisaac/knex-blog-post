"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    /**
     *
     * @param name name of the error type
     * @param message error message
     */
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}
exports.default = CustomError;
