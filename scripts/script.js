import {game, gameboard, displayController} from '/scripts/factory.js'

import { 
    player1NameInput, 
    player2NameInput, 
    startButton, 
    restartButton, 
    gameScreen, 
    pregameScreen, 
    currentPlayerText, 
    boardElement, 
    pvpButton, 
    easyButton, 
    mediumButton, 
    hardButton, 
    selectModeScreen, 
    mainMenuButton 
} from '/scripts/var.js'

mainMenuButton.addEventListener('click', () => {
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
        ['','',''],
        ['','',''],
        ['','','']
    ];
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
});

pvpButton.addEventListener('click', () => {
    selectModeScreen.classList.add('hidden');
    selectModeScreen.classList.remove('flex');
    pregameScreen.classList.add('flex');
    pregameScreen.classList.remove('hidden');
});

startButton.addEventListener('click', () => {
    if (player1NameInput.value === '' || player2NameInput.value === '') {
        alert('Please enter a name for both players');
        return;
    }
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

restartButton.addEventListener('click', () => {
    gameboard.resetBoard();
    game.currentTurn = 0;
    game.gameover = false;
    game.currentPlayer = game.player1;
    boardElement.innerHTML = '';
    displayController.paintBoard();
    currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;
});