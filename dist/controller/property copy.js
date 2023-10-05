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
const property = mongoose.model("Property");
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "hurairaabu098@gmail.com",
        pass: "sutdvvzwxphdyfut",
    },
});
module.exports = {
    add: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, plotNo, totalPrice, dimension, description, province, distric, email, images, tehsil, } = req.body;
            //  console.log(userId, plotNo, totalPrice, dimension, description, province, distric, email, images, tehsil)
            const PropertyExist = yield property.findOne({
                plotNo: plotNo,
            });
            if (PropertyExist) {
                return res.status(409).json({ error: "Property already exist" });
            }
            const newProperty = new property({
                userId,
                plotNo,
                totalPrice,
                dimension,
                description,
                province,
                distric,
                tehsil,
                images,
                email,
            });
            console.log(newProperty);
            newProperty.save();
            let mailOptions = {
                from: "hurairaabu098@gmail.com",
                to: email,
                subject: "Project Added",
                text: "Hello sir Your Project is under Vission we wil add this project after approval. If we fing it Wrong than we delete that project.If we seems it good than you will recieve email within 24hours", // plain text body
                // html: "<b>Hello world?</b>"
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                // return res.json({ email: info, data: newProperty });
                next();
            });
            return res.status(200).json({ data: newProperty });
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }),
    approve: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (id) {
                const Property = yield property.findOne({ _id: id });
                if (Property.approve) {
                    // console.log("this is email",Property)
                    return res.status(201).json({ message: "Property already verified" });
                }
                else {
                    // console.log("this is email",Property.email)
                    yield Property.updateOne({ _id: id, approve: true });
                    let mailOptions = {
                        from: "hurairaabu098@gmail.com",
                        to: Property.email,
                        subject: "Project Approve",
                        text: `Congratulation! We Approve your Project. Now here is the unique Id of the your Project ${Property._id}`,
                        // html: "<b>Hello world?</b>"
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.json(error);
                        }
                        console.log("Message sent: %s", info.messageId);
                        // return res.json({ email: info });
                        return res.status(200).json({ message: "Successfully verified" });
                    });
                }
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Property = yield property.find({});
            console.log("this is email", Property);
            if (Property) {
                return res.status(200).json({ data: Property });
            }
            else {
                return res.status(201).json({ message: "Property not found" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    removeProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (id) {
                const Property = yield property.findOne({ _id: id });
                if (Property.approve) {
                    // console.log("this is email",Property)
                    return res.status(201).json({ message: "Property already verified" });
                }
                else {
                    // console.log("this is email",Property.email)
                    yield Property.deleteOne({ _id: id });
                    let mailOptions = {
                        from: "hurairaabu098@gmail.com",
                        to: Property.email,
                        subject: "Project Removed",
                        text: `We have nofice some issue in your project. So we remove your project.`,
                        // html: "<b>Hello world?</b>"
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return res.json(error);
                        }
                        console.log("Message sent: %s", info.messageId);
                        // return res.json({ email: info });
                        return res.status(200).json({ message: "Successfully Deleted" });
                    });
                }
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
