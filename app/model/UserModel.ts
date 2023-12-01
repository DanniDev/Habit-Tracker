import mongoose from "mongoose";
import { userType } from "../types/user.model";

const Schema = mongoose.Schema;

const userSchema = new Schema<userType>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passwordReset: {
    verifyToken: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
  },
  emailVerify: {
    verifyToken: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
  },
});

export default mongoose.models.Users || mongoose.model("Users", userSchema);
