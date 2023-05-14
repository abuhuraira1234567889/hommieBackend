import express, { Express, Request, Response } from "express";
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// const complain = require("../src/modals/Complain");
const complain = mongoose.model("Complain");

module.exports = {
  add: async (req: any, res: any) => {
    console.log("add complain");
    try {
      const { userId, message } = req.body;

      if (message == "") {
        return res.status(404).json({ error: "Please enter message" });
      } else {
        const newComplain = new complain({
          userId,
          message,
        });

        newComplain.save();

        return res.status(200).json({ data: newComplain });
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
  getComplain: async (req: any, res: any) => {
    
    try {
      const complainData = await complain.find();
      return res.status(200).json({ data: complainData });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
  closeComplain: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const complainData = await complain.findById(id);
      if (!complainData) {
        return res.status(404).json({ error: "Complain not found" });
      }
      complainData.response = message;
      complainData.closeComplain = true;
      complainData.save();
      return res.status(200).json({ data: complainData });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
  deleteComplain: async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const complainData = await complain.findById(id);
      if (!complainData) {
        return res.status(404).json({ error: "Complain not found" });
      }
      complainData.delete();
      return res.status(200).json({ data: complainData });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
};
