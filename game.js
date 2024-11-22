document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const rows = 4;
    const cols = 4;

    function createBoard() {
        for (let i = 0; i < rows * cols; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
        }
    }

    function initGame() {
        createBoard();
        // Add initial tiles
        addTile();
        addTile();
    }

    function addTile() {
        const emptyCells = Array.from(document.querySelectorAll('.cell:not(.has-tile)'));
        if (emptyCells.length === 0) return;

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.classList.add('has-tile');
        randomCell.textContent = Math.random() < 0.9 ? '2' : '4';
    }

    initGame();
});
