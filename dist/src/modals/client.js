"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Client = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    },
    contact: {
        type: String,
    },
    cnic: {
        type: String,
    },
    city: {
        type: String,
    },
    religion: {
        type: String,
    },
    language: {
        type: String,
    },
    experince: {
        type: String
    },
    catagory: {
        type: String
    },
    image: {
        type: String
    },
    heading: {
        type: String
    },
    adress: {
        type: String
    },
    maritialStatus: {
        type: String
    },
    timing: {
        type: String
    },
    service: {
        type: String
    },
    qualification: {
        type: String
    },
    skills: {
        type: String
    }
});
mongoose_1.default.model('Client', Client);
