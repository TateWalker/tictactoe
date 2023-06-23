import React from "react";
import styled from "styled-components";
import {
  BiRightArrow,
  BiLeftArrow,
  BiCaretLeft,
  BiCaretRight,
} from "react-icons/bi";
export default function SlideShowButton(props) {
  const { direction, onClick, isIceBreaker } = props;
  let button;
  if (isIceBreaker) {
    button =
      direction === "left" ? (
        <BiCaretLeft className="react-icons" color="white" />
      ) : (
        <BiCaretRight className="react-icons" color="white" />
      );
  } else {
    button =
      direction === "left" ? (
        <BiLeftArrow className="react-icons" />
      ) : (
        <BiRightArrow className="react-icons" />
      );
  }
  return (
    <Wrapper
      onClick={onClick}
      isIceBreaker={isIceBreaker}
      direction={direction}
    >
      <IconWrapper direction={direction}>{button}</IconWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 30px;
  height: 30px;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-self: center;
  border-radius: ${(props) => {
    if (props.isIceBreaker) {
      if (props.direction == "left") {
        return "100px 0px 0px 100px";
      } else {
        return "0px 100px 100px 0px";
      }
    } else {
      return "100px";
    }
  }};
  background: linear-gradient(
    180deg,
    rgba(123, 123, 123, 0.3) 0%,
    rgba(217, 217, 217, 0) 100%
  );
  box-shadow: rgb(0 0 0 / 25%) 0px 4px 15px;
  cursor: pointer;
  @media (max-width: 450px) {
    width: 30px;
    height: 30px;
  }
`;
const IconWrapper = styled.div`
  transform: ${(props) =>
    props.direction == "left" ? "translate(-5%, -5%)" : "translate(5%, -5%)"};
  .react-icons {
    vertical-align: middle;
  }
`;
