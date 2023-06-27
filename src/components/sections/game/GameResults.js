import React from "react";
import styled from "styled-components";
import { BodyMain, H1, H2 } from "../../styles/TextStyles";
import { useState, useEffect } from "react";
import ReusableButton from "../../buttons/ReusableButton";
import DefaultSpinner from "../../spinners/DefaultSpinner";
import socketService from "../../../service/SocketService";
import GameService from "../../../service/GameService";
import Board from "../../Board";
import TicTacToeService from "../../../service/TicTacToeService";
export default function IcebreakerResults(props) {
  const {
    changeStage,
    setCode,
    results,
    setResults,
    finalBoard,
    setFinalBoard,
    context,
    setOpponent,
  } = props;

  const [leaderboard, setLeaderboard] = useState([]);

  const showLeaderboard = () => {
    if (leaderboard.length > 0) {
      return (
        <ListWrapper>
          {leaderboard.map((item, index) => (
            <ListRow key={index}>
              <TextWrapper>{item[0]}:</TextWrapper>
              <TextWrapper>{item[1]}</TextWrapper>
            </ListRow>
          ))}
        </ListWrapper>
      );
    } else {
      return <DefaultSpinner isDark={true} />;
    }
  };

  const handleEnd = () => {
    if (socketService.socket) {
      GameService.handleEndSession(socketService.socket);
      setCode("");
      setResults();
      setOpponent("");
      setFinalBoard([null, null, null], [null, null, null], [null, null, null]);
      changeStage("HOME");
    }
  };

  const handleSessionEnded = () => {
    if (socketService.socket) {
      GameService.onSessionEnded(socketService.socket, () => {
        setCode("");
        setResults();
        setOpponent("");
        setFinalBoard(
          [null, null, null],
          [null, null, null],
          [null, null, null]
        );
        changeStage("HOME");
      });
    }
  };

  const showResults = () => {
    if (results != null) {
      if (results == true) {
        return "You win!";
      } else return "You lost...";
    } else return "Tie game!";
  };

  useEffect(() => {
    handleSessionEnded();
    let isMounted = true;
    TicTacToeService.getLeaderboard().then((response) => {
      if (isMounted) {
        setLeaderboard(response);
      }
    });
  }, []);

  return (
    <Wrapper>
      <ContentWrapper>
        <ResultsWrapper>
          <Results>{showResults()}</Results>
        </ResultsWrapper>
        <TopWrapper>
          <Board board={finalBoard} context={context} />
          <LeaderboardWrapper>
            <LeaderboardTitleWrapper>
              <LeaderboardTitle>Leaderboard</LeaderboardTitle>
            </LeaderboardTitleWrapper>
            {showLeaderboard()}
          </LeaderboardWrapper>
        </TopWrapper>
        <BottomWrapper>
          <ReusableButton
            title="End Session"
            width="150px"
            borderRadius="20px"
            onClick={() => handleEnd()}
            color="#073349"
          />
        </BottomWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 1000px;
  top: 200px;
  bottom: 100px;
`;

const TextWrapper = styled(BodyMain)`
  color: #073349;
`;

const LeaderboardTitleWrapper = styled.div`
  text-align: center;
`;

const LeaderboardTitle = styled(H2)`
  font-size: 24px;
  color: #073349;
`;

const ContentWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-rows: auto 325px;
  gap: 75px;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const LeaderboardWrapper = styled.div`
  display: grid;
  height: 100%;

  gap: 50px;
  width: 100%;
  justify-content: center;
  align-content: start;
`;

const ListWrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 10px;
`;

const ListRow = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  gap: 20px;
`;

const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 100px;
  width: 550px;
  height: 325px;
  max-height: 325px;
  justify-content: center;
  align-items: center;
`;

const ResultsWrapper = styled.div`
  display: grid;
  text-align: center;
`;

const Results = styled(H1)`
  font-size: 64px;
  color: #073349;
`;
