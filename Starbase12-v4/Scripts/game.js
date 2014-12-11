/// <reference path="config/config.ts" />
/// <reference path="config/keys.ts" />
/// <reference path="config/layer.ts" />
/// <reference path="config/controls.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="objects/loaderbar.ts" />
/// <reference path="managers/gametile.ts" />
/// <reference path="utility/showlocation.ts" />
/// <reference path="utility/drawdebugrect.ts" />
/// <reference path="utility/distance.ts" />
/// <reference path="utility/getarcstring.ts" />
/// <reference path="utility/textcolour.ts" />
/// <reference path="utility/quadrant.ts" />
/// <reference path="utility/oppositeangle.ts" />
/// <reference path="utility/speech.ts" />
/// <reference path="interfaces/iobject.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/hud.ts" />
/// <reference path="objects/crosshair.ts" />
/// <reference path="objects/explosion.ts" />
/// <reference path="objects/flame.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/shield.ts" />
/// <reference path="objects/player.ts" />
/// <reference path="objects/disruptor.ts" />
/// <reference path="objects/enemy.ts" />
/// <reference path="objects/starbase.ts" />
/// <reference path="objects/phasertracer.ts" />
/// <reference path="objects/phaser.ts" />
/// <reference path="objects/photon.ts" />
/// <reference path="managers/klingon.ts" />
/// <reference path="managers/particleexplosion.ts" />
/// <reference path="managers/particleflame.ts" />
/// <reference path="managers/beamweapon.ts" />
/// <reference path="managers/collision.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/mission.ts" />
/// <reference path="states/movement.ts" />
/// <reference path="states/defenses.ts" />
/// <reference path="states/weapons.ts" />
/// <reference path="states/instructions.ts" />
/// <reference path="states/menu.ts" />
var stage;
var canvas;
var stats;
var loaderBar;
var percentLoaded = 0;
// Filters
var colorFilter = new createjs.ColorFilter(1, 1, 0);
// Game Objects
var player;
var starbase;
var background;
var hud;
var crosshair;
// Game Arrays
var emitters = [];
var flameBursts = [];
var explosions = [];
var flames = [];
var gameTiles = [];
var enemies = [];
// Game Managers
var gameTile;
var beamWeapon;
var collision;
var particleExplosion;
var particleFlame;
var klingon;
// Game Container
var game;
// Game State Variables
var currentState;
var currentStateFunction;
var gamePlaying = false;
var startButton;
// Game Level Variables
var gameLevel = 1;
var enemyLevel = 0;
var levelUp = true;
var starbaseAlive = true;
var klingonsAlive = true;
var playerAlive = true;
var gameControls = false;
var lastDocked = 0;
// Game Music Variables
var battleSound;
var gameOverSound;
var menuSound;
// Preload Assets
function preload() {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("progress", handleProgress);
    managers.Assets.loader.addEventListener("complete", init);
    canvas = config.ARCADE_CANVAS;
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.FPS);
    createjs.Ticker.addEventListener("tick", gameLoop);
    // Show the Start Screen
    showStartScreen();
}
// Show Loader Bar Progress
function handleProgress(event) {
    percentLoaded = event.loaded;
    loaderBar.update();
    stage.update();
}
// Initialize Game
function init() {
    managers.Assets.loadSprites();
    // Remove loader bar
    loaderBar.destroy();
    // Add Start Button after Loader is complete
    startButton = new objects.Button(config.MIDDLE_X, 525, "startButton");
    game.addChild(startButton);
    // Don't Start the game until startButton is pressed
    startButton.on("click", function (e) {
        stage.removeChild(game);
        //soundtrack.stop();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.MENU_STATE;
        changeState(currentState);
    });
}
// Main Game Loop
function gameLoop(event) {
    // Start counting for FPS stats
    this.stats.begin();
    if (gamePlaying == true) {
        currentStateFunction();
    }
    stage.update(event);
    // Stop counting Stats
    return this.stats.end();
}
// Setup Game Stats using Stats.js
function setupStats() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Main Game Function
function showStartScreen() {
    setupStats();
    // the Main object container
    game = new createjs.Container();
    var introScreen = new createjs.Bitmap("assets/images/introScreen.png");
    game.addChild(introScreen);
    loaderBar = new objects.LoaderBar(config.MIDDLE_X, 525, config.FONT_COLOUR, config.WHITE);
    game.addChild(loaderBar);
    stage.addChild(game);
}
function changeState(state) {
    switch (state) {
        case config.MENU_STATE:
            // instantiate the Game Menu screen
            currentStateFunction = states.MenuState;
            states.Menu();
            break;
        case config.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.PlayState;
            states.Play();
            break;
        case config.GAME_OVER_STATE:
            // instantiate game over screen
            currentStateFunction = states.GameOverState;
            states.GameOver();
            break;
        case config.INSTRUCTION_STATE:
            currentStateFunction = states.InstructionState;
            // instantiate the Instruction Menu screen
            states.Instructions();
            break;
        case config.MISSION_STATE:
            currentStateFunction = states.MissionState;
            // instantiate the Mission Briefing screen
            states.Mission();
            break;
        case config.MOVEMENT_STATE:
            currentStateFunction = states.MovementState;
            // instantiate the Instruction Menu screen
            states.Movement();
            break;
        case config.DEFENSES_STATE:
            currentStateFunction = states.DefensesState;
            // instantiate the Instruction Menu screen
            states.Defenses();
            break;
        case config.WEAPONS_STATE:
            currentStateFunction = states.WeaponsState;
            // instantiate the Instruction Menu screen
            states.Weapons();
            break;
    }
}
//# sourceMappingURL=game.js.map