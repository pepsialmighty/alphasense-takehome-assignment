import React, { useState, createContext } from "react";

const useValue = () => {
  const [selectedChannelContext, setSelectedChannelContext] = useState<
    IChannel | undefined
  >(undefined);

  const [messagesContext, setMessagesContext] = useState<IMessage[]>([]);
  const [isOptimistic, setIsOptimistic] = useState(false);

  return {
    selectedChannelContext,
    setSelectedChannelContext,
    messagesContext,
    setMessagesContext,
    isOptimistic,
    setIsOptimistic,
  };
};

export const MyContext = createContext({} as ReturnType<typeof useValue>);
