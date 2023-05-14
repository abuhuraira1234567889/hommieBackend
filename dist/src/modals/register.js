"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RegisterSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    plotNo: {
        type: String,
        unique: true,
    },
    dimension: {
        type: Array,
    },
    description: {
        type: String,
    },
    province: {
        type: String,
    },
    distric: {
        type: String,
    },
    tehsil: {
        type: String,
    },
    currentOwner: {
        type: String,
    },
    totalOwner: {
        type: Array,
    },
    cnic: {
        type: Number,
        required: true
    }
});
mongoose_1.default.model("Register", RegisterSchema);
