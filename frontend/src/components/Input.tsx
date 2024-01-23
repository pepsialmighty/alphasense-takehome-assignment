import React, { useState, useEffect, useContext } from "react";
import { socket } from "../utils/socket-io";
import { MyContext } from "../MyContext";

type InputProps = {
  selectedChannelId: string;
};

const Input = ({ selectedChannelId }: InputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const { setMessagesContext, setIsOptimistic } = useContext(MyContext);

  useEffect(() => {
    setNewMessage("");
  }, [selectedChannelId]);

  const handleSubmitMessage = async (channelId: string, newMessage: string) => {
    if (newMessage.trim() !== "") {
      const futureNewMessage: IMessage = {
        id: "",
        channel: channelId,
        message: newMessage,
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
      };
      setIsOptimistic(true);
      setMessagesContext((prevMessages) => [...prevMessages, futureNewMessage]);

      socket.emit("sendMessage", { channelId, newMessage });
      // Clear Input
      setNewMessage("");
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <div className="send">
        <img src="images/attach.png" alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src="images/img.png" alt="" />
        </label>
        <button
          onClick={() => handleSubmitMessage(selectedChannelId, newMessage)}
          disabled={newMessage === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
