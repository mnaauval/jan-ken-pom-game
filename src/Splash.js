import React from "react";
import styled from "styled-components";
import Ninja from "./image/favicon.png";
// import "./style.css";

const Splash = () => {
  const [top, setTop] = React.useState("0");

  return (
    <SplashContainer top={top}>
      <Center>
        <h1>JAN-KEN-POP</h1>
        <Start onClick={() => setTop("-120vh")} title="Mulai permainan">
          Mulai
        </Start>
      </Center>
    </SplashContainer>
  );
};

export default Splash;

const SplashContainer = styled.div`
  position: fixed;
  top: ${(props) => props.top};
  left: 0;
  z-index: 250;
  display: flex;
  width: 100vw;
  height: 100vh;
  transition: 0.75s;
  background: #eceff1;
  box-shadow: 0 5px 50px #aaa;
`;

const Center = styled.div`
  width: 100%;
  margin: auto;
  padding: 165px 15px 15px;
  background: url(${Ninja}) center top no-repeat;
  background-size: 180px;

  h1 {
    margin: 0 0 20px;
    font-family: "Sigmar One", cursive;
    font-size: 3rem;
    font-weight: normal;
    color: #7879b9;
    -webkit-text-stroke: 2px #4a5f6c;

    @media (max-width: 500px) {
      font-size: 2.3rem;
    }
  }
`;

const Start = styled.button`
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.25em;
  line-height: 1em;
  background: #7879b9;

  &:active {
    transform: translateY(8px);
    box-shadow: none;
  }
`;
