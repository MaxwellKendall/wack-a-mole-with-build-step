import './styles/scss/index.scss';

// global variables
let isGameOver = true;
let score = 0;
let numberOfHogs = 0;
let gameClock;
let activeTimeout;

// ensurses a random number greater than 3/4 of a second
const getRandomTimeoutDuration = () => {
  const rtrn = Math.floor(Math.random() * 3500) + 750;
  console.log('random time out duration is: ', rtrn);
  return rtrn;
}
// ensures a range between 9 and 1
const generateRandomNumberBetween1and9 = () => Math.floor(Math.random() * 9) + 1;
const resetStats = () => {
  score = 0;
  numberOfHogs = 0;
};
// sets game duration
const setGameClock = () => {
  gameClock = setTimeout(() => {
    isGameOver = true;
    hideAllHogs();
    displayGameOverMessage();
  }, 15000);
};

const hideAllHogs = () => {
  document.querySelectorAll('.hog').forEach((hog) => { hideHog(hog) });
}

// displays game stats
const displayStats = () => {
  document.getElementById('score').innerHTML = `You've wacked ${score} out of ${numberOfHogs} ground hogs!`;
};

// Functions for starting game
  const getRandomHog = () => {
    return document.querySelector(`.hog-${generateRandomNumberBetween1and9()}`);
  }
  const showHog = (hog) => {
    numberOfHogs++;
    displayStats();
    hog.classList.contains('hide') ? hog.classList.remove('hide') : null;
  }

  const hideHog = (hog) => {
    hog.classList.contains('hide') ? null : hog.classList.add('hide');
  }

  const hideHogAndSetNewHog = (hog) => {
    console.log('hideHogAndSetNewHog: ', hog);
    hideHog(hog);
    showRandomHogAndSetRandomHideTimeout();
  }

  const showRandomHogAndSetRandomHideTimeout = () => {
    // if game is not over -- (A) show random hog, (B) set the random hide hog time out, (C) increment hog counter, (D) display new stats
    if (!isGameOver) {
      const hog = getRandomHog();
      showHog(hog);
      activeTimeout = setTimeout(hideHogAndSetNewHog.bind(this, hog), getRandomTimeoutDuration());
    }
  };

// functions for end a game
  const displayGameOverMessage = (message = 'Game Over!') => {
    window.alert(message);
  }

// game controls
const startGame = () => {
  if (isGameOver) {
    isGameOver = false;
    setGameClock();
    resetStats();
    displayStats();
    showRandomHogAndSetRandomHideTimeout();
  }
};
const endGame = (message = "Game Over!") => {
  if (!isGameOver) {
    isGameOver = true;
    clearTimeout(activeTimeout);
    clearTimeout(gameClock);
    hideAllHogs();
    displayGameOverMessage(message);
    resetStats();
    displayStats();
  }
};
const resetGame = () => {
  clearTimeout(activeTimeout);
  endGame('Resetting your game...');
  resetStats();
  displayStats();
  startGame();
};
const onHogWack = (hog) => {
  console.log('hog was clicked');
  // clearTimeout(activeTimeout);
  hideHog(hog);
  score++;
  displayStats();
};

// Event listeners
document.querySelector('.start').addEventListener('click', startGame);
document.querySelector(".stop").addEventListener("click", endGame.bind(this, 'Ending your game!'));
document.querySelector(".reset").addEventListener("click", resetGame)
document.querySelectorAll('img').forEach((hog) => { hog.addEventListener('click', onHogWack.bind(this, hog)) });

// Show score
displayStats();