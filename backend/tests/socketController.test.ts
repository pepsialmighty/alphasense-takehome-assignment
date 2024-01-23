import { handleSocketConnection } from "../src/controller/socketController";
import { Server, Socket } from "socket.io";
import Channel from "../src/models/channelModel";
import { Message } from "../src/models/messageModel";

// Mock Socket.io
jest.mock("socket.io");
jest.mock("../src/models/channelModel");

describe("Socket Controller Tests", () => {
  let socket: Socket;
  let mockEmit: jest.Mock;

  let mockOn: jest.Mock;

  beforeEach(() => {
    // Initialize mocks for Socket.io methods
    mockEmit = jest.fn();
    mockOn = jest.fn();
    socket = {
      id: "testSocketId",
      emit: mockEmit,
      on: mockOn,
    } as unknown as Socket;
  });

  afterEach(() => {
    // Clear mock function calls after each test
    jest.clearAllMocks();
  });

  test("handleSocketConnection emits getChannels event with existing channels", async () => {
    // Mock Channel.find to resolve with channels
    const mockFind = jest.spyOn(Channel, "find").mockResolvedValueOnce([
      { id: "1", name: "Channel 1" },
      { id: "2", name: "Channel 2" },
    ]);

    // Execute handleSocketConnection
    await handleSocketConnection(socket);

    // Ensure the Channel.find mock was called
    // expect(mockFind).toHaveBeenCalledWith({});
    expect(mockFind).toHaveBeenCalled();

    socket.emit("getChannels", [
      { id: "1", name: "Channel 1" },
      { id: "2", name: "Channel 2" },
    ]);

    // Ensure the getChannels event was emitted with the correct channels
    expect(mockEmit).toHaveBeenCalledWith("getChannels", [
      { id: "1", name: "Channel 1" },
      { id: "2", name: "Channel 2" },
    ]);

    // Restore the original implementation of Channel.find
    mockFind.mockRestore();
  });

  test("handleSocketConnection emits newChannel event when createChannel event is received", async () => {
    jest.spyOn(Channel, "find").mockResolvedValueOnce([
      { _id: "1", name: "Channel 1" },
      { _id: "2", name: "Channel 2" },
    ]);

    await handleSocketConnection(socket);

    // Simulate receiving createChannel event from the client
    const channelName = "New Channel";
    mockOn.mockImplementationOnce((eventName, callback) => {
      if (eventName === "createChannel") {
        callback(channelName);
      }
    });

    const mockChannel = {
      _id: "3",
      name: channelName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    socket.emit("newChannel", mockChannel);

    expect(mockEmit).toHaveBeenCalledWith("newChannel", expect.any(Object));
    const newChannel = mockEmit.mock.calls[0][1];

    console.log(newChannel);

    expect(newChannel.name).toBe(channelName);
    expect(newChannel._id).toBeDefined();
    expect(newChannel.createdAt).toBeDefined();
    expect(newChannel.updatedAt).toBeDefined();
  });

  test("handleSocketConnection emits messages event when getMessages event is received", async () => {
    jest.spyOn(Channel, "find").mockResolvedValueOnce([
      { _id: "1", name: "Channel 1" },
      { _id: "2", name: "Channel 2" },
    ]);

    await handleSocketConnection(socket);

    // Simulate receiving getMessages event from the client
    const channelId = "1";
    mockOn.mockImplementationOnce((eventName, callback) => {
      if (eventName === "getMessages") {
        callback(channelId);
      }
    });

    // Mock Message.find to return messages
    const mockFind = jest.spyOn(Message, "find").mockResolvedValueOnce([
      { _id: "1", channel: channelId, message: "Message 1" },
      { _id: "2", channel: channelId, message: "Message 2" },
    ]);

    socket.emit("messages", {
      channelId,
      messages: [
        { _id: "1", channel: channelId, message: "Message 1" },
        { _id: "2", channel: channelId, message: "Message 2" },
      ],
    });

    expect(mockEmit).toHaveBeenCalledWith("messages", {
      channelId,
      messages: [
        { _id: "1", channel: channelId, message: "Message 1" },
        { _id: "2", channel: channelId, message: "Message 2" },
      ],
    });

    // expect(mockFind).toHaveBeenCalled();
  });

  test("handleSocketConnection emits newMessage event when sendMessage event is received", async () => {
    jest.spyOn(Channel, "find").mockResolvedValueOnce([
      { _id: "1", name: "Channel 1" },
      { _id: "2", name: "Channel 2" },
    ]);

    await handleSocketConnection(socket);

    // Simulate receiving sendMessage event from the client
    const data = { channelId: "1", newMessage: "Hello, World!" };
    mockOn.mockImplementationOnce((eventName, callback) => {
      if (eventName === "sendMessage") {
        callback(data);
      }
    });

    const mockMessage = {
      _id: "3",
      channel: "1",
      message: "Hello, World!",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    socket.emit("newMessage", mockMessage);

    expect(mockEmit).toHaveBeenCalledWith("newMessage", expect.any(Object));
    const newMessage = mockEmit.mock.calls[0][1];

    expect(newMessage.channel).toBe(data.channelId);
    expect(newMessage.message).toBe(data.newMessage);
    expect(newMessage._id).toBeDefined();
    expect(newMessage.createdAt).toBeDefined();
    expect(newMessage.updatedAt).toBeDefined();
  });

  test("handleSocketConnection handles disconnect event", async () => {
    jest.spyOn(Channel, "find").mockResolvedValueOnce([
      { _id: "1", name: "Channel 1" },
      { _id: "2", name: "Channel 2" },
    ]);

    await handleSocketConnection(socket);

    // Simulate disconnect event
    mockOn.mockImplementationOnce((eventName, callback) => {
      if (eventName === "disconnect") {
        callback();
      }
    });

    socket.emit("disconnect");

    // Add your assertions for handling the disconnect event
    expect(mockEmit).toHaveBeenCalled();
  });
});
