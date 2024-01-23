import mongoose, { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IChannel extends Document {
  id: string;
  name: string;
}

const channelSchema = new Schema<IChannel>(
  {
    id: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Channel = model<IChannel>("Channel", channelSchema);
export default Channel;
