import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ReusableButton from "../../buttons/ReusableButton";
import Board from "../../Board";
import TicTacToeService from "../../../service/TicTacToeService";
import socketService from "../../../service/SocketService";
import GameService from "../../../service/GameService";

export default function GamePlay(props) {
  const {
    context,
    isHost,
    code,
    setCode,
    changeStage,
    opponent,
    setOpponent,
    gameStarted,
    setResults,
    setFinalBoard,
  } = props;
  const { name, symbol } = context;
  const [turn, setTurn] = useState(false);
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const handleEndSession = () => {
    if (socketService.socket) {
      GameService.handleEndSession(socketService.socket);
      setCode("");
      setResults();
      setOpponent("");
      setFinalBoard([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
      changeStage("HOME");
    }
  };
  const handleSessionEnded = () => {
    if (socketService.socket) {
      GameService.onSessionEnded(socketService.socket, () => {
        setCode("");
        setResults();
        setOpponent("");
        setFinalBoard([
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]);
        changeStage("HOME");
      });
    }
  };

  const playTurn = async (row, column) => {
    updateMatrix(row, column, symbol);
    if (socketService.socket) {
      GameService.playTurn(socketService.socket, board, name);
    }
    const userObj = {
      name: name,
      turn: false,
      character: symbol,
    };
    const opponentObj = {
      name: opponent,
      turn: true,
      character: symbol == "X" ? "O" : "X",
    };

    await TicTacToeService.updateGame(code, board, userObj, opponentObj);
  };

  const checkGameWon = () => {
    for (let i = 0; i < board.length; i++) {
      let row = [];
      for (let j = 0; j < board[i].length; j++) {
        row.push(board[i][j]);
      }

      if (row.every((value) => value && value === symbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== symbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < board.length; i++) {
      let column = [];
      for (let j = 0; j < board[i].length; j++) {
        column.push(board[j][i]);
      }

      if (column.every((value) => value && value === symbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== symbol)) {
        return [false, true];
      }
    }

    if (board[1][1]) {
      if (board[0][0] === board[1][1] && board[2][2] === board[1][1]) {
        if (board[1][1] === symbol) return [true, false];
        else return [false, true];
      }

      if (board[2][0] === board[1][1] && board[0][2] === board[1][1]) {
        if (board[1][1] === symbol) return [true, false];
        else return [false, true];
      }
    }

    if (board.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };

  const onTurnPlayed = () => {
    if (socketService.socket) {
      GameService.onTurnPlayed(socketService.socket, (response) => {
        setBoard(response.board);
        setTurn(true);
      });
    }
  };

  const updateMatrix = (column, row, symbol) => {
    const newBoard = [...board];
    if (newBoard[row][column] === null || newBoard[row][column] === "null") {
      newBoard[row][column] = symbol;
      setBoard(newBoard);
    }

    if (socketService.socket) {
      GameService.updateGame(socketService.socket, newBoard);
      const [gameWon, otherPlayerWon] = checkGameWon(newBoard);
      if (gameWon && otherPlayerWon) {
        TicTacToeService.updateGame(code, null);
        handleEndRound(null);
      } else if (gameWon && !otherPlayerWon) {
        TicTacToeService.finishGame(code, symbol);
        handleEndRound(true);
      }
      setTurn(false);
    }
  };

  const handleEndRound = (results) => {
    if (socketService.socket) {
      setResults(results);
      GameService.handleEndRound(socketService.socket, results, board);
      setFinalBoard(board);
      changeStage("RESULTS");
    }
  };

  const onRoundEnded = () => {
    if (socketService.socket) {
      GameService.onRoundEnded(socketService.socket, (results, hostBoard) => {
        setResults(results);
        setFinalBoard(hostBoard);
        changeStage("RESULTS");
      });
    }
  };

  const onGameStart = () => {
    isHost && gameStarted ? setTurn(true) : setTurn(false);
  };

  useEffect(() => {
    onGameStart();
    onTurnPlayed();
    handleSessionEnded();
    onRoundEnded();
  }, []);

  useEffect(() => {
    checkGameWon();
  }, [board]);

  const hostButtons = () => {
    return (
      <HostButtonWrapper>
        <ReusableButton
          title="Quit Game"
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
          <Board
            context={context}
            playTurn={playTurn}
            onTurnPlayed={onTurnPlayed}
            turn={turn}
            setTurn={(e) => setTurn(e)}
            gameStarted={gameStarted}
            board={board}
          />
        </TopWrapper>
        <AnswerText>
          {turn == true ? "Your turn!" : `${opponent}'s turn!`}
        </AnswerText>
        {hostButtons()}
      </ContentWrapper>
    </Wrapper>
  );
}

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
`;

const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: 550px;
  gap: 50px;
  height: 325px;
  max-height: 325px;
  justify-content: center;
  align-items: center;
`;

const HostButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  justify-content: center;
  align-content: center;
`;

const AnswerText = styled.div`
  display: grid;
  text-align: center;
`;
