var states;
(function (states) {
    states.backToInstructionsButton;
    // Button Event Handlers
    function backToInstructionsButtonClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }
    states.backToInstructionsButtonClicked = backToInstructionsButtonClicked;
    // State function
    function MissionState() {
    }
    states.MissionState = MissionState;
    // Body of Menu Scene
    function Mission() {
        var menuScreen;
        // Declare new Game Container
        game = new createjs.Container();
        // Show Cursor
        stage.cursor = "default";
        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("missionScreen"));
        game.addChild(menuScreen);
        // Display the Movement Button
        states.backToInstructionsButton = new objects.Button(50, 50, "backButton");
        states.backToInstructionsButton.scale(0.5);
        game.addChild(states.backToInstructionsButton);
        states.backToInstructionsButton.addEventListener("click", backToInstructionsButtonClicked);
        stage.addChild(game);
    }
    states.Mission = Mission;
})(states || (states = {}));
//# sourceMappingURL=mission.js.map