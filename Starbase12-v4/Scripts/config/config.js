var config;
(function (config) {
    // Canvas
    config.ARCADE_CANVAS = document.getElementById("arcade");
    // Game Initialization 
    config.FPS = 60;
    // Screen Constants
    config.WIDTH = 800;
    config.HEIGHT = 600;
    config.MIDDLE_X = 400;
    config.MIDDLE_Y = 300;
    config.BORDER = 31;
    config.LOADER_WIDTH = 400;
    config.LOADER_HEIGHT = 60;
    // Tile Constants
    config.TILE_WIDTH = 146;
    config.TILE_HEIGHT = 133;
    config.TILE_COL = 5;
    config.TILE_ROW = 4;
    // Used for stats
    config.SHOW_FPS = true;
    // Position Constants
    config.TOP_RIGHT = 0;
    config.TOP_LEFT = 1;
    config.BOT_LEFT = 2;
    config.BOT_RIGHT = 3;
    // Rotation Constants
    config.COUNTERCLOCKWISE = 0;
    config.CLOCKWISE = 1;
    // Font Constants
    config.FONT_COLOUR = "#FFDE73";
    config.FONT = "startrek";
    config.FONT_SIZE = "26px";
    // Game Play Constants
    config.PHASER_LEVEL = 100;
    config.PHOTON_NUM = 8;
    config.INTEGRITY = 100;
    config.ARC_COUNT = 4;
    config.ENEMY_COUNT = 1;
    // Colour Constants
    config.GREEN = "#0F0";
    config.YELLOW = "#FF0";
    config.RED = "#F00";
    config.WHITE = "#FFF";
    config.BLACK = "#000";
    // Damage Constants
    config.PHOTON_DAMAGE = 50;
    config.PHASER_DAMAGE = 5;
    config.DISRUPTOR_DAMAGE = 10;
    config.PLAYER_DAMAGE = 25;
    config.KLINGON_DAMAGE = 20;
    config.STARBASE_DAMAGE = 25;
    // Speed Constants
    config.KLINGON_FORWARD = 3;
    config.KLINGON_REVERSE = 1;
    config.PLAYER_FORWARD = 5;
    config.PLAYER_REVERSE = 2;
    config.PHASER_SPEED = 20;
    config.PHOTON_SPEED = 10;
    config.DISRUPTOR_SPEED = 10;
    // Turn Rate Constants
    config.KLINGON_TURN_RATE = 0.6;
    config.STARBASE_TURN_RATE = 0.1;
    config.PLAYER_TURN_RATE = 1.2;
    // State Constants
    config.MENU_STATE = 0;
    config.PLAY_STATE = 1;
    config.GAME_OVER_STATE = 2;
    config.INSTRUCTION_STATE = 3;
    config.MISSION_STATE = 4;
    config.MOVEMENT_STATE = 5;
    config.DEFENSES_STATE = 6;
    config.WEAPONS_STATE = 7;
})(config || (config = {}));
//# sourceMappingURL=config.js.map