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
router.post("/addPropertysss", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: "hurairaabu098@gmail.com",
            pass: "sutdvvzwxphdyfut",
        },
    });
    // sutdvvzwxphdyfut
    try {
        const userId = req.body.userId;
        const plotNo = req.body.plotNo;
        const totalPrice = req.body.totalPrice;
        const dimension = req.body.dimension;
        const description = req.body.description;
        const approve = req.body.approve;
        const province = req.body.province;
        const distric = req.body.distric;
        const tehsil = req.body.tehsil;
        const images = req.body.images;
        const email = req.body.email;
        //middleware
        //controller//
        const PropertyExist = yield property.findOne({
            plotNo: plotNo,
        });
        if (PropertyExist) {
            return res.status(202).json({ error: "Property already exist" });
        }
        const newProperty = new property({
            userId,
            plotNo,
            totalPrice,
            dimension,
            description,
            approve,
            province,
            distric,
            tehsil,
            images,
            email,
        });
        newProperty.save();
        let mailOptions = {
            from: "hurairaabu098@gmail.com",
            to: email,
            subject: "Project Added",
            text: "Hello world sir Your Project is under Vission we wil add this project after approval. If we fing it Wrong than we delete that project.If we seems it good than you will recieve email within 24hours", // plain text body
            // html: "<b>Hello world?</b>"
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            return res.json({ email: info, data: newProperty });
        });
        // return res.status(200).json({ data: newProperty._id });
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
}));
module.exports = router;
