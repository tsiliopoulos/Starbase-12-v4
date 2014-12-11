var states;
(function (states) {
    states.backToInstructionsButton4;
    // Button Event Handlers
    function backToInstructionsButton4Clicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }
    states.backToInstructionsButton4Clicked = backToInstructionsButton4Clicked;
    // State function
    function WeaponsState() {
    }
    states.WeaponsState = WeaponsState;
    // Body of Menu Scene
    function Weapons() {
        var menuScreen;
        // Declare new Game Container
        game = new createjs.Container();
        // Show Cursor
        stage.cursor = "default";
        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("weaponsScreen"));
        game.addChild(menuScreen);
        // Display the Movement Button
        states.backToInstructionsButton4 = new objects.Button(50, 50, "backButton");
        states.backToInstructionsButton4.scale(0.5);
        game.addChild(states.backToInstructionsButton4);
        states.backToInstructionsButton4.addEventListener("click", backToInstructionsButton4Clicked);
        stage.addChild(game);
    }
    states.Weapons = Weapons;
})(states || (states = {}));
//# sourceMappingURL=weapons.js.map