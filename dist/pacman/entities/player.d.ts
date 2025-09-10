import { Direction } from '../utils/constants.js';
import { Vector2D } from '../utils/math.js';
import { Maze } from './maze.js';
export declare class Player {
    private position;
    private direction;
    private nextDirection;
    private speed;
    private radius;
    private animationFrame;
    private animationSpeed;
    private isAlive;
    private invulnerable;
    private invulnerabilityTime;
    constructor(startX: number, startY: number);
    /**
     * Update player state
     */
    update(deltaTime: number, maze: Maze): void;
    /**
     * Try to change direction based on next direction request
     */
    private tryChangeDirection;
    /**
     * Move player in current direction
     */
    private move;
    /**
     * Calculate next position based on direction
     */
    private getNextPosition;
    /**
     * Get direction vector for movement
     */
    private getDirectionVector;
    /**
     * Handle screen wrapping (teleport to other side)
     */
    private handleScreenWrapping;
    /**
     * Collect pellets at current position
     */
    private collectPellets;
    /**
     * Set the next direction for movement
     */
    setNextDirection(direction: Direction): void;
    /**
     * Get current direction
     */
    getDirection(): Direction;
    /**
     * Get current position
     */
    getPosition(): Vector2D;
    /**
     * Set position (for respawning)
     */
    setPosition(x: number, y: number): void;
    /**
     * Get radius for collision detection
     */
    getRadius(): number;
    /**
     * Check if player is alive
     */
    getIsAlive(): boolean;
    /**
     * Kill the player
     */
    kill(): void;
    /**
     * Respawn the player
     */
    respawn(x: number, y: number): void;
    /**
     * Check if player is invulnerable
     */
    isInvulnerable(): boolean;
    /**
     * Render the player
     */
    render(ctx: CanvasRenderingContext2D): void;
    /**
     * Get rotation angle for current direction
     */
    private getRotationForDirection;
    /**
     * Get grid position
     */
    getGridPosition(): Vector2D;
}
//# sourceMappingURL=player.d.ts.map