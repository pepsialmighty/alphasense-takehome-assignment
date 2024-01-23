import React, { useState } from "react";
import { socket } from "../utils/socket-io";

const AddNewChannelInput = () => {
  const [newChannelName, setNewChannelName] = useState("");

  const handleAddNewChannel = (newChannelName: string) => {
    socket.emit("createChannel", newChannelName);

    // Clear Channel Input
    setNewChannelName("");
  };

  return (
    <div className="addChannel">
      <div className="addChannelForm">
        <input
          type="text"
          placeholder="Add new channel"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
        />
        <button onClick={() => handleAddNewChannel(newChannelName)}>
          <img src="images/send.png" style={{ width: "70%" }} alt="" />
        </button>
      </div>
    </div>
  );
};

export default AddNewChannelInput;
