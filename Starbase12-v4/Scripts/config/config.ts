module config {
    // Canvas
    export var ARCADE_CANVAS = document.getElementById("arcade");

    // Game Initialization 
    export var FPS: number = 60;

    // Screen Constants
    export var WIDTH: number = 800;
    export var HEIGHT: number = 600;
    export var MIDDLE_X: number = 400;
    export var MIDDLE_Y: number = 300;
    export var BORDER: number = 31;
    export var LOADER_WIDTH: number = 400;
    export var LOADER_HEIGHT: number = 60;

    // Tile Constants
    export var TILE_WIDTH: number = 146;
    export var TILE_HEIGHT: number = 133;
    export var TILE_COL: number = 5;
    export var TILE_ROW: number = 4;

    // Used for stats
    export var SHOW_FPS: boolean = true;

    // Position Constants
    export var TOP_RIGHT: number = 0;
    export var TOP_LEFT: number = 1;
    export var BOT_LEFT: number = 2;
    export var BOT_RIGHT: number = 3;

    // Rotation Constants
    export var COUNTERCLOCKWISE: number = 0;
    export var CLOCKWISE: number = 1;

    // Font Constants
    export var FONT_COLOUR: string = "#FFDE73";
    export var FONT: string = "startrek";
    export var FONT_SIZE: string = "26px";

    // Game Play Constants
    export var PHASER_LEVEL: number = 100;
    export var PHOTON_NUM: number = 8;
    export var INTEGRITY: number = 100;
    export var ARC_COUNT: number = 4;
    export var ENEMY_COUNT: number = 1;

    // Colour Constants
    export var GREEN: string = "#0F0";
    export var YELLOW: string = "#FF0";
    export var RED: string = "#F00";
    export var WHITE: string = "#FFF";
    export var BLACK: string = "#000";

    // Damage Constants
    export var PHOTON_DAMAGE: number = 50;
    export var PHASER_DAMAGE: number = 5;
    export var DISRUPTOR_DAMAGE: number = 10;
    export var PLAYER_DAMAGE: number = 25;
    export var KLINGON_DAMAGE: number = 20;
    export var STARBASE_DAMAGE: number = 25;

    // Speed Constants
    export var KLINGON_FORWARD: number = 3;
    export var KLINGON_REVERSE: number = 1;
    export var PLAYER_FORWARD: number = 5;
    export var PLAYER_REVERSE: number = 2;
    export var PHASER_SPEED: number = 20;
    export var PHOTON_SPEED: number = 10;
    export var DISRUPTOR_SPEED: number = 10;

    // Turn Rate Constants
    export var KLINGON_TURN_RATE: number = 0.6;
    export var STARBASE_TURN_RATE: number = 0.1;
    export var PLAYER_TURN_RATE: number = 1.2;

    // State Constants
    export var MENU_STATE: number = 0;
    export var PLAY_STATE: number = 1;
    export var GAME_OVER_STATE: number = 2;
    export var INSTRUCTION_STATE: number = 3;
    export var MISSION_STATE: number = 4;
    export var MOVEMENT_STATE: number = 5;
    export var DEFENSES_STATE: number = 6;
    export var WEAPONS_STATE: number = 7;
}