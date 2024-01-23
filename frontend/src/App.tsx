import React, { useState } from "react";
import "./styles.scss";
import Home from "./pages/Home";
import { MyContext } from "./MyContext";

function App() {
  const [selectedChannelContext, setSelectedChannelContext] = useState<
    IChannel | undefined
  >(undefined);

  const [messagesContext, setMessagesContext] = useState<IMessage[]>([]);
  const [isOptimistic, setIsOptimistic] = useState(false);

  return (
    <div className="App">
      <MyContext.Provider
        value={{
          selectedChannelContext,
          setSelectedChannelContext,
          messagesContext,
          setMessagesContext,
          isOptimistic,
          setIsOptimistic,
        }}
      >
        <Home />
      </MyContext.Provider>
    </div>
  );
}

export default App;
