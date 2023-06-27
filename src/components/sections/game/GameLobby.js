import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { BodyMain, H2 } from "../../styles/TextStyles";
import ReusableButton from "../../buttons/ReusableButton";
import StatusAlert from "../../alerts/StatusAlert";
import DefaultSpinner from "../../spinners/DefaultSpinner";
import socketService from "../../../service/SocketService";
import GameService from "../../../service/GameService";
import TicTacToeService from "../../../service/TicTacToeService";
import Board from "../../Board";
export default function GameLobby(props) {
  const {
    context,
    isHost,
    changeStage,
    code,
    opponent,
    setOpponent,
    gameStarted,
    setGameStarted,
  } = props;
  const { name, setName, symbol, setSymbol } = context;

  const emptyAlert = {
    visible: false,
    status: "",
    title: "",
    subtitle: "",
    key: 0,
  };
  const [alert, setAlert] = useState(emptyAlert);

  function displayAlert() {
    return (
      <StatusAlert
        status={alert.status}
        title={alert.title}
        subtitle={alert.subtitle}
        key={alert.key}
      />
    );
  }

  const userList = () => {
    if (opponent.length > 0) {
      return (
        <LoadingWrapper>
          <TextWrapper>Your Opponent Is:</TextWrapper>
          <TextWrapper>{opponent}</TextWrapper>
        </LoadingWrapper>
      );
    } else {
      return (
        <LoadingWrapper>
          <TextWrapper>Waiting on an opponent</TextWrapper>
          <DefaultSpinner isDark={true} />
        </LoadingWrapper>
      );
    }
  };

  const returnInstructions = () => {
    return (
      <InstructionsWrapper>
        <Instructions>Share this code with your party</Instructions>
        <Code>{code}</Code>
      </InstructionsWrapper>
    );
  };

  const showAdminContols = () => {
    if (isHost === true) {
      return (
        <ButtonWrapper>
          <ReusableButton
            title="Click to start game"
            color="#073349"
            width="300px"
            borderRadius="20px"
            onClick={() => handleStartGame()}
          />
        </ButtonWrapper>
      );
    } else {
      return (
        <LoadingWrapper>
          <TextWrapper>Waiting for host to start the game</TextWrapper>
          <DefaultSpinner isDark={true} />
        </LoadingWrapper>
      );
    }
  };

  useEffect(() => {
    handleUserJoined();
    handleUpdatedOpponent();
    handleGameStarted();
  }, []);

  const handleUserJoined = () => {
    if (socketService.socket) {
      GameService.onUserJoined(socketService.socket, (opponentName) => {
        setOpponent(opponentName);
        if (isHost) {
          GameService.updateOpponent(socketService.socket, name);
        }
      });
    }
  };

  const handleUpdatedOpponent = () => {
    if (socketService.socket) {
      GameService.onUpdatedOpponent(socketService.socket, (opponent) => {
        setOpponent(opponent);
      });
    }
  };

  const handleStartGame = async () => {
    if (opponent == "") {
      setAlert({
        visible: true,
        status: "Error",
        title: "Error",
        subtitle: "You must wait for an opponent",
        key: Math.random(),
      });
    } else {
      if (socketService.socket) {
        const gameData = {
          code: code,
          user1: {
            name: name,
            character: "X",
            turn: true,
          },
          user2: {
            name: opponent,
            character: "O",
            turn: false,
          },
        };
        let res = await TicTacToeService.createGame(gameData);
        if (res.status == 200) {
          GameService.startGame(socketService.socket, gameData);
          setGameStarted(true);
          changeStage("GAME");
        } else {
          setAlert({
            visible: true,
            status: "Error",
            title: "Error",
            subtitle: "Error creating game",
            key: Math.random(),
          });
        }
      }
    }
  };

  const handleGameStarted = () => {
    if (socketService.socket) {
      GameService.onGameStarted(socketService.socket, () => {
        changeStage("GAME");
      });
    }
  };

  return (
    <Wrapper>
      {alert.visible ? displayAlert() : ""}
      <ContentWrapper>
        <TopWrapper>
          {userList()}
          <BoardWrapper>
            <Board
              board={[
                [null, null, null],
                [null, null, null],
                [null, null, null],
              ]}
            ></Board>
          </BoardWrapper>
        </TopWrapper>
        {opponent == "" ? returnInstructions() : <EmptyWrapper></EmptyWrapper>}
        {showAdminContols()}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 200px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TextWrapper = styled(BodyMain)``;

const ContentWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-rows: 400px auto auto auto;
  gap: 20px;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const BoardWrapper = styled.div`
  display: grid;
  gap: 20px;
  margin: 50px;
  width: 500px;
  height: 300px;
  justify-items: center;
`;

const ButtonWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const Code = styled(H2)`
  color: black;
  text-align: center;
`;

const Instructions = styled(BodyMain)`
  color: #757575;
  font-size: "24px";
  text-align: center;
  padding-top: 50px;
`;

const EmptyWrapper = styled.div`
  padding-top: 30px;
`;

const InstructionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
