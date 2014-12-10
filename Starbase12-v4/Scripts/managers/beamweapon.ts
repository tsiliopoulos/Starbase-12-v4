// BeamWeapon Manager Class
module managers {
    export class BeamWeapon {
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public phasers: objects.Phaser[] = [];
        public tracers: objects.PhaserTracer[] = [];
        public disruptors: objects.Disruptor[] = [];
        public photons: objects.Photon[] = [];
        public phaserSound: createjs.SoundInstance;
        public disruptorSound: createjs.SoundInstance;
        public photonSound: createjs.SoundInstance;
        public randomShot: number[] = [];


        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _strafe: boolean = false;
        private _disruptorNum: number = 0;
        private _photonNum: number = 0;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            game.on("mousedown", this._phaserStart, this);
            game.on("pressup", this.destroy, this);
            game.on("pressmove", this._phaserStrafing, this);
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Stop Phaser
        public destroy() {
            this._strafe = false;
            this._removePhaser();
        }

        // Update Phaser
        public update() {
            if (gameControls) {
                this._checkPhaserStrafe();
                this._regeneratePhaser();
                this._checkDisruptorFire();
                this._checkPhotonFire();
            }
            this._updateTracer();
            this._updateDisruptor();
            this._updatePhoton();
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Create Phaser Tracer Objects
        private _createTracer() {
            var tracer = new objects.PhaserTracer();
            this.tracers.push(tracer);
            game.addChild(tracer);
        }

        // Update Tracer Position on screen and remove if tracer stops
        private _updateTracer() {
            for (var tracerNum = 0; tracerNum < this.tracers.length; tracerNum++) {
                var tracer = this.tracers[tracerNum];
                tracer.update();
                if (tracer.speed == 0) {
                    this.tracers.splice(tracerNum, 1);
                    game.removeChild(tracer);
                }
            }

        }

        // Regenerate phaser energy over time
        private _regeneratePhaser() {
            hud.phaserEnergy = hud.phaserEnergy + 0.5;
            if (hud.phaserEnergy > 100) {
                hud.phaserEnergy = 100;
            }
        }

        // Set phaser state to Strafing
        private _phaserStrafing() {
            if (gameControls) {
                // check to see if phaser sound is still playing
                if ((playerAlive) && (hud.phaserEnergy > 0) && (this.phaserSound.playState != createjs.Sound.PLAY_FINISHED)) {
                    this._strafe = true;
                }
            }
        }

        // Fire Phaser and Play Sound
        private _phaserStart() {
            if (gameControls) {
                if ((playerAlive) && (hud.phaserEnergy > 0)) {
                    this.phaserSound = createjs.Sound.play("phaser");
                    this.phaserSound.on("complete", this.destroy, this);
                    hud.phaserEnergy = Math.floor(hud.phaserEnergy * 0.95);
                    if (hud.phaserEnergy <= 0) {
                        hud.phaserEnergy = 0;
                    }

                    this._createTracer();

                    var phaser = new objects.Phaser();
                    this.phasers.push(phaser);
                }
            }

        }

        // Check if player is firing and moving mouse
        private _checkPhaserStrafe() {
            if (this._strafe) {
                this._createTracer();

                var phaser = new objects.Phaser();
                this._removePhaser();
                this.phasers.push(phaser);
                hud.phaserEnergy--;
                if (hud.phaserEnergy <= 0) {
                    hud.phaserEnergy = 0;
                }

            }
        }

        // Check if enemy is firing disruptor
        private _checkDisruptorFire() {
            // Ensure starbase or player is alive in order to fire disruptor
            if ((starbaseAlive) || (playerAlive)) {
                for (var enemyNum = 0; enemyNum < enemies.length; enemyNum++) {
                    var enemy = enemies[enemyNum];
                    if ((enemy.disruptorFire) && (this._disruptorNum % enemy.rateOfFire == 0)) {
                        this.disruptorSound = createjs.Sound.play("disruptor");
                        var disruptor = new objects.Disruptor(enemy);
                        disruptor.rotation = enemy.rotation;
                        this.disruptors.push(disruptor);
                        game.addChildAt(disruptor,layer.DISRUPTOR);
                    }
                }
                this._disruptorNum++;
            }
        }

        // Update Disruptor
        private _updateDisruptor() {
            for (var Num = 0; Num < this.disruptors.length; Num++) {
                var disruptor = this.disruptors[Num];
                disruptor.update();
                if (disruptor.speed == 0) {
                    this.disruptors.splice(Num, 1);
                    game.removeChild(disruptor);
                }
            }
        }

        // Check if photo has been fired
        private _checkPhotonFire() {
            if ((playerAlive) && (player.photonFired) && (this._photonNum % 60 == 0)) {
                this.photonSound = createjs.Sound.play("photon");
                var photon = new objects.Photon();
                this.photons.push(photon);
                game.addChildAt(photon, layer.PHOTON);
                hud.photonNumber--;
                if (hud.photonNumber < 0) {
                    hud.photonNumber = 0;
                }
            }
            this._photonNum++;
        }

        // Update Photon
        private _updatePhoton() {
            for (var Num = 0; Num < this.photons.length; Num++) {
                var photon = this.photons[Num];
                photon.update();
                if (photon.speed == 0) {
                    this.photons.splice(Num, 1);
                    game.removeChild(photon);
                }
            }
        }

        // Remove last Phaser
        private _removePhaser() {
            game.removeChild(this.phasers[this.phasers.length - 1]);
            this.phasers.pop();
        }


    }
}