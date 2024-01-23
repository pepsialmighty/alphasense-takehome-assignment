// MyContextMockProvider.tsx
import React, { ReactNode } from "react";
import { MyContext } from "../MyContext";

interface MyContextMockProviderProps {
  children: ReactNode;
  initialSelectedChannel?: IChannel;
  initialMessages: IMessage[];
  initialIsOptimistic: boolean;
}

export const MyContextMockProvider: React.FC<MyContextMockProviderProps> = ({
  children,
  initialSelectedChannel,
  initialMessages,
  initialIsOptimistic,
}) => {
  return (
    <MyContext.Provider
      value={{
        selectedChannelContext: initialSelectedChannel,
        setSelectedChannelContext: jest.fn(),
        messagesContext: initialMessages,
        setMessagesContext: jest.fn(),
        isOptimistic: initialIsOptimistic,
        setIsOptimistic: jest.fn(),
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
