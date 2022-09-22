import React, { useContext } from 'react'
import {AppContext} from "../App";
function GameOver() {
    const {board,setBoard,gameOver,currentAttempt,correctWord}=useContext(AppContext);
  return (
    <div className='gameOver'>
        <h1>{gameOver.guessedWord?"You correctly guessed":"You failed"}</h1>
        <h1>Correct:{correctWord}</h1>
        {gameOver.guessedWord && (
            <h3>You guessed in {currentAttempt.attempt} attempts</h3>
        )}
    </div>
  )
}

export default GameOver