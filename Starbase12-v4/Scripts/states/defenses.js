var states;
(function (states) {
    states.backToInstructionsButton3;
    // Button Event Handlers
    function backToInstructionsButton3Clicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }
    states.backToInstructionsButton3Clicked = backToInstructionsButton3Clicked;
    // State function
    function DefensesState() {
    }
    states.DefensesState = DefensesState;
    // Body of Menu Scene
    function Defenses() {
        var menuScreen;
        // Declare new Game Container
        game = new createjs.Container();
        // Show Cursor
        stage.cursor = "default";
        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("defensesScreen"));
        game.addChild(menuScreen);
        // Display the Movement Button
        states.backToInstructionsButton3 = new objects.Button(50, 50, "backButton");
        states.backToInstructionsButton3.scale(0.5);
        game.addChild(states.backToInstructionsButton3);
        states.backToInstructionsButton3.addEventListener("click", backToInstructionsButton3Clicked);
        stage.addChild(game);
    }
    states.Defenses = Defenses;
})(states || (states = {}));
//# sourceMappingURL=defenses.js.map