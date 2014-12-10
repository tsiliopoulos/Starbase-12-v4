module states {
    export var backToInstructionsButton4: objects.Button;

    // Button Event Handlers
    export function backToInstructionsButton4Clicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }

    // State function
    export function WeaponsState() {

    }

    // Body of Menu Scene
    export function Weapons() {
        var menuScreen: createjs.Bitmap;

        // Declare new Game Container
        game = new createjs.Container();

        // Show Cursor
        stage.cursor = "default";

        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("weaponsScreen"));
        game.addChild(menuScreen);

        // Display the Movement Button
        backToInstructionsButton4 = new objects.Button(50, 50, "backButton");
        backToInstructionsButton4.scale(0.5);
        game.addChild(backToInstructionsButton4);
        backToInstructionsButton4.addEventListener("click", backToInstructionsButton4Clicked);

        stage.addChild(game);
    }
} 