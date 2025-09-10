// Mathematical utilities for the game
export class MathUtils {
    /**
     * Calculate distance between two points
     */
    static distance(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     * Calculate squared distance (faster for comparisons)
     */
    static distanceSquared(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return dx * dx + dy * dy;
    }
    /**
     * Normalize a vector to unit length
     */
    static normalize(vector) {
        const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        if (length === 0)
            return { x: 0, y: 0 };
        return {
            x: vector.x / length,
            y: vector.y / length
        };
    }
    /**
     * Clamp a value between min and max
     */
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    /**
     * Linear interpolation between two values
     */
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    /**
     * Check if two rectangles intersect
     */
    static rectanglesIntersect(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }
    /**
     * Check if a circle intersects with a rectangle
     */
    static circleRectangleIntersect(circle, rect) {
        const dx = Math.max(0, Math.max(rect.x - circle.x, circle.x - (rect.x + rect.width)));
        const dy = Math.max(0, Math.max(rect.y - circle.y, circle.y - (rect.y + rect.height)));
        return dx * dx + dy * dy <= circle.radius * circle.radius;
    }
    /**
     * Check if two circles intersect
     */
    static circlesIntersect(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const radiusSum = circle1.radius + circle2.radius;
        return dx * dx + dy * dy <= radiusSum * radiusSum;
    }
    /**
     * Convert grid coordinates to pixel coordinates
     */
    static gridToPixel(gridX, gridY, gridSize) {
        return {
            x: gridX * gridSize + gridSize / 2,
            y: gridY * gridSize + gridSize / 2
        };
    }
    /**
     * Convert pixel coordinates to grid coordinates
     */
    static pixelToGrid(x, y, gridSize) {
        return {
            x: Math.floor(x / gridSize),
            y: Math.floor(y / gridSize)
        };
    }
    /**
     * Get random number between min and max (inclusive)
     */
    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    /**
     * Get random integer between min and max (inclusive)
     */
    static randomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Get random element from array
     */
    static randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    /**
     * Convert degrees to radians
     */
    static degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }
    /**
     * Convert radians to degrees
     */
    static radToDeg(radians) {
        return radians * (180 / Math.PI);
    }
    /**
     * Round to specified number of decimal places
     */
    static roundTo(value, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }
}
//# sourceMappingURL=math.js.map