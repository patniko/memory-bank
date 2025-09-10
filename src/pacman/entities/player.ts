import { Direction, GAME_CONFIG } from '../utils/constants.js';
import { Vector2D, MathUtils } from '../utils/math.js';
import { CollisionDetection } from '../utils/collision.js';
import { Maze } from './maze.js';

export class Player {
    private position: Vector2D;
    private direction: Direction;
    private nextDirection: Direction;
    private speed: number;
    private radius: number;
    private animationFrame: number;
    private animationSpeed: number;
    private isAlive: boolean;
    private invulnerable: boolean;
    private invulnerabilityTime: number;

    constructor(startX: number, startY: number) {
        this.position = { x: startX, y: startY };
        this.direction = Direction.NONE;
        this.nextDirection = Direction.NONE;
        this.speed = GAME_CONFIG.PLAYER_SPEED;
        this.radius = GAME_CONFIG.PLAYER_RADIUS;
        this.animationFrame = 0;
        this.animationSpeed = 0.3;
        this.isAlive = true;
        this.invulnerable = false;
        this.invulnerabilityTime = 0;
    }

    /**
     * Update player state
     */
    update(deltaTime: number, maze: Maze): void {
        if (!this.isAlive) return;

        // Update invulnerability
        if (this.invulnerable) {
            this.invulnerabilityTime -= deltaTime;
            if (this.invulnerabilityTime <= 0) {
                this.invulnerable = false;
            }
        }

        // Try to change direction if requested
        this.tryChangeDirection(maze);

        // Move player
        this.move(maze);

        // Update animation
        this.animationFrame += this.animationSpeed * deltaTime * 0.01;
        if (this.animationFrame >= 4) {
            this.animationFrame = 0;
        }

        // Collect pellets
        this.collectPellets(maze);
    }

    /**
     * Try to change direction based on next direction request
     */
    private tryChangeDirection(maze: Maze): void {
        if (this.nextDirection === Direction.NONE) return;

        const testPosition = this.getNextPosition(this.nextDirection);
        
        if (CollisionDetection.isValidPosition(
            testPosition,
            this.radius,
            maze.getMaze(),
            GAME_CONFIG.GRID_SIZE
        )) {
            this.direction = this.nextDirection;
            this.nextDirection = Direction.NONE;
        }
    }

    /**
     * Move player in current direction
     */
    private move(maze: Maze): void {
        if (this.direction === Direction.NONE) return;

        const nextPosition = this.getNextPosition(this.direction);
        
        // Check for valid movement
        const validPosition = CollisionDetection.getValidPosition(
            this.position,
            nextPosition,
            this.radius,
            maze.getMaze(),
            GAME_CONFIG.GRID_SIZE
        );

        // If we couldn't move in the current direction, stop
        if (validPosition.x === this.position.x && validPosition.y === this.position.y) {
            this.direction = Direction.NONE;
        } else {
            this.position = validPosition;
        }

        // Handle screen wrapping (teleport to other side)
        this.handleScreenWrapping();
    }

    /**
     * Calculate next position based on direction
     */
    private getNextPosition(direction: Direction): Vector2D {
        const dx = this.getDirectionVector(direction);
        return {
            x: this.position.x + dx.x * this.speed,
            y: this.position.y + dx.y * this.speed
        };
    }

    /**
     * Get direction vector for movement
     */
    private getDirectionVector(direction: Direction): Vector2D {
        switch (direction) {
            case Direction.UP:
                return { x: 0, y: -1 };
            case Direction.DOWN:
                return { x: 0, y: 1 };
            case Direction.LEFT:
                return { x: -1, y: 0 };
            case Direction.RIGHT:
                return { x: 1, y: 0 };
            default:
                return { x: 0, y: 0 };
        }
    }

    /**
     * Handle screen wrapping (teleport to other side)
     */
    private handleScreenWrapping(): void {
        const canvasWidth = GAME_CONFIG.CANVAS_WIDTH;
        const canvasHeight = GAME_CONFIG.CANVAS_HEIGHT;

        if (this.position.x < -this.radius) {
            this.position.x = canvasWidth + this.radius;
        } else if (this.position.x > canvasWidth + this.radius) {
            this.position.x = -this.radius;
        }

        if (this.position.y < -this.radius) {
            this.position.y = canvasHeight + this.radius;
        } else if (this.position.y > canvasHeight + this.radius) {
            this.position.y = -this.radius;
        }
    }

    /**
     * Collect pellets at current position
     */
    private collectPellets(maze: Maze): void {
        const gridPos = MathUtils.pixelToGrid(
            this.position.x,
            this.position.y,
            GAME_CONFIG.GRID_SIZE
        );

        const result = maze.collectPellet(gridPos.x, gridPos.y);
        if (result.collected) {
            // Pellet collection will be handled by the game manager
            // for scoring and power pellet effects
        }
    }

    /**
     * Set the next direction for movement
     */
    setNextDirection(direction: Direction): void {
        this.nextDirection = direction;
    }

    /**
     * Get current direction
     */
    getDirection(): Direction {
        return this.direction;
    }

    /**
     * Get current position
     */
    getPosition(): Vector2D {
        return { ...this.position };
    }

    /**
     * Set position (for respawning)
     */
    setPosition(x: number, y: number): void {
        this.position = { x, y };
    }

    /**
     * Get radius for collision detection
     */
    getRadius(): number {
        return this.radius;
    }

    /**
     * Check if player is alive
     */
    getIsAlive(): boolean {
        return this.isAlive;
    }

    /**
     * Kill the player
     */
    kill(): void {
        this.isAlive = false;
    }

    /**
     * Respawn the player
     */
    respawn(x: number, y: number): void {
        this.position = { x, y };
        this.direction = Direction.NONE;
        this.nextDirection = Direction.NONE;
        this.isAlive = true;
        this.invulnerable = true;
        this.invulnerabilityTime = 2000; // 2 seconds of invulnerability
    }

    /**
     * Check if player is invulnerable
     */
    isInvulnerable(): boolean {
        return this.invulnerable;
    }

    /**
     * Render the player
     */
    render(ctx: CanvasRenderingContext2D): void {
        if (!this.isAlive) return;

        // Handle invulnerability flashing
        if (this.invulnerable && Math.floor(Date.now() / 200) % 2) {
            return; // Skip rendering for flashing effect
        }

        ctx.save();
        
        // Move to player position
        ctx.translate(this.position.x, this.position.y);

        // Rotate based on direction
        const rotation = this.getRotationForDirection();
        ctx.rotate(rotation);

        // Set player color
        ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 1;

        // Draw Pacman shape
        ctx.beginPath();
        
        // Calculate mouth opening based on animation frame
        const mouthAngle = Math.sin(this.animationFrame) * 0.5 + 0.3;
        const startAngle = mouthAngle;
        const endAngle = 2 * Math.PI - mouthAngle;

        ctx.arc(0, 0, this.radius, startAngle, endAngle);
        ctx.lineTo(0, 0);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();

        // Add eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-2, -3, 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }

    /**
     * Get rotation angle for current direction
     */
    private getRotationForDirection(): number {
        switch (this.direction) {
            case Direction.UP:
                return -Math.PI / 2;
            case Direction.DOWN:
                return Math.PI / 2;
            case Direction.LEFT:
                return Math.PI;
            case Direction.RIGHT:
            default:
                return 0;
        }
    }

    /**
     * Get grid position
     */
    getGridPosition(): Vector2D {
        return MathUtils.pixelToGrid(
            this.position.x,
            this.position.y,
            GAME_CONFIG.GRID_SIZE
        );
    }
}