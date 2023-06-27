import "react-dropdown/style.css";
import React from "react";
import styled from "styled-components";

export default function Board(props) {
  const { turn, playTurn, board } = props;

  const isEven = (n) => {
    return n % 2 == 0;
  };

  const showBlocker = () => {
    if (turn != true) {
      return <Blocker />;
    }
  };

  return (
    <BoardWrapper>
      {showBlocker()}
      {board.map((row, rowId) => {
        return (
          <RowWrapper>
            {row.map((column, columnId) => (
              <Cell
                dark={!(isEven(rowId) && isEven(columnId))}
                onClick={() => playTurn(columnId, rowId)}
              >
                {column && column !== "null" ? (
                  column === "x" ? (
                    <Choice>
                      <img src="/images/X.svg" alt="X" />
                    </Choice>
                  ) : (
                    <Choice>
                      <img src="/images/O.svg" alt="O" />
                    </Choice>
                  )
                ) : null}
              </Cell>
            ))}
          </RowWrapper>
        );
      })}
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-rows: auto auto auto;
  justify-content: center;
  gap: 20px;
`;

const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
`;

const Cell = styled.div`
  width: 90px;
  height: 90px;
  background-color: ${(props) => (props.dark ? "#2DA386" : "#79D8AA")};

  &:hover {
    background-color: ${(props) => (props.dark ? "#19604F" : "#60BA8F")};
  }
`;

const Blocker = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

const Choice = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  img {
    width: 100%;
  }
`;
