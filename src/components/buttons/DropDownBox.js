import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import React from "react";
import styled from "styled-components";
import { useState } from "react";

export default function DropDownBox(props) {
  const { options, selected, onChange, placeholder } = props;

  return (
    <DropdownWrapper>
      <Dropdown
        options={options}
        onChange={(e) => onChange(e)}
        value={selected}
        placeholder={placeholder}
        className="dropdown-class"
        menuClassName="menu-class"
        placeholderClassName="placeholder-class"
        controlClassName="control-class"
        arrowClassName="arrow-class"
      />
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  padding: 10px;

  .control-class {
    height: 60px;
    background-color: white;
    outline: 0.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    text-align: start;
    padding-top: 15px;
    font-size: 24px;
  }
  .placeholder-class {
  }
  .dropdown-class {
    background-color: red;
    border-radius: 25px;
  }
  .menu-class {
    margin-top: 25px;
    outline: 0.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    text-align: start;
    font-size: 24px;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 0 10px 10px 0;
    }

    ::-webkit-scrollbar-thumb {
      background: #0067ff;
      border-radius: 0 10px 10px 0;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #0067ee;
    }
    scrollbar-width: thin;
  }
  .arrow-class {
    margin-top: 12.5px;
  }
`;
