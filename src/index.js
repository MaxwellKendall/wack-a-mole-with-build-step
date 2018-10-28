/**
 * Written by Max Kendall on 10/27/18, using Parcel as a build step and SASS as the CSS PreProcessor
 * 
 * Program designed around three concepts
* I. Single source of trouth -- all functions refer to isGameOver when determining whether or not to execute
* II. Semantic Naming -- random node or "mole" selected based on CSS class naming convention `mole-${number}`
* III. JavaScript Timeouts -- implemented to hide the randomly selected node if they are not otherwise hidden by a user click
 */

import './styles/scss/index.scss';

(() => {
  // global variables (scoped within IIFE closure)
  let isGameOver = true;
  let score = 0;
  let numberOfMoles = 0;
  let gameClock;
  let activeTimeout;
  const difficultyLevelMap = { 0: { high: 3500, low: 400 }, 1: { high: 2000, low: 400 }, 2: {high: 1000, low: 400 }, 3: { high: 850, low: 100 }};
  
  // general utility functions
  const getDifficultyLevel = () => document.getElementById('difficulty').value;
  const getDifficultyLevelNumbers = () => difficultyLevelMap[getDifficultyLevel()];
  const getRandomTimeoutDurationBasedOnDifficultyLevel = () => {
    const { low, high } = getDifficultyLevelNumbers();
    return Math.floor(Math.random() * high) + low;
  }
  const generateRandomNumberBetween1and9 = () => Math.floor(Math.random() * 9) + 1;
  const resetStats = () => { score = 0; numberOfMoles = 0; };
  
  // sets game duration
  const setGameClock = () => {
    gameClock = setTimeout(() => {
      isGameOver = true;
      hideAllMoles();
      displayNotification();
    }, 15000);
  };
  // hides all moles
  const hideAllMoles = () => {
    document.querySelectorAll('.mole').forEach((mole) => { hideMole(mole) });
  }

  // displays game stats
  const displayStats = () => {
    document.getElementById('js-score').innerHTML = `You've whacked ${score} out of ${numberOfMoles} moles!`;
  };

  // returns a random mole
  const getRandomMole = () => {
    return document.querySelector(`.mole-${generateRandomNumberBetween1and9()}`);
  }

  // shows a mole
  const showMole = (mole) => {
    numberOfMoles++;
    displayStats();
    mole.classList.contains('hide') ? mole.classList.remove('hide') : null;
  }
  
  // hides a mole
  const hideMole = (mole) => {
    mole.classList.contains('hide') ? null : mole.classList.add('hide');
  }

  // Hides current mole and chooses/shows the next
  const hideMoleAndSetNewMole = (mole) => {
    hideMole(mole);
    showRandomMoleAndSetRandomHideTimeout();
  }

  // shows random mole and sets time out to hide it
  const showRandomMoleAndSetRandomHideTimeout = () => {
    if (!isGameOver) {
      const mole = getRandomMole();
      showMole(mole);
      activeTimeout = setTimeout(hideMoleAndSetNewMole.bind(this, mole), getRandomTimeoutDurationBasedOnDifficultyLevel());
    }
  };

  /**
   * @param {message} message the string to display to the user
   * @returns {Promise} promise that resolves when the notification is removed
   */
  const displayNotification = (message = `Game over!`) => {
    const gameNotification = document.getElementById('js-game-notification');
    gameNotification.classList.add('notification__open');
    gameNotification.innerHTML = message;

    return new Promise((resolve) => {
      setTimeout(() => {
        gameNotification.classList.remove('notification__open');
        resolve('notification has been removed');
      }, 1500);
    })
  }

  // Functions which compose together the functions above
  const startGame = () => {
    if (isGameOver) {
      isGameOver = false;
      setGameClock();
      resetStats();
      displayStats();
      displayNotification(`Starting a new game!`)
        .then(() => {
          showRandomMoleAndSetRandomHideTimeout();
        });
    }
  };

  const endGame = (message = 'Game Over!') => {
    if (!isGameOver) {
      isGameOver = true;
      clearTimeout(activeTimeout);
      clearTimeout(gameClock);
      hideAllMoles();
      displayNotification(message);
      resetStats();
      displayStats();
    }
  };

  const resetGame = () => {
    clearTimeout(activeTimeout);
    endGame('Resetting game...');
    resetStats();
    displayStats();
    startGame();
  };

  const onMoleWhack = (mole) => {
    hideMole(mole);
    score++;
    displayStats();
  };

  // Event listeners
  document.querySelector('.start').addEventListener('click', startGame);
  document.querySelector('.stop').addEventListener('click', endGame.bind(this, 'Game has been stopped!'));
  document.querySelector('.reset').addEventListener('click', resetGame)
  document.querySelectorAll('.mole').forEach((mole) => { mole.addEventListener('click', onMoleWhack.bind(this, mole)) });

  // Show score
  displayStats();
  
  // display footer
  document.getElementById('js-footer').innerHTML = `Maxwell Kendall &#169 ${new Date().getFullYear()}`;
})();
