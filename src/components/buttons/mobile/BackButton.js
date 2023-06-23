import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
export default function BackButton(props) {
  const { link } = props;
  return (
    <Link to={link}>
      <Wrapper>
        <Icon src="images/icons/back-arrow.svg"></Icon>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: grid;
  height: 40px;
  width: 40px;
  background-color: #ffffff;
  border: 1px solid #e8ecf4;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.img``;
