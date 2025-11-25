//  create gameboard 
const gameboard = (() => {
    let gameboard = []; 
    for (let i = 0; i < 9; i++) {
        gameboard.push(""); 
    }
    const render = () => {
        let boardHTML = "";  
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#game-display").innerHTML = boardHTML; 
        attachSquareListeners(); 
    }
    return {
        render,
        board: gameboard,
    }
})(); 

// create gameController 
// needs to create players 

const createPlayer = (name, mark) => {
    return {
        name, 
        mark 
    }
}

const gameController = (() => {
    let players = []; 
    let currPlayerIndex; 
    let gameOver; 

    const winningCombos = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const start = () => {
        restart();
        players = [
            createPlayer(document.querySelector("#player1").value, "X"), 
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currPlayerIndex = 0; 
        gameOver = false; 

        gameboard.render();
    }

    const restart = () => {
        for (let i = 0; i < 9;i++) {
            gameboard.board[i] = "";
        }
        currPlayerIndex = 0; 
        gameOver = false;

        gameboard.render(); // redraw empty board
    }

    const makeClick = (event) => {
        if (gameOver) {
            return; 
        } 
        const index = parseInt(event.target.id.split("-")[1], 10); 
        if (Number.isNaN(index)) {
            return;
        }
        if (gameboard.board[index] !== "") {
            return; 
        }
        gameboard.board[index] = players[currPlayerIndex].mark;  

        const getPlayerName = (mark) => {
            return players.find(player => player.mark === mark);
        }

        const winner = checkWinner();
        if (winner) {
            const winningPlayer = getPlayerName(winner);
            alert(`${winningPlayer.name} wins!`);
            gameOver = true;
            gameboard.render(); 
            return;
        }
        if (checkTie()) {
            alert("It's an Tie!"); 
            gameOver = true;
            gameboard.render();
            return;
        }


        currPlayerIndex = currPlayerIndex === 0 ? 1 : 0; 

        gameboard.render(); 
    }

    const checkWinner = () => {
        for (let combo of winningCombos) {
            const [a, b, c] =  combo; 
            if (gameboard.board[a] && gameboard.board[a] === gameboard.board[b] && 
                gameboard.board[a] === gameboard.board[c]) {
                    return gameboard.board[a];    // returns winning mark if [a, b, c] all matches  
                }
        }
        return null; 
    }

    const checkTie = () =>  {
        return gameboard.board.every(square => square != ""); 
    }

    return {
        start,
        makeClick,
        restart,
    }
})(); 

// make each sqaure clickable 
function attachSquareListeners() {
    const squares = document.querySelectorAll(".square");  
    squares.forEach(square => {
         square.addEventListener("click", gameController.makeClick);
    });
}


gameboard.render(); // makes the 3x3 grid show up 

const startButton = document.querySelector("#start-button");  
startButton.addEventListener("click", () => {
    gameController.start(); 
}); 

const resetButton = document.querySelector("#restart-button"); 
resetButton.addEventListener("click", () => {
    gameController.restart(); 
});


 