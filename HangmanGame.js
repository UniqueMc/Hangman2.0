
import React from 'react';
import './App.css';
import LetterBox from './LetterBox';
import SingleLetterSearchBar from './SingleLetterSearchBar';

const pics = [
  'noose.png',             
  'upperbody.png',          
  'upperandlowerbody.png',  
  '1arm.png',               
  'botharms.png',           
  '1leg.png',               
  'Dead.png'                
];

const words = [
  "Morehouse",
  "Spelman",
  "Basketball",
  "Table",
  "Museum",
  "Excellent",
  "Fun",
  "React"
];

class HangmanGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      curWord: 0,
      lifeLeft: 0,
      usedLetters: [],
      gameOver: false,
      gameWon: false,
    };
  }

  componentDidMount() {
    
    this.setState({ wordList: words });
  }

  startNewGame = () => {
   
    this.setState({
      curWord: Math.floor(Math.random() * this.state.wordList.length),
      lifeLeft: 0,
      usedLetters: [],
      gameOver: false,
      gameWon: false,
    });
  };

  handleGuess = (letter) => {
    letter = letter.toLowerCase();

    
    if (this.state.usedLetters.includes(letter) || this.state.gameOver) return;

    const { wordList, curWord, usedLetters, lifeLeft } = this.state;
    const currentWord = wordList[curWord].toLowerCase();
    const updatedLetters = [...usedLetters, letter];
    let updatedLifeLeft = lifeLeft;

    if (!currentWord.includes(letter)) {
      updatedLifeLeft += 1;
    }

    
    const maxMistakes = pics.length - 1;
    const gameLost = updatedLifeLeft >= maxMistakes;
    const gameWon = currentWord.split('').every((char) =>
      updatedLetters.includes(char)
    );
    const gameOver = gameLost || gameWon;

    this.setState({
      usedLetters: updatedLetters,
      lifeLeft: updatedLifeLeft,
      gameOver,
      gameWon,
    });
  };

  
  updateWinRecord = async (didWin) => {
    const customerId = "6123456789abcdef01234567"; 
    try {
      const response = await fetch('http://localhost:5000/api/update-win', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, didWin }),
      });
      const data = await response.json();
      console.log('Win record updated:', data);
    } catch (error) {
      console.error('Error updating win record:', error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
   
    if (!prevState.gameOver && this.state.gameOver) {
      this.updateWinRecord(this.state.gameWon);
    }
  }

  renderWord = () => {
    const { wordList, curWord, usedLetters } = this.state;
    if (wordList.length === 0) return null;
    const word = wordList[curWord];
    return (
      <div style={{ margin: '20px' }}>
        {word.split('').map((char, idx) => {
          const isVisible = usedLetters.includes(char.toLowerCase());
          return (
            <LetterBox
              key={idx}
              letter={char}
              isVisible={isVisible}
              boxStyle={{ display: 'inline-block', margin: '5px' }}
              letterStyle={{ fontSize: '30px' }}
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { wordList, curWord, lifeLeft, usedLetters, gameOver, gameWon } = this.state;
    const currentPic = pics[lifeLeft] || pics[pics.length - 1];
    return (
      <div className="HangmanGame">
        <h1>Hangman Game</h1>
        <img src={currentPic} alt="Hangman" style={{ width: '200px' }} />
        <div>
          <button onClick={this.startNewGame}>New Game</button>
        </div>
        {this.renderWord()}
        {gameWon && <p>Congratulations! You guessed the word!</p>}
        {gameOver && !gameWon && (
          <p>
            Game Over! The word was: <b>{wordList[curWord]}</b>
          </p>
        )}
        {!gameOver && (
          <SingleLetterSearchBar onSearch={this.handleGuess} />
        )}
        <div>
          <h3>Used Letters:</h3>
          <p>{usedLetters.join(', ')}</p>
        </div>
      </div>
    );
  }
}

export default HangmanGame;
