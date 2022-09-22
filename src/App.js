import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";
import { BoardDefault, generateWordSet } from "./Words";
import { createContext } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(BoardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctKey, setCorrectKey] = useState([]);
  const [almostKey, setAlmostKey] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  // const correctWord="SOBER";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.correct);
    });
  }, []);

  useEffect(() => {
    console.log(correctWord);
  }, [correctWord]);

  // useEffect(()=>{
  //   console.log("hogya");
  // },[gameOver.gameOver]);

  const onSelectLetter = (keyValue) => {
    //edge case
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }
    console.log(currWord);
    if (wordSet.has((currWord + "\r").toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
      console.log(currentAttempt.attempt);
    } else {
      alert("Word not found");
    }

    if ((currWord + "\r").toLowerCase() === correctWord) {
      console.log("run horha hai");
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  return (
    <>
      <div className="App">
        <nav>
          <h1>WORDLE</h1>
        </nav>
        <AppContext.Provider
          value={{
            setGameOver,
            gameOver,
            correctWord,
            board,
            setBoard,
            currentAttempt,
            setCurrentAttempt,
            onSelectLetter,
            onDelete,
            onEnter,
            disabledLetters,
            setDisabledLetters,
            correctKey,
            setCorrectKey,
            almostKey,
            setAlmostKey
          }}
        >
          <div className="rowwise">
            <Board />
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
