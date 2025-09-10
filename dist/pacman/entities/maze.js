import { GAME_CONFIG } from '../utils/constants.js';
export class Maze {
    constructor() {
        this.maze = [];
        this.pellets = new Set();
        this.powerPellets = new Set();
        this.generateMaze();
    }
    /**
     * Generate a classic Pacman-style maze
     */
    generateMaze() {
        const width = GAME_CONFIG.MAZE_WIDTH;
        const height = GAME_CONFIG.MAZE_HEIGHT;
        // Initialize maze with walls
        this.maze = Array(height).fill(0).map(() => Array(width).fill(1));
        // Create a classic Pacman maze layout
        const mazePattern = [
            "########################################",
            "#..................##..................#",
            "#.####.#########.####.#########.####.#",
            "#o####.#########.####.#########.####o#",
            "#......................................#",
            "#.####.##.############.##.####.####.##",
            "#......##......##......##......##....#",
            "######.#######.##.#######.##.##########",
            "     #.#######.##.#######.##.#    #    ",
            "     #.##......  ......##.##.#    #    ",
            "######.##.#### ## ####.##.##.##########",
            "#      ..      ##      ..      ..      #",
            "######.##.#### ## ####.##.##.##########",
            "     #.##......  ......##.##.#    #    ",
            "     #.##.############.##.##.#    #    ",
            "######.##.############.##.##.##########",
            "#..................##..................#",
            "#.####.#######.####.##.####.#######.####",
            "#o..##......##.................##....o#",
            "###.##.####.##.##########.##.####.##.###",
            "#......####....####.####....####......#",
            "#.##########.##.####.####.##.##########.#",
            "#......................................#",
            "########################################"
        ];
        // Apply the pattern to the maze
        for (let y = 0; y < Math.min(height, mazePattern.length); y++) {
            const row = mazePattern[y];
            for (let x = 0; x < Math.min(width, row.length); x++) {
                const char = row[x];
                switch (char) {
                    case '#':
                        this.maze[y][x] = 1; // Wall
                        break;
                    case '.':
                        this.maze[y][x] = 0; // Pellet
                        this.pellets.add(`${x},${y}`);
                        break;
                    case 'o':
                        this.maze[y][x] = 0; // Power pellet
                        this.powerPellets.add(`${x},${y}`);
                        break;
                    case ' ':
                        this.maze[y][x] = 0; // Empty space
                        break;
                    default:
                        this.maze[y][x] = 0; // Default to empty
                        break;
                }
            }
        }
        // Store original pellet count for reference if needed
    }
    /**
     * Get the maze grid
     */
    getMaze() {
        return this.maze;
    }
    /**
     * Check if a grid position is a wall
     */
    isWall(x, y) {
        if (x < 0 || x >= this.maze[0].length || y < 0 || y >= this.maze.length) {
            return true; // Treat out of bounds as walls
        }
        return this.maze[y][x] === 1;
    }
    /**
     * Check if there's a pellet at the given grid position
     */
    hasPellet(x, y) {
        return this.pellets.has(`${x},${y}`);
    }
    /**
     * Check if there's a power pellet at the given grid position
     */
    hasPowerPellet(x, y) {
        return this.powerPellets.has(`${x},${y}`);
    }
    /**
     * Collect a pellet at the given position
     */
    collectPellet(x, y) {
        const key = `${x},${y}`;
        if (this.powerPellets.has(key)) {
            this.powerPellets.delete(key);
            return { collected: true, isPowerPellet: true };
        }
        if (this.pellets.has(key)) {
            this.pellets.delete(key);
            return { collected: true, isPowerPellet: false };
        }
        return { collected: false, isPowerPellet: false };
    }
    /**
     * Get all pellet positions
     */
    getPelletPositions() {
        return Array.from(this.pellets).map(key => {
            const [x, y] = key.split(',').map(Number);
            return { x, y };
        });
    }
    /**
     * Get all power pellet positions
     */
    getPowerPelletPositions() {
        return Array.from(this.powerPellets).map(key => {
            const [x, y] = key.split(',').map(Number);
            return { x, y };
        });
    }
    /**
     * Get the total number of pellets remaining
     */
    getRemainingPellets() {
        return this.pellets.size + this.powerPellets.size;
    }
    /**
     * Check if all pellets have been collected
     */
    isComplete() {
        return this.getRemainingPellets() === 0;
    }
    /**
     * Reset pellets for a new level
     */
    reset() {
        this.pellets.clear();
        this.powerPellets.clear();
        this.generateMaze();
    }
    /**
     * Get valid spawn positions (empty spaces)
     */
    getValidSpawnPositions() {
        const positions = [];
        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if (!this.isWall(x, y)) {
                    positions.push({ x, y });
                }
            }
        }
        return positions;
    }
    /**
     * Find the shortest path between two points using A* algorithm
     */
    findPath(start, end) {
        const openSet = [];
        const closedSet = new Set();
        const startNode = {
            pos: start,
            f: 0,
            g: 0,
            h: this.heuristic(start, end),
            parent: null
        };
        startNode.f = startNode.g + startNode.h;
        openSet.push(startNode);
        while (openSet.length > 0) {
            // Find node with lowest f score
            let currentIndex = 0;
            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < openSet[currentIndex].f) {
                    currentIndex = i;
                }
            }
            const current = openSet.splice(currentIndex, 1)[0];
            closedSet.add(`${current.pos.x},${current.pos.y}`);
            // Check if we reached the goal
            if (current.pos.x === end.x && current.pos.y === end.y) {
                const path = [];
                let node = current;
                while (node.parent) {
                    path.unshift(node.pos);
                    // Find parent node
                    const parentKey = `${node.parent.x},${node.parent.y}`;
                    const parentNode = [...openSet].find(n => `${n.pos.x},${n.pos.y}` === parentKey);
                    if (!parentNode)
                        break;
                    node = parentNode;
                }
                return path;
            }
            // Check neighbors
            const neighbors = [
                { x: current.pos.x + 1, y: current.pos.y },
                { x: current.pos.x - 1, y: current.pos.y },
                { x: current.pos.x, y: current.pos.y + 1 },
                { x: current.pos.x, y: current.pos.y - 1 }
            ];
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                // Skip if out of bounds or wall or already processed
                if (this.isWall(neighbor.x, neighbor.y) || closedSet.has(neighborKey)) {
                    continue;
                }
                const g = current.g + 1;
                const h = this.heuristic(neighbor, end);
                const f = g + h;
                // Check if this neighbor is already in open set with better score
                const existingIndex = openSet.findIndex(n => n.pos.x === neighbor.x && n.pos.y === neighbor.y);
                if (existingIndex >= 0 && openSet[existingIndex].g <= g) {
                    continue;
                }
                const neighborNode = {
                    pos: neighbor,
                    f,
                    g,
                    h,
                    parent: current.pos
                };
                if (existingIndex >= 0) {
                    openSet[existingIndex] = neighborNode;
                }
                else {
                    openSet.push(neighborNode);
                }
            }
        }
        return []; // No path found
    }
    /**
     * Heuristic function for A* (Manhattan distance)
     */
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
}
//# sourceMappingURL=maze.js.map