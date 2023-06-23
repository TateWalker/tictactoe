import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
export default function MenuButton(props) {
  const { item } = props;
  return (
    <Link to={item.link} onClick={props.onClick}>
      <MenuItem title={item.title} icon={item.icon}>
        <Title>
          {props.icon !== "" ? <img src={item.icon} /> : null}
          {item.title}
        </Title>
      </MenuItem>
    </Link>
  );
}

const MenuItem = styled.div`
  color: black;
  display: grid;
  height: 44px;
  grid-template-columns: ${(props) => (props.icon ? "24px auto" : "auto")};
  gap: ${(props) => (props.title ? "10px" : "0px")};
  padding: 10px;
  transition: 0.5s ease-out;
  border-radius: 10px;

  :hover {
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
