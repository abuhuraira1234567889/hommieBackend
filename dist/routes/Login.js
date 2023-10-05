"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const mongoose = require('mongoose');
const login = mongoose.model('login');
// require("../modals/User");
//Tooken
router.post('/Login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Email = req.body.email;
        const Password = req.body.password;
        //middleware
        if ([Email, Password].includes('')) {
            return res
                .status(400)
                .json({ error: 'One of the required fields were left empty.' });
        }
        //controller//
        const user = yield login.findOne({
            Email: Email,
        });
        if (user) {
            if (user._doc.Password === Password) {
                return res.status(200).json({
                    success: true,
                    data: user,
                });
            }
            else
                return res.status(400).json({ error: 'Password mismatch' });
        }
        else
            return res.status(400).json({ error: 'User not found' });
    }
    catch (err) { }
}));
module.exports = router;
