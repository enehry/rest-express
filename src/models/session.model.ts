import bcrypt from "bcrypt";
import config from 'config';
import mongoose from "mongoose";
import { UserDocument } from "./user.model";


export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
};

const SessionSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    valid: {type: Boolean, default: true},
    userAgent: {type: String, required: true},
  },
  {
    timestamps: true,
  });

  
  const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema);  

  export default SessionModel;

