import React from "react";
import styled from "styled-components";
import { SmallText } from "../styles/TextStyles";

export default function ReusableTextField(props) {
  const { title, onChange, value, label } = props;
  const type = "text";

  return (
    <>
      <Wrapper>
        <Label>{label}</Label>
        <InputField
          name={title || "Field"}
          type={type}
          value={value}
          placeholder={title}
          onChange={(e) => onChange(e)}
          minLength="1"
          maxLength="100"
          required
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  position: relative;
`;

const InputField = styled.input`
  background: #f8f8f8;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 0px 12px;
  height: 36px;
  margin: 0;

  &::placeholder {
    color: #757575;
    font-size: 12px;
    line-height: 21px;
  }
`;

const Label = styled(SmallText)`
  margin-bottom: 6px;
  text-align: left;

  color: black;
  line-height: 16px;
`;
