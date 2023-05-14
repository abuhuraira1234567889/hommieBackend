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
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const property = mongoose.model("Property");
const login = mongoose.model("login");
const Nocs = mongoose.model("Nocs");
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
            const { userId, message, reason, plotNo } = req.body;
            if (reason == "") {
                return res.status(404).json({ error: "Please enter reason" });
            }
            else {
                const newNocs = new Nocs({
                    userId,
                    message,
                    reason,
                    plotNo,
                });
                newNocs.save();
                return res.status(200).json({ data: newNocs });
            }
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }),
    getNocs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const nocsData = yield Nocs.find();
            return res.status(200).json({ data: nocsData });
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }),
    approveNocs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const nocsData = yield Nocs.findById(id);
            console.log(nocsData);
            if (!nocsData) {
                return res.status(404).json({ error: "Plot Not Found" });
            }
            const person = yield login.findById(nocsData.userId);
            if (nocsData.approve == false) {
                if (person) {
                    console.log(person);
                    nocsData.approve = true;
                    nocsData.save();
                    let mailOptions = {
                        from: "hurairaabu098@gmail.com",
                        to: person.Email,
                        subject: "Nocs Approved",
                        text: `The Noce Of  ${nocsData.plotNo} has been approved So you can do ${nocsData.reason}`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.json(error);
                        }
                        console.log("Message sent: %s", info.messageId);
                        // return res.json({ email: info });
                        return res.status(200).json({ message: "Successfully Approved" });
                    });
                }
                else {
                    // console.log("not found");
                    res.status(404).json({ error: "User not found" });
                }
            }
            else {
                res.status(404).json({ error: "Already Approved" });
            }
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    }),
    deleteNocs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const nocsData = yield Nocs.findById(id);
            if (!nocsData) {
                return res.status(404).json({ error: "Complain not found" });
            }
            const person = yield login.findById(nocsData.userId);
            if (nocsData.approve == false) {
                if (person) {
                    yield Nocs.findByIdAndDelete(id);
                    let mailOptions = {
                        from: "hurairaabu098@gmail.com",
                        to: person.Email,
                        subject: "Nocs Not Approved",
                        text: `The Noce Of  ${nocsData.plotNo} plot no  has  not been approved So you can not do ${nocsData.reason}`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.json(error);
                        }
                        console.log("Message sent: %s", info.messageId);
                        // return res.json({ email: info });
                        return res.status(200).json({ message: "Not Approved" });
                    });
                }
                else {
                    // console.log("not found");
                    res.status(404).json({ error: "User not found" });
                }
            }
            else {
                res.status(404).json({ error: "Already Approved" });
            }
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    }),
};
