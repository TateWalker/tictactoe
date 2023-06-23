import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("x");
  const providerValue = {
    name,
    setName,
    symbol,
    setSymbol,
  };
  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default ({ element }) => <UserProvider>{element}</UserProvider>;
