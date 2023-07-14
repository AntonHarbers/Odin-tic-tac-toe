import {boardElement} from './var.js'

const player = (name, marker) => {
    return {name, marker};
}

export const gameboard = (() => {
    var board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    const resetBoard = () => {
        gameboard.board = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
    }
    return {board, resetBoard};
})();

export const game = (() => {
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');
    var gameover = false;
    var currentPlayer = player1;
    var currentTurn = 0;
    const checkwinner = () => {
        const board = gameboard.board;
        // check rows
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                if (board[i][0] !== '') {
                    return board[i][0];
                }
            }
        }
        // check columns
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                if (board[0][i] !== '') {
                    return board[0][i];
                }
            }
        }
        // check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if (board[0][0] !== '') {
                return board[0][0];
            }
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if (board[0][2] !== '') {
                return board[0][2];
            }
        }
        return null;
    }
    
    return {player1, player2, currentPlayer, checkwinner, gameover, currentTurn};
})();

export const displayController = (() => {
    const paintBoard = () => {
        // get the current board state
        const board = gameboard.board;
        // paint the board
        for (let i = 0; i < board.length; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            boardElement.appendChild(row);
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = board[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', (e) => {
                    if (e.target.textContent !== '') return;
                    if (game.gameover) return;
                    const row = e.target.dataset.row;
                    const col = e.target.dataset.col;
                    gameboard.board[row][col] = game.currentPlayer.marker;
                    e.target.textContent = game.currentPlayer.marker;
                    if (game.currentPlayer === game.player1) {
                        game.currentPlayer = game.player2;
                    } else {
                        game.currentPlayer = game.player1;
                    }
                    game.currentTurn++;
                    currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;

                    if(game.currentTurn === 9) {
                        currentPlayerText.textContent = 'Tie!'
                        game.gameover = true;
                    }
                    
                    const winner = game.checkwinner();

                    if (winner !== null) {
                        currentPlayerText.textContent = `${winner == "X" ? game.player1.name : game.player2.name } wins!`
                        game.gameover = true
                    }
                });
                row.appendChild(cell);
            }
        }
    }
    return {paintBoard};
})();

