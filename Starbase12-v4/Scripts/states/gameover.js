var states;
(function (states) {
    function GameOverState() {
        particleFlame.update();
    }
    states.GameOverState = GameOverState;
    // Restart Game when Try Again Button is clicked
    function playAgainClicked(event) {
        gameOverSound.stop();
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = config.PLAY_STATE;
        changeState(currentState);
    }
    states.playAgainClicked = playAgainClicked;
    // Game Over Scene
    function GameOver() {
        var gameOverLabel;
        var finalScoreLabel;
        var finalScore;
        var highScoreLabel;
        var highScore;
        var highScoreString = "";
        var playAgainButton;
        var gameOverScreen;
        // Enable Mouse Events
        stage.enableMouseOver(20);
        // Declare new Game Container
        game = new createjs.Container();
        // Play Game Over Music
        gameOverSound = createjs.Sound.play("gameOverMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
        // Display Game Over Screen
        gameOverScreen = new createjs.Bitmap(managers.Assets.loader.getResult("gameOverScreen"));
        game.addChild(gameOverScreen);
        // Manage Explosions
        particleFlame = new managers.ParticleFlame();
        // Add Flames
        particleFlame.addFlame(449, 486);
        particleFlame.addFlame(579, 467);
        particleFlame.addFlame(678, 404);
        // Show Cursor
        stage.cursor = "default";
        // Display Game Over
        gameOverLabel = new objects.Label(config.MIDDLE_X, 100, "Game Over");
        gameOverLabel.fontSize(70);
        game.addChild(gameOverLabel);
        // Display Final Score Label
        finalScoreLabel = new objects.Label(config.MIDDLE_X, 180, "Your Score");
        finalScoreLabel.fontSize(60);
        game.addChild(finalScoreLabel);
        // Display Final Score
        finalScore = new objects.Label(config.MIDDLE_X, 280, Math.floor(hud.score).toString());
        finalScore.fontSize(60);
        game.addChild(finalScore);
        /* // Display High Score Label
        highScoreLabel = new objects.Label(config.MIDDLE_X, 240, "High Score");
        highScoreLabel.fontSize(40);
        game.addChild(highScoreLabel);

        // Display High Score
        highScore = new objects.Label(config.MIDDLE_X, 300, highScoreString);
        highScore.fontSize(40);
        game.addChild(highScore);*/
        // Display Try Again Button
        playAgainButton = new objects.Button(config.MIDDLE_X, 360, "playAgainButton");
        game.addChild(playAgainButton);
        playAgainButton.addEventListener("click", playAgainClicked);
        stage.addChild(game);
    }
    states.GameOver = GameOver;
})(states || (states = {}));
//# sourceMappingURL=gameover.js.map