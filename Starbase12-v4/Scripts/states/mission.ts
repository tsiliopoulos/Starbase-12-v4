module states {
    export var backToInstructionsButton: objects.Button;

    // Button Event Handlers
    export function backToInstructionsButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.INSTRUCTION_STATE;
        changeState(currentState);
    }

    // State function
    export function MissionState() {

    }

    // Body of Menu Scene
    export function Mission() {
        var menuScreen: createjs.Bitmap;

        // Declare new Game Container
        game = new createjs.Container();

        // Show Cursor
        stage.cursor = "default";

        // Menu Screen
        menuScreen = new createjs.Bitmap(managers.Assets.loader.getResult("missionScreen"));
        game.addChild(menuScreen);

        // Display the Movement Button
        backToInstructionsButton = new objects.Button(50, 50, "backButton");
        backToInstructionsButton.scale(0.5);
        game.addChild(backToInstructionsButton);
        backToInstructionsButton.addEventListener("click", backToInstructionsButtonClicked);

        stage.addChild(game);
    }
} 