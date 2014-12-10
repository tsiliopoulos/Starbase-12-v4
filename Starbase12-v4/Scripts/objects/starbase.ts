// Starbase Class
module objects {
    export class Starbase extends objects.GameObject implements interfaces.IObject {
        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        private _turnDirection: number;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("starbase");

            this.name = "starbase";
            this.init();
            this.showHealth();
            this.shieldsUp();
            this.randomRotation(); 
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
            switch (this._turnDirection) {
                case config.CLOCKWISE:
                    this.turnRight();
                    break;
                case config.COUNTERCLOCKWISE:
                    this.turnLeft();
                    break;
            }
            //this.calcHitArea(); // debug info
            this.healthUpdate();
            this.shield.update();
        }

        // Reset Starbase
        public reset() {
            this.init;
            this.shieldsDown();
            this.shieldsUp();
        }

        // remove the starbase object from the game
        public destroy() {
            this.shield.destroy();
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        // Initialize starbase properties
        private init() {
            this.turnRate = config.STARBASE_TURN_RATE;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
            this.damage = config.STARBASE_DAMAGE;
        }

        // Rotate the Starbase in a random direction
        private randomRotation() {
            var turnProbability = Math.floor(Math.random() * 100 + 1);
            if(turnProbability > 50) {
                this._turnDirection = config.CLOCKWISE;
            }
            else {
                this._turnDirection = config.COUNTERCLOCKWISE;
            }
        }

    }
} 