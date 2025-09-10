import { Vector2D } from '../utils/math.js';
export interface MazeCell {
    wall: boolean;
    pellet: boolean;
    powerPellet: boolean;
    visited: boolean;
}
export declare class Maze {
    private maze;
    private pellets;
    private powerPellets;
    constructor();
    /**
     * Generate a classic Pacman-style maze
     */
    private generateMaze;
    /**
     * Get the maze grid
     */
    getMaze(): number[][];
    /**
     * Check if a grid position is a wall
     */
    isWall(x: number, y: number): boolean;
    /**
     * Check if there's a pellet at the given grid position
     */
    hasPellet(x: number, y: number): boolean;
    /**
     * Check if there's a power pellet at the given grid position
     */
    hasPowerPellet(x: number, y: number): boolean;
    /**
     * Collect a pellet at the given position
     */
    collectPellet(x: number, y: number): {
        collected: boolean;
        isPowerPellet: boolean;
    };
    /**
     * Get all pellet positions
     */
    getPelletPositions(): Vector2D[];
    /**
     * Get all power pellet positions
     */
    getPowerPelletPositions(): Vector2D[];
    /**
     * Get the total number of pellets remaining
     */
    getRemainingPellets(): number;
    /**
     * Check if all pellets have been collected
     */
    isComplete(): boolean;
    /**
     * Reset pellets for a new level
     */
    reset(): void;
    /**
     * Get valid spawn positions (empty spaces)
     */
    getValidSpawnPositions(): Vector2D[];
    /**
     * Find the shortest path between two points using A* algorithm
     */
    findPath(start: Vector2D, end: Vector2D): Vector2D[];
    /**
     * Heuristic function for A* (Manhattan distance)
     */
    private heuristic;
}
//# sourceMappingURL=maze.d.ts.map