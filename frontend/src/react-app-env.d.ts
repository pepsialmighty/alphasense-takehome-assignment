/// <reference types="react-scripts" />

interface IChannel {
  _id: string;
  _v: number;
  name: string;
  // messages: IMessage[];
  createdAt: string;
  updatedAt: string;
}

interface IMessage {
  id: string;
  channel: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
