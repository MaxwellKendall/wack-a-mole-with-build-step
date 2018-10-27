import './styles/scss/index.scss';

(() => {
  // global variables (scoped within IIFE closure)
  let isGameOver = true;
  let score = 0;
  let numberOfHogs = 0;
  let gameClock;
  let activeTimeout;
  const difficultyLevelMap = { 0: { high: 3500, low: 400 }, 1: { high: 2000, low: 400 }, 2: {high: 1000, low: 400 }, 3: { high: 850, low: 100 }};

  const getDifficultyLevel = () => document.getElementById('difficulty').value;
  
  const getRandomTimeoutDuration = () => {
    const { low, high } = difficultyLevelMap[getDifficultyLevel()];
    const rtrn = Math.floor(Math.random() * high) + low;
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
      displayNotification();
    }, 15000);
  };

  const hideAllHogs = () => {
    document.querySelectorAll('.hog').forEach((hog) => { hideHog(hog) });
  }

  // displays game stats
  const displayStats = () => {
    document.getElementById('js-score').innerHTML = `You've wacked ${score} out of ${numberOfHogs} ground hogs!`;
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
  const displayNotification = (message = 'Game Over!') => {
    const gameNotification = document.getElementById('js-game-notification');
    gameNotification.classList.add('notification__open');
    gameNotification.innerHTML = message;
    setTimeout(() => {
      gameNotification.classList.remove('notification__open');
    }, 1500);
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
      displayNotification(message);
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
  // display footer
  document.getElementById("js-footer").innerHTML = `Maxwell Kendall &#169 ${new Date().getFullYear()}`;
})();
