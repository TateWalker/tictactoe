import React from "react";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { BodyMain, H2, H3 } from "../../styles/TextStyles";
import ReusableButton from "../../buttons/ReusableButton";
import Board from "../../Board";
import TicTacToeService from "../../../service/TicTacToeService";
import socketService from "../../../service/SocketService";
import GameService from "../../../service/GameService";
export default function GamePlay(props) {
  const { context, isHost, code, setCode, changeStage } = props;
  const { name, symbol } = context;
  const [turn, setTurn] = useState();
  const [board, setBoard] = useState(); //move this to the board class

  const handleEndSession = () => {
    if (socketService.socket) {
      GameService.handleEndSession(socketService.socket);
      setCode("");
      changeStage("HOME");
    }
  };
  const handleSessionEnded = () => {
    if (socketService.socket) {
      GameService.onSessionEnded(socketService.socket, () => {
        setCode("");
        changeStage("HOME");
      });
    }
  };

  const playTurn = () => {
    const board = [[null]];
    if (socketService.socket) {
      GameService.playTurn(socketService.socket, turn, name);
      setBoard(board);
    }
  };

  const onTurnPlayed = () => {
    if (socketService.socket) {
      GameService.onTurnPlayed(socketService.socket, (board) => {
        console.log(board); //t8 do this
      });
    }
  };

  const handleEndRound = () => {
    if (socketService.socket) {
      GameService.handleEndRound(socketService.socket, board);
      changeStage("RESULTS");
    }
  };

  const onRoundEnded = () => {
    if (socketService.socket) {
      GameService.onRoundEnded(socketService.socket, (board) => {
        setBoard(board);
        changeStage("RESULTS");
      });
    }
  };

  useEffect(() => {
    onTurnPlayed();
    handleSessionEnded();
    onRoundEnded();
  }, []);

  const hostButtons = () => {
    return (
      <HostButtonWrapper>
        <ReusableButton
          title="End Round"
          width="150px"
          borderRadius="20px"
          onClick={() => handleEndRound()}
          color="#1282d4"
        />
        <ReusableButton
          title="End Session"
          width="150px"
          borderRadius="20px"
          onClick={() => handleEndSession()}
          color="#4048C5"
        />
      </HostButtonWrapper>
    );
  };

  return (
    <Wrapper>
      <ContentWrapper isHost={isHost}>
        <TopWrapper>
          <Board context={context} />
        </TopWrapper>
        <AnswerText>Your turn!</AnswerText>
        {isHost === true ? hostButtons() : <></>}
      </ContentWrapper>
    </Wrapper>
  );
}

const animation = keyframes`
  0% {opacity: 0;}
  20% {opacity: 1;}
  80% {opacity: 1;}
  100% {opacity: 0;} 
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 200px;
`;

const ContentWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-rows: ${(props) =>
    props.isHost ? "325px auto auto" : "325px auto"};
  gap: 75px;
  @media (max-width: 450px) {
    display: inline;
  }
`;

const DropdownWrapper = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: auto auto auto;
  gap: 30px;
  align-items: center;
`;

const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: 550px;
  gap: 50px;
  height: 325px;
  max-height: 325px;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
    vertical-align: middle;
    margin: 0;
    padding: 0 30px;
    max-width: none;
  }
  .item {
    opacity: 0.2;
    transition-duration: 5s ease;
  }
  .item-active {
    transition-duration: 3s;
    transform: scale(1.08);
    animation: ${animation} 7.5s forwards;
  }
`;

const BottomWrapper = styled.div`
  display: grid;
  grid-template-columns: 325px auto;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: grid;
  align-self: center;
  justify-self: center;
`;

const HostButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  justify-content: center;
  align-content: center;
`;

const TextWrapper = styled.div`
  display: grid;
  text-align: end;
`;

const AnswerText = styled.div`
  display: grid;
  text-align: center;
`;
