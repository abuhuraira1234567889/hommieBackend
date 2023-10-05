import mongoose, { Schema, model } from "mongoose";
interface request {
  userId: string;
  postId: string;

  clientId: string;

  isApproved: boolean;
}
const RequestScheme = new mongoose.Schema<request>({
  userId: {
    type: String,
  },
  postId: {
    type: String,
  },
  clientId: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});
mongoose.model("Request", RequestScheme);
