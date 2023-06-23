import React from "react";
import styled from "styled-components";
import { MediumText, H2 } from "../styles/TextStyles";
import { Link } from "gatsby";

export default function GameCard(props) {
  const {
    title,
    description,
    color,
    icon,
    iconSize,
    path,
    outsidePath,
  } = props;

  function returnLink(title, path) {
    return (
      <Link to={path}>
        <Wrapper color={color}>
          <CardWrapper>
            <TextWrapper>
              <GameTitle>{title}</GameTitle>
              <Description>{description}</Description>
            </TextWrapper>
            <IconWrapper iconSize={iconSize}>
              <img src={icon} alt="Icon" className="icebreakericon" />
            </IconWrapper>
          </CardWrapper>
        </Wrapper>
      </Link>
    );
  }

  function returnOutsideLink(title, path) {
    return (
      <a href={path}>
        <Wrapper color={color}>
          <CardWrapper>
            <TextWrapper>
              <GameTitle>{title}</GameTitle>
              <Description>{description}</Description>
            </TextWrapper>
            <IconWrapper iconSize={iconSize}>
              <img src={icon} alt="Icon" className="icebreakericon" />
            </IconWrapper>
          </CardWrapper>
        </Wrapper>
      </a>
    );
  }

  function returnNoLink(title) {
    return (
      <Wrapper color={color}>
        <CardWrapper>
          <TextWrapper>
            <GameTitle>{title}</GameTitle>
            <Description>{description}</Description>
          </TextWrapper>
          <IconWrapper iconSize={iconSize}>
            <img src={icon} alt="Icon" className="icebreakericon" />
          </IconWrapper>
        </CardWrapper>
      </Wrapper>
    );
  }

  return path !== undefined
    ? outsidePath === true
      ? returnOutsideLink(title, path)
      : returnLink(title, path)
    : returnNoLink(title);
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 247px;
  padding: 20px;
  background: ${(props) => (props.color ? props.color : "black")};
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 30px 60px rgba(99, 30, 187, 0.5);
  backdrop-filter: blur(20px);
  mix-blend-mode: screen;
  border-radius: 30px;
  :hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.5),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const TextWrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto auto;
  gap: 35px;
`;

const GameTitle = styled(H2)`
  height: 100px;
  text-align: start;
  padding-top: 30px;
  color: black;
  font-weight: 300;
`;

const Description = styled(MediumText)`
  color: black;
`;
const IconWrapper = styled.div`
  img {
    width: ${(props) => (props.iconSize ? props.iconSize : "75px")};
  }
`;
