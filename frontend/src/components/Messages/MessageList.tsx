import React, { useEffect, useRef } from "react";
import Message from "./Message";

type MessageListProp = {
  messageList: IMessage[];
};

const MessageList = ({ messageList }: MessageListProp) => {
  const messagesEnd = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const node = messagesEnd.current;
    node?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className="messages">
      {messageList.length > 0 &&
        messageList.map((msg) => (
          <Message key={msg.createdAt} messageContent={msg} />
        ))}
      <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
    </div>
  );
};

export default MessageList;
