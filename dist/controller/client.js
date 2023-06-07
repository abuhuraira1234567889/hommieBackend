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
const client = mongoose.model("Client");
const login = mongoose.model("login");
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "hommieservices@gmail.com",
        pass: "ysitjpspnfjaydgw",
    },
});
module.exports = {
    add: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, name, age, gender, contact, cnic, religion, city, language, experince, catagory, image, heading, adress, maritialStatus, timing, service, qualification, skills, } = req.body;
            //  console.log(userId, plotNo, totalPrice, dimension, description, province, distric, email, images, tehsil)
            const clientExist = yield login.findOne({
                _id: userId,
            });
            console.log(clientExist.Email);
            const newClient = new client({
                userId,
                name,
                age,
                gender,
                contact,
                cnic,
                religion,
                city,
                language,
                experince,
                catagory,
                image,
                heading,
                adress,
                maritialStatus,
                timing,
                service,
                qualification,
                skills,
            });
            newClient.save();
            let mailOptions = {
                from: "hommieservices@gmail.com",
                to: clientExist.Email,
                subject: "Worker added",
                text: "Hello,You are added in our databases please wait for a client to rech out you", // plain text body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                next();
            });
            // we sent respone to show dats on front end
            return res.status(200).json({ data: newClient });
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }),
    updateClient: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (id) {
                const { name, age, gender, contact, religion, city, language, experince, image, adress, maritialStatus, timing, service, qualification, skills, } = req.body;
                const updateClient = yield client.findOneAndUpdate({ _id: id }, {
                    $set: {
                        name,
                        age,
                        gender,
                        contact,
                        religion,
                        city,
                        language,
                        experince,
                        image,
                        adress,
                        maritialStatus,
                        timing,
                        service,
                        qualification,
                        skills,
                    },
                });
                updateClient.save();
                //  console.log(userId, plotNo, totalPrice, dimension, description, province, distric, email, images, tehsil)
                const clientExist = yield login.findOne({
                    _id: id,
                });
                console.log(clientExist.Email);
                let mailOptions = {
                    from: "hommieservices@gmail.com",
                    to: clientExist.Email,
                    subject: "Profile Updated",
                    text: "Your Profile is updated successfully", // plain text body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        next();
                        return console.log(error);
                    }
                    console.log("Message sent: %s", info.messageId);
                    next();
                });
                return res.status(200).json({ data: updateClient });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    getClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Client = yield client.find({});
            console.log("this is email", Client);
            if (Client) {
                return res.status(200).json({ data: Client });
            }
            else {
                return res.status(201).json({ message: "worker not found" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
    // checkClient: async (req: any, res: any) => {
    //   const id = req.params.id;
    //   try {
    //     const clientExist = await client.findOne({
    //       userId: id,
    //     });
    //     if (clientExist) {
    //       return res.status(200).json({ data: clientExist });
    //     } else {
    //       return res.status(201).json({ message: "Client not found" });
    //     }
    //   } catch (error: any) {
    //     res.status(500).json(error);
    //   }
    // },
    removeClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (id) {
                yield client.deleteOne({ _id: id });
                return res.status(200).json({ message: "Client deleted" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }),
};
