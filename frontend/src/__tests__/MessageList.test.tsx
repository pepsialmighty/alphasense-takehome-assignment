import React from "react";
import { render, screen } from "@testing-library/react";
import MessageList from "../components/Messages/MessageList";

test("renders a list of messages", () => {
  const messages: IMessage[] = [
    {
      id: "1",
      message: "Hello 1",
      channel: "1",
      createdAt: String(new Date()),
      updatedAt: String(new Date()),
    },
    {
      id: "2",
      message: "Hello 2",
      channel: "1",
      createdAt: String(new Date()),
      updatedAt: String(new Date()),
    },
    {
      id: "3",
      message: "Hello 3",
      channel: "1",
      createdAt: String(new Date()),
      updatedAt: String(new Date()),
    },
  ];
  render(<MessageList messageList={messages} />);
  const messageElements = messages.map((message) =>
    screen.getByText(new RegExp(message.message, "i"))
  );
  expect(messageElements).toHaveLength(messages.length);
});
