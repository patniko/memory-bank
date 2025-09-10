import { Vector2D } from './math.js';
export interface CollisionObject {
    x: number;
    y: number;
    radius?: number;
    width?: number;
    height?: number;
}
export declare class CollisionDetection {
    /**
     * Check if a circular object collides with any wall in the maze
     */
    static checkWallCollision(object: CollisionObject, maze: number[][], gridSize: number): boolean;
    /**
     * Check collision between two circular objects
     */
    static checkCircleCollision(obj1: CollisionObject, obj2: CollisionObject): boolean;
    /**
     * Get the next valid position after attempting to move
     */
    static getValidPosition(currentPos: Vector2D, targetPos: Vector2D, radius: number, maze: number[][], gridSize: number): Vector2D;
    /**
     * Check if position is valid (not in wall)
     */
    static isValidPosition(pos: Vector2D, radius: number, maze: number[][], gridSize: number): boolean;
    /**
     * Get the closest valid position to a target position
     */
    static getClosestValidPosition(targetPos: Vector2D, radius: number, maze: number[][], gridSize: number, searchRadius?: number): Vector2D;
    /**
     * Check if there's a clear line of sight between two points
     */
    static hasLineOfSight(start: Vector2D, end: Vector2D, maze: number[][], gridSize: number, stepSize?: number): boolean;
}
//# sourceMappingURL=collision.d.ts.map