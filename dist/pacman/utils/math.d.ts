export interface Vector2D {
    x: number;
    y: number;
}
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class MathUtils {
    /**
     * Calculate distance between two points
     */
    static distance(p1: Vector2D, p2: Vector2D): number;
    /**
     * Calculate squared distance (faster for comparisons)
     */
    static distanceSquared(p1: Vector2D, p2: Vector2D): number;
    /**
     * Normalize a vector to unit length
     */
    static normalize(vector: Vector2D): Vector2D;
    /**
     * Clamp a value between min and max
     */
    static clamp(value: number, min: number, max: number): number;
    /**
     * Linear interpolation between two values
     */
    static lerp(start: number, end: number, factor: number): number;
    /**
     * Check if two rectangles intersect
     */
    static rectanglesIntersect(rect1: Rectangle, rect2: Rectangle): boolean;
    /**
     * Check if a circle intersects with a rectangle
     */
    static circleRectangleIntersect(circle: Vector2D & {
        radius: number;
    }, rect: Rectangle): boolean;
    /**
     * Check if two circles intersect
     */
    static circlesIntersect(circle1: Vector2D & {
        radius: number;
    }, circle2: Vector2D & {
        radius: number;
    }): boolean;
    /**
     * Convert grid coordinates to pixel coordinates
     */
    static gridToPixel(gridX: number, gridY: number, gridSize: number): Vector2D;
    /**
     * Convert pixel coordinates to grid coordinates
     */
    static pixelToGrid(x: number, y: number, gridSize: number): Vector2D;
    /**
     * Get random number between min and max (inclusive)
     */
    static randomBetween(min: number, max: number): number;
    /**
     * Get random integer between min and max (inclusive)
     */
    static randomIntBetween(min: number, max: number): number;
    /**
     * Get random element from array
     */
    static randomElement<T>(array: T[]): T;
    /**
     * Convert degrees to radians
     */
    static degToRad(degrees: number): number;
    /**
     * Convert radians to degrees
     */
    static radToDeg(radians: number): number;
    /**
     * Round to specified number of decimal places
     */
    static roundTo(value: number, decimals: number): number;
}
//# sourceMappingURL=math.d.ts.map