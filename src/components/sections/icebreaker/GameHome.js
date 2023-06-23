import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import ReusableButton from "../../buttons/ReusableButton";
import ReusableTextField from "../../textfield/ReusableTextField";
import Board from "../../Board";
import socketService from "../../../service/SocketService";
import UtilService from "../../../service/UtilService";
import GameService from "../../../service/GameService";
import StatusAlert from "../../alerts/StatusAlert";
import { codeLength } from "../../../validators/validationUtilities";
import Cookies from "universal-cookie";
import { H1 } from "../../styles/TextStyles";

export default function GameHome(props) {
  const emptyAlert = {
    visible: false,
    status: "",
    title: "",
    subtitle: "",
    key: 0,
  };
  const { context, changeStage, setIsHost, setCode, code } = props;
  const [alert, setAlert] = useState(emptyAlert);
  const cookies = new Cookies();
  const { name, setName, symbol, setSymbol } = context;

  if (!name) {
    setName(cookies.get("name"));
  }

  const connectToSocket = async () => {
    console.log("Connecting to socket...");
    const socket = await socketService.connect().catch((err) => {
      console.log("Error: ", err);
    });
    console.log("Socket: ", socket);
  };

  useEffect(() => {
    connectToSocket();
  }, []);

  function displayAlert() {
    return (
      <StatusAlert
        status={alert.status}
        title={alert.title}
        subtitle={alert.subtitle}
        key={alert.key}
      />
    );
  }

  async function onHostClick(e) {
    if (name == undefined) {
      setAlert({
        visible: true,
        status: "Error",
        title: "Error",
        subtitle: "Please enter a name",
        key: Math.random(),
      });
    } else {
      const socket = socketService.socket;
      setIsHost(true);
      const code = UtilService.getCode(5);
      setCode(code);
      await GameService.joinGameRoom(socket, code, true, name);
      changeStage("LOBBY");
    }
  }

  async function onJoinClick(e) {
    if (!codeLength(code)) {
      setAlert({
        visible: true,
        status: "Error",
        title: "Error",
        subtitle: "Please enter a valid code",
        key: Math.random(),
      });
    } else if (name == undefined) {
      setAlert({
        visible: true,
        status: "Error",
        title: "Error",
        subtitle: "Please enter a name",
        key: Math.random(),
      });
    } else {
      const socket = socketService.socket;
      setIsHost(false);
      setSymbol("o");
      const joined = await GameService.joinGameRoom(
        socket,
        code,
        false,
        name
      ).catch((err) => {
        setAlert({
          visible: true,
          status: "Error",
          title: "Error",
          subtitle: err,
          key: Math.random(),
        });
      });
      if (joined) {
        changeStage("LOBBY");
      }
    }
  }

  const renderPage = () => {
    return (
      <Wrapper>
        {alert.visible ? displayAlert() : ""}
        <ContentWrapper>
          <TitleWrapper>
            <Title>Tic-Tac-Toe</Title>
          </TitleWrapper>
          <TopWrapper>
            <Board context={context}></Board>
          </TopWrapper>
          <BottomWrapper>
            <TextFieldWrapper>
              <ReusableTextField
                title="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <ReusableTextField
                title="Have a code? Enter it here!"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
              />
            </TextFieldWrapper>
            <ButtonRowWrapper>
              <ReusableButton
                title="Host"
                color="#073349"
                width="182px"
                borderRadius="20px"
                onClick={(e) => onHostClick(e)}
              />
              <ReusableButton
                title="Join"
                color="#073349"
                width="182px"
                borderRadius="20px"
                onClick={(e) => onJoinClick(e)}
              />
            </ButtonRowWrapper>
          </BottomWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  };

  return renderPage();
}

const animation = keyframes`
  0% {opacity: 0;}
  20% {opacity: 1;}
  80% {opacity: 1;}
  100% {opacity: 0;} 
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: calc(1vw - 200px);
  top: 200px;
`;

const ContentWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  width: 750px;
  justify-content: center;
  grid-template-rows: 80% 20%;
  @media (max-width: 450px) {
    display: inline;
  }
`;

const TopWrapper = styled.div`
  display: grid;
  gap: 20px;
  margin: 50px;
  width: 500px;
  height: 300px;
  justify-items: center;
  @media (max-width: 450px) {
    vertical-align: middle;
    margin: 0;
    padding: 0 30px;
    max-width: none;
  }
  .item {
    opacity: 0.2;
    transition-duration: 5s ease;
  }
  .item-active {
    transition-duration: 3s;
    transform: scale(1.08);
    animation: ${animation} 7.5s forwards;
  }
`;

const BottomWrapper = styled.div`
  margin: 0 auto;
  max-width: 750px;
  @media (max-width: 450px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ButtonRowWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 25px;
  padding-bottom: 20px;
`;

const TextFieldWrapper = styled.div`
  /* border: 1px solid red; */
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  vertical-align: center;
`;

const Title = styled(H1)`
  font-size: 64px;
  color: #073349;
`;
