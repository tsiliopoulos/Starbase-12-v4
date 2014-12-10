module states {
    export var backToInstructionsButton2: objects.Button;

    // Button Event Handlers
    export function backToInstructionsButton2Clicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }

    // State function
    export function MovementState() {

    }

    // Body of Menu Scene
    export function Movement() {
        var menuScreen: createjs.Bitmap;

        // Declare new Game Container
        game = new createjs.Container();

        // Show Cursor
        stage.cursor = "default";

        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("movementScreen"));
        game.addChild(menuScreen);

        // Display the Movement Button
        backToInstructionsButton2 = new objects.Button(50, 50, "backButton");
        backToInstructionsButton2.scale(0.5);
        game.addChild(backToInstructionsButton2);
        backToInstructionsButton2.addEventListener("click", backToInstructionsButton2Clicked);

        stage.addChild(game);
    }
} 