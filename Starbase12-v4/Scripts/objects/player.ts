/// <reference path="../config/controls.ts" />
/// <reference path="../config/keys.ts" />
/// <reference path="shield.ts" />

// Player Object Class
module objects {
    export class Player extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        public target: createjs.Point;
        public targetAngle: number;
        public photonFired: boolean;

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++
        private _firingAngle: number;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("ship");

            this.name = "ship";
            this._init();
            this._assignControls();
            this.showHealth();
            this.shieldsUp();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        // Update player position and condition on screen
        public update() {
            if (gameControls) {
                this._controlAction();
                this._checkPhoton();
            }
            this.calcVector();
            this.calcPosition();
            this.location.x = this.x;
            this.location.y = this.y;
            //this.calcHitArea(); // debug info
            this.target.x = stage.mouseX;
            this.target.y = stage.mouseY;
            this._calculateTargetAngle();
            this._checkFiringArc();
            this.checkBounds();
            this.healthUpdate();
            this.shield.update();
        }

        // Remove Player Object
        public destroy() {
            this.shield.destroy();
            game.removeChild(this);
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++

        // Initialize player properties
        private _init() {
            this.turnRate = config.PLAYER_TURN_RATE;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
            this.target = new createjs.Point();
            this.photonFired = false;
            this.damage = config.PLAYER_DAMAGE;
        }

        // Calculate the angle to the target
        private _calculateTargetAngle() {
            this.dx = this.x - this.target.x;
            this.dy = this.y - this.target.y;
            this.dy *= -1;

            var radians = Math.atan2(this.dy, this.dx);
            this.targetAngle = radians * 180 / Math.PI;
            this.targetAngle += 180;
        }

        // Check if the target is within the front firing arc
        private _checkFiringArc() {
            if (this.targetAngle > this.direction) {
                this._firingAngle = this.targetAngle - this.direction;
            }
            if (this.targetAngle < this.direction) {
                this._firingAngle = this.direction - this.targetAngle;
            }
            if (this.targetAngle == this.direction) {
                this._firingAngle = 0;
            }
        }

        // Bind key actions to player events
        private _assignControls() {
            window.onkeydown = this._onControlDown;
            window.onkeyup = this._onControlUp;
        }

        // Switch statement to activate movement and rotation
        private _onControlDown(event: KeyboardEvent) {
            switch (event.keyCode) {
                case keys.A:
                case keys.LEFT:
                    controls.TURN_LEFT = true;
                    break;
                case keys.D:
                case keys.RIGHT:
                    controls.TURN_RIGHT = true;
                    break;
                case keys.W:
                case keys.UP:
                    controls.FORWARD = true;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.REVERSE = true;
                    break;
                case keys.SPACE:
                    controls.PHOTON = true;
                    break;
            }
        }

        // switch statement to reset controls
        private _onControlUp(event: KeyboardEvent) {
            switch (event.keyCode) {
                case keys.A:
                case keys.LEFT:
                    controls.TURN_LEFT = false;
                    break;
                case keys.D:
                case keys.RIGHT:
                    controls.TURN_RIGHT = false;
                    break;
                case keys.W:
                case keys.UP:
                    controls.FORWARD = false;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.REVERSE = false;
                    break;
                case keys.SPACE:
                    controls.PHOTON = false;
                    break;
            }
        }

       

        // Respond to player key presses
        private _controlAction() {
            // Execute left turn
            if (controls.TURN_LEFT) {
                this.turnLeft();
            }

            // Execute right turn
            if (controls.TURN_RIGHT) {
                this.turnRight();
            }

            // Forward Movement
            if (controls.FORWARD) {
                this.speed = config.PLAYER_FORWARD;
            }

            // Reverse Movement
            if (controls.REVERSE) {
                this.speed = -config.PLAYER_REVERSE;
            }

            // Forward Stop
            if ((controls.FORWARD == false) && (controls.REVERSE == false)) {
                this.speed = 0;
            }

        }

        // Check if photon torpedo was fired
        private _checkPhoton() {
            if ((hud.photonNumber > 0) && (controls.PHOTON) && (this._firingAngle <= 30)) {
                this.photonFired = true;
            }
            else {
                this.photonFired = false;
            }
        }

    }
} 