import express, { Express, Request, Response } from "express";
const nodemailer = require("nodemailer");

const router = express.Router();
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
  add: async (req: any, res: any, next: any) => {
    try {
      const {
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
      } = req.body;

      //  console.log(userId, plotNo, totalPrice, dimension, description, province, distric, email, images, tehsil)
      const clientExist = await login.findOne({
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
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);

        next();
      });
      // we sent respone to show dats on front end
      return res.status(200).json({ data: newClient });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
  updateClient: async (req: any, res: any, next: any) => {
    try {
      const id = req.params.id;
      if (id) {
        const {
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
        } = req.body;

        const updateClient = await client.findOneAndUpdate(
          { userId: id },
          {
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
          }
        );
        updateClient.save();

        //  console.log(userId, plotNo, totalPrice, dimension, description, province, distric, email, images, tehsil)
        const clientExist = await login.findOne({
          _id: id,
        });
        console.log(clientExist.Email);

        let mailOptions = {
          from: "hommieservices@gmail.com",
          to: clientExist.Email,
          subject: "Profile Updated",
          text: "Your Profile is updated successfully", // plain text body
        };
        transporter.sendMail(mailOptions, (error: any, info: any) => {
          if (error) {
            next();
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);

          next();
        });
        return res.status(200).json({ data: updateClient });
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  },
  getClient: async (req: any, res: any) => {
    try {
      const Client = await client.find({});
      console.log("this is email", Client);
      if (Client) {
        return res.status(200).json({ data: Client });
      } else {
        return res.status(201).json({ message: "worker not found" });
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  },

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
  removeClient: async (req: any, res: any) => {
    try {
      const id = req.params.id;
      if (id) {
        await client.deleteOne({ _id: id });
        return res.status(200).json({ message: "Client deleted" });
      }
    } catch (error: any) {
      res.status(500).json(error);
    }
  },
};
