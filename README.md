# The Odin Project - Tic Tac Toe

A single and multiplayer tic tac toe game written in javascript, html and css for the Odin Project. Bundled using webpack.

[Live Link](https://antonharbers.github.io/Odin-tic-tac-toe/)

![Screenshot of Game](/public/repoImage.png)

## Folder Structure

```
    /.git               -> This git repository
    /dist               -> Destination for bundled project files
        /src                -> Favicon Container
        .png files          -> Webpack generated Image files
        background.mp3      -> Background music audio file
        button.wav          -> Button press audio file
        index.html          -> Entrypoint of the app
        kick.wav            -> Placing X or O audio file
        main.js             -> Webpack JS bundled code
    /public
        /images             -> Contains the images before webpack bundling
        repoImage.png       -> The repo Image
    /scripts
        factory.js
        script.js
        var.js
    /styles
    .gitignore
    package-lock.json
    package.json
    README.md           -> This readme file
    webpack.config.js   -> Webpack config file

```

## Key Concepts

### Factory Pattern

The Factory Pattern is used for creating objects without specifying the exact class. Here's a snippet showing how a player object is created:

JS:

```
    const playerFactory = (name, symbol) => {
        return { name, symbol };
    };

    const player1 = playerFactory('Alice', 'X');
    const player2 = playerFactory('Bob', 'O');
```

This modular approach allows easy management of game elements.

### Webpack

Webpack bundles JavaScript files and manages assets. Here's a part of the Webpack config file used:

JS:

```
    module.exports = {
        entry: './src/script.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        // Additional webpack configuration...
    };
```

This configuration helps in optimizing resource loading and improving user experience.

### Minimax Algorithm

The Minimax algorithm is crucial for the AI's decision-making process. Here's a simplified version of the algorithm used:

JS:

```
    function minimax(board, depth, isMaximizing) {
        if (checkWin(player)) {
            return 10;
        } else if (checkWin(ai)) {
            return -10;
        } else if (isTie()) {
            return 0;
        }
        // Recursive calls to minimax during gameplay...
    }
```

This algorithm helps the AI make competitive moves.

### Adding Function to Procedural DOM Elements

We dynamically create and manage DOM elements, like this snippet for the game board:

JS:

```
    function createBoard() {
        const gameBoard = document.createElement('div');
        gameBoard.className = 'game-board';
        // Creating cells for the game board...
        document.body.appendChild(gameBoard);
    }
```

This approach ensures a responsive and interactive UI.

## Final Notes

Tic, Tac, Toe is a classic game and creating it with code was a real fun ride. Initially it all felt straightforward and pretty basic, even up until the player vs player mode was complete. The real difficulty for me was the implementation of a simple AI that would make the computer play perfectly. In theory we all kind of know how to atleast draw in every tic tac toe game we play (if we have spent any time with the game at all), however putting this into logic and code was more difficult than I would have imaged. I went through youtube videos and tutorials by other programmers to try and wrap my head around the whole minimax Algorithm. Surely its not the only way to solve this problem, and im excited to return in the future and maybe test our other solutions. For now this project has helped me cement the skills learned in the odin project, helped me figure out webpack to some extent and really started opening my eyes to the world of Algorithms.
