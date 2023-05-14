"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const complain = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    response: {
        type: String,
        default: ""
    },
    closeComplain: {
        type: Boolean,
        default: false
    },
});
exports.default = mongoose_1.default.model("Complain", complain);
