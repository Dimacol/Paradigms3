'use strict'

let currentUser = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const restart = document.querySelector('button');
const cell = document.querySelectorAll('.cell');
const turn = document.querySelector('.status');
const handlePlayerChange = () => {
    currentUser === 'X' ? currentUser = 'O' : currentUser = 'X';
    turn.textContent = `Поставьте ${currentUser}`; 
};

function win(){
    for (let line of winningLines) {
        const a = gameState[line[0]];
        const b = gameState[line[1]];
        const c = gameState[line[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        } else if (a === b && b === c) {           
            turn.textContent = `Поздравляем! Игрок ${currentUser} выиграл!`; 
            gameActive = false;            
            return;
        };
    };

    if (!(gameState.includes(""))) {
        turn.textContent = 'Ничья! Победила дружба'; 
        gameActive = false;
        return;
    };
    handlePlayerChange();
};

function restartGame () {
    currentUser = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    cell.forEach(e => e.textContent = '');
    turn.textContent = `Поставьте ${currentUser}`; 
};

function handClick(event) {
    let cellActive = event.target.getAttribute('data-cell-index');
        if (!gameActive || gameState[cellActive] !== "") {
            return;
        } else {
            gameState[cellActive] = currentUser;
            event.target.textContent = currentUser;
            win();
        };
};


cell.forEach(e => e.addEventListener('click', handClick));
restart.addEventListener('click', restartGame);