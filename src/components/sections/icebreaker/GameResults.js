import React from "react";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import ReusableButton from "../../buttons/ReusableButton";
import IcebreakerCard from "../../cards/IcebreakerCard";
import DefaultSpinner from "../../spinners/DefaultSpinner";
import { ColorData } from "../../../data/colorData";
import socketService from "../../../service/SocketService";
import GameService from "../../../service/GameService";
import IcebreakerService from "../../../service/IcebreakerService";
export default function IcebreakerResults(props) {
  const {
    icebreaker,
    isHost,
    changeStage,
    allAnswers,
    setAllAnswers,
    code,
    setCode,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    setIcebreaker,
  } = props;

  const userList = () => {
    if (allAnswers.length > 0) {
      return (
        <ListWrapper>
          {allAnswers.map((item, index) => (
            <ListRow key={index}>
              <TextWrapper>
                {item.firstName} {item.lastName}:
              </TextWrapper>
              <TextWrapper>{item.answer}</TextWrapper>
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
      setAllAnswers([]);
      setSelectedCategory();
      setSelectedSubCategory();
      setIcebreaker([]);
      changeStage("HOME");
    }
  };

  const handleNewRound = async () => {
    if (socketService.socket) {
      let newIcebreaker;
      if (selectedCategory) {
        newIcebreaker = await IcebreakerService.getIcebreakerByCatSubCat(
          selectedCategory,
          selectedSubCategory
        );
      } else {
        newIcebreaker = await IcebreakerService.getRandomIcebreaker();
      }
      setIcebreaker(newIcebreaker);
      GameService.handleNewRound(socketService.socket, newIcebreaker);
      setAllAnswers([]);
      changeStage("GAME");
    }
  };

  const handleOnNewRound = () => {
    if (socketService.socket) {
      GameService.onNewRound(socketService.socket, (newIcebreaker) => {
        setIcebreaker(newIcebreaker);
        setAllAnswers([]);
        changeStage("GAME");
      });
    }
  };

  const handleSessionEnded = () => {
    if (socketService.socket) {
      GameService.onSessionEnded(socketService.socket, () => {
        setCode("");
        setAllAnswers([]);
        setIcebreaker([]);
        changeStage("HOME");
      });
    }
  };

  useEffect(() => {
    handleOnNewRound();
    handleSessionEnded();
  }, []);

  const hostButtons = () => {
    return (
      <HostButtonWrapper>
        <ReusableButton
          title="Next Round"
          width="150px"
          borderRadius="20px"
          onClick={() => handleNewRound()}
        />
        <ReusableButton
          title="End Session"
          width="150px"
          borderRadius="20px"
          onClick={() => handleEnd()}
          color="#FD3F33"
        />
      </HostButtonWrapper>
    );
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <TopWrapper>
          <IcebreakerCard
            category={icebreaker.category}
            subcategory={icebreaker.subcategory}
            question={icebreaker.question}
            color={icebreaker.color}
            onClick={null}
            isButtons={false}
          />
        </TopWrapper>
        {userList()}
        <BottomWrapper>{isHost === true ? hostButtons() : <></>}</BottomWrapper>
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
  height: 1000px;
  top: 200px;
`;

const TextWrapper = styled.div``;

const ContentWrapper = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-rows: 325px auto auto;
  gap: 50px;
  @media (max-width: 450px) {
    display: inline;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 45px;
  row-gap: 10px;
`;

const ListRow = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  gap: 20px;
`;

const TopWrapper = styled.div`
  display: grid;
  width: 550px;
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

const ButtonWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const BottomWrapper = styled.div``;

const HostButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  justify-content: center;
  align-content: center;
`;
