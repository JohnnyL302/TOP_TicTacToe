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

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"), 
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currPlayerIndex = 0; 
        gameOver = false; 

        gameboard.render();

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
        currPlayerIndex = currPlayerIndex === 0 ? 1 : 0; 

        gameboard.render(); 
    }

    return {
        start,
        makeClick 
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

 