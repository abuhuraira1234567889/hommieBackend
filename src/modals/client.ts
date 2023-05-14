import mongoose, { Schema, model } from 'mongoose';
interface client {
  userId: string;
  name:string;
  age: string;
  gender: string;
  contact: any;
  cnic: any;
  city: any;
  religion: any;
  language:any;
  experince:any;
  catagory:any;
  image:any;
  heading:any;
  adress:any;
  maritialStatus:any;
  timing:any;
  service:any;
  qualification:any;
  skills:any;

}
const Client = new mongoose.Schema<client>({
  userId: {
    type: String,
  },
  name: {
    type: String,
  
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  contact: {
    type: String,
  },
  cnic: {
    type: String,
  },
  city: {
    type: String,
    
  },
  religion: {
    type: String,
  },
  language: {
    type: String,
  },
  experince:{
    type:String
  },
  catagory:{
    type:String
  },
  image:{
    type:String
  },
  heading:{
    type:String
  },
  adress:{
    type:String
  },
  maritialStatus:{
    type:String
  },
  timing:{
    type:String
  },
  service:{
    type:String
  },
  qualification:{
    type:String
  },
  skills:{
    type:String
  }


});
mongoose.model('Client', Client);
