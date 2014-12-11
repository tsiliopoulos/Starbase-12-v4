var states;
(function (states) {
    states.backToInstructionsButton2;
    // Button Event Handlers
    function backToInstructionsButton2Clicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }
    states.backToInstructionsButton2Clicked = backToInstructionsButton2Clicked;
    // State function
    function MovementState() {
    }
    states.MovementState = MovementState;
    // Body of Menu Scene
    function Movement() {
        var menuScreen;
        // Declare new Game Container
        game = new createjs.Container();
        // Show Cursor
        stage.cursor = "default";
        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("movementScreen"));
        game.addChild(menuScreen);
        // Display the Movement Button
        states.backToInstructionsButton2 = new objects.Button(50, 50, "backButton");
        states.backToInstructionsButton2.scale(0.5);
        game.addChild(states.backToInstructionsButton2);
        states.backToInstructionsButton2.addEventListener("click", backToInstructionsButton2Clicked);
        stage.addChild(game);
    }
    states.Movement = Movement;
})(states || (states = {}));
//# sourceMappingURL=movement.js.map