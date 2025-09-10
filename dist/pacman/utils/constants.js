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
};
// Game states
export var GameState;
(function (GameState) {
    GameState["LOADING"] = "loading";
    GameState["MENU"] = "menu";
    GameState["READY"] = "ready";
    GameState["PLAYING"] = "playing";
    GameState["PAUSED"] = "paused";
    GameState["GAME_OVER"] = "game_over";
    GameState["LEVEL_COMPLETE"] = "level_complete";
    GameState["VICTORY"] = "victory";
})(GameState || (GameState = {}));
// Directions for movement
export var Direction;
(function (Direction) {
    Direction["NONE"] = "none";
    Direction["UP"] = "up";
    Direction["DOWN"] = "down";
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
})(Direction || (Direction = {}));
// Ghost modes
export var GhostMode;
(function (GhostMode) {
    GhostMode["SCATTER"] = "scatter";
    GhostMode["CHASE"] = "chase";
    GhostMode["FRIGHTENED"] = "frightened";
    GhostMode["EATEN"] = "eaten";
})(GhostMode || (GhostMode = {}));
// Input keys mapping
export const INPUT_KEYS = {
    UP: ['ArrowUp', 'KeyW'],
    DOWN: ['ArrowDown', 'KeyS'],
    LEFT: ['ArrowLeft', 'KeyA'],
    RIGHT: ['ArrowRight', 'KeyD'],
    PAUSE: ['Space', 'KeyP'],
    START: ['Enter', 'Space']
};
// Audio settings
export const AUDIO_CONFIG = {
    MASTER_VOLUME: 0.7,
    SFX_VOLUME: 0.8,
    MUSIC_VOLUME: 0.5
};
// Performance settings
export const PERFORMANCE_CONFIG = {
    MAX_PARTICLES: 50,
    PARTICLE_LIFETIME: 1000,
    ENABLE_SHADOWS: true,
    ENABLE_PARTICLES: true
};
//# sourceMappingURL=constants.js.map