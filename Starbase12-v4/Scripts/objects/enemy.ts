module objects {
    export class Enemy extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        public target: objects.GameObject;
        public targetAngle: number;
        public disruptorFire: boolean;
        public rateOfFire: number;

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++
        private _firingAngle: number;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("klingon");
            this.name = "klingon";
            this.showHealth();
            this.shieldsUp();
            this.spawn();
            this._init();
            this._selectTarget();

        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++

        // create enemy
        public spawn() {
            this.x = Math.floor(Math.random() * (config.WIDTH - 62) + config.BORDER);
            this.y = Math.floor(Math.random() * (config.HEIGHT - 62) + config.BORDER);
            this.location.x = this.x;
            this.location.y = this.y;
            this.shieldsDown();
            this.shieldsUp();
        }

        // Update Method
        public update() {
            if (gameControls) {
                this._turnToFaceTarget();
                this._fireDisruptor();
            }
            //this.calcHitArea(); // debug hit area
            this.healthUpdate();
            this.shield.update();
            this._checkTargetAlive();
        }

        // Destroy Enemy
        public destroy() {
            game.removeChild(this);
            game.removeChild(this.shield);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++

        // Initialize player properties
        private _init() {
            this.turnRate = config.KLINGON_TURN_RATE;
            this.speed = 0;
            this.direction = 90;
            this._firingAngle = this.direction;
            this.disruptorFire = false;
            this.dx = 0;
            this.dy = 0;
            this.rateOfFire = Math.floor(Math.random() * 20 + 50);
            this.damage = config.KLINGON_DAMAGE;
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

        // Select a Random Target
        private _selectTarget() {
            var targetProbability = Math.floor(Math.random() * 100 + 1);
            if (targetProbability > 66) {
                this.target = player;
            }
            else {
                this.target = starbase;
            }
        }

        // Check to see if target is still alive
        private _checkTargetAlive() {
            if (!starbaseAlive) {
                this.target = player;
            }
            if (!playerAlive) {
                this.target = starbase;
            }

        }

        // Turn to face the current target at the turn rate and fire
        private _turnToFaceTarget() {
            this._calculateTargetAngle();

            var targetQuadrant = utility.Quadrant(this.targetAngle);
            var enemyQuadrant = utility.Quadrant(this.direction);

            if ((targetQuadrant == enemyQuadrant) || (enemyQuadrant == config.TOP_LEFT) || (enemyQuadrant == config.BOT_LEFT)) {
                if (this.direction > this.targetAngle) {
                    this.turnRight();
                    this._firingAngle = this.direction - this.targetAngle;
                }
                if (this.direction < this.targetAngle) {
                    this.turnLeft();
                    this._firingAngle = this.targetAngle - this.direction;
                }
                if (this.direction == this.targetAngle) {
                    this._firingAngle = 0;
                }

            } else {

                if (enemyQuadrant == config.TOP_RIGHT) {
                    if (targetQuadrant == config.BOT_RIGHT) {
                        this.turnRight();
                        this._firingAngle = this.direction - (360 - this.targetAngle);
                    }
                    else {
                        this.turnLeft();
                        this._firingAngle = this.targetAngle - this.direction
                    }
                }

                if (enemyQuadrant == config.BOT_RIGHT) {
                    if (targetQuadrant == config.TOP_RIGHT) {
                        this.turnLeft();
                        this._firingAngle = (this.targetAngle + 360) - this.direction;
                    }
                    else {
                        this.turnRight();
                        this._firingAngle = this.direction - this.targetAngle;
                    }
                }
            }
        }

        // If firing angle is less than 30 degrees then fire disruptors
        private _fireDisruptor() {
            if (this._firingAngle <= 30) {
                this.disruptorFire = true;
            }
            else {
                this.disruptorFire = false;
            }
        }

    }
}