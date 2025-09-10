export declare const GAME_CONFIG: {
    readonly CANVAS_WIDTH: 800;
    readonly CANVAS_HEIGHT: 600;
    readonly FPS: 60;
    readonly FRAME_TIME: number;
    readonly GRID_SIZE: 20;
    readonly MAZE_WIDTH: 40;
    readonly MAZE_HEIGHT: 30;
    readonly PLAYER_SPEED: 2;
    readonly PLAYER_RADIUS: 8;
    readonly GHOST_SPEED: 1.5;
    readonly GHOST_RADIUS: 8;
    readonly FRIGHTENED_DURATION: 8000;
    readonly PELLET_RADIUS: 2;
    readonly POWER_PELLET_RADIUS: 8;
    readonly PELLET_POINTS: 10;
    readonly POWER_PELLET_POINTS: 50;
    readonly GHOST_POINTS: readonly [200, 400, 800, 1600];
    readonly COLORS: {
        readonly BACKGROUND: "#000000";
        readonly WALL: "#0066cc";
        readonly PELLET: "#ffff88";
        readonly POWER_PELLET: "#ffff00";
        readonly PLAYER: "#ffff00";
        readonly GHOST_RED: "#ff0000";
        readonly GHOST_PINK: "#ffb8ff";
        readonly GHOST_CYAN: "#00ffff";
        readonly GHOST_ORANGE: "#ffb852";
        readonly GHOST_FRIGHTENED: "#0000ff";
        readonly GHOST_EYES: "#ffffff";
        readonly TEXT: "#ffffff";
    };
};
export declare enum GameState {
    LOADING = "loading",
    MENU = "menu",
    READY = "ready",
    PLAYING = "playing",
    PAUSED = "paused",
    GAME_OVER = "game_over",
    LEVEL_COMPLETE = "level_complete",
    VICTORY = "victory"
}
export declare enum Direction {
    NONE = "none",
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}
export declare enum GhostMode {
    SCATTER = "scatter",
    CHASE = "chase",
    FRIGHTENED = "frightened",
    EATEN = "eaten"
}
export declare const INPUT_KEYS: {
    readonly UP: readonly string[];
    readonly DOWN: readonly string[];
    readonly LEFT: readonly string[];
    readonly RIGHT: readonly string[];
    readonly PAUSE: readonly string[];
    readonly START: readonly string[];
};
export declare const AUDIO_CONFIG: {
    readonly MASTER_VOLUME: 0.7;
    readonly SFX_VOLUME: 0.8;
    readonly MUSIC_VOLUME: 0.5;
};
export declare const PERFORMANCE_CONFIG: {
    readonly MAX_PARTICLES: 50;
    readonly PARTICLE_LIFETIME: 1000;
    readonly ENABLE_SHADOWS: true;
    readonly ENABLE_PARTICLES: true;
};
//# sourceMappingURL=constants.d.ts.map