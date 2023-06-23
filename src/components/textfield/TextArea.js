import React from "react";
import styled from "styled-components";
import { SmallText } from "../styles/TextStyles";

export default function TextArea(props) {
  const { title, onChange, rows } = props;
  return (
    <MessageWrapper>
      <textarea
        type="text"
        placeholder={title}
        rows={rows}
        onChange={(e) => onChange(e)}
      />
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  textarea {
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .element {
      overflow: -moz-scrollbars-none;
    }
    .element::-webkit-scollbar {
      width: 0 !important;
    }
    resize: none;

    justify-self: center;
    text-align: start;
    width: 100%;
    height: 100%;
    border: 1px solid #d8d8d8;
    border-radius: 20px;
    box-shadow: rgb(0 0 0 / 15%) 0px 20px 40px,
      rgb(255 255 255 / 30%) 0px 0px 0px 0.5px inset;
    box-sizing: border-box;
    padding: 4px 20px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    background-color: #f8f8f8;
    color: black;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
    ::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
