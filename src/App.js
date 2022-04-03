import { useState } from "react";
import styled from "styled-components";
import DanceNinja from "./DanceNinja";
import Splash from "./Splash";
import Stone from "./image/player-batu.png";
import Scisor from "./image/player-gunting.png";
import Paper from "./image/player-kertas.png";
import Ken from "./image/ken.png";
import KenBatu from "./image/ken-batu.png";
import KenGunting from "./image/ken-gunting.png";
import KenKertas from "./image/ken-kertas.png";

function App() {
  const [skorKen, setSkorKen] = useState(localStorage.getItem("skorKen") ? JSON.parse(localStorage.getItem("skorKen")) : 0);
  const [skorPlayer, setSkorPlayer] = useState(localStorage.getItem("skorPlayer") ? JSON.parse(localStorage.getItem("skorPlayer")) : 0);
  const [textWinner, setTextWinner] = useState("");
  const [kenElement, setKenElement] = useState(Ken);
  const [disableBtn, setDisableBtn] = useState(false);
  const [myTimeout, setMyTimeout] = useState();

  // console.log("skorken " + skorKen + " storageken " + localStorage.getItem("skorKen"));

  const janken = (elementPlayer) => {
    setDisableBtn(true);
    console.log(disableBtn);
    let elementBot = Math.floor(Math.random() * 3);
    console.log(elementBot);

    switch (elementBot) {
      case 0:
        setKenElement(KenBatu);
        console.log("ken-batu");
        break;
      case 1:
        setKenElement(KenGunting);
        console.log("ken-gunting");
        break;
      default:
        setKenElement(KenKertas);
        console.log("ken-kertas");
        break;
    }

    switch (elementPlayer) {
      case 0:
        if (elementBot === 0) {
          result("draw");
        } else if (elementBot === 1) {
          result("player");
        } else {
          result("ken");
        }
        break;
      case 1:
        if (elementBot === 0) {
          result("ken");
        } else if (elementBot === 1) {
          result("draw");
        } else {
          result("player");
        }
        break;
      default:
        if (elementBot === 0) {
          result("player");
        } else if (elementBot === 1) {
          result("ken");
        } else {
          result("draw");
        }
        break;
    }
  };

  const result = (result) => {
    clearTimeout(myTimeout);

    switch (result) {
      case "ken":
        setSkorKen(skorKen + 1);
        localStorage.setItem("skorKen", skorKen + 1);
        console.log("Ninja Ken menang");
        setTextWinner("Ken menang");
        break;
      case "player":
        setSkorPlayer(skorPlayer + 1);
        localStorage.setItem("skorPlayer", skorPlayer + 1);
        console.log("Anda menang");
        setTextWinner("Anda menang");
        break;
      default:
        console.log("Seri");
        setTextWinner("Seri");
        break;
    }

    const changeNinja = () => {
      setKenElement(Ken);
      setDisableBtn(false);
      setTextWinner("");
    };

    setMyTimeout(
      setTimeout(() => {
        changeNinja();
      }, 2000)
    );
  };

  const resetHandler = () => {
    if (window.confirm("Apakah anda yakin ingin mereset skor?")) {
      setSkorKen(0);
      setSkorPlayer(0);
      setKenElement(Ken);
      setTextWinner("");
      localStorage.clear();
    }
  };

  return (
    <>
      {/* <Block /> */}
      <Splash />
      <DanceNinja kenElement={kenElement} />
      <ScoreContainer>
        <span title="Skor Ninja Ken">{skorKen}</span>
        <span title="Skor Anda">{skorPlayer}</span>
      </ScoreContainer>
      <TextWinnerContainer>
        <h1>{textWinner}</h1>
      </TextWinnerContainer>
      <ElementContainer>
        <Element disabled={disableBtn} onClick={() => janken(0)} image={Stone} title="Pilih batu"></Element>
        <Element disabled={disableBtn} onClick={() => janken(1)} image={Scisor} title="Pilih gunting"></Element>
        <Element disabled={disableBtn} onClick={() => janken(2)} image={Paper} title="Pilih kertas"></Element>
      </ElementContainer>
      <ResetButton onClick={resetHandler} title="Mulai ulang">
        Reset Game
      </ResetButton>
    </>
  );
}

export default App;

const ScoreContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 200;
  transform: translateY(-50%);
  padding: 30px 15px;
  background: #7879b9;
  color: #fff;
  font-size: 2rem;
  border: solid 3px #6860a1;
  border-left: none;
  border-radius: 0 30px 30px 0;
  box-shadow: 0 5px 10px #aaa;

  @media (max-width: 500px) {
    padding: 30px 5px;
  }

  span {
    display: block;
    padding-bottom: 20px;
    cursor: help;
    font-weight: bold;
    min-width: 80px;
  }

  span + span {
    padding: 20px 0 0;
    border-top: solid 1px #ddd;
  }
`;

const TextWinnerContainer = styled.div`
  margin-top: 150px;
`;

const ElementContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 150;
  transform: translateX(-50%);
  display: inline-block;
  white-space: nowrap;
  background: #89e6d1;
  width: auto;
  padding: 15px 30px;
  border: solid 5px #7accb9;
  border-bottom: none;
  border-radius: 50px 50px 0 0;

  @media (max-width: 500px) {
    padding: 10px 15px;
  }
`;

const Element = styled.button`
  width: 90px;
  height: 90px;
  display: inline-block;
  border: none;
  border-radius: 50%;
  box-shadow: 0 8px 0 #aaa;
  margin-left: 15px;
  margin-right: 15px;
  background: url(${(props) => props.image}) center center no-repeat;
  background-size: contain;

  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
  }

  &:disabled {
    filter: grayscale(100%);
  }

  &:active {
    transform: translateY(8px);
    box-shadow: none;
  }

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

  &:hover {
    animation: ninjagoyang 0.75s infinite;
  }
`;

const ResetButton = styled.button`
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 100;
  padding: 10px 20px;
  line-height: 1em;
  color: #6869a1;
  font-size: 1rem;
  border: dashed 2px #6869a1;
  border-radius: 50px;
`;
