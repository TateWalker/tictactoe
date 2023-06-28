import React, { useRef, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrapper>
      <LinkWrapper>
        <Link to="/index.html">
          <img src="/images/logos/PersonalLogo.svg" alt="Logo" />
        </Link>
      </LinkWrapper>
    </Wrapper>
  );
}

const LinkWrapper = styled.div`
  width: 75px;
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
`;
