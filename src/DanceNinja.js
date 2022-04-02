import React from "react";
import styled from "styled-components";
// import Ken from "./image/ken.png";
// import KenBatu from "./image/ken-batu.png";
// import KenGunting from "./image/ken-gunting.png";
// import KenKertas from "./image/ken-kertas.png";

const DanceNinja = ({ kenElement }) => {
  // const [maskot, setMaskot] = React.useState(Ken);

  return <Container image={kenElement}></Container>;
};

export default DanceNinja;

const Container = styled.div`
  display: inline-block;
  width: 100%;
  height: 280px;
  background-image: url(${(props) => props.image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;

  @keyframes ninjagoyang {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    75% {
      transform: translateX(2px);
    }
  }

  animation: ninjagoyang 0.75s infinite;
`;
