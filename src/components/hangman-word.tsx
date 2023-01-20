import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 4rem;
  text-transform: uppercase;
  font-family: sans-serif;
`;

const Letter = styled.span`
  border-bottom: 0.1em solid white;
  height: 50px;
  min-width: 50px;

  @media (max-width: 768px) {
    min-width: 30px;
  }
`;

interface HangmanWordProps {
  reveal: boolean;
  word: string;
  guessedLetters: string[];
}

export default function HangmanWord({
  reveal,
  word,
  guessedLetters,
}: HangmanWordProps) {
  return (
    <Wrapper>
      {word.split("").map((letter, index) => (
        <Letter key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "white",
            }}
          >
            {letter}
          </span>
        </Letter>
      ))}
    </Wrapper>
  );
}
