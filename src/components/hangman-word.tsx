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
  min-height: 50px;
  min-width: 50px;

  @media (max-width: 1024px) {
    margin: -2px;
    font-size: 2rem;
    min-height: 20px;
    min-width: 30px;
    flex: 1;
  }

  @media (max-width: 600px) {
    margin: -2px;
    font-size: 1.5rem;
    min-height: 20px;
    min-width: 15px;
    flex: 1;
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
