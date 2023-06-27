import React, { useState } from "react";
import Layout from "../components/layout/layout";
import SEO from "../components/layout/seo";
import GameHeader from "../components/layout/GameHeader";
import GameHome from "../components/sections/game/GameHome";
import GamePlay from "../components/sections/game/GamePlay";
import GameLobby from "../components/sections/game/GameLobby";
import GameResults from "../components/sections/game/GameResults";
import { UserContext } from "../providers/userContext";

function IndexPage() {
  const [isHost, setIsHost] = useState(false);
  const [stage, setStage] = useState("HOME");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [code, setCode] = useState("");
  const [opponent, setOpponent] = useState("");
  const [results, setResults] = useState();
  const [finalBoard, setFinalBoard] = useState();

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
            opponent={opponent}
            setOpponent={(e) => setOpponent(e)}
            gameStarted={isGameStarted}
            setGameStarted={(e) => setIsGameStarted(e)}
          />
        );
      case "GAME":
        return (
          <GamePlay
            context={context}
            isHost={isHost}
            code={code}
            setCode={(e) => setCode(e)}
            changeStage={(e) => onStageChange(e)}
            opponent={opponent}
            setOpponent={(e) => setOpponent(e)}
            gameStarted={isGameStarted}
            setResults={(e) => setResults(e)}
            setFinalBoard={(e) => setFinalBoard(e)}
          />
        );
      case "RESULTS":
        return (
          <GameResults
            changeStage={(e) => onStageChange(e)}
            setCode={(e) => setCode(e)}
            results={results}
            setResults={(e) => setResults(e)}
            finalBoard={finalBoard}
            setFinalBoard={(e) => setFinalBoard(e)}
            context={context}
            setOpponent={(e) => setOpponent(e)}
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
          <SEO title="tic-tac-toe" />
          <GameHeader />
          {getComponent(context)}
        </Layout>
      )}
    </UserContext.Consumer>
  );
}

export default IndexPage;
