const boardSize = 4;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

function initGame() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${row}-${col}`;
            document.getElementById('game-board').appendChild(cell);
        }
    }
    addRandomTile();
    addRandomTile();
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
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
        updateBoard();
    }
}

function updateBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            if (board[row][col] !== null) {
                cell.textContent = board[row][col];
                cell.style.backgroundColor = getCellColor(board[row][col]);
            } else {
                cell.textContent = '';
                cell.style.backgroundColor = '#eee4da';
            }
        }
    }
}

function getCellColor(value) {
    switch (value) {
        case 2: return '#776e65';
        case 4: return '#776e65';
        case 8: return '#f9ed69';
        case 16: return '#f3b27a';
        case 32: return '#f69660';
        case 64: return '#f77c5f';
        case 128: return '#edd073';
        case 256: return '#edcc61';
        case 512: return '#edc958';
        case 1024: return '#edc556';
        case 2048: return '#edc25e';
        default: return '#eee4da';
    }
}

function moveUp() {
    for (let col = 0; col < boardSize; col++) {
        let emptyRow = 0;
        for (let row = 1; row < boardSize; row++) {
            if (board[row][col] !== null) {
                if (board[emptyRow][col] === null || board[emptyRow][col] === board[row][col]) {
                    board[emptyRow][col] = board[row][col];
                    if (row !== emptyRow) {
                        board[row][col] = null;
                    }
                    emptyRow++;
                } else {
                    emptyRow = row;
                }
            }
        }
    }
    addRandomTile();
}

function moveDown() {
    for (let col = 0; col < boardSize; col++) {
        let emptyRow = boardSize - 1;
        for (let row = boardSize - 2; row >= 0; row--) {
            if (board[row][col] !== null) {
                if (board[emptyRow][col] === null || board[emptyRow][col] === board[row][col]) {
                    board[emptyRow][col] = board[row][col];
                    if (row !== emptyRow) {
                        board[row][col] = null;
                    }
                    emptyRow--;
                } else {
                    emptyRow = row;
                }
            }
        }
    }
    addRandomTile();
}

function moveLeft() {
    for (let row = 0; row < boardSize; row++) {
        let emptyCol = 0;
        for (let col = 1; col < boardSize; col++) {
            if (board[row][col] !== null) {
                if (board[row][emptyCol] === null || board[row][emptyCol] === board[row][col]) {
                    board[row][emptyCol] = board[row][col];
                    if (col !== emptyCol) {
                        board[row][col] = null;
                    }
                    emptyCol++;
                } else {
                    emptyCol = col;
                }
            }
        }
    }
    addRandomTile();
}

function moveRight() {
    for (let row = 0; row < boardSize; row++) {
        let emptyCol = boardSize - 1;
        for (let col = boardSize - 2; col >= 0; col--) {
            if (board[row][col] !== null) {
                if (board[row][emptyCol] === null || board[row][emptyCol] === board[row][col]) {
                    board[row][emptyCol] = board[row][col];
                    if (col !== emptyCol) {
                        board[row][col] = null;
                    }
                    emptyCol--;
                } else {
                    emptyCol = col;
                }
            }
        }
    }
    addRandomTile();
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
