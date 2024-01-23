import { Socket } from "socket.io";
import Channel from "../models/channelModel";
import { Message } from "../models/messageModel";
import { io } from "..";

export const handleSocketConnection = (socket: Socket) => {
  console.log("User connected", socket.id);

  // Emit existing channels to the new user
  Channel.find().then((channels) => {
    io.emit("getChannels", channels);
  });

  // Listen for new channel creation
  socket.on("createChannel", (channelName: string) => {
    const newChannel = new Channel({ name: channelName });
    newChannel.save().then(() => {
      io.emit("newChannel", newChannel);
    });
  });

  // Listen for messages and broadcast them to the channel
  socket.on(
    "sendMessage",
    (data: { channelId: string; newMessage: string }) => {
      const newMessage = new Message({
        channel: data.channelId,
        message: data.newMessage,
      });
      newMessage.save().then(() => {
        io.emit("newMessage", newMessage);
      });
    }
  );

  // Listen for a request to get messages for a channel
  socket.on("getMessages", (channelId: string) => {
    Message.find({ channel: channelId }).then((messages) => {
      io.emit("messages", { channelId, messages });
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};
