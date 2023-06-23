import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { H3 } from "../styles/TextStyles";
import ReusableTextField from "../textfield/ReusableTextField";
import GameCard from "../cards/GameCard";

import { gameRecentData } from "../../data/gameRecentData";
import { gameAllData } from "../../data/gameAllData";

export default function GameSection() {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  function renderDesktop() {
    return (
      <GraphicWrapper>
        <Graphic src="images/auth/auth-graphic.svg" />
      </GraphicWrapper>
    );
  }
  return (
    <Wrapper>
      <ContentWrapper>
        <ScreenWrapper>
          <LeftColumnWrapper>
            <LeftColumnTitle>Recent</LeftColumnTitle>
            <LeftGameCardWrapper>
              {gameRecentData.map((item, index) => (
                <GameCard
                  title={item.title}
                  description={item.description}
                  color={item.color}
                  icon={item.icon}
                  iconSize={"60px"}
                  path={item.path ? item.path : null}
                  outsidePath={item.outsidePath ? item.outsidePath : false}
                />
              ))}
            </LeftGameCardWrapper>
          </LeftColumnWrapper>
        </ScreenWrapper>
        <ScreenWrapper>
          <RightColumnWrapper>
            <RightColumnTitle>All Games</RightColumnTitle>
            <RightGameCardWrapper>
              {gameAllData.map((item, index) => (
                <GameCard
                  title={item.title}
                  description={item.description}
                  color={item.color}
                  icon={item.icon}
                  iconSize={"60px"}
                  path={item.path ? item.path : null}
                  outsidePath={item.outsidePath ? item.outsidePath : false}
                />
              ))}
            </RightGameCardWrapper>
          </RightColumnWrapper>
        </ScreenWrapper>
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
  margin: 0 auto;
  height: 100%;
  grid-template-columns: 40% 60%;
  @media (max-width: 450px) {
    display: inline;
  }
`;

const GraphicWrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  justify-items: center;
  align-content: center;
  @media (max-width: 450px) {
    display: hidden;
  }
`;

const Graphic = styled.img`
  width: 75%;
  height: 100%;
`;

const ScreenWrapper = styled.div`
  @media (max-width: 450px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const LeftColumnWrapper = styled.div`
  margin: 0 auto;
  max-width: 400px;
  @media (max-width: 450px) {
    vertical-align: middle;
    margin: 0;
    padding: 0 30px;
    max-width: none;
  }
`;

const RightColumnWrapper = styled.div`
  margin: 0 auto;
  max-width: 750px;
  @media (max-width: 450px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const LeftColumnTitle = styled(H3)`
  text-align: left;
  border-bottom: 1px solid #d0d2d3;
  margin-bottom: 20px;
  padding-bottom: 20px;
  width: 300px;
`;

const RightColumnTitle = styled(H3)`
  text-align: left;
  border-bottom: 1px solid #d0d2d3;
  margin-bottom: 20px;
  padding-bottom: 20px;
  width: 300px;
`;

const LeftGameCardWrapper = styled.div`
  grid-row-gap: 25px;
  display: grid;
  grid-template-rows: 50% 50%;
`;

const RightGameCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
`;
