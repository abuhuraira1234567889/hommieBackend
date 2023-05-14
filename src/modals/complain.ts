import mongoose from "mongoose";
interface complainInterface {
    userId: string;
    message: string;
    response: string;
    closeComplain: any;
   
  }

const complain = new mongoose.Schema<complainInterface>({
    userId: {
        type: String,
    },
    message:{
        type:String,
        required:true
    },
    response:{
        type:String,
        default:""

    },
    closeComplain:{
        type:Boolean,
        default:false
    },

})
export default mongoose.model("Complain", complain);