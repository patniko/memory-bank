import { GameState } from '../utils/constants.js';
export interface GameData {
    score: number;
    level: number;
    lives: number;
    highScore: number;
    pelletsRemaining: number;
    totalPellets: number;
}
export declare class GameStateManager {
    private currentState;
    private previousState;
    private gameData;
    private stateChangeCallbacks;
    private stateTransitions;
    constructor();
    /**
     * Initialize valid state transitions
     */
    private initializeStateTransitions;
    /**
     * Change to a new game state
     */
    changeState(newState: GameState): boolean;
    /**
     * Get current game state
     */
    getCurrentState(): GameState;
    /**
     * Get previous game state
     */
    getPreviousState(): GameState;
    /**
     * Check if in a specific state
     */
    isState(state: GameState): boolean;
    /**
     * Check if game is currently playable
     */
    isPlayable(): boolean;
    /**
     * Check if game is paused
     */
    isPaused(): boolean;
    /**
     * Get game data
     */
    getGameData(): GameData;
    /**
     * Update score
     */
    addScore(points: number): void;
    /**
     * Set score directly
     */
    setScore(score: number): void;
    /**
     * Get current score
     */
    getScore(): number;
    /**
     * Get high score
     */
    getHighScore(): number;
    /**
     * Increase level
     */
    nextLevel(): void;
    /**
     * Get current level
     */
    getLevel(): number;
    /**
     * Set level directly
     */
    setLevel(level: number): void;
    /**
     * Lose a life
     */
    loseLife(): boolean;
    /**
     * Gain a life
     */
    gainLife(): void;
    /**
     * Get remaining lives
     */
    getLives(): number;
    /**
     * Set lives directly
     */
    setLives(lives: number): void;
    /**
     * Update pellet count
     */
    setPelletCount(remaining: number, total: number): void;
    /**
     * Get pellet count
     */
    getPelletCount(): {
        remaining: number;
        total: number;
    };
    /**
     * Reset game data for new game
     */
    resetGame(): void;
    /**
     * Reset to new level (keep score and level)
     */
    resetLevel(): void;
    /**
     * Register callback for state changes
     */
    onStateChange(state: GameState, callback: () => void): void;
    /**
     * Remove callback for state changes
     */
    removeStateCallback(state: GameState, callback: () => void): void;
    /**
     * Trigger all callbacks for a state
     */
    private triggerStateCallbacks;
    /**
     * Load high score from localStorage
     */
    private loadHighScore;
    /**
     * Save high score to localStorage
     */
    private saveHighScore;
    /**
     * Get state information for debugging
     */
    getDebugInfo(): object;
    /**
     * Force state change (for debugging/testing)
     */
    forceState(state: GameState): void;
}
//# sourceMappingURL=game-state.d.ts.map