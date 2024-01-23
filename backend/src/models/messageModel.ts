import mongoose, { Model, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IMessage {
  id: string;
  channel: string;
  message: string;
}

export const messageSchema = new Schema<IMessage>(
  {
    id: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    channel: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage>("Message", messageSchema);
