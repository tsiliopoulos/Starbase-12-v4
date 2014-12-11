// Play State
var states;
(function (states) {
    // Main Game Loop
    function PlayState(event) {
        // Update Starbase
        starbase.update();
        starbase.integrityLabel.updateCache();
        starbase.updateCache();
        // Update Player
        player.update();
        player.integrityLabel.updateCache();
        player.updateCache();
        // Update Managers
        klingon.update();
        beamWeapon.update();
        particleExplosion.update();
        collision.update();
        // Update Crosshair
        crosshair.update();
        //crosshair.updateCache();
        // Update HUD
        hud.update();
        if (levelUp) {
            // Say and show level
            gameControls = false;
            sayLevel();
            generateLevel();
            showLevelLabel();
        }
    }
    states.PlayState = PlayState;
    // generate a new starbase
    function createStarbase() {
        // if starbase hasn't been created and starbase is fully constructed
        if (((!starbase) || (starbaseAlive == false)) && (hud.starbasePercent == 100)) {
            // Create a new starbase
            starbase = new objects.Starbase();
            game.addChild(starbase);
            game.addChild(starbase.integrityLabel);
            starbase.integrityLabel.shadow = new createjs.Shadow('#FFF', 2, 2, 8);
            starbase.integrityLabel.filters = [colorFilter];
            starbase.integrityLabel.cache(0, 0, starbase.integrityLabel.getBounds().width, starbase.integrityLabel.getBounds().height);
            starbase.cache(0, 0, starbase.width, starbase.height);
            starbaseAlive = true;
        }
        else {
            // repair shields if hull is already fully repaired
            if (starbase.integrity == 100) {
                starbase.shieldsDown();
                starbase.shieldsUp();
            }
            // repair starbase hull between levels
            if (starbase.integrity <= 100) {
                starbase.integrity += 15;
                if (starbase.integrity > 100) {
                    starbase.integrity = 100;
                }
            }
            // allow player to dock with starbase every even level
            if (((gameLevel - lastDocked) >= 2) && (starbase.integrity > 60)) {
                starbase.hasDocked = false;
                starbase.gotoAndPlay("starbase");
            }
            if ((starbase.integrity > 35) && (starbase.integrity < 61)) {
                starbase.gotoAndPlay("starbaseY");
            }
            if ((starbase.integrity > 1) && (starbase.integrity < 35)) {
                starbase.gotoAndPlay("starbaseR");
            }
        }
        // choose a tile for the starbase to occupy
        gameTile.getLocation(starbase);
    }
    // generate player object
    function createPlayer() {
        // if player hasn't been created...
        if ((!player) || (playerAlive == false)) {
            // Create player
            player = new objects.Player();
            game.addChild(player);
            game.addChild(player.integrityLabel);
            player.integrityLabel.shadow = new createjs.Shadow('#FFF', 2, 2, 8);
            player.integrityLabel.filters = [colorFilter];
            player.integrityLabel.cache(0, 0, player.integrityLabel.getBounds().width, player.integrityLabel.getBounds().height);
            player.cache(0, 0, player.width, player.height);
            playerAlive = true;
        }
        // choose a tile for the player to occupy
        gameTile.getLocation(player);
    }
    // generate enemies
    function createEnemies() {
        // Instantiate Enemy Manager and Create enemies
        klingon = new managers.Klingon();
        klingon.spawn();
        klingonsAlive = true;
    }
    // Show Level for 2 seconds
    function showLevelLabel() {
        var levelString = "Entering Sector " + ((gameLevel / 10).toFixed(1)).toString();
        var levelLabel = new objects.Label(config.MIDDLE_X, config.MIDDLE_Y, levelString);
        levelLabel.fontSize(50);
        game.addChild(levelLabel);
        setTimeout(function (e) {
            game.removeChild(levelLabel);
        }, 2000);
        //Prep for next level
        gameLevel++;
        levelUp = false;
    }
    // Speak Level
    function sayLevel() {
        var levelconversion = ((gameLevel * 0.1).toFixed(1)).toString();
        var firstdigit = levelconversion.substr(0, 1);
        var seconddigit = levelconversion.substr(2, 1);
        createjs.Sound.play("sector");
        setTimeout(function (e) {
            utility.Speech(firstdigit);
        }, 1000);
        setTimeout(function (e) {
            createjs.Sound.play("point");
        }, 1800);
        setTimeout(function (e) {
            utility.Speech(seconddigit);
        }, 2300);
    }
    // create a new ever-increasing level
    function generateLevel() {
        gameTile = new managers.GameTile();
        gameTile.init();
        // place starbase in random tile location
        createStarbase();
        // place player in random tile location
        createPlayer();
        // place enemies in random tile location(s)
        createEnemies();
        setTimeout(function (e) {
            gameControls = true;
        }, 4000);
    }
    // Main Game Function
    function Play() {
        // Turn off Mouse Over
        stage.enableMouseOver(0);
        // the Main object container
        game = new createjs.Container();
        // Play battle music
        battleSound = createjs.Sound.play("battleMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.5);
        //stage.cursor = "none";
        // Show background graphic
        background = new createjs.Bitmap(managers.Assets.loader.getResult("background"));
        game.addChildAt(background, layer.BACKGROUND);
        background.cache(0, 0, config.WIDTH, config.HEIGHT);
        // show Heads Up Display
        hud = new objects.Hud();
        game.addChildAt(hud, layer.HUD);
        // Create the Crosshair
        crosshair = new objects.Crosshair();
        game.addChild(crosshair);
        //crosshair.cache(stage.mouseX, stage.mouseY, crosshair.width, crosshair.height);
        // Instantiate the Beamweapon Manager
        beamWeapon = new managers.BeamWeapon();
        // Manage Explosions
        particleExplosion = new managers.ParticleExplosion();
        // Manage Collisions
        collision = new managers.Collision();
        stage.addChild(game);
        // show level and then generate 
        gameControls = false;
        sayLevel();
        generateLevel();
        showLevelLabel();
        gamePlaying = true;
    }
    states.Play = Play;
})(states || (states = {}));
//# sourceMappingURL=play.js.map