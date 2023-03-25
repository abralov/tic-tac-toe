const squares = document.querySelectorAll('.square');
const restartButton = document.querySelector('.restart');
const playerTurn = document.querySelector('.game-info div');
const movesList = document.querySelector('.game-info ol');
let currentPlayer = 'X';
let moves = 0;

function checkWinner() {
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (squares[a].textContent === squares[b].textContent && squares[b].textContent === squares[c]
            .textContent && squares[a].textContent !== '') {
            return true;
        }
    }
    return false;
}

function handleMove(e) {
    if (e.target.textContent === '') {
        e.target.textContent = currentPlayer;
        moves++;
        movesList.innerHTML +=
            `<li>Go to move #${moves}</li>`;

        if (checkWinner()) {
            playerTurn.textContent = `Winner: ${currentPlayer}`;
            squares.forEach(square => square.removeEventListener('click', handleMove));
        } else if (moves === 9) {
            playerTurn.textContent = `It's a draw!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurn.textContent = `Next player: ${currentPlayer}`;
        }
    }
}

function restartGame() {
    currentPlayer = 'X';
    moves = 0;
    squares.forEach(square => {
        square.textContent = '';
        square.addEventListener('click', handleMove, {
            once: true
        });
    });
    playerTurn.textContent = `Next player: ${currentPlayer}`;
    movesList.innerHTML = `<li> Go to game start (current)</li>`;
}

squares.forEach(square => square.addEventListener('click', handleMove));
restartButton.addEventListener('click', restartGame);