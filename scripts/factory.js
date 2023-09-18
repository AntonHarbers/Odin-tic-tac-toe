import { boardElement } from './var.js';

const player = (name, marker) => {
  return { name, marker };
};

export const gameboard = (() => {
  var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  const resetBoard = () => {
    gameboard.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  };
  return { board, resetBoard };
})();

export const game = (() => {
  const player1 = player('Player 1', 'X');
  const player2 = player('Player 2', 'O');
  var gameover = false;
  var currentPlayer = player1;
  var currentTurn = 0;
  var difficulty = '';
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

    // Check for a tie
    let isTie = true;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === '') {
          isTie = false; // If there's an empty cell, it's not a tie
          break; // Exit the inner loop
        }
      }
      if (!isTie) {
        break; // Exit the outer loop if there's an empty cell
      }
    }

    if (isTie) {
      return 'tie'; // Return a custom value for a tie
    }

    return null;
  };
  const makeComputerMove = () => {
    if (game.difficulty === 'Easy') {
      makeRandomMove();
    } else if (game.difficulty === 'Medium') {
      const random = Math.floor(Math.random() * 2);
      if (random === 0) {
        makeRandomMove();
      } else {
        makeBestMove();
      }
    } else if (game.difficulty === 'Hard') {
      makeBestMove();
    }

    //log the current time in milliseconds
    const end = new Date().getTime();
    //call the loop function
    console.log('end');
    console.log(end);
  };

  const makeRandomMove = () => {
    const board = gameboard.board;
    const randomRow = Math.floor(Math.random() * 3);
    const randomCol = Math.floor(Math.random() * 3);
    // easy computer
    if (board[randomRow][randomCol] === '') {
      board[randomRow][randomCol] = game.currentPlayer.marker;
      const cell = document.querySelector(
        `[data-row="${randomRow}"][data-col="${randomCol}"]`
      );
      cell.textContent = game.currentPlayer.marker;
      game.currentTurn++;
      game.currentPlayer = game.player1;
      currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;

      const winner = game.checkwinner();

      if (winner === 'tie') {
        currentPlayerText.textContent = 'Tie!';
        game.gameover = true;
      } else if (winner !== null && winner !== 'tie') {
        currentPlayerText.textContent = `${
          winner == 'X' ? game.player1.name : game.player2.name
        } wins!`;
        game.gameover = true;
      }
    } else {
      makeComputerMove();
    }
  };

  const makeBestMove = () => {
    const board = gameboard.board;

    const bestMove = minimax(board, game.currentPlayer.marker);
    board[bestMove.row][bestMove.col] = game.currentPlayer.marker;
    const cell = document.querySelector(
      `[data-row="${bestMove.row}"][data-col="${bestMove.col}"]`
    );
    cell.textContent = game.currentPlayer.marker;
    game.currentTurn++;
    game.currentPlayer = game.player1;
    currentPlayerText.textContent = `${game.currentPlayer.name}'s turn`;

    const winner = game.checkwinner();

    if (winner === 'tie') {
      currentPlayerText.textContent = 'Tie!';
      game.gameover = true;
    } else if (winner !== null && winner !== 'tie') {
      currentPlayerText.textContent = `${
        winner == 'X' ? game.player1.name : game.player2.name
      } wins!`;
      game.gameover = true;
    }
  };

  return {
    player1,
    player2,
    currentPlayer,
    checkwinner,
    gameover,
    currentTurn,
    difficulty,
    makeComputerMove,
  };
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
          if (game.difficulty != '' && game.currentPlayer === game.player2)
            return;
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

          if (game.currentTurn === 9) {
            currentPlayerText.textContent = 'Tie!';
            game.gameover = true;
          }

          const winner = game.checkwinner();

          if (winner !== null && winner !== 'tie') {
            currentPlayerText.textContent = `${
              winner == 'X' ? game.player1.name : game.player2.name
            } wins!`;
            game.gameover = true;
          } else if (winner === 'tie') {
            currentPlayerText.textContent = 'Tie!';
            game.gameover = true;
          } else {
            if (game.difficulty != '') {
              //log the current time in milliseconds
              const start = new Date().getTime();
              //call the loop function
              console.log('start');
              console.log(start);

              setTimeout(() => {
                game.makeComputerMove();
              }, 0);
            }
          }
        });
        row.appendChild(cell);
      }
    }
  };
  return { paintBoard };
})();

const minimax = (board, player) => {
  // check if the game is over, apply scores based on results
  const winner = game.checkwinner();
  if (winner !== null) {
    if (winner === game.player1.marker) {
      return { score: -10 };
    } else if (winner === game.player2.marker) {
      return { score: 10 };
    } else {
      return { score: 0 };
    }
  }

  // if the game is not over, create an array of possible moves
  let moves = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '') {
        let move = {};
        move.row = i;
        move.col = j;
        board[i][j] = player;
        // call minimax on the other player
        if (player === game.player2.marker) {
          const result = minimax(board, game.player1.marker);
          move.score = result.score;
        } else {
          const result = minimax(board, game.player2.marker);
          move.score = result.score;
        }
        board[i][j] = '';
        moves.push(move);
      }
    }
  }

  // evaluate the best move for the current player
  let bestMove;
  if (player === game.player2.marker) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
};
