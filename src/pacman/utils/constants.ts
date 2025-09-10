// Game configuration and constants
export const GAME_CONFIG = {
    // Canvas dimensions
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    
    // Game timing
    FPS: 60,
    FRAME_TIME: 1000 / 60,
    
    // Grid settings
    GRID_SIZE: 20,
    MAZE_WIDTH: 40,
    MAZE_HEIGHT: 30,
    
    // Player settings
    PLAYER_SPEED: 2,
    PLAYER_RADIUS: 8,
    
    // Ghost settings
    GHOST_SPEED: 1.5,
    GHOST_RADIUS: 8,
    FRIGHTENED_DURATION: 8000, // 8 seconds
    
    // Pellet settings
    PELLET_RADIUS: 2,
    POWER_PELLET_RADIUS: 8,
    
    // Scoring
    PELLET_POINTS: 10,
    POWER_PELLET_POINTS: 50,
    GHOST_POINTS: [200, 400, 800, 1600], // Progressive ghost eating points
    
    // Colors
    COLORS: {
        BACKGROUND: '#000000',
        WALL: '#0066cc',
        PELLET: '#ffff88',
        POWER_PELLET: '#ffff00',
        PLAYER: '#ffff00',
        GHOST_RED: '#ff0000',
        GHOST_PINK: '#ffb8ff',
        GHOST_CYAN: '#00ffff',
        GHOST_ORANGE: '#ffb852',
        GHOST_FRIGHTENED: '#0000ff',
        GHOST_EYES: '#ffffff',
        TEXT: '#ffffff'
    }
} as const;

// Game states
export enum GameState {
    LOADING = 'loading',
    MENU = 'menu',
    READY = 'ready',
    PLAYING = 'playing',
    PAUSED = 'paused',
    GAME_OVER = 'game_over',
    LEVEL_COMPLETE = 'level_complete',
    VICTORY = 'victory'
}

// Directions for movement
export enum Direction {
    NONE = 'none',
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}

// Ghost modes
export enum GhostMode {
    SCATTER = 'scatter',
    CHASE = 'chase',
    FRIGHTENED = 'frightened',
    EATEN = 'eaten'
}

// Input keys mapping
export const INPUT_KEYS = {
    UP: ['ArrowUp', 'KeyW'] as readonly string[],
    DOWN: ['ArrowDown', 'KeyS'] as readonly string[],
    LEFT: ['ArrowLeft', 'KeyA'] as readonly string[],
    RIGHT: ['ArrowRight', 'KeyD'] as readonly string[],
    PAUSE: ['Space', 'KeyP'] as readonly string[],
    START: ['Enter', 'Space'] as readonly string[]
} as const;

// Audio settings
export const AUDIO_CONFIG = {
    MASTER_VOLUME: 0.7,
    SFX_VOLUME: 0.8,
    MUSIC_VOLUME: 0.5
} as const;

// Performance settings
export const PERFORMANCE_CONFIG = {
    MAX_PARTICLES: 50,
    PARTICLE_LIFETIME: 1000,
    ENABLE_SHADOWS: true,
    ENABLE_PARTICLES: true
} as const;