module states {
    export var backToInstructionsButton3: objects.Button;

    // Button Event Handlers
    export function backToInstructionsButton3Clicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }

    // State function
    export function DefensesState() {

    }

    // Body of Menu Scene
    export function Defenses() {
        var menuScreen: createjs.Bitmap;

        // Declare new Game Container
        game = new createjs.Container();

        // Show Cursor
        stage.cursor = "default";

        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("defensesScreen"));
        game.addChild(menuScreen);

        // Display the Movement Button
        backToInstructionsButton3 = new objects.Button(50, 50, "backButton");
        backToInstructionsButton3.scale(0.5);
        game.addChild(backToInstructionsButton3);
        backToInstructionsButton3.addEventListener("click", backToInstructionsButton3Clicked);

        stage.addChild(game);
    }
} 