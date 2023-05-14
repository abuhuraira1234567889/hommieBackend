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
const nodemailer = require("nodemailer");
const router = express_1.default.Router();
const mongoose = require("mongoose");
const login = mongoose.model("login");
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "hurairaabu098@gmail.com",
        pass: "sutdvvzwxphdyfut",
    },
});
module.exports = {
    add: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Email = req.body.email;
            const Password = req.body.password;
            const isWorker = req.body.isWorker;
            if ([Email, Password].includes("")) {
                return res
                    .status(400)
                    .json({ error: "One of the required fields were left empty." });
            }
            const user = yield login.findOne({
                Email: Email,
            });
            if (user) {
                console.log("i am already exist");
                return res.status(404).json({
                    success: false,
                    message: "User already exist",
                });
            }
            if (!user) {
                const newEntry = {
                    Email: Email,
                    Password: Password,
                    isWorker: isWorker,
                };
                let newAddedEntry = yield login.create(newEntry);
                return res.status(200).json({
                    success: true,
                    data: Object.assign({}, newAddedEntry._doc),
                });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    approve: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            console.log("i am inside route");
            const { image, cnic, name, phoneNo } = req.body;
            if (id) {
                const Profile = yield login.findByIdAndUpdate(id, {
                    image: image,
                    Name: name,
                    PhoneNo: phoneNo,
                    cnic: cnic,
                    isUpdated: true,
                });
                yield Profile.save();
                if (Profile) {
                    return res.status(200).json({ data: Profile });
                }
                else {
                    return res.status(400).json({ message: "Profile not found " });
                }
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Profile = yield login.find();
            if (Profile) {
                return res.status(200).json({ data: Profile });
            }
            else {
                return res.status(400).json({ message: "Profile not found " });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    signin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Email = req.body.email;
            const Password = req.body.password;
            const isWorker = req.body.isWorker;
            const user = yield login.findOne({
                Email: Email,
            });
            if (user) {
                console.log("i am already exist", user.Password);
                if (user.Password !== Password) {
                    return res.status(400).json({
                        success: false,
                        message: "Password is incorrect",
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        data: Object.assign({}, user._doc),
                    });
                }
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
