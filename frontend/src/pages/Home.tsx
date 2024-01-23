import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import AddNewChannelInput from "../components/AddNewChannelInput";
import ChannelList from "../components/Channels/ChannelList";

import { MyContext } from "../MyContext";
import MessageList from "../components/Messages/MessageList";
import Input from "../components/Input";
import { socket } from "../utils/socket-io";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

const Home = () => {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [isAddNewChannel, setIsAddNewChannel] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const {
    selectedChannelContext,
    messagesContext,
    setMessagesContext,
    isOptimistic,
    setIsOptimistic,
  } = useContext(MyContext);

  const allChannels = useLiveQuery(() => db.channelList.toArray(), []);

  useEffect(() => {
    const fetchDataAndAddToDb = async () => {
      try {
        // Check if data already exists in the database
        const existingData = await db.channelList.toArray();
        const newData = channels.filter(
          (item) =>
            !existingData.some((existingItem) => existingItem._id === item._id)
        );

        // Add only the new data to the database
        if (newData.length > 0) {
          await db.channelList.bulkAdd(newData);
        }
      } catch (error) {
        console.error("Error fetching or adding data:", error);
      }
    };

    fetchDataAndAddToDb();
  }, [channels]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    // Listen for updated list of channels and update the state
    socket.on("getChannels", (data: IChannel[]) => {
      setChannels(data);
    });

    socket.on("newChannel", (data: IChannel) => {
      setChannels((prevChannels) => [...prevChannels, data]);
    });

    // Listen for new messages and update the state
    socket.on("newMessage", (data: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setIsOptimistic(false);
    });

    // Listen for messages of the selected channel and update the state
    socket.on(
      "messages",
      (data: { channelId: string; messages: IMessage[] }) => {
        setMessages(data.messages);
      }
    );

    return () => {
      socket.off("getChannels");
      socket.off("newChannel");
      socket.off("newMessage");
      socket.off("messages");
    };
  }, []);

  const handleAddChannel = () => {
    setIsAddNewChannel(!isAddNewChannel);
  };

  useEffect(() => {
    setMessagesContext(messages);
  }, [messages]);

  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar handleAddChannel={handleAddChannel} />
          {isAddNewChannel ? <AddNewChannelInput /> : ""}
          <ChannelList
            channels={
              channels.length === 0 && allChannels ? allChannels : channels
            }
          />
        </div>
        <div className="channel">
          {selectedChannelContext ? (
            <>
              <div className="channelTitle">
                <h1>{selectedChannelContext.name.toUpperCase()}</h1>
              </div>
              <MessageList
                messageList={isOptimistic ? messagesContext : messages}
              />
              <Input selectedChannelId={selectedChannelContext._id} />
            </>
          ) : (
            <>
              <div className="channelTitle">
                <h1>Welcome on board</h1>
              </div>
              <div className="no-message">
                <h1>Please choose a channel to start</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
