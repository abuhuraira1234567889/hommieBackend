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
// const complain = require("../src/modals/Complain");
const complain = mongoose.model("Complain");
module.exports = {
    add: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("add complain");
        try {
            const { userId, message } = req.body;
            if (message == "") {
                return res.status(404).json({ error: "Please enter message" });
            }
            else {
                const newComplain = new complain({
                    userId,
                    message,
                });
                newComplain.save();
                return res.status(200).json({ data: newComplain });
            }
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }),
    getComplain: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const complainData = yield complain.find();
            return res.status(200).json({ data: complainData });
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    }),
    closeComplain: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { message } = req.body;
            const complainData = yield complain.findById(id);
            if (!complainData) {
                return res.status(404).json({ error: "Complain not found" });
            }
            complainData.response = message;
            complainData.closeComplain = true;
            complainData.save();
            return res.status(200).json({ data: complainData });
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    }),
    deleteComplain: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const complainData = yield complain.findById(id);
            if (!complainData) {
                return res.status(404).json({ error: "Complain not found" });
            }
            complainData.delete();
            return res.status(200).json({ data: complainData });
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    }),
};
