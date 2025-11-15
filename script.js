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

gameboard.render(); // starts the game

const startButton = document.querySelector("#start-button");  
startButton.addEventListener("click", () => {
    alert("Hello world");
}); 

 