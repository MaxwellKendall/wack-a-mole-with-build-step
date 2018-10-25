import './styles/scss/index.scss';

// global variables
let activeTimeout;
let gameClock;
let isGameOver = false;
let score = 0;
let numberOfHogs = 0;

// utils
const generateRandomNumber = () => Math.floor(Math.random() * 3000);
const generateRandomNumberBetween1and9 = () => Math.floor(Math.random() * 9) + 1; // random * high range of 10 minus 1, plus low range of 1

// game controls
const endGame = (message = 'Game over!') => {
  isGameOver = true;
  clearTimeout(activeTimeout);
  clearTimeout(gameClock);
  document.querySelectorAll('.hole')
    .forEach((hole) => {
      hole.children[0].classList.add('hide');
    });
  window.alert(message);
}

const resetGame = () => {
  endGame('resetting game!');
  showRandomGroundHog();
}

const hideHogAfterRandomDelay = (hog) => {
  activeTimeout = setTimeout(() => {
    hog.classList.add('hide');
    showRandomGroundHog();
  }, generateRandomNumber())
}

const showRandomGroundHog = () => {
  if (!isGameOver) {
    const randomHog = document.querySelector(`.hole-${generateRandomNumberBetween1and9()}`).children[0];
    randomHog.classList.remove('hide');
    numberOfHogs ++;
    hideHogAfterRandomDelay(randomHog);
  }
}

// Event listeners
document.querySelector('.start').addEventListener('click', () => {
  isGameOver = false;
  showRandomGroundHog();
  gameClock = window.setTimeout(endGame, 15000);
});

document.querySelector(".stop").addEventListener("click", () => {
  console.log("add stop function");
  endGame('Ending game...');
});

document.querySelector(".reset").addEventListener("click", () => {
  console.log("add reset function");
  resetGame();
});

document.querySelectorAll('img').forEach((hog) => {
  hog.addEventListener('click', () => {
    console.log('hog was clicked');
    hog.classList.add('hide');
    score ++;
  })
})

const displayScore = () => {
  document.getElementById("score").innerHTML = `SCORE: ${score} out of ${numberOfHogs}`;
}