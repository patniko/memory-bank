import { GameState, Direction, GAME_CONFIG } from './utils/constants.js';
import { Maze } from './entities/maze.js';
import { Player } from './entities/player.js';
import { InputManager } from './managers/input.js';
import { Renderer } from './managers/renderer.js';
import { GameStateManager } from './managers/game-state.js';
export class PacmanGame {
    constructor(canvasId) {
        // Get canvas element
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`Canvas element with id '${canvasId}' not found`);
        }
        this.canvas = canvas;
        // Initialize managers
        this.renderer = new Renderer(this.canvas);
        this.inputManager = new InputManager();
        this.gameStateManager = new GameStateManager();
        // Initialize game entities
        this.maze = new Maze();
        this.player = new Player(GAME_CONFIG.CANVAS_WIDTH / 2, GAME_CONFIG.CANVAS_HEIGHT / 2);
        // Game loop variables
        this.lastTime = 0;
        this.deltaTime = 0;
        this.isRunning = false;
        this.frameCount = 0;
        this.lastFpsTime = 0;
        this.initialize();
    }
    /**
     * Initialize the game
     */
    initialize() {
        this.setupInputHandlers();
        this.setupGameStateCallbacks();
        this.initializeGameData();
        // Start with menu state
        this.gameStateManager.changeState(GameState.MENU);
        console.log('Pacman game initialized');
    }
    /**
     * Setup input event handlers
     */
    setupInputHandlers() {
        // Direction changes
        this.inputManager.onDirectionChange(Direction.UP, () => {
            if (this.gameStateManager.isPlayable()) {
                this.player.setNextDirection(Direction.UP);
            }
        });
        this.inputManager.onDirectionChange(Direction.DOWN, () => {
            if (this.gameStateManager.isPlayable()) {
                this.player.setNextDirection(Direction.DOWN);
            }
        });
        this.inputManager.onDirectionChange(Direction.LEFT, () => {
            if (this.gameStateManager.isPlayable()) {
                this.player.setNextDirection(Direction.LEFT);
            }
        });
        this.inputManager.onDirectionChange(Direction.RIGHT, () => {
            if (this.gameStateManager.isPlayable()) {
                this.player.setNextDirection(Direction.RIGHT);
            }
        });
        // Pause/resume
        this.inputManager.onInput('pause', () => {
            this.togglePause();
        });
        // Start game
        this.inputManager.onInput('start', () => {
            this.handleStartInput();
        });
        // Handle continuous input
        this.setupContinuousInput();
    }
    /**
     * Setup continuous input handling for smooth movement
     */
    setupContinuousInput() {
        setInterval(() => {
            if (!this.gameStateManager.isPlayable())
                return;
            const direction = this.inputManager.getCurrentDirection();
            if (direction !== Direction.NONE) {
                this.player.setNextDirection(direction);
            }
        }, 50); // Check every 50ms for smooth movement
    }
    /**
     * Setup game state change callbacks
     */
    setupGameStateCallbacks() {
        this.gameStateManager.onStateChange(GameState.MENU, () => {
            this.showMenu();
        });
        this.gameStateManager.onStateChange(GameState.READY, () => {
            this.showReady();
        });
        this.gameStateManager.onStateChange(GameState.PLAYING, () => {
            this.startPlaying();
        });
        this.gameStateManager.onStateChange(GameState.PAUSED, () => {
            this.showPaused();
        });
        this.gameStateManager.onStateChange(GameState.GAME_OVER, () => {
            this.showGameOver();
        });
        this.gameStateManager.onStateChange(GameState.LEVEL_COMPLETE, () => {
            this.showLevelComplete();
        });
    }
    /**
     * Initialize game data
     */
    initializeGameData() {
        const totalPellets = this.maze.getRemainingPellets();
        this.gameStateManager.setPelletCount(totalPellets, totalPellets);
        this.updateUI();
    }
    /**
     * Start the game loop
     */
    start() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
        console.log('Game loop started');
    }
    /**
     * Stop the game loop
     */
    stop() {
        this.isRunning = false;
        console.log('Game loop stopped');
    }
    /**
     * Main game loop
     */
    gameLoop() {
        if (!this.isRunning)
            return;
        const currentTime = performance.now();
        this.deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        // Update FPS counter
        this.updateFPS(currentTime);
        // Update game state
        this.update(this.deltaTime);
        // Render game
        this.render();
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }
    /**
     * Update game logic
     */
    update(deltaTime) {
        if (!this.gameStateManager.isPlayable())
            return;
        // Update player
        this.player.update(deltaTime, this.maze);
        // Check pellet collection
        this.checkPelletCollection();
        // Check win condition
        if (this.maze.isComplete()) {
            this.completeLevel();
        }
        // Update UI
        this.updateUI();
    }
    /**
     * Render game
     */
    render() {
        // Clear canvas
        this.renderer.clear();
        // Render maze
        this.renderer.renderMaze(this.maze);
        // Render pellets
        this.renderer.renderPellets(this.maze);
        // Render player
        if (this.gameStateManager.isPlayable() || this.gameStateManager.isPaused()) {
            this.player.render(this.renderer.getContext());
        }
        // Render FPS (for debugging - disabled in production)
        // this.renderer.renderFPS(this.fpsCounter);
    }
    /**
     * Check for pellet collection
     */
    checkPelletCollection() {
        const playerGridPos = this.player.getGridPosition();
        const result = this.maze.collectPellet(playerGridPos.x, playerGridPos.y);
        if (result.collected) {
            if (result.isPowerPellet) {
                this.gameStateManager.addScore(GAME_CONFIG.POWER_PELLET_POINTS);
                // TODO: Implement power pellet effects (frighten ghosts)
            }
            else {
                this.gameStateManager.addScore(GAME_CONFIG.PELLET_POINTS);
            }
            // Update pellet count
            const remaining = this.maze.getRemainingPellets();
            const total = this.gameStateManager.getPelletCount().total;
            this.gameStateManager.setPelletCount(remaining, total);
        }
    }
    /**
     * Complete current level
     */
    completeLevel() {
        this.gameStateManager.changeState(GameState.LEVEL_COMPLETE);
    }
    /**
     * Handle start input based on current state
     */
    handleStartInput() {
        const currentState = this.gameStateManager.getCurrentState();
        switch (currentState) {
            case GameState.MENU:
                this.startNewGame();
                break;
            case GameState.READY:
                this.gameStateManager.changeState(GameState.PLAYING);
                break;
            case GameState.GAME_OVER:
                this.startNewGame();
                break;
            case GameState.LEVEL_COMPLETE:
                this.nextLevel();
                break;
        }
    }
    /**
     * Toggle pause state
     */
    togglePause() {
        if (this.gameStateManager.isState(GameState.PLAYING)) {
            this.gameStateManager.changeState(GameState.PAUSED);
        }
        else if (this.gameStateManager.isState(GameState.PAUSED)) {
            this.gameStateManager.changeState(GameState.PLAYING);
        }
    }
    /**
     * Start a new game
     */
    startNewGame() {
        this.gameStateManager.resetGame();
        this.maze.reset();
        // Reset player position
        this.player.respawn(GAME_CONFIG.CANVAS_WIDTH / 2, GAME_CONFIG.CANVAS_HEIGHT / 2);
        // Initialize pellet count
        const totalPellets = this.maze.getRemainingPellets();
        this.gameStateManager.setPelletCount(totalPellets, totalPellets);
        this.gameStateManager.changeState(GameState.READY);
    }
    /**
     * Advance to next level
     */
    nextLevel() {
        this.gameStateManager.nextLevel();
        this.gameStateManager.resetLevel();
        this.maze.reset();
        // Reset player position
        this.player.respawn(GAME_CONFIG.CANVAS_WIDTH / 2, GAME_CONFIG.CANVAS_HEIGHT / 2);
        // Initialize pellet count
        const totalPellets = this.maze.getRemainingPellets();
        this.gameStateManager.setPelletCount(totalPellets, totalPellets);
        this.gameStateManager.changeState(GameState.READY);
    }
    /**
     * Show menu screen
     */
    showMenu() {
        this.renderer.renderOverlay('Memory Bank Pacman', 'Press SPACE to start or tap Start to begin', true);
    }
    /**
     * Show ready screen
     */
    showReady() {
        this.renderer.renderOverlay('Ready!', 'Press SPACE to start or tap anywhere to begin', false);
        // Auto-start after 3 seconds
        setTimeout(() => {
            if (this.gameStateManager.isState(GameState.READY)) {
                this.gameStateManager.changeState(GameState.PLAYING);
            }
        }, 3000);
    }
    /**
     * Start playing
     */
    startPlaying() {
        this.renderer.hideOverlay();
    }
    /**
     * Show paused screen
     */
    showPaused() {
        this.renderer.renderOverlay('Paused', 'Press SPACE to resume or tap pause to continue', false);
    }
    /**
     * Show game over screen
     */
    showGameOver() {
        const score = this.gameStateManager.getScore();
        const highScore = this.gameStateManager.getHighScore();
        let message = `Score: ${score}`;
        if (score === highScore && score > 0) {
            message += ' - New High Score!';
        }
        message += '\nPress SPACE to play again';
        this.renderer.renderOverlay('Game Over', message, true);
    }
    /**
     * Show level complete screen
     */
    showLevelComplete() {
        const level = this.gameStateManager.getLevel();
        this.renderer.renderOverlay(`Level ${level} Complete!`, 'Press SPACE for next level', false);
        // Auto-advance after 2 seconds
        setTimeout(() => {
            if (this.gameStateManager.isState(GameState.LEVEL_COMPLETE)) {
                this.nextLevel();
            }
        }, 2000);
    }
    /**
     * Update UI elements
     */
    updateUI() {
        const gameData = this.gameStateManager.getGameData();
        this.renderer.updateUI(gameData.score, gameData.level, gameData.lives);
    }
    /**
     * Update FPS counter
     */
    updateFPS(currentTime) {
        this.frameCount++;
        if (currentTime - this.lastFpsTime >= 1000) {
            // Reset counter every second
            this.frameCount = 0;
            this.lastFpsTime = currentTime;
        }
    }
    /**
     * Clean up and destroy game
     */
    destroy() {
        this.stop();
        this.inputManager.destroy();
        this.renderer.destroy();
        console.log('Game destroyed');
    }
}
// Initialize and start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        const game = new PacmanGame('gameCanvas');
        game.start();
        // Make game accessible globally for debugging
        window.pacmanGame = game;
        console.log('Pacman game loaded successfully');
    }
    catch (error) {
        console.error('Failed to initialize Pacman game:', error);
    }
});
//# sourceMappingURL=game.js.map