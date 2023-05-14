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
const register = mongoose.model("Register");
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
    registerProperty: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, plotNo, dimension, description, province, distric, tehsil, cnic, } = req.body;
            const person = yield login.findById(userId);
            if (person) {
                const registerExist = yield register.findOne({
                    plotNo: plotNo,
                });
                if (registerExist) {
                    return res.status(400).json({ error: "register already exist" });
                }
                else {
                    const currentOwner = userId;
                    const totalOwner = [userId];
                    const newregister = new register({
                        userId,
                        plotNo,
                        dimension,
                        description,
                        province,
                        distric,
                        tehsil,
                        currentOwner,
                        totalOwner,
                        cnic,
                    });
                    newregister.save();
                    let mailOptions = {
                        from: "hurairaabu098@gmail.com",
                        to: person.Email,
                        subject: "Property Registration",
                        text: `Your Property is register Successfully. Now here is the unique Id of the your Property ${newregister._id}`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log("Message sent: %s", info.messageId);
                        return res.json({ email: info, data: newregister });
                    });
                }
            }
            else {
                res.status(400).json({ error: "User not found" });
            }
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }),
    getRegisterProperty: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const registerData = yield register.find();
            if (registerData) {
                return res.status(200).json({ data: registerData });
            }
            else {
                return res.status(404).json({ error: "register not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }),
    transferProperty: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { userId } = req.body;
        try {
            const transferData = yield register.findOne({ _id: id });
            if (transferData) {
                const currentOwner = transferData.currentOwner;
                const ownerData = yield login.findOne({ _id: currentOwner });
                if (ownerData) {
                    transferData.currentOwner = userId;
                    transferData.totalOwner.push(userId);
                    transferData.save();
                    let mailOptions = {
                        from: "hurairaabu098@gmail.com",
                        to: ownerData.Email,
                        subject: "Property Transfer",
                        text: `We are transfering Your Property to the new Owner. new Owner of property is ${userId}`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log("Message sent: %s", info.messageId);
                        return res.json({ email: info });
                    });
                }
                else {
                    return res.status(404).json({ error: "owner not found" });
                }
            }
            else {
                return res.status(404).json({ error: "register not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error });
        }
    }),
    searchPlot: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const registerData = yield register.findById(id);
            if (registerData) {
                return res.status(200).json({ data: registerData });
            }
            else {
                return res.status(404).json({ error: "register not found" });
            }
        }
        catch (err) {
            return res.status(500).json({ error: "Your Property Id is Wrong Please try to correct the id" });
        }
    })
};
