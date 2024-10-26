// Select elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const clickSoundX = document.getElementById('clickSoundX');
const clickSoundO = document.getElementById('clickSoundO');
const winSound = document.getElementById('winSound');

// Game variables
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Functions
const updateStatus = (message) => {
    statusText.textContent = message;
};

const playClickSound = () => {
    if (currentPlayer === 'X') {
        clickSoundX.play();
    } else {
        clickSoundO.play();
    }
};

const playWinSound = () => {
    winSound.play();
};

// Handle cell click
const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Check if the cell is empty and game is active
    if (!gameBoard[index] && isGameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        playClickSound();
        checkWinner();
        switchPlayer();
    }
};

// Check if there's a winner
const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateStatus(`Player ${currentPlayer} wins!`);
        playWinSound();
        isGameActive = false;
    } else if (!gameBoard.includes(null)) {
        updateStatus("It's a tie!");
        isGameActive = false;
    }
};

// Switch player
const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (isGameActive) {
        updateStatus(`Player ${currentPlayer}'s turn`);
    }
};

// Reset game
const resetGame = () => {
    gameBoard = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    isGameActive = true;
    currentPlayer = 'X';
    updateStatus("Player X's turn");
};

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize game
updateStatus("Player X's turn");
