module states {
    export var playButton: objects.Button;
    export var instructionsButton: objects.Button;

    // Button Event Handlers
    export function instructionsButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }

    export function playButtonClicked(event: MouseEvent) {
        menuSound.stop();
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.PLAY_STATE;
        changeState(currentState);
    }

    // State function
    export function MenuState() {

    }

    // Body of Menu Scene
    export function Menu() {

        var gameNameLabel: objects.Label;
        var menuScreen: createjs.Bitmap;

        // Declare new Game Container
        game = new createjs.Container();

        menuSound = createjs.Sound.play("menuMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);

        // Show Cursor
        stage.cursor = "default";

        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("menuScreen"));
        game.addChild(menuScreen);
        menuScreen.alpha = 0.8;

        // Display Game Over
        gameNameLabel = new objects.Label(config.MIDDLE_X, config.MIDDLE_Y, "Starbase 12");

        game.addChild(gameNameLabel);

        // Display Instructions Button
        instructionsButton = new objects.Button(config.MIDDLE_X, 400, "instructionsButton");
        game.addChild(instructionsButton);
        instructionsButton.addEventListener("click", instructionsButtonClicked);

        // Display Play Button
        playButton = new objects.Button(config.MIDDLE_X, 500, "playButton");
        game.addChild(playButton);
        playButton.addEventListener("click", playButtonClicked);

        stage.addChild(game);
    }
} 