/// <reference path="../utility/distance.ts" />
/// <reference path="beamweapon.ts" />
// Collision Manager Class
var managers;
(function (managers) {
    var Collision = (function () {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++ 
        function Collision() {
        }
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        // Method to determine if an attack object hits a defender's shields
        Collision.prototype._shieldCollider = function (attackObject, defendObject) {
            var attackerPosition = attackObject.location;
            var shield = defendObject.shield;
            // Check if current Shield Arc is up
            if (utility.distance(attackerPosition, shield.location) < (shield.radius + attackObject.radius)) {
                var incomingAngle = 0;
                var attackerDirection = attackObject.direction;
                var arcNum;
                // Determine Angle of Attack (i.e. which shield is being attacked)
                incomingAngle = utility.oppositeAngle(attackerDirection);
                incomingAngle += defendObject.rotation;
                incomingAngle %= 360;
                arcNum = utility.Quadrant(incomingAngle);
                var currentArc = shield.arcs[arcNum];
                // check if shield arc is up
                if ((currentArc.integrity > 0) && (currentArc.alpha > 0)) {
                    if (attackObject.name == "tracer") {
                        var damage = attackObject.damage * (hud.phaserEnergy * 0.01);
                        currentArc.integrity -= damage;
                        if (defendObject.name != "starbase") {
                            hud.score += damage * 2;
                        }
                    }
                    else {
                        var damage = attackObject.damage;
                        currentArc.integrity -= damage;
                        if ((attackObject.name == "photon") && (defendObject.name != "starbase")) {
                            hud.score += damage * 2;
                        }
                    }
                    createjs.Sound.play("shield");
                    if (defendObject.name == "klingon") {
                        currentArc.alpha = currentArc.integrity * 0.01;
                    }
                    else {
                        var arcString = utility.getArcString(defendObject.name, arcNum);
                        if ((currentArc.integrity > 35) && (currentArc.integrity < 61)) {
                            arcString += "Y";
                            currentArc.gotoAndPlay(arcString);
                        }
                        else if ((currentArc.integrity > 1) && (currentArc.integrity < 36)) {
                            arcString += "R";
                            currentArc.gotoAndPlay(arcString);
                        }
                    }
                    if (currentArc.integrity < 1) {
                        currentArc.alpha = 0;
                    }
                    attackObject.speed = 0;
                }
            }
        };
        // Method to determine if an attack object hits a defender's hull
        Collision.prototype._hullCollider = function (attackObject, defendObject, defenderIndex) {
            var attackerPosition = attackObject.location;
            if (utility.distance(attackerPosition, defendObject.location) < (attackObject.radius + (defendObject.radius * 0.7))) {
                createjs.Sound.play("hull");
                var hullString = defendObject.name;
                if (attackObject.name == "tracer") {
                    var damage = attackObject.damage * (hud.phaserEnergy * 0.01);
                    defendObject.integrity -= damage;
                    if ((defendObject.name != "starbase") && (defendObject.name != "ship")) {
                        hud.score += damage * 3;
                    }
                }
                else {
                    var damage = attackObject.damage;
                    defendObject.integrity -= damage;
                    if ((attackObject.name == "photon") && (defendObject.name != "starbase")) {
                        hud.score += damage * 3;
                    }
                }
                if (defendObject.name != "klingon") {
                    if ((defendObject.integrity > 35) && (defendObject.integrity < 61)) {
                        hullString += "Y";
                        defendObject.gotoAndPlay(hullString);
                    }
                    if ((defendObject.integrity > 1) && (defendObject.integrity < 35)) {
                        hullString += "R";
                        defendObject.gotoAndPlay(hullString);
                        createjs.Sound.play("redAlert", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1);
                    }
                }
                if (defendObject.integrity < 1) {
                    // Display Particle Explosion
                    particleExplosion.addExplosion(defendObject.x, defendObject.y);
                    createjs.Sound.play("explosion");
                    defendObject.shieldsDown();
                    if (defendObject.name == "klingon") {
                        enemies.splice(defenderIndex, 1);
                        if (enemies.length == 0) {
                            // Bonus points for Starbase being alive 
                            if (starbaseAlive) {
                                hud.score += 500;
                            }
                            klingonsAlive = false;
                            // pause before changing levels
                            setTimeout(function (e) {
                                levelUp = true;
                            }, 1000);
                        }
                    }
                    game.removeChild(defendObject.integrityLabel);
                    game.removeChild(defendObject);
                    switch (defendObject.name) {
                        case "starbase":
                            starbaseAlive = false;
                            hud.starbaseDeadScore = hud.score;
                            hud.starbasePercent = 0;
                            break;
                        case "ship":
                            playerAlive = false;
                            starbaseAlive = false;
                            klingonsAlive = false;
                            gameLevel = 1;
                            enemyLevel = 0;
                            lastDocked = 0;
                            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                                enemies.splice(enemyNum, 1);
                            }
                            battleSound.stop();
                            stage.removeChild(game);
                            game.removeAllChildren();
                            game.removeAllEventListeners();
                            currentState = config.GAME_OVER_STATE;
                            changeState(currentState);
                            break;
                    }
                }
                attackObject.speed = 0;
            }
        };
        // PHASER COLLISIONS
        // Check for collisions between phasers and enemy shields
        Collision.prototype._checkPhaserAndEnemyShields = function () {
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._shieldCollider(this._currentTracer, enemy);
            }
        };
        // Check for collisions between phasers and enemy ship
        Collision.prototype._checkPhaserAndEnemy = function () {
            var tracerPosition = this._currentTracer.location;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._hullCollider(this._currentTracer, enemy, enemyNum);
            }
        };
        // Check for collisions between phasers and starbase shields
        Collision.prototype._checkPhaserAndStarbaseShields = function () {
            this._shieldCollider(this._currentTracer, starbase);
        };
        // Check for collisions between phaser and starbase hull
        Collision.prototype._checkPhaserAndStarbase = function () {
            this._hullCollider(this._currentTracer, starbase, 0);
        };
        // PHOTON COLLISIONS
        // Check for collisions between photons and enemy shields
        Collision.prototype._checkPhotonAndEnemyShields = function () {
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._shieldCollider(this._currentPhoton, enemy);
            }
        };
        // Check for collisions between photons and enemy ship
        Collision.prototype._checkPhotonAndEnemy = function () {
            var photonPosition = this._currentPhoton.location;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._hullCollider(this._currentPhoton, enemy, enemyNum);
            }
        };
        // Check for collisions between photons and starbase shields
        Collision.prototype._checkPhotonAndStarbaseShields = function () {
            this._shieldCollider(this._currentPhoton, starbase);
        };
        // Check for collisions between photons and starbase hull
        Collision.prototype._checkPhotonAndStarbase = function () {
            this._hullCollider(this._currentPhoton, starbase, 0);
        };
        // DISRUPTOR COLLISIONS
        // Collision between Disruptor and Starbase Shields
        Collision.prototype._checkDisruptorAndStarbaseShields = function () {
            this._shieldCollider(this._currentDisruptor, starbase);
        };
        // Check for collisions between Disruptor and Starbase Hull
        Collision.prototype._checkDisruptorAndStarbase = function () {
            this._hullCollider(this._currentDisruptor, starbase, 0);
        };
        // Collision between Disruptor and Starbase Shields
        Collision.prototype._checkDisruptorAndPlayerShields = function () {
            this._shieldCollider(this._currentDisruptor, player);
        };
        // Check for collisions between Disruptor and Starbase Hull
        Collision.prototype._checkDisruptorAndPlayer = function () {
            this._hullCollider(this._currentDisruptor, player, 0);
        };
        // Check if player has docked with starbase
        Collision.prototype._checkPlayerAndStarbase = function () {
            if (utility.distance(starbase.location, player.location) < ((starbase.radius * 0.6) + player.radius)) {
                player.speed = 0;
                if (!starbase.hasDocked) {
                    createjs.Sound.play("powerup");
                    starbase.hasDocked = true;
                    starbase.gotoAndPlay("starbaseDocked");
                    lastDocked = gameLevel;
                    // Display "Starship Docked"
                    var dockedLabel = new objects.Label(config.MIDDLE_X, config.MIDDLE_Y, "Starship Docked");
                    dockedLabel.fontSize(50);
                    game.addChild(dockedLabel);
                    setTimeout(function (e) {
                        game.removeChild(dockedLabel);
                    }, 2000);
                    // check hull integrity and perform repairs
                    if ((player.integrity > 50) && (player.integrity < 100)) {
                        player.integrity = 100;
                        player.gotoAndPlay("ship");
                    }
                    else if (player.integrity < 51) {
                        player.integrity = 60;
                        player.gotoAndPlay("shipY");
                    }
                    for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                        var shieldArc = player.shield.arcs[arcNum];
                        var arcString = utility.getArcString("ship", arcNum);
                        if (shieldArc.integrity < 100) {
                            shieldArc.integrity = 100;
                            shieldArc.alpha = 1;
                            shieldArc.gotoAndPlay(arcString);
                        }
                    }
                    // replace photons
                    if (hud.photonNumber < 8) {
                        hud.photonNumber += 4;
                        if (hud.photonNumber > 8) {
                            hud.photonNumber = 8;
                        }
                    }
                }
            }
        };
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Collision.prototype.update = function () {
            // Check Phaser Collisions
            if ((beamWeapon.phasers.length > 0) && (beamWeapon.tracers.length > 0)) {
                this._currentTracer = beamWeapon.tracers[beamWeapon.phasers.length - 1];
                if (klingonsAlive) {
                    this._checkPhaserAndEnemyShields();
                    this._checkPhaserAndEnemy();
                }
                if (starbaseAlive) {
                    this._checkPhaserAndStarbaseShields();
                    this._checkPhaserAndStarbase();
                }
            }
            // Check Photon Collisions
            if (beamWeapon.photons.length > 0) {
                this._currentPhoton = beamWeapon.photons[beamWeapon.photons.length - 1];
                if (klingonsAlive) {
                    this._checkPhotonAndEnemyShields();
                    this._checkPhotonAndEnemy();
                }
                if (starbaseAlive) {
                    this._checkPhotonAndStarbaseShields();
                    this._checkPhotonAndStarbase();
                }
            }
            // Check Disruptor Collisions
            if (beamWeapon.disruptors.length > 0) {
                this._currentDisruptor = beamWeapon.disruptors[beamWeapon.disruptors.length - 1];
                if (starbaseAlive) {
                    this._checkDisruptorAndStarbaseShields();
                    this._checkDisruptorAndStarbase();
                }
                if (playerAlive) {
                    this._checkDisruptorAndPlayerShields();
                    this._checkDisruptorAndPlayer();
                }
            }
            // Check if Player docks with Starbase
            if (!starbase.hasDocked) {
                if ((starbaseAlive) && (starbase.integrity > 60)) {
                    this._checkPlayerAndStarbase();
                }
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map