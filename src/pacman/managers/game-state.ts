import { GameState } from '../utils/constants.js';

export interface GameData {
    score: number;
    level: number;
    lives: number;
    highScore: number;
    pelletsRemaining: number;
    totalPellets: number;
}

export class GameStateManager {
    private currentState: GameState;
    private previousState: GameState;
    private gameData: GameData;
    private stateChangeCallbacks: Map<GameState, (() => void)[]>;
    private stateTransitions: Map<string, GameState[]>;

    constructor() {
        this.currentState = GameState.LOADING;
        this.previousState = GameState.LOADING;
        
        this.gameData = {
            score: 0,
            level: 1,
            lives: 3,
            highScore: this.loadHighScore(),
            pelletsRemaining: 0,
            totalPellets: 0
        };

        this.stateChangeCallbacks = new Map();
        this.stateTransitions = new Map();
        
        this.initializeStateTransitions();
    }

    /**
     * Initialize valid state transitions
     */
    private initializeStateTransitions(): void {
        this.stateTransitions.set(GameState.LOADING, [
            GameState.MENU
        ]);
        
        this.stateTransitions.set(GameState.MENU, [
            GameState.READY,
            GameState.LOADING
        ]);
        
        this.stateTransitions.set(GameState.READY, [
            GameState.PLAYING,
            GameState.MENU
        ]);
        
        this.stateTransitions.set(GameState.PLAYING, [
            GameState.PAUSED,
            GameState.GAME_OVER,
            GameState.LEVEL_COMPLETE
        ]);
        
        this.stateTransitions.set(GameState.PAUSED, [
            GameState.PLAYING,
            GameState.MENU,
            GameState.GAME_OVER
        ]);
        
        this.stateTransitions.set(GameState.LEVEL_COMPLETE, [
            GameState.READY,
            GameState.VICTORY,
            GameState.MENU
        ]);
        
        this.stateTransitions.set(GameState.GAME_OVER, [
            GameState.MENU,
            GameState.READY
        ]);
        
        this.stateTransitions.set(GameState.VICTORY, [
            GameState.MENU
        ]);
    }

    /**
     * Change to a new game state
     */
    changeState(newState: GameState): boolean {
        // Check if transition is valid
        const validTransitions = this.stateTransitions.get(this.currentState);
        if (!validTransitions || !validTransitions.includes(newState)) {
            console.warn(`Invalid state transition from ${this.currentState} to ${newState}`);
            return false;
        }

        this.previousState = this.currentState;
        this.currentState = newState;

        // Trigger callbacks for this state
        this.triggerStateCallbacks(newState);

        console.log(`State changed: ${this.previousState} -> ${this.currentState}`);
        return true;
    }

    /**
     * Get current game state
     */
    getCurrentState(): GameState {
        return this.currentState;
    }

    /**
     * Get previous game state
     */
    getPreviousState(): GameState {
        return this.previousState;
    }

    /**
     * Check if in a specific state
     */
    isState(state: GameState): boolean {
        return this.currentState === state;
    }

    /**
     * Check if game is currently playable
     */
    isPlayable(): boolean {
        return this.currentState === GameState.PLAYING;
    }

    /**
     * Check if game is paused
     */
    isPaused(): boolean {
        return this.currentState === GameState.PAUSED;
    }

    /**
     * Get game data
     */
    getGameData(): GameData {
        return { ...this.gameData };
    }

    /**
     * Update score
     */
    addScore(points: number): void {
        this.gameData.score += points;
        
        // Update high score if necessary
        if (this.gameData.score > this.gameData.highScore) {
            this.gameData.highScore = this.gameData.score;
            this.saveHighScore(this.gameData.highScore);
        }
    }

    /**
     * Set score directly
     */
    setScore(score: number): void {
        this.gameData.score = Math.max(0, score);
    }

    /**
     * Get current score
     */
    getScore(): number {
        return this.gameData.score;
    }

    /**
     * Get high score
     */
    getHighScore(): number {
        return this.gameData.highScore;
    }

    /**
     * Increase level
     */
    nextLevel(): void {
        this.gameData.level++;
    }

    /**
     * Get current level
     */
    getLevel(): number {
        return this.gameData.level;
    }

    /**
     * Set level directly
     */
    setLevel(level: number): void {
        this.gameData.level = Math.max(1, level);
    }

    /**
     * Lose a life
     */
    loseLife(): boolean {
        this.gameData.lives = Math.max(0, this.gameData.lives - 1);
        return this.gameData.lives > 0;
    }

    /**
     * Gain a life
     */
    gainLife(): void {
        this.gameData.lives++;
    }

    /**
     * Get remaining lives
     */
    getLives(): number {
        return this.gameData.lives;
    }

    /**
     * Set lives directly
     */
    setLives(lives: number): void {
        this.gameData.lives = Math.max(0, lives);
    }

    /**
     * Update pellet count
     */
    setPelletCount(remaining: number, total: number): void {
        this.gameData.pelletsRemaining = remaining;
        this.gameData.totalPellets = total;
    }

    /**
     * Get pellet count
     */
    getPelletCount(): { remaining: number; total: number } {
        return {
            remaining: this.gameData.pelletsRemaining,
            total: this.gameData.totalPellets
        };
    }

    /**
     * Reset game data for new game
     */
    resetGame(): void {
        this.gameData.score = 0;
        this.gameData.level = 1;
        this.gameData.lives = 3;
        this.gameData.pelletsRemaining = 0;
        this.gameData.totalPellets = 0;
    }

    /**
     * Reset to new level (keep score and level)
     */
    resetLevel(): void {
        this.gameData.pelletsRemaining = 0;
        this.gameData.totalPellets = 0;
    }

    /**
     * Register callback for state changes
     */
    onStateChange(state: GameState, callback: () => void): void {
        if (!this.stateChangeCallbacks.has(state)) {
            this.stateChangeCallbacks.set(state, []);
        }
        this.stateChangeCallbacks.get(state)!.push(callback);
    }

    /**
     * Remove callback for state changes
     */
    removeStateCallback(state: GameState, callback: () => void): void {
        const callbacks = this.stateChangeCallbacks.get(state);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    /**
     * Trigger all callbacks for a state
     */
    private triggerStateCallbacks(state: GameState): void {
        const callbacks = this.stateChangeCallbacks.get(state);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback();
                } catch (error) {
                    console.error(`Error in state callback for ${state}:`, error);
                }
            });
        }
    }

    /**
     * Load high score from localStorage
     */
    private loadHighScore(): number {
        try {
            const saved = localStorage.getItem('memory-bank-pacman-highscore');
            return saved ? parseInt(saved, 10) : 0;
        } catch (error) {
            console.warn('Could not load high score:', error);
            return 0;
        }
    }

    /**
     * Save high score to localStorage
     */
    private saveHighScore(score: number): void {
        try {
            localStorage.setItem('memory-bank-pacman-highscore', score.toString());
        } catch (error) {
            console.warn('Could not save high score:', error);
        }
    }

    /**
     * Get state information for debugging
     */
    getDebugInfo(): object {
        return {
            currentState: this.currentState,
            previousState: this.previousState,
            gameData: this.gameData,
            validTransitions: this.stateTransitions.get(this.currentState) || []
        };
    }

    /**
     * Force state change (for debugging/testing)
     */
    forceState(state: GameState): void {
        console.warn(`Force changing state to: ${state}`);
        this.previousState = this.currentState;
        this.currentState = state;
        this.triggerStateCallbacks(state);
    }
}