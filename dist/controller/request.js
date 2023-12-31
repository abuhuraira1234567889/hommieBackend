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
const RequestModal = mongoose.model("Request");
const login = mongoose.model("login");
const client = mongoose.model("Client");
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
            const userReq = yield RequestModal.find({
                userId: req.body.userId,
                postId: req.body.postId,
            });
            console.log(userReq);
            if (userReq.length > 0) {
                return res.status(400).json({ success: "Already Applied for Approva" });
            }
            else {
                const { userId, postId, clientId } = req.body;
                const newRequest = new RequestModal({
                    userId,
                    postId,
                    clientId,
                    isApproved: false,
                });
                const clientEmail = yield login.findOne({
                    _id: clientId,
                });
                console.log(clientEmail.Email);
                const userEmail = yield login.findOne({
                    _id: userId,
                });
                console.log(userEmail.Email);
                let mailOptions = {
                    from: "hommieservices@gmail.com",
                    to: clientEmail.Email,
                    subject: "Request for Approval",
                    text: `Hy sir, I am ${userEmail.Name}. I want you to work for me. please approve my request`, // plain text body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        next();
                        return console.log(error);
                    }
                    console.log("Message sent: %s", info.messageId);
                    next();
                });
                let mailOptions2 = {
                    from: "hommieservices@gmail.com",
                    to: userEmail.Email,
                    subject: "Request for Approval",
                    text: `Your request Sent to the Admin Please wait for the approval`, // plain text body
                };
                transporter.sendMail(mailOptions2, (error, info) => {
                    if (error) {
                        next();
                        return console.log(error);
                    }
                    console.log("Message sent: %s", info.messageId);
                    next();
                });
                yield newRequest.save();
                return res.status(200).json({ data: newRequest });
            }
            // return res.status(200).json({ data: newComplain });
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }),
    approve: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const request = yield RequestModal.findOneAndUpdate({ _id: id }, { isApproved: true }, { new: true });
            yield request.save();
            const userEmail = yield login.findOne({
                _id: request.userId,
            });
            console.log(userEmail.Email);
            let mailOptions = {
                from: "hommieservices@gmail.com",
                to: userEmail.Email,
                subject: "Request Approved",
                text: `Your request is approved by the Admin`, // plain text body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    next();
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                next();
            });
            return res.status(200).json({ data: request });
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }),
    getRequests: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requests = yield RequestModal.find();
            const userData = [];
            for (let i of requests) {
                const user = yield login.findOne({
                    _id: i.userId,
                });
                userData.push({
                    _id: i._id,
                    userId: i.userId,
                    postId: i.postId,
                    clientId: i.clientId,
                    isApproved: i.isApproved,
                    userName: user.Name,
                    userEmail: user.Email,
                    userPhone: user.PhoneNo,
                    userAddress: user.cnic,
                    userImage: user.image,
                });
            }
            return res.status(200).json({ data: userData });
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }),
    deleteRequest: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("delete");
            const { id } = req.params;
            const request = yield RequestModal.findOneAndDelete({ _id: id });
            const userEmail = yield login.findOne({
                _id: request.userId,
            });
            console.log(userEmail.Email);
            let mailOptions = {
                from: "hommieservices@gmail.com",
                to: userEmail.Email,
                subject: "Request Deleted",
                text: `Your request is Not approved by the Admin`, // plain text body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    next();
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                next();
            });
            return res.status(200).json({ data: request });
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }),
    notification: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const request = yield RequestModal.find({ userId: id });
            const userData = [];
            for (let i of request) {
                console.log("the reques is here", i);
                const data = yield client.findOne({ _id: i.postId });
                console.log("the data is here", data);
                userData.push({
                    _id: data._id,
                    name: data.name,
                    heading: data.heading,
                    userId: data.userId,
                    age: data.age,
                    gender: data.gender,
                    contact: data.contact,
                    cnic: data.cnic,
                    religion: data.religion,
                    city: data.city,
                    adress: data.adress,
                    maritalStatus: data.maritalStatus,
                    timing: data.timing,
                    service: data.service,
                    qualification: data.qualification,
                    skills: data.skills,
                    language: data.language,
                    experience: data.experience,
                    image: data.image,
                    status: data.status,
                    postApproved: i.isApproved,
                });
            }
            return res.status(200).json({ data: userData });
        }
        catch (err) {
            return res.status(500).json({ error: err });
        }
    }),
};
