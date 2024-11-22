

const boardSize = 4;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
let gameOver = false;
                                                                                
let score = 0;                                                                 
                                                                                
function updateScore(points) {                                                 
    score += points;                                                           
    document.getElementById('score').innerText = `Score: ${score}`;            
}    

function initGame() {
    resetBoard();
    addRandomTile();
    addRandomTile();
    renderBoard();
}

function resetBoard() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            board[row][col] = null;
        }
    }
    gameOver = false;
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;  
    document.getElementById('gameOver').style.display = 'none';
}

function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (!board[row][col]) {
                emptyCells.push({ row, col });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[row][col]) {
                tile.textContent = board[row][col];
                tile.style.backgroundColor = getTileColor(board[row][col]);
            }
            gameBoard.appendChild(tile);
        }
    }
}

function getTileColor(value) {
    switch (value) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc950';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#eee4da';
    }
}

function checkGameOver() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (!board[row][col]) {
                return false;
            }
            if ((row > 0 && board[row][col] === board[row - 1][col]) ||
                (row < boardSize - 1 && board[row][col] === board[row + 1][col]) ||
                (col > 0 && board[row][col] === board[row][col - 1]) ||
                (col < boardSize - 1 && board[row][col] === board[row][col + 1])) {
                return false;
            }
        }
    }
    return true;
}

function newGame() {
    resetBoard();
    addRandomTile();
    addRandomTile();
    renderBoard();
    gameOver = false;
    document.getElementById('gameOver').style.display = 'none';
}

document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    const key = event.key;
    let moved = false;

    switch (key) {
        case 'ArrowUp':
            for (let col = 0; col < boardSize; col++) {
                let newRow = 0;
                let points = 0;
                for (let row = 1; row < boardSize; row++) {
                    if (board[row][col]) {
                        if (!board[newRow][col] || board[newRow][col] === board[row][col]) {
                            board[newRow][col] = board[newRow][col] ? board[newRow][col] * 2 : board[row][col];
                            points += board[newRow][col];
                            board[row][col] = null;
                            newRow++;
                        } else {
                            newRow++;
                        }
                    }
                }
                if (points > 0) {                                              
                    updateScore(points);                                       
                }  
            }
            moved = true;
            break;
        case 'ArrowDown':
            for (let col = 0; col < boardSize; col++) {
                let newRow = boardSize - 1;
                let points = 0;
                for (let row = boardSize - 2; row >= 0; row--) {
                    if (board[row][col]) {
                        if (!board[newRow][col] || board[newRow][col] === board[row][col]) {
                            board[newRow][col] = board[newRow][col] ? board[newRow][col] * 2 : board[row][col];
                            points += board[newRow][col];
                            board[row][col] = null;
                            newRow--;
                        } else {
                            newRow--;
                        }
                    }
                }
                if (points > 0) {                                              
                    updateScore(points);                                       
                }  
            }
            moved = true;
            break;
        case 'ArrowLeft':
            for (let row = 0; row < boardSize; row++) {
                let newCol = 0;
                let points = 0;
                for (let col = 1; col < boardSize; col++) {
                    if (board[row][col]) {
                        if (!board[row][newCol] || board[row][newCol] === board[row][col]) {
                            board[row][newCol] = board[row][newCol] ? board[row][newCol] * 2 : board[row][col];
                            points += board[row][newCol];
                            board[row][col] = null;
                            newCol++;
                        } else {
                            newCol++;
                        }
                    }
                }
                if (points > 0) {                                              
                    updateScore(points);                                       
                }  
            }
            moved = true;
            break;
        case 'ArrowRight':
            for (let row = 0; row < boardSize; row++) {
                let newCol = boardSize - 1;
                let points = 0;
                for (let col = boardSize - 2; col >= 0; col--) {
                    if (board[row][col]) {
                        if (!board[row][newCol] || board[row][newCol] === board[row][col]) {
                            board[row][newCol] = board[row][newCol] ? board[row][newCol] * 2 : board[row][col];
                            points += board[row][newCol];
                            board[row][col] = null;
                            newCol--;
                        } else {
                            newCol--;
                        }
                    }
                }
                if (points > 0) {                                              
                    updateScore(points);                                       
                }  
            }
            moved = true;
            break;
    }

    if (moved) {
        addRandomTile();
        renderBoard();
        gameOver = checkGameOver();
        if (gameOver) {
            document.getElementById('gameOver').style.display = 'block';
            document.getElementById('final-score').innerText = score; 
        }
    }
});

initGame();
