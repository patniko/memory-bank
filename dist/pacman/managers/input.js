import { Direction, INPUT_KEYS } from '../utils/constants.js';
export class InputManager {
    constructor() {
        this.inputState = {
            up: false,
            down: false,
            left: false,
            right: false,
            pause: false,
            start: false
        };
        this.keysPressed = new Set();
        this.touchStartPos = null;
        this.touchMinDistance = 30; // Minimum swipe distance
        this.callbacks = new Map();
        this.initializeEventListeners();
    }
    /**
     * Initialize keyboard and touch event listeners
     */
    initializeEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', (event) => this.handleKeyUp(event));
        // Touch events for mobile
        document.addEventListener('touchstart', (event) => this.handleTouchStart(event));
        document.addEventListener('touchend', (event) => this.handleTouchEnd(event));
        document.addEventListener('touchmove', (event) => event.preventDefault()); // Prevent scrolling
        // Mobile control buttons
        this.initializeMobileControls();
        // Prevent context menu on long press
        document.addEventListener('contextmenu', (event) => event.preventDefault());
    }
    /**
     * Initialize mobile control buttons
     */
    initializeMobileControls() {
        const controlButtons = document.querySelectorAll('.control-btn');
        controlButtons.forEach(button => {
            const direction = button.getAttribute('data-direction');
            if (direction) {
                // Touch events for direction buttons
                button.addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    this.setDirectionInput(direction, true);
                });
                button.addEventListener('touchend', (event) => {
                    event.preventDefault();
                    this.setDirectionInput(direction, false);
                });
                // Mouse events for desktop testing
                button.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                    this.setDirectionInput(direction, true);
                });
                button.addEventListener('mouseup', (event) => {
                    event.preventDefault();
                    this.setDirectionInput(direction, false);
                });
            }
        });
        // Pause button
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.triggerCallback('pause');
            });
            pauseBtn.addEventListener('click', (event) => {
                event.preventDefault();
                this.triggerCallback('pause');
            });
        }
        // Start button
        const startBtn = document.getElementById('startButton');
        if (startBtn) {
            startBtn.addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.triggerCallback('start');
            });
            startBtn.addEventListener('click', (event) => {
                event.preventDefault();
                this.triggerCallback('start');
            });
        }
    }
    /**
     * Handle keyboard key down events
     */
    handleKeyDown(event) {
        const key = event.code || event.key;
        if (this.keysPressed.has(key))
            return; // Prevent key repeat
        this.keysPressed.add(key);
        // Update input state
        if (INPUT_KEYS.UP.includes(key)) {
            this.inputState.up = true;
        }
        else if (INPUT_KEYS.DOWN.includes(key)) {
            this.inputState.down = true;
        }
        else if (INPUT_KEYS.LEFT.includes(key)) {
            this.inputState.left = true;
        }
        else if (INPUT_KEYS.RIGHT.includes(key)) {
            this.inputState.right = true;
        }
        else if (INPUT_KEYS.PAUSE.includes(key)) {
            this.triggerCallback('pause');
        }
        else if (INPUT_KEYS.START.includes(key)) {
            this.triggerCallback('start');
        }
        // Prevent default for game keys
        if (this.isGameKey(key)) {
            event.preventDefault();
        }
    }
    /**
     * Handle keyboard key up events
     */
    handleKeyUp(event) {
        const key = event.code || event.key;
        this.keysPressed.delete(key);
        // Update input state
        if (INPUT_KEYS.UP.includes(key)) {
            this.inputState.up = false;
        }
        else if (INPUT_KEYS.DOWN.includes(key)) {
            this.inputState.down = false;
        }
        else if (INPUT_KEYS.LEFT.includes(key)) {
            this.inputState.left = false;
        }
        else if (INPUT_KEYS.RIGHT.includes(key)) {
            this.inputState.right = false;
        }
    }
    /**
     * Handle touch start events
     */
    handleTouchStart(event) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            this.touchStartPos = {
                x: touch.clientX,
                y: touch.clientY
            };
        }
    }
    /**
     * Handle touch end events for swipe detection
     */
    handleTouchEnd(event) {
        if (!this.touchStartPos || event.changedTouches.length === 0)
            return;
        const touch = event.changedTouches[0];
        const touchEndPos = {
            x: touch.clientX,
            y: touch.clientY
        };
        const deltaX = touchEndPos.x - this.touchStartPos.x;
        const deltaY = touchEndPos.y - this.touchStartPos.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // Check if swipe distance is sufficient
        if (distance < this.touchMinDistance) {
            this.touchStartPos = null;
            return;
        }
        // Determine swipe direction
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        if (absX > absY) {
            // Horizontal swipe
            if (deltaX > 0) {
                this.triggerDirectionChange(Direction.RIGHT);
            }
            else {
                this.triggerDirectionChange(Direction.LEFT);
            }
        }
        else {
            // Vertical swipe
            if (deltaY > 0) {
                this.triggerDirectionChange(Direction.DOWN);
            }
            else {
                this.triggerDirectionChange(Direction.UP);
            }
        }
        this.touchStartPos = null;
    }
    /**
     * Set direction input for mobile controls
     */
    setDirectionInput(direction, pressed) {
        switch (direction) {
            case Direction.UP:
                this.inputState.up = pressed;
                break;
            case Direction.DOWN:
                this.inputState.down = pressed;
                break;
            case Direction.LEFT:
                this.inputState.left = pressed;
                break;
            case Direction.RIGHT:
                this.inputState.right = pressed;
                break;
        }
        if (pressed) {
            this.triggerDirectionChange(direction);
        }
    }
    /**
     * Check if a key is a game control key
     */
    isGameKey(key) {
        const allKeys = [
            ...INPUT_KEYS.UP,
            ...INPUT_KEYS.DOWN,
            ...INPUT_KEYS.LEFT,
            ...INPUT_KEYS.RIGHT,
            ...INPUT_KEYS.PAUSE,
            ...INPUT_KEYS.START
        ];
        return allKeys.includes(key);
    }
    /**
     * Get current input state
     */
    getInputState() {
        return { ...this.inputState };
    }
    /**
     * Get the current direction input
     */
    getCurrentDirection() {
        if (this.inputState.up)
            return Direction.UP;
        if (this.inputState.down)
            return Direction.DOWN;
        if (this.inputState.left)
            return Direction.LEFT;
        if (this.inputState.right)
            return Direction.RIGHT;
        return Direction.NONE;
    }
    /**
     * Register a callback for specific input events
     */
    onInput(event, callback) {
        this.callbacks.set(event, callback);
    }
    /**
     * Trigger a callback if it exists
     */
    triggerCallback(event) {
        const callback = this.callbacks.get(event);
        if (callback) {
            callback();
        }
    }
    /**
     * Trigger direction change callback
     */
    triggerDirectionChange(direction) {
        this.triggerCallback(`direction:${direction}`);
    }
    /**
     * Register direction change callback
     */
    onDirectionChange(direction, callback) {
        this.callbacks.set(`direction:${direction}`, callback);
    }
    /**
     * Clear all input state
     */
    clearInput() {
        this.inputState = {
            up: false,
            down: false,
            left: false,
            right: false,
            pause: false,
            start: false
        };
        this.keysPressed.clear();
    }
    /**
     * Clean up event listeners
     */
    destroy() {
        // Remove keyboard listeners
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        // Remove touch listeners
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchend', this.handleTouchEnd);
        document.removeEventListener('touchmove', () => { });
        this.callbacks.clear();
    }
}
//# sourceMappingURL=input.js.map