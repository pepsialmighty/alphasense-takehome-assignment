import React, { useContext } from "react";
import { MyContext } from "../../MyContext";
import { socket } from "../../utils/socket-io";

type ChannelCardProp = {
  channelContent: IChannel;
};

const ChannelCard = ({ channelContent }: ChannelCardProp) => {
  const createdDate = new Date(channelContent.createdAt);

  const { setSelectedChannelContext } = useContext(MyContext);

  const handleSelectedChannel = () => {
    setSelectedChannelContext(channelContent);
    socket.emit("getMessages", channelContent._id);
  };

  return (
    <div className="channelCard" onClick={handleSelectedChannel}>
      <div className="channelCardInfo">
        <span>{channelContent.name.toUpperCase()}</span>
        <p>
          Created at:{" "}
          {`${createdDate.getDate()}.${
            createdDate.getMonth() + 1
          }.${createdDate.getFullYear()}`}
        </p>
      </div>
    </div>
  );
};

export default ChannelCard;
