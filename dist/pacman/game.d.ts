export declare class PacmanGame {
    private canvas;
    private renderer;
    private inputManager;
    private gameStateManager;
    private maze;
    private player;
    private lastTime;
    private deltaTime;
    private isRunning;
    private frameCount;
    private lastFpsTime;
    constructor(canvasId: string);
    /**
     * Initialize the game
     */
    private initialize;
    /**
     * Setup input event handlers
     */
    private setupInputHandlers;
    /**
     * Setup continuous input handling for smooth movement
     */
    private setupContinuousInput;
    /**
     * Setup game state change callbacks
     */
    private setupGameStateCallbacks;
    /**
     * Initialize game data
     */
    private initializeGameData;
    /**
     * Start the game loop
     */
    start(): void;
    /**
     * Stop the game loop
     */
    stop(): void;
    /**
     * Main game loop
     */
    private gameLoop;
    /**
     * Update game logic
     */
    private update;
    /**
     * Render game
     */
    private render;
    /**
     * Check for pellet collection
     */
    private checkPelletCollection;
    /**
     * Complete current level
     */
    private completeLevel;
    /**
     * Handle start input based on current state
     */
    private handleStartInput;
    /**
     * Toggle pause state
     */
    private togglePause;
    /**
     * Start a new game
     */
    private startNewGame;
    /**
     * Advance to next level
     */
    private nextLevel;
    /**
     * Show menu screen
     */
    private showMenu;
    /**
     * Show ready screen
     */
    private showReady;
    /**
     * Start playing
     */
    private startPlaying;
    /**
     * Show paused screen
     */
    private showPaused;
    /**
     * Show game over screen
     */
    private showGameOver;
    /**
     * Show level complete screen
     */
    private showLevelComplete;
    /**
     * Update UI elements
     */
    private updateUI;
    /**
     * Update FPS counter
     */
    private updateFPS;
    /**
     * Clean up and destroy game
     */
    destroy(): void;
}
//# sourceMappingURL=game.d.ts.map