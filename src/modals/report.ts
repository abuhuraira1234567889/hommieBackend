import mongoose from "mongoose";

interface report{
    clientId:String,
    userId:String,
    message:any,
    count:Number
}
const reportScheme = new mongoose.Schema<report>({
    clientId:{
        type:String
    },
    userId:{
        type:String
    },
    message:{
        type:Array
    }
    ,
    count:{
        type:Number,
        default:0
    }
  
  });
  mongoose.model('report', reportScheme);