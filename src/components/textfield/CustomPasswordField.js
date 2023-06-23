import React, { useState } from "react"
import styled from "styled-components"
import { MediumText, SmallText } from "../styles/TextStyles"

// When using this component use a wrapper to constrain the width
// This component will use the parent component's width
function Password({ name, label, placeholder, onChange, value }) {
  const [isHidden, setIsHidden] = useState(true)
  let password = isHidden == true ? "password" : "text"
  let icon =
    isHidden == true ? "images/icons/hidden.svg" : "images/icons/show.svg"
  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputField
        placeholder={placeholder}
        label="Password"
        name={name}
        type={password}
        value={value}
        onChange={onChange}
      />
      <DisplayPasswordButton
        onClick={() => {
          setIsHidden(!isHidden)
        }}
      >
        <Icon src={icon}></Icon>
      </DisplayPasswordButton>
    </Wrapper>
  )
}

export default Password

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: left;
  margin-bottom: 25px;
`

const Label = styled(SmallText)`
  text-align: left;
  line-height: 1.25;
  position: relative;
  margin-bottom: 6px;
`
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
`
const DisplayPasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 30px;
  outline: none;
  border: 0px solid white;
  color: transparent;
  background-color: transparent;
`
const Icon = styled.img`
  width: 16px;
  height: 16px;
`
