import React from "react";

type MessageListProp = {
  messageContent: IMessage;
};

const Message = ({ messageContent }: MessageListProp) => {
  const createdDate = new Date(messageContent.createdAt);

  return (
    <div className="message">
      <div className="messageContent">
        <h4>{messageContent.message}</h4>
        <p>{`${createdDate.getDate()}.${
          createdDate.getMonth() + 1
        }.${createdDate.getFullYear()}`}</p>
      </div>
    </div>
  );
};

export default Message;
