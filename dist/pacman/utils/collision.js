import { MathUtils } from './math.js';
export class CollisionDetection {
    /**
     * Check if a circular object collides with any wall in the maze
     */
    static checkWallCollision(object, maze, gridSize) {
        if (!object.radius)
            return false;
        const gridX = Math.floor(object.x / gridSize);
        const gridY = Math.floor(object.y / gridSize);
        // Check surrounding grid cells
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const checkX = gridX + dx;
                const checkY = gridY + dy;
                // Check bounds
                if (checkX < 0 || checkX >= maze[0].length ||
                    checkY < 0 || checkY >= maze.length) {
                    continue;
                }
                // If this cell is a wall
                if (maze[checkY][checkX] === 1) {
                    const wallRect = {
                        x: checkX * gridSize,
                        y: checkY * gridSize,
                        width: gridSize,
                        height: gridSize
                    };
                    if (MathUtils.circleRectangleIntersect({
                        x: object.x,
                        y: object.y,
                        radius: object.radius
                    }, wallRect)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    /**
     * Check collision between two circular objects
     */
    static checkCircleCollision(obj1, obj2) {
        if (!obj1.radius || !obj2.radius)
            return false;
        return MathUtils.circlesIntersect({ x: obj1.x, y: obj1.y, radius: obj1.radius }, { x: obj2.x, y: obj2.y, radius: obj2.radius });
    }
    /**
     * Get the next valid position after attempting to move
     */
    static getValidPosition(currentPos, targetPos, radius, maze, gridSize) {
        // Try the target position first
        if (!this.checkWallCollision({
            x: targetPos.x,
            y: targetPos.y,
            radius
        }, maze, gridSize)) {
            return targetPos;
        }
        // Try moving only horizontally
        if (!this.checkWallCollision({
            x: targetPos.x,
            y: currentPos.y,
            radius
        }, maze, gridSize)) {
            return { x: targetPos.x, y: currentPos.y };
        }
        // Try moving only vertically
        if (!this.checkWallCollision({
            x: currentPos.x,
            y: targetPos.y,
            radius
        }, maze, gridSize)) {
            return { x: currentPos.x, y: targetPos.y };
        }
        // Return current position if no movement is valid
        return currentPos;
    }
    /**
     * Check if position is valid (not in wall)
     */
    static isValidPosition(pos, radius, maze, gridSize) {
        return !this.checkWallCollision({
            x: pos.x,
            y: pos.y,
            radius
        }, maze, gridSize);
    }
    /**
     * Get the closest valid position to a target position
     */
    static getClosestValidPosition(targetPos, radius, maze, gridSize, searchRadius = 50) {
        if (this.isValidPosition(targetPos, radius, maze, gridSize)) {
            return targetPos;
        }
        let closestPos = targetPos;
        let closestDistance = Infinity;
        // Search in a spiral pattern
        for (let r = 1; r <= searchRadius; r++) {
            for (let angle = 0; angle < 360; angle += 15) {
                const testPos = {
                    x: targetPos.x + Math.cos(MathUtils.degToRad(angle)) * r,
                    y: targetPos.y + Math.sin(MathUtils.degToRad(angle)) * r
                };
                if (this.isValidPosition(testPos, radius, maze, gridSize)) {
                    const distance = MathUtils.distance(targetPos, testPos);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestPos = testPos;
                    }
                }
            }
            // If we found a valid position, return it
            if (closestDistance < Infinity) {
                break;
            }
        }
        return closestPos;
    }
    /**
     * Check if there's a clear line of sight between two points
     */
    static hasLineOfSight(start, end, maze, gridSize, stepSize = 5) {
        const distance = MathUtils.distance(start, end);
        const steps = Math.ceil(distance / stepSize);
        for (let i = 0; i <= steps; i++) {
            const factor = i / steps;
            const testPos = {
                x: MathUtils.lerp(start.x, end.x, factor),
                y: MathUtils.lerp(start.y, end.y, factor)
            };
            const gridX = Math.floor(testPos.x / gridSize);
            const gridY = Math.floor(testPos.y / gridSize);
            // Check bounds
            if (gridX < 0 || gridX >= maze[0].length ||
                gridY < 0 || gridY >= maze.length) {
                return false;
            }
            // Check if position is in wall
            if (maze[gridY][gridX] === 1) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=collision.js.map