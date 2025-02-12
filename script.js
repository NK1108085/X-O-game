const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const winningMessageText = document.getElementById('winningMessageText');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    winningMessage.classList.remove('show');
    isXTurn = true;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageText.textContent = "It's a Draw!";
    } else {
        winningMessageText.textContent = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
    }
    winningMessage.classList.add('show');
}

restartButton.addEventListener('click', startGame);

startGame();
