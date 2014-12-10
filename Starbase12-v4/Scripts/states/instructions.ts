module states {
    export var missionButton: objects.Button;
    export var movementButton: objects.Button;
    export var defensesButton: objects.Button;
    export var weaponsButton: objects.Button;
    export var backToMenuButton: objects.Button;

    // Button Event Handlers
    export function missionButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.MISSION_STATE;
        changeState(currentState);
    }

    export function movementButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.MOVEMENT_STATE;
        changeState(currentState);
    }

    export function defensesButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.DEFENSES_STATE;
        changeState(currentState);
    }

    export function weaponsButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.WEAPONS_STATE;
        changeState(currentState);
    }

    export function backToMenuButtonClicked(event: MouseEvent) {
        menuSound.stop();
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.MENU_STATE;
        changeState(currentState);
    }

    // State function
    export function InstructionState() {

    }

    // Body of Menu Scene
    export function Instructions() {
        var gameNameLabel: objects.Label;
        var menuScreen: createjs.Bitmap;

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
        missionButton = new objects.Button(config.MIDDLE_X, 200, "missionButton");
        game.addChild(missionButton);
        missionButton.addEventListener("click", missionButtonClicked);

        // Display the Movement Button
        movementButton = new objects.Button(config.MIDDLE_X, 300, "movementButton");
        game.addChild(movementButton);
        movementButton.addEventListener("click", movementButtonClicked);

        // Display the Movement Button
        defensesButton = new objects.Button(config.MIDDLE_X, 400, "defensesButton");
        game.addChild(defensesButton);
        defensesButton.addEventListener("click", defensesButtonClicked);

        // Display the Movement Button
        weaponsButton = new objects.Button(config.MIDDLE_X, 500, "weaponsButton");
        game.addChild(weaponsButton);
        weaponsButton.addEventListener("click", weaponsButtonClicked);

        // Display the Movement Button
        backToMenuButton = new objects.Button(100, 550, "backButton");
        game.addChild(backToMenuButton);
        backToMenuButton.addEventListener("click", backToMenuButtonClicked);

        stage.addChild(game);
    }
} 