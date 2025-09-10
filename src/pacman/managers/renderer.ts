import { GAME_CONFIG } from '../utils/constants.js';
import { Vector2D, MathUtils } from '../utils/math.js';
import { Maze } from '../entities/maze.js';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private scale: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context from canvas');
        }
        this.ctx = context;
        this.scale = 1;
        
        this.setupCanvas();
        this.setupResizeHandler();
    }

    /**
     * Setup canvas with proper resolution and scaling
     */
    private setupCanvas(): void {
        this.updateCanvasSize();
        
        // Set canvas properties for crisp pixel art
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
    }

    /**
     * Setup resize handler for responsive design
     */
    private setupResizeHandler(): void {
        window.addEventListener('resize', () => {
            this.updateCanvasSize();
        });
    }

    /**
     * Update canvas size and calculate scaling for responsive design
     */
    private updateCanvasSize(): void {
        const container = this.canvas.parentElement;
        if (!container) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate scale to fit the game in the container
        const scaleX = containerWidth / GAME_CONFIG.CANVAS_WIDTH;
        const scaleY = containerHeight / GAME_CONFIG.CANVAS_HEIGHT;
        this.scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1:1

        // Calculate canvas size
        const canvasWidth = GAME_CONFIG.CANVAS_WIDTH * this.scale;
        const canvasHeight = GAME_CONFIG.CANVAS_HEIGHT * this.scale;

        // Set display size
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;

        // Set actual size (for high DPI displays)
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = canvasWidth * devicePixelRatio;
        this.canvas.height = canvasHeight * devicePixelRatio;

        // Scale context to match device pixel ratio
        this.ctx.scale(devicePixelRatio * this.scale, devicePixelRatio * this.scale);
    }

    /**
     * Clear the canvas
     */
    clear(): void {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    /**
     * Render the maze
     */
    renderMaze(maze: Maze): void {
        const mazeGrid = maze.getMaze();
        const gridSize = GAME_CONFIG.GRID_SIZE;

        this.ctx.save();

        // Render walls
        this.ctx.fillStyle = GAME_CONFIG.COLORS.WALL;
        this.ctx.strokeStyle = '#0088ff';
        this.ctx.lineWidth = 1;

        for (let y = 0; y < mazeGrid.length; y++) {
            for (let x = 0; x < mazeGrid[y].length; x++) {
                if (mazeGrid[y][x] === 1) { // Wall
                    const pixelX = x * gridSize;
                    const pixelY = y * gridSize;
                    
                    this.ctx.fillRect(pixelX, pixelY, gridSize, gridSize);
                    this.ctx.strokeRect(pixelX, pixelY, gridSize, gridSize);
                }
            }
        }

        this.ctx.restore();
    }

    /**
     * Render pellets
     */
    renderPellets(maze: Maze): void {
        const gridSize = GAME_CONFIG.GRID_SIZE;
        
        this.ctx.save();
        this.ctx.fillStyle = GAME_CONFIG.COLORS.PELLET;

        // Render regular pellets
        const pelletPositions = maze.getPelletPositions();
        for (const pos of pelletPositions) {
            const pixelPos = MathUtils.gridToPixel(pos.x, pos.y, gridSize);
            
            this.ctx.beginPath();
            this.ctx.arc(pixelPos.x, pixelPos.y, GAME_CONFIG.PELLET_RADIUS, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        // Render power pellets with pulsing effect
        this.ctx.fillStyle = GAME_CONFIG.COLORS.POWER_PELLET;
        const pulseScale = 0.8 + 0.2 * Math.sin(Date.now() * 0.005);
        
        const powerPelletPositions = maze.getPowerPelletPositions();
        for (const pos of powerPelletPositions) {
            const pixelPos = MathUtils.gridToPixel(pos.x, pos.y, gridSize);
            
            this.ctx.beginPath();
            this.ctx.arc(
                pixelPos.x, 
                pixelPos.y, 
                GAME_CONFIG.POWER_PELLET_RADIUS * pulseScale, 
                0, 
                2 * Math.PI
            );
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    /**
     * Render game overlay (menu, pause, game over, etc.)
     */
    renderOverlay(title: string, message: string, showButton: boolean = false): void {
        const overlay = document.getElementById('gameOverlay');
        const overlayTitle = document.getElementById('overlayTitle');
        const overlayMessage = document.getElementById('overlayMessage');
        const startButton = document.getElementById('startButton');

        if (overlay && overlayTitle && overlayMessage && startButton) {
            overlay.classList.remove('hidden');
            overlayTitle.textContent = title;
            overlayMessage.textContent = message;
            startButton.style.display = showButton ? 'block' : 'none';
        }
    }

    /**
     * Hide game overlay
     */
    hideOverlay(): void {
        const overlay = document.getElementById('gameOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    /**
     * Update UI elements (score, level, lives)
     */
    updateUI(score: number, level: number, lives: number): void {
        const scoreElement = document.getElementById('score');
        const levelElement = document.getElementById('level');
        const livesElement = document.getElementById('lives');

        if (scoreElement) scoreElement.textContent = score.toString();
        if (levelElement) levelElement.textContent = level.toString();
        if (livesElement) livesElement.textContent = lives.toString();
    }

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
    }>): void {
        this.ctx.save();

        for (const particle of particles) {
            const alpha = particle.life / particle.maxLife;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = particle.color;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    /**
     * Render text at specified position
     */
    renderText(
        text: string, 
        x: number, 
        y: number, 
        fontSize: number = 20, 
        color: string = GAME_CONFIG.COLORS.TEXT,
        font: string = 'Arial'
    ): void {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize}px ${font}`;
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    }

    /**
     * Render centered text
     */
    renderCenteredText(
        text: string, 
        y: number, 
        fontSize: number = 20, 
        color: string = GAME_CONFIG.COLORS.TEXT
    ): void {
        const x = GAME_CONFIG.CANVAS_WIDTH / 2;
        this.renderText(text, x, y, fontSize, color);
    }

    /**
     * Render FPS counter (for debugging)
     */
    renderFPS(fps: number): void {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(10, 10, 80, 30);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`FPS: ${Math.round(fps)}`, 15, 25);
        this.ctx.restore();
    }

    /**
     * Get canvas element
     */
    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    /**
     * Get rendering context
     */
    getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    /**
     * Get current scale factor
     */
    getScale(): number {
        return this.scale;
    }

    /**
     * Convert screen coordinates to game coordinates
     */
    screenToGameCoords(screenX: number, screenY: number): Vector2D {
        const rect = this.canvas.getBoundingClientRect();
        const x = (screenX - rect.left) / this.scale;
        const y = (screenY - rect.top) / this.scale;
        return { x, y };
    }

    /**
     * Clean up renderer
     */
    destroy(): void {
        window.removeEventListener('resize', this.updateCanvasSize);
    }
}