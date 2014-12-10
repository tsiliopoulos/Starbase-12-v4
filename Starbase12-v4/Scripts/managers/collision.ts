/// <reference path="../utility/distance.ts" />
/// <reference path="beamweapon.ts" />

// Collision Manager Class
module managers {
    export class Collision {
        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++
        private _currentTracer: objects.PhaserTracer;
        private _currentDisruptor: objects.Disruptor;
        private _currentPhoton: objects.Photon;
        private _distance;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++ 
        constructor() {
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        // Method to determine if an attack object hits a defender's shields
        private _shieldCollider(attackObject: objects.GameObject, defendObject: objects.GameObject) {
            var attackerPosition = attackObject.location;
            var shield = defendObject.shield;
            // Check if current Shield Arc is up
            if (utility.distance(attackerPosition, shield.location) < (shield.radius + attackObject.radius)) {
                var incomingAngle: number = 0;
                var attackerDirection = attackObject.direction;
                var arcNum: number;

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
                        var arcString: string = utility.getArcString(defendObject.name, arcNum);
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
        }

        // Method to determine if an attack object hits a defender's hull
        private _hullCollider(attackObject: objects.GameObject, defendObject: objects.GameObject, defenderIndex: number) {
            var attackerPosition = attackObject.location;
            if (utility.distance(attackerPosition, defendObject.location) < (attackObject.radius + (defendObject.radius * 0.7))) {
                createjs.Sound.play("hull");
                var hullString: string = defendObject.name;
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
                    // check if the target is destroyed
                    switch (defendObject.name) {
                        case "starbase":
                            starbaseAlive = false;
                            break;
                        case "ship":
                            playerAlive = false;
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
        }

        // PHASER COLLISIONS

        // Check for collisions between phasers and enemy shields
        private _checkPhaserAndEnemyShields() {
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._shieldCollider(this._currentTracer, enemy);
            }
        }

        // Check for collisions between phasers and enemy ship
        private _checkPhaserAndEnemy() {
            var tracerPosition = this._currentTracer.location;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._hullCollider(this._currentTracer, enemy, enemyNum);
            }
        }

        // Check for collisions between phasers and starbase shields
        private _checkPhaserAndStarbaseShields() {
            this._shieldCollider(this._currentTracer, starbase);
        }

        // Check for collisions between phaser and starbase hull
        private _checkPhaserAndStarbase() {
            this._hullCollider(this._currentTracer, starbase, 0);
        }

        // PHOTON COLLISIONS

        // Check for collisions between photons and enemy shields
        private _checkPhotonAndEnemyShields() {
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._shieldCollider(this._currentPhoton, enemy);
            }
        }

        // Check for collisions between photons and enemy ship
        private _checkPhotonAndEnemy() {
            var photonPosition = this._currentPhoton.location;
            for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                var enemy = enemies[enemyNum];
                this._hullCollider(this._currentPhoton, enemy, enemyNum);
            }
        }

        // Check for collisions between photons and starbase shields
        private _checkPhotonAndStarbaseShields() {
            this._shieldCollider(this._currentPhoton, starbase);
        }

        // Check for collisions between photons and starbase hull
        private _checkPhotonAndStarbase() {
            this._hullCollider(this._currentPhoton, starbase, 0);
        }

        // DISRUPTOR COLLISIONS

        // Collision between Disruptor and Starbase Shields
        private _checkDisruptorAndStarbaseShields() {
            this._shieldCollider(this._currentDisruptor, starbase);
        }

        // Check for collisions between Disruptor and Starbase Hull
        private _checkDisruptorAndStarbase() {
            this._hullCollider(this._currentDisruptor, starbase, 0);
        }

        // Collision between Disruptor and Starbase Shields
        private _checkDisruptorAndPlayerShields() {
            this._shieldCollider(this._currentDisruptor, player);
        }

        // Check for collisions between Disruptor and Starbase Hull
        private _checkDisruptorAndPlayer() {
            this._hullCollider(this._currentDisruptor, player, 0);
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
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

        }

    }
} 