import React from "react";

const defaultState = {
  isInRoom: false,
  setIsInRoom: () => {},
  playerName: "",
  setPlayerName: () => {},
  isHost: false,
  setIsHost: () => {},
};

export default React.createContext(defaultState);
