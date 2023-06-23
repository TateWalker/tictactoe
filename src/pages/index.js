import React, { useState } from "react";
import Layout from "../components/layout/layout";
import SEO from "../components/layout/seo";
import GameHeader from "../components/layout/GameHeader";
import GameHome from "../components/sections/icebreaker/GameHome";
import GamePlay from "../components/sections/icebreaker/GamePlay";
import GameLobby from "../components/sections/icebreaker/GameLobby";
import GameResults from "../components/sections/icebreaker/GameResults";
import { UserContext } from "../providers/userContext";
import { GameContext } from "../providers/gameContext";

function IndexPage() {
  const [isHost, setIsHost] = useState(false);
  const [stage, setStage] = useState("HOME");
  const [isInRoom, setIsInRoom] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [code, setCode] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);

  const onStageChange = (newStage) => {
    setStage(newStage);
  };
  const getComponent = (context) => {
    switch (stage) {
      case "HOME":
        return (
          <GameHome
            context={context}
            changeStage={(e) => onStageChange(e)}
            setIsHost={(e) => setIsHost(e)}
            setCode={(e) => setCode(e)}
            code={code}
          />
        );
      case "LOBBY":
        return (
          <GameLobby
            context={context}
            isHost={isHost}
            changeStage={(e) => onStageChange(e)}
            code={code}
          />
        );
      case "GAME":
        return (
          <GamePlay
            context={context}
            isHost={isHost}
            code={code}
            setCode={setCode}
            changeStage={(e) => onStageChange(e)}
          />
        );
      case "RESULTS":
        return (
          <GameResults
            isHost={isHost}
            changeStage={(e) => onStageChange(e)}
            code={code}
            setCode={setCode}
          />
        );
      default:
        return <GameHome />;
    }
  };

  return (
    <UserContext.Consumer>
      {(context) => (
        <Layout>
          <SEO title="icebreaker" />
          <GameHeader />
          {getComponent(context)}
        </Layout>
      )}
    </UserContext.Consumer>
  );
}

export default IndexPage;
