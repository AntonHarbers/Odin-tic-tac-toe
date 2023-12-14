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
  buttonPressAudio,
  backgroundAudio,
} from './var.js';

import '../styles/style.css';

// EVENT LISTENERS

document.addEventListener('click', startMusicPlayback, { once: true });

mainMenuButton.addEventListener('click', () => {
  buttonPressAudio.play();
  returnToMainMenu();
});

pvpButton.addEventListener('click', () => {
  buttonPressAudio.play();
  startPvpMode();
});

startButton.addEventListener('click', () => {
  buttonPressAudio.play();
  startPVPGame();
});

restartButton.addEventListener('click', () => {
  buttonPressAudio.play();
  restartGame();
});

easyButton.addEventListener('click', () => {
  buttonPressAudio.play();
  enterComputerPregame('Easy');
  endGameButtons.classList.add('hidden');
});

mediumButton.addEventListener('click', () => {
  buttonPressAudio.play();
  enterComputerPregame('Medium');
  endGameButtons.classList.add('hidden');
});

hardButton.addEventListener('click', () => {
  buttonPressAudio.play();
  enterComputerPregame('Hard');
  endGameButtons.classList.add('hidden');
});

startComputerGameButton.addEventListener('click', () => {
  buttonPressAudio.play();
  startGameAgainstComputer();
});

// HELPER FUNCTIONS

const startPvpMode = () => {
  selectModeScreen.classList.add('hidden');
  selectModeScreen.classList.remove('flex');
  pregameScreen.classList.add('flex');
  pregameScreen.classList.remove('hidden');
  endGameButtons.classList.add('hidden');
};

const enterComputerPregame = (difficulty) => {
  game.difficulty = difficulty;
  endGameButtons.classList.add('hidden');
  difficultyText.textContent = ` ${difficulty} Mode`;
  selectModeScreen.classList.add('hidden');
  selectModeScreen.classList.remove('flex');
  pregameScreenComputer.classList.add('flex');
  pregameScreenComputer.classList.remove('hidden');
};

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
};

function startPVPGame() {
  if (player1NameInput.value === '' || player2NameInput.value === '') {
    alert('Please enter a name for both players');
    return;
  }
  startButton.disabled = true;
  player1NameInput.disabled = true;
  player2NameInput.disabled = true;
  gameScreen.classList.add('flex');
  gameScreen.classList.remove('hidden');
  pregameScreen.classList.add('hidden');
  pregameScreen.classList.remove('flex');
  endGameButtons.classList.add('hidden');
  game.player1.name = player1NameInput.value;
  game.player2.name = player2NameInput.value;
  displayController.paintBoard();
  currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;
}

function startGameAgainstComputer() {
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
}

function startMusicPlayback() {
  backgroundAudio.volume = 0.1;
  buttonPressAudio.volume = 0.2;
  backgroundAudio.play();
}
