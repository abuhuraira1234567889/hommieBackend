import mongoose, { Schema, model } from 'mongoose';
interface singIn {
  name: string;
  email: string;
  password: string;
  Email: any;
  Password: any;
  WalletAddress: any;
  isAdmin: any;
  Name: any;
  PhoneNo: any;
  image: any;
  cnicFront: any;
  cnicBack: any;
  cnic: any;
  isUpdated: any;
  isWorker: any;
}
const singInScheme = new mongoose.Schema<singIn>({
  Name: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PhoneNo: {
    type: Number,
   default: 0,
  },
  isWorker: {
    type: Boolean,
    default: false,
  },
  
  isAdmin: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: '',
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
  cnic:{
    type: String,
    default: '',
  }

});
mongoose.model('login', singInScheme);
