import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import MenuButton from "../buttons/MenuButton";
import { H2 } from "../styles/TextStyles";
import { gamePortalData } from "../../data/gamePortalData";
import Cookies from "universal-cookie";

export default function Header() {
  return (
    <Wrapper>
      <LinkWrapper>
        <Link to={"/index"}>
          <img src="/images/logos/personalLogo.svg" alt="Logo" />
        </Link>
      </LinkWrapper>
    </Wrapper>
  );
}

const LinkWrapper = styled.div`
  width: 150px;
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
  width: 100%;
  padding: 0 30px;

  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
    grid-template-columns: 100px auto;
  }
`;
