"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Nocs = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    reason: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ""
    },
    approve: {
        type: Boolean,
        default: false
    },
    plotNo: {
        type: String,
        default: ""
    }
});
exports.default = mongoose_1.default.model("Nocs", Nocs);
