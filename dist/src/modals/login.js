"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const singInScheme = new mongoose_1.default.Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    PhoneNo: {
        type: Number,
        default: 0,
    },
    isWorker: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: '',
    },
    isUpdated: {
        type: Boolean,
        default: false,
    },
    cnic: {
        type: String,
        default: '',
    }
});
mongoose_1.default.model('login', singInScheme);
