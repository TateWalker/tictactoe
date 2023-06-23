import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BodyMain, MediumText } from "../styles/TextStyles";

export default function StatusAlert(props) {
  const { status, title, subtitle, key } = props;
  return (
    <Wrapper key={key} status={status}>
      <IconWrapper>
        <Icon src={getStatusIcon(status)} />
      </IconWrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextWrapper>
    </Wrapper>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "Success":
      return "#18c07a";
    case "Error":
      return "#F06E6E";
    case "Info":
      return "#81B3FF";
    default:
      return "#81B3FF";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Success":
      return "/images/icons/white-check.svg";
    case "Error":
      return "/images/icons/white-error.svg";
    default:
      return "/images/icons/white-exclamation.svg";
  }
};

const animation = keyframes`
  0% {right: -300px;}
  20% {right: 0px;}
  80% {right: 0px;}
  100% {right: -300px;} 
  `;

const Wrapper = styled.div`
  position: fixed;
  padding-top: 10px;
  padding-bottom: 10px;
  top: 10%;
  right: 0px;
  display: grid;
  grid-template-columns: 100px auto;
  width: 300px;
  min-height: 75px;
  border-radius: 100px 0 0 100px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  background-color: ${(props) => getStatusColor(props.status)};
  animation: ${animation} 5s forwards;
`;
const IconWrapper = styled.div`
  width: 100%;
  display: grid;
  margin: 0 auto;
  justify-content: center;
  align-content: center;
`;
const Icon = styled.img`
  color: #ffffff;
  width: 35px;
  height: 35px;
`;

const TextWrapper = styled.div`
  margin: auto;
  width: 200px;
  word-wrap: break-word;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  align-content: center;
`;

const Title = styled(MediumText)`
  color: #ffffff;
  font-size: 24px;
`;

const Subtitle = styled(BodyMain)`
  color: #ffffff;
  font-size: 12px;
`;
