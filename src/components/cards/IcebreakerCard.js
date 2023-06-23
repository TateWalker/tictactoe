import React from "react";
import styled from "styled-components";
import { MediumText, H3, H2 } from "../styles/TextStyles";
import SlideShowButton from "../buttons/SlideShowButton";

export default function IcebreakerCard(props) {
  const { category, subcategory, question, color, onClick, isButtons } = props;

  const returnButtons = () => {
    if (isButtons) {
      return (
        <>
          <SlideShowButton
            direction="left"
            onClick={() => onClick("l")}
            isIceBreaker={true}
          />
          <SlideShowButton
            direction="right"
            onClick={() => onClick("r")}
            isIceBreaker={true}
          />
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <Wrapper color={color}>
      <CardWrapper>
        <TopWrapper>
          <TextWrapper>
            <Category>{category}</Category>
            <Subcategory>{subcategory}</Subcategory>
          </TextWrapper>
          <IconWrapper iconSize={"50px"}>
            <img
              src={"images/logos/kraftylab-logo.png"}
              alt="Icon"
              className="icebreakericon"
            />
          </IconWrapper>
        </TopWrapper>
        <QuestionWrapper>
          <Question>{question}</Question>
        </QuestionWrapper>
        <BottomWrapper>{returnButtons()}</BottomWrapper>
      </CardWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  min-width: 500px;
  padding: 15px;
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
  display: grid;
  grid-template-rows: auto 200px auto;
  gap: 10px;
`;

const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`;
const ArrowWrapper = styled.div``;

const TextWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto auto;
  gap: 5px;
`;

const QuestionWrapper = styled.div`
  justify-self: center;
  align-self: center;
  width: 85%;
`;

const Question = styled(H3)`
  color: white;
  text-align: center;
  line-height: 125%;
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
`;

const Category = styled(H3)`
  text-align: start;

  color: white;
  font-weight: 500;
`;

const Subcategory = styled(MediumText)`
  color: white;
  opacity: 0.6;
`;
const IconWrapper = styled.div`
  img {
    width: ${(props) => (props.iconSize ? props.iconSize : "75px")};
  }
`;
