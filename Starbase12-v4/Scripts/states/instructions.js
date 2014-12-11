var states;
(function (states) {
    states.missionButton;
    states.movementButton;
    states.defensesButton;
    states.weaponsButton;
    states.backToMenuButton;
    // Button Event Handlers
    function missionButtonClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.MISSION_STATE;
        changeState(currentState);
    }
    states.missionButtonClicked = missionButtonClicked;
    function movementButtonClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.MOVEMENT_STATE;
        changeState(currentState);
    }
    states.movementButtonClicked = movementButtonClicked;
    function defensesButtonClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.DEFENSES_STATE;
        changeState(currentState);
    }
    states.defensesButtonClicked = defensesButtonClicked;
    function weaponsButtonClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.WEAPONS_STATE;
        changeState(currentState);
    }
    states.weaponsButtonClicked = weaponsButtonClicked;
    function backToMenuButtonClicked(event) {
        menuSound.stop();
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.MENU_STATE;
        changeState(currentState);
    }
    states.backToMenuButtonClicked = backToMenuButtonClicked;
    // State function
    function InstructionState() {
    }
    states.InstructionState = InstructionState;
    // Body of Menu Scene
    function Instructions() {
        var gameNameLabel;
        var menuScreen;
        // Declare new Game Container
        game = new createjs.Container();
        // Show Cursor
        stage.cursor = "default";
        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("menuScreen"));
        game.addChild(menuScreen);
        menuScreen.alpha = 0.8;
        // Display Instructions Label
        gameNameLabel = new objects.Label(config.MIDDLE_X, 100, "Instructions");
        game.addChild(gameNameLabel);
        // Display the Mission Briefing Button
        states.missionButton = new objects.Button(config.MIDDLE_X, 200, "missionButton");
        game.addChild(states.missionButton);
        states.missionButton.addEventListener("click", missionButtonClicked);
        // Display the Movement Button
        states.movementButton = new objects.Button(config.MIDDLE_X, 300, "movementButton");
        game.addChild(states.movementButton);
        states.movementButton.addEventListener("click", movementButtonClicked);
        // Display the Movement Button
        states.defensesButton = new objects.Button(config.MIDDLE_X, 400, "defensesButton");
        game.addChild(states.defensesButton);
        states.defensesButton.addEventListener("click", defensesButtonClicked);
        // Display the Movement Button
        states.weaponsButton = new objects.Button(config.MIDDLE_X, 500, "weaponsButton");
        game.addChild(states.weaponsButton);
        states.weaponsButton.addEventListener("click", weaponsButtonClicked);
        // Display the Movement Button
        states.backToMenuButton = new objects.Button(100, 550, "backButton");
        game.addChild(states.backToMenuButton);
        states.backToMenuButton.addEventListener("click", backToMenuButtonClicked);
        stage.addChild(game);
    }
    states.Instructions = Instructions;
})(states || (states = {}));
//# sourceMappingURL=instructions.js.map