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
    }
    return {
        render,
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
    let gameOve; 

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"), 
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currPlayerIndex = 0; 
        gameOver = false; 

        // make each sqaure clickable 
        const squares = document.querySelectorAll(".square"); 
        squares.forEach((square) => {
            square.addEventListener("click", makeClick);
        })
    }

    const makeClick = (event) => {
        console.log(event.target.id.split("-")[1]); 
    }

    return {
        start,
        // makeClick // unsure if i need to return this 
    }
})(); 

gameboard.render(); // makes the 3x3 grid show up 

const startButton = document.querySelector("#start-button");  
startButton.addEventListener("click", () => {
    gameController.start(); 
}); 

 