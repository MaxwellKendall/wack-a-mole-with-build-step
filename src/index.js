import './styles/scss/index.scss';

const generateRandomNumber = () => Math.floor(Math.random() * 10000);
const generateRandomNumberBetween1and9 = () => Math.floor(Math.random() * 9) + 1; // random * high range of 10 minus 1, plus low range of 1
const endGame = () => {
  setTimeout(() => {
    /** 
     * After some amount of time, hide all groundhogs and set a flag which prevents showRandomGroundHog from triggering
    */
  })
}

const hideHogAfterRandomDelay = (hog) => {
  setTimeout(() => {
    hog.classList.remove('show').add('hide');
    showRandomGroundHog();
  }, generateRandomNumber())
}
const showRandomGroundHog = () => {
  const randomHog = document.querySelector(`.hole-${generateRandomNumberBetween1and9()}`);
  randomHog.classList.remove('hide').add('show');
  hideHogAfterRandomDelay(randomHog);
}
document.querySelector('.start').addEventListener('click', () => {
  console.log('yoooooo');
  showRandomGroundHog();
});

document.querySelector(".stop").addEventListener("click", () => {
  console.log("add stop function");
});

document.querySelector(".reset").addEventListener("click", () => {
  console.log("add reset function");
});
