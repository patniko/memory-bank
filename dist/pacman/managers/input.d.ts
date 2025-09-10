import { Direction } from '../utils/constants.js';
export interface InputState {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    pause: boolean;
    start: boolean;
}
export declare class InputManager {
    private inputState;
    private keysPressed;
    private touchStartPos;
    private touchMinDistance;
    private callbacks;
    constructor();
    /**
     * Initialize keyboard and touch event listeners
     */
    private initializeEventListeners;
    /**
     * Initialize mobile control buttons
     */
    private initializeMobileControls;
    /**
     * Handle keyboard key down events
     */
    private handleKeyDown;
    /**
     * Handle keyboard key up events
     */
    private handleKeyUp;
    /**
     * Handle touch start events
     */
    private handleTouchStart;
    /**
     * Handle touch end events for swipe detection
     */
    private handleTouchEnd;
    /**
     * Set direction input for mobile controls
     */
    private setDirectionInput;
    /**
     * Check if a key is a game control key
     */
    private isGameKey;
    /**
     * Get current input state
     */
    getInputState(): InputState;
    /**
     * Get the current direction input
     */
    getCurrentDirection(): Direction;
    /**
     * Register a callback for specific input events
     */
    onInput(event: string, callback: () => void): void;
    /**
     * Trigger a callback if it exists
     */
    private triggerCallback;
    /**
     * Trigger direction change callback
     */
    private triggerDirectionChange;
    /**
     * Register direction change callback
     */
    onDirectionChange(direction: Direction, callback: () => void): void;
    /**
     * Clear all input state
     */
    clearInput(): void;
    /**
     * Clean up event listeners
     */
    destroy(): void;
}
//# sourceMappingURL=input.d.ts.map