class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameBoard = document.getElementById('game-board');
        this.currentPlayerElement = document.getElementById('current-player');
        this.gameStatusElement = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-button');
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.gameBoard.addEventListener('click', this.handleCellClick.bind(this));
        this.resetButton.addEventListener('click', this.resetGame.bind(this));
        this.updateDisplay();
    }
    
    handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));
        
        if (!cell.classList.contains('cell') || this.board[cellIndex] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(cellIndex, cell);
    }
    
    makeMove(index, cellElement) {
        this.board[index] = this.currentPlayer;
        cellElement.textContent = this.currentPlayer;
        cellElement.classList.add('taken', this.currentPlayer.toLowerCase());
        
        if (this.checkWinner()) {
            this.gameActive = false;
            this.gameStatusElement.textContent = `Player ${this.currentPlayer} wins!`;
            this.gameStatusElement.classList.add('winner');
            this.highlightWinningCells();
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.gameStatusElement.textContent = "It's a draw!";
            this.gameStatusElement.classList.add('draw');
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }
    
    checkWinner() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        this.winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                const cells = this.gameBoard.children;
                cells[a].style.backgroundColor = '#4CAF50';
                cells[b].style.backgroundColor = '#4CAF50';
                cells[c].style.backgroundColor = '#4CAF50';
                cells[a].style.color = 'white';
                cells[b].style.color = 'white';
                cells[c].style.color = 'white';
            }
        });
    }
    
    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
        this.currentPlayerElement.style.color = this.currentPlayer === 'X' ? '#e74c3c' : '#3498db';
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameStatusElement.textContent = '';
        this.gameStatusElement.classList.remove('winner', 'draw');
        
        Array.from(this.gameBoard.children).forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken', 'x', 'o');
            cell.style.backgroundColor = '';
            cell.style.color = '';
        });
        
        this.updateDisplay();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});