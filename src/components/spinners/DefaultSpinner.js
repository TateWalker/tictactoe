import React from "react";
import styled, { keyframes } from "styled-components";

export default function DefaultSpinner(props) {
  const { isDark } = props;
  return <SpinnerWrapper isDark={isDark} />;
}

const rotation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  border: ${(props) => (props.isDark ? "2px solid black" : "2px solid white")};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  width: 15px;
  height: 15px;
`;
