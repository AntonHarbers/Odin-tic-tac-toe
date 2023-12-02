import { game, gameboard, displayController } from './factory.js';

import {
  player1NameInput,
  playerOneNameInputComputer,
  player2NameInput,
  startButton,
  startComputerGameButton,
  restartButton,
  gameScreen,
  pregameScreen,
  pregameScreenComputer,
  currentPlayerText,
  boardElement,
  pvpButton,
  easyButton,
  mediumButton,
  hardButton,
  selectModeScreen,
  mainMenuButton,
  difficultyText,
  endGameButtons,
} from './var.js';

import '../styles/style.css';

let difficulty = 'easy';

mainMenuButton.addEventListener('click', () => {
  returnToMainMenu();
});

pvpButton.addEventListener('click', () => {
  startPvpMode();
});

startButton.addEventListener('click', () => {
  startGame();
});

restartButton.addEventListener('click', () => {
  restartGame();
});

easyButton.addEventListener('click', () => {
  game.difficulty = 'easy';
});

mediumButton.addEventListener('click', () => {
  game.difficulty = 'medium';
});

hardButton.addEventListener('click', () => {
  game.difficulty = 'hard';
});

const returnToMainMenu = () => {
  gameScreen.classList.add('hidden');
  gameScreen.classList.remove('flex');
  selectModeScreen.classList.add('flex');
  selectModeScreen.classList.remove('hidden');
  startButton.disabled = false;
  player1NameInput.disabled = false;
  player2NameInput.disabled = false;
  player1NameInput.value = '';
  player2NameInput.value = '';
  game.gameover = false;
  game.currentTurn = 0;
  game.currentPlayer = game.player1;
  gameboard.board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }
};

const restartGame = () => {
  gameboard.resetBoard();
  game.currentTurn = 0;
  game.gameover = false;
  game.currentPlayer = game.player1;
  boardElement.innerHTML = '';
  displayController.paintBoard();
  currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;
};

const startPvpMode = () => {
  selectModeScreen.classList.add('hidden');
  selectModeScreen.classList.remove('flex');
  pregameScreen.classList.add('flex');
  pregameScreen.classList.remove('hidden');
  endGameButtons.classList.add('hidden');
};

easyButton.addEventListener('click', () => {
  enterComputerPregame('Easy');
  endGameButtons.classList.add('hidden');
});

mediumButton.addEventListener('click', () => {
  enterComputerPregame('Medium');
  endGameButtons.classList.add('hidden');
});

hardButton.addEventListener('click', () => {
  enterComputerPregame('Hard');
  endGameButtons.classList.add('hidden');
});

startButton.addEventListener('click', () => {
  if (player1NameInput.value === '' || player2NameInput.value === '') {
    alert('Please enter a name for both players');
    return;
  }
  endGameButtons.classList.add('hidden');
  game.player1.name = player1NameInput.value;
  game.player2.name = player2NameInput.value;
  displayController.paintBoard();
  startButton.disabled = true;
  player1NameInput.disabled = true;
  player2NameInput.disabled = true;

  gameScreen.classList.add('flex');
  gameScreen.classList.remove('hidden');

  pregameScreen.classList.add('hidden');
  pregameScreen.classList.remove('flex');
  currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;
});

startComputerGameButton.addEventListener('click', () => {
  if (playerOneNameInputComputer.value === '') {
    alert('Please enter a name for the player');
    return;
  }

  const random = Math.floor(Math.random() * 2);
  game.currentPlayer = random === 0 ? game.player1 : game.player2;

  game.player1.name = playerOneNameInputComputer.value;
  game.player2.name = 'Computer';
  displayController.paintBoard();
  startButton.disabled = true;
  player1NameInput.disabled = true;
  player2NameInput.disabled = true;

  gameScreen.classList.add('flex');
  gameScreen.classList.remove('hidden');

  pregameScreenComputer.classList.add('hidden');
  pregameScreenComputer.classList.remove('flex');
  currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;

  if (game.currentPlayer === game.player2) {
    setTimeout(() => {
      game.makeComputerMove();
    }, 1000);
  }
});

restartButton.addEventListener('click', () => {
  gameboard.resetBoard();
  endGameButtons.classList.add('hidden');
  game.currentTurn = 0;
  game.gameover = false;
  const random = Math.floor(Math.random() * 2);

  game.currentPlayer = random === 0 ? game.player1 : game.player2;
  boardElement.innerHTML = '';
  displayController.paintBoard();
  currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;

  if (game.currentPlayer === game.player2 && game.difficulty !== '') {
    setTimeout(() => {
      game.makeComputerMove();
    }, 1000);
  }
});

const enterComputerPregame = (difficulty) => {
  game.difficulty = difficulty;
  endGameButtons.classList.add('hidden');
  difficultyText.textContent = ` ${difficulty} Mode`;
  selectModeScreen.classList.add('hidden');
  selectModeScreen.classList.remove('flex');
  pregameScreenComputer.classList.add('flex');
  pregameScreenComputer.classList.remove('hidden');
};
