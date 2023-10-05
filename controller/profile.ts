import express, { Express, Request, Response } from "express";
const nodemailer = require("nodemailer");

const router = express.Router();
const mongoose = require("mongoose");

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
  add: async (req: any, res: any) => {
    try {
      const Email = req.body.email;
      const Password = req.body.password;
      const isWorker = req.body.isWorker;

      if ([Email, Password].includes("")) {
        return res
          .status(400)
          .json({ error: "One of the required fields were left empty." });
      }
      const user = await login.findOne({
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
        let newAddedEntry = await login.create(newEntry);
        return res.status(200).json({
          success: true,
          data: {
            ...newAddedEntry._doc,
          },
        });
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  }, //edit profile
  approve: async (req: any, res: any) => {
    try {
      const id = req.params.id;
      console.log("i am inside route");
      const { image, cnic, name, phoneNo } = req.body;
      if (id) {
        const Profile = await login.findByIdAndUpdate(id, {
          image: image,
          Name: name,
          PhoneNo: phoneNo,
          cnic: cnic,
          isUpdated: true,
        });
        await Profile.save();
        if (Profile) {
          return res.status(200).json({ data: Profile });
        } else {
          return res.status(400).json({ message: "Profile not found " });
        }
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  },
  getProfile: async (req: any, res: any) => {
    try {
      const Profile = await login.find();

      if (Profile) {
        return res.status(200).json({ data: Profile });
      } else {
        return res.status(400).json({ message: "Profile not found " });
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  },
  signin: async (req: any, res: any) => {
    console.log("i am inside signin", req.body)
    try {
      const Email = req.body.email;
      const Password = req.body.password;
      
      const user = await login.findOne({
        Email: Email,
      });
      if (user) {
        console.log("i am already exist", user.Password);
        if (user.Password !== Password) {
          return res.status(400).json({
            success: false,
            message: "Password is incorrect",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: {
              ...user._doc,
            },
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  },
};
