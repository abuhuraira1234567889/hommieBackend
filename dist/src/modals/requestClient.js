"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Request = new mongoose_1.default.Schema({
    clientId: {
        type: String,
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: ""
    },
    isApproved: {
        type: Boolean,
        default: false
    },
});
exports.default = mongoose_1.default.model("requestClient", Request);
// clientId:{
//     type: String,
// },
// postId:{
//     type: String,
// },
// userId:{
//     type: String,
// }
// ,
// isApproved:{
//     type: Boolean,
//     default:false
// }
