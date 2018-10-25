import './styles/scss/index.scss';

// global variables
let activeTimeout;

const generateRandomNumber = () => Math.floor(Math.random() * 3000);
const generateRandomNumberBetween1and9 = () => Math.floor(Math.random() * 9) + 1; // random * high range of 10 minus 1, plus low range of 1
const endGame = (message = 'Game over!') => {
  clearTimeout(activeTimeout);
  activeTimeout = message;
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
  const randomHog = document.querySelector(`.hole-${generateRandomNumberBetween1and9()}`).children[0];
  randomHog.classList.remove('hide');
  hideHogAfterRandomDelay(randomHog);
}

// Event listeners
document.querySelector('.start').addEventListener('click', () => {
  showRandomGroundHog();
  window.setTimeout(endGame, 15000);
});

document.querySelector(".stop").addEventListener("click", () => {
  console.log("add stop function");
  endGame('Ending game...');
});

document.querySelector(".reset").addEventListener("click", () => {
  console.log("add reset function");
  resetGame();
});
