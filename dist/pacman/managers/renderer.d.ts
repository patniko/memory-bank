import { Vector2D } from '../utils/math.js';
import { Maze } from '../entities/maze.js';
export declare class Renderer {
    private canvas;
    private ctx;
    private scale;
    constructor(canvas: HTMLCanvasElement);
    /**
     * Setup canvas with proper resolution and scaling
     */
    private setupCanvas;
    /**
     * Setup resize handler for responsive design
     */
    private setupResizeHandler;
    /**
     * Update canvas size and calculate scaling for responsive design
     */
    private updateCanvasSize;
    /**
     * Clear the canvas
     */
    clear(): void;
    /**
     * Render the maze
     */
    renderMaze(maze: Maze): void;
    /**
     * Render pellets
     */
    renderPellets(maze: Maze): void;
    /**
     * Render game overlay (menu, pause, game over, etc.)
     */
    renderOverlay(title: string, message: string, showButton?: boolean): void;
    /**
     * Hide game overlay
     */
    hideOverlay(): void;
    /**
     * Update UI elements (score, level, lives)
     */
    updateUI(score: number, level: number, lives: number): void;
    /**
     * Render particles effect
     */
    renderParticles(particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        maxLife: number;
        color: string;
        size: number;
    }>): void;
    /**
     * Render text at specified position
     */
    renderText(text: string, x: number, y: number, fontSize?: number, color?: string, font?: string): void;
    /**
     * Render centered text
     */
    renderCenteredText(text: string, y: number, fontSize?: number, color?: string): void;
    /**
     * Render FPS counter (for debugging)
     */
    renderFPS(fps: number): void;
    /**
     * Get canvas element
     */
    getCanvas(): HTMLCanvasElement;
    /**
     * Get rendering context
     */
    getContext(): CanvasRenderingContext2D;
    /**
     * Get current scale factor
     */
    getScale(): number;
    /**
     * Convert screen coordinates to game coordinates
     */
    screenToGameCoords(screenX: number, screenY: number): Vector2D;
    /**
     * Clean up renderer
     */
    destroy(): void;
}
//# sourceMappingURL=renderer.d.ts.map