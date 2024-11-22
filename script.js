const boardSize = 4;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

function initGame() {
    for (let i = 0; i < 2; i++) {
        addRandomTile();
    }
    renderBoard();
}

function addRandomTile() {
    let emptyCells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === null) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[row][col] !== null) {
                cell.textContent = board[row][col];
                cell.classList.add(`cell-${board[row][col]}`);
            }
            boardElement.appendChild(cell);
        }
    }
}

function moveUp() {
    for (let col = 0; col < boardSize; col++) {
        let emptyRow = 0;
        for (let row = 1; row < boardSize; row++) {
            if (board[row][col] !== null) {
                if (board[emptyRow][col] === null || board[emptyRow][col] === board[row][col]) {
                    if (board[emptyRow][col] === board[row][col]) {
                        // Merge tiles
                        board[emptyRow][col] = board[row][col] * 2;
                        board[row][col] = null;
                    } else {
                        board[emptyRow][col] = board[row][col];
                        emptyRow++;
                    }
                } else {
                    emptyRow = row;
                }
            }
        }
    }
    addRandomTile();
    renderBoard();
}

function moveDown() {
    for (let col = 0; col < boardSize; col++) {
        let emptyRow = boardSize - 1;
        for (let row = boardSize - 2; row >= 0; row--) {
            if (board[row][col] !== null) {
                if (board[emptyRow][col] === null || board[emptyRow][col] === board[row][col]) {
                    if (board[emptyRow][col] === board[row][col]) {
                        // Merge tiles
                        board[emptyRow][col] = board[row][col] * 2;
                        board[row][col] = null;
                    } else {
                        board[emptyRow][col] = board[row][col];
                        emptyRow--;
                    }
                } else {
                    emptyRow = row;
                }
            }
        }
    }
    addRandomTile();
    renderBoard();
}

function moveLeft() {
    for (let row = 0; row < boardSize; row++) {
        let emptyCol = 0;
        for (let col = 1; col < boardSize; col++) {
            if (board[row][col] !== null) {
                if (board[row][emptyCol] === null || board[row][emptyCol] === board[row][col]) {
                    if (board[row][emptyCol] === board[row][col]) {
                        // Merge tiles
                        board[row][emptyCol] = board[row][col] * 2;
                        board[row][col] = null;
                    } else {
                        board[row][emptyCol] = board[row][col];
                        emptyCol++;
                    }
                } else {
                    emptyCol = col;
                }
            }
        }
    }
    addRandomTile();
    renderBoard();
}

function moveRight() {
    for (let row = 0; row < boardSize; row++) {
        let emptyCol = boardSize - 1;
        for (let col = boardSize - 2; col >= 0; col--) {
            if (board[row][col] !== null) {
                if (board[row][emptyCol] === null || board[row][emptyCol] === board[row][col]) {
                    if (board[row][emptyCol] === board[row][col]) {
                        // Merge tiles
                        board[row][emptyCol] = board[row][col] * 2;
                        board[row][col] = null;
                    } else {
                        board[row][emptyCol] = board[row][col];
                        emptyCol--;
                    }
                } else {
                    emptyCol = col;
                }
            }
        }
    }
    addRandomTile();
    renderBoard();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});

initGame();
