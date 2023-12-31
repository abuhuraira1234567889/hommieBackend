"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PropertyScheme = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    WalletAddress: {
        type: String,
    },
    plotNo: {
        type: String,
        unique: true,
    },
    totalPrice: {
        type: String,
    },
    dimension: {
        type: Array,
    },
    description: {
        type: String,
    },
    approve: {
        type: Boolean,
        default: false,
    },
});
mongoose_1.default.model('Property', PropertyScheme);
