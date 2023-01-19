import "./App.css";
import HangmanDrawing from "./components/hangman-drawing";
import HangmanWord from "./components/hangman-word";
import Keyboard from "./components/keyboard";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

const HangmanParts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 375px;
`;

function App() {
  return (
    <Wrapper>
      <h2>Jogo da Forca</h2>
      <HangmanParts>
        <HangmanDrawing />
        <HangmanWord />
      </HangmanParts>

      <Keyboard />
    </Wrapper>
  );
}

export default App;
