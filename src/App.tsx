import "./App.css";
import HangmanDrawing from "./components/hangman-drawing";
import HangmanWord from "./components/hangman-word";
import Keyboard from "./components/keyboard";

import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { wordsToPlay } from "./data/words";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
`;

const HangmanParts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 375px;
`;

const words = [...wordsToPlay];

const ResetButton = ({ onClick }: any) => {
  return <button onClick={onClick}>Reset Game</button>;
};

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    return { word, hint };
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectGuesses = guessedLetters.filter(
    (letter) => !wordToGuess.word.includes(letter)
  );
  const correctGuesses = guessedLetters.filter((letter) =>
    wordToGuess.word.includes(letter)
  );
  const isLoser = incorrectGuesses.length >= 6;
  const isWinner = wordToGuess.word
    .split("")
    .every((letter: string) => guessedLetters.includes(letter));

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((guessedLetters) => [...guessedLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  const resetGame = () => {
    setWordToGuess(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      resetGame();
    }
  };

  useEffect(() => {
    const handler = ((e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z-ç]$/)) return;

      e.preventDefault();
      addGuessedLetters(key);
    }) as unknown as EventListener;

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleReset = useCallback(() => {
    resetGame();
  }, []);

  return (
    <Wrapper>
      <h2>Jogo da Forca</h2>
      <HangmanParts>
        <HangmanDrawing numberOfGuesses={incorrectGuesses.length} />
        <h2>{wordToGuess.hint}</h2>
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          word={wordToGuess.word}
        />
      </HangmanParts>
      {isLoser && "Você perdeu 😢"}
      {isWinner && "Parabens, você venceu 😊!!!"}
      {isLoser || isWinner ? <ResetButton onClick={handleReset} /> : null}
      <Keyboard
        disabled={isLoser || isWinner}
        activeLetters={correctGuesses}
        inactiveLetters={incorrectGuesses}
        addGuessedLetters={addGuessedLetters}
      />
    </Wrapper>
  );
}

export default App;
