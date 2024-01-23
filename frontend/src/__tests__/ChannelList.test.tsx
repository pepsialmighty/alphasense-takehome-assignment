import React from "react";
import { render, screen } from "@testing-library/react";
import ChannelList from "../components/Channels/ChannelList";

const channels: IChannel[] = [
  {
    _id: "1",
    name: "Channel 1",
    _v: 0,
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
  },
  {
    _id: "2",
    name: "Channel 2",
    _v: 0,
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
  },
  {
    _id: "3",
    name: "Channel 3",
    _v: 0,
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
  },
];
test("renders a list of channels", () => {
  render(<ChannelList channels={channels} />);
  const channelElements = channels.map((channel) =>
    screen.getByText(new RegExp(channel.name.toUpperCase(), "i"))
  );
  expect(channelElements).toHaveLength(channels.length);
});
