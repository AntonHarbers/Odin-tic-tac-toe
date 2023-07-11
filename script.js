const gameboard = (() => {
    var board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    return {board};
})();

const player = (name, marker) => {
    return {name, marker};
}

const game = (() => {
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
    
    return {player1, player2, currentPlayer, checkwinner, gameover};
})();

const displayController = (() => {
    const paintBoard = () => {
        // get the current board state
        const board = gameboard.board;
        const boardElement = document.getElementById('board');
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
                    console.log(game.gameover);
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
                    if(game.currentTurn === 9) {
                        alert('Tie!');
                        game.gameover = true;
                    }
                    
                    const winner = game.checkwinner();
                    if (winner !== null) {
                        alert(`${winner} wins!`);
                        game.gameover = true
                    }
                });
                row.appendChild(cell);
            }
        }
    }
    return {paintBoard};
})();

displayController.paintBoard();