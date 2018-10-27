import './styles/scss/index.scss';

(() => {
  // global variables (scoped within IIFE closure)
  let isGameOver = true;
  let score = 0;
  let numberOfmoles = 0;
  let gameClock;
  let activeTimeout;
  const difficultyLevelMap = { 0: { high: 3500, low: 400 }, 1: { high: 2000, low: 400 }, 2: {high: 1000, low: 400 }, 3: { high: 850, low: 100 }};

  const getDifficultyLevel = () => document.getElementById('difficulty').value;
  
  const getRandomTimeoutDuration = () => {
    const { low, high } = difficultyLevelMap[getDifficultyLevel()];
    return Math.floor(Math.random() * high) + low;
  }
  
  // ensures a range between 9 and 1
  const generateRandomNumberBetween1and9 = () => Math.floor(Math.random() * 9) + 1;
  const resetStats = () => {
    score = 0;
    numberOfmoles = 0;
  };
  // sets game duration
  const setGameClock = () => {
    gameClock = setTimeout(() => {
      isGameOver = true;
      hideAllmoles();
      displayNotification();
    }, 15000);
  };

  const hideAllmoles = () => {
    document.querySelectorAll('.mole').forEach((mole) => { hidemole(mole) });
  }

  // displays game stats
  const displayStats = () => {
    document.getElementById('js-score').innerHTML = `You've whacked ${score} out of ${numberOfmoles} moles!`;
  };

  // Functions for starting game
  const getRandommole = () => {
    return document.querySelector(`.mole-${generateRandomNumberBetween1and9()}`);
  }
  const showmole = (mole) => {
    numberOfmoles++;
    displayStats();
    mole.classList.contains('hide') ? mole.classList.remove('hide') : null;
  }

  const hidemole = (mole) => {
    mole.classList.contains('hide') ? null : mole.classList.add('hide');
  }

  const hidemoleAndSetNewmole = (mole) => {
    hidemole(mole);
    showRandommoleAndSetRandomHideTimeout();
  }

  const showRandommoleAndSetRandomHideTimeout = () => {
    // if game is not over -- (A) show random mole, (B) set the random hide mole time out, (C) increment mole counter, (D) display new stats
    if (!isGameOver) {
      const mole = getRandommole();
      showmole(mole);
      activeTimeout = setTimeout(hidemoleAndSetNewmole.bind(this, mole), getRandomTimeoutDuration());
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
      displayNotification('Starting a new game!');
      showRandommoleAndSetRandomHideTimeout();
    }
  };
  const endGame = (message = "Game Over!") => {
    if (!isGameOver) {
      isGameOver = true;
      clearTimeout(activeTimeout);
      clearTimeout(gameClock);
      hideAllmoles();
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
  const onMoleWack = (mole) => {
    hidemole(mole);
    score++;
    displayStats();
  };

  // Event listeners
  document.querySelector('.start').addEventListener('click', startGame);
  document.querySelector(".stop").addEventListener("click", endGame.bind(this, 'Ending your game!'));
  document.querySelector(".reset").addEventListener("click", resetGame)
  document.querySelectorAll('img').forEach((mole) => { mole.addEventListener('click', onMoleWack.bind(this, mole)) });

  // Show score
  displayStats();
  
  // display footer
  document.getElementById("js-footer").innerHTML = `Maxwell Kendall &#169 ${new Date().getFullYear()}`;
})();
