import express, { Express, Request, Response } from "express";
const mongoose = require("mongoose");

const report = mongoose.model("report");

module.exports={
    add:async(req:any,res:any)=>{

        try {
            const {userId,report,clientId,message}=req.body
            
            
            const newReport=new report({
                userId,
                report
            })
            await newReport.save()
            res.status(200).json({
                success:true,
                message:"Report Added"
            })
        } catch (error:any) {
            res.status(500).json(error)
        }
    }

}
