import React, { useState, useEffect } from "react";
import axios from "axios";

import ChannelCard from "./ChannelCard";

type ChannelListProps = {
  channels: IChannel[];
};

const ChannelList = ({ channels }: ChannelListProps) => {
  return (
    <div className="channels">
      {channels ? (
        channels.map((channel, i) => (
          <ChannelCard key={channel._id} channelContent={channel} />
        ))
      ) : (
        <h1>Channel Not Found</h1>
      )}
    </div>
  );
};

export default ChannelList;
