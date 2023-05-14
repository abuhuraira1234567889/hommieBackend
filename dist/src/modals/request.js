"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RequestScheme = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    postId: {
        type: String,
    },
    clientId: {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
});
mongoose_1.default.model("Request", RequestScheme);
