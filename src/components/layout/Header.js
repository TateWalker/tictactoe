import React, { useRef, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrapper>
      <LinkWrapper>
        <Link to="/">
          <img src="/images/logos/logo-black.svg" alt="Logo" />
        </Link>
      </LinkWrapper>
    </Wrapper>
  );
}

const LinkWrapper = styled.div`
  width: 75px;
  @media (max-width: 450px) {
    width: 44px;
  }
  img {
    height: 100px;
    width: 100px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;

  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`;
