var states;
(function (states) {
    states.playButton;
    states.instructionsButton;
    // Button Event Handlers
    function instructionsButtonClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }
    states.instructionsButtonClicked = instructionsButtonClicked;
    function playButtonClicked(event) {
        menuSound.stop();
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.PLAY_STATE;
        changeState(currentState);
    }
    states.playButtonClicked = playButtonClicked;
    // State function
    function MenuState() {
    }
    states.MenuState = MenuState;
    // Body of Menu Scene
    function Menu() {
        var gameNameLabel;
        var menuScreen;
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
        states.instructionsButton = new objects.Button(config.MIDDLE_X, 400, "instructionsButton");
        game.addChild(states.instructionsButton);
        states.instructionsButton.addEventListener("click", instructionsButtonClicked);
        // Display Play Button
        states.playButton = new objects.Button(config.MIDDLE_X, 500, "playButton");
        game.addChild(states.playButton);
        states.playButton.addEventListener("click", playButtonClicked);
        stage.addChild(game);
    }
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map