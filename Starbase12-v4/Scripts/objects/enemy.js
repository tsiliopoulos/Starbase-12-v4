var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Enemy() {
            _super.call(this, "klingon");
            this.name = "klingon";
            this.showHealth();
            this.shieldsUp();
            this.spawn();
            this._init();
            this._selectTarget();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++
        // create enemy
        Enemy.prototype.spawn = function () {
            this.x = Math.floor(Math.random() * (config.WIDTH - 62) + config.BORDER);
            this.y = Math.floor(Math.random() * (config.HEIGHT - 62) + config.BORDER);
            this.location.x = this.x;
            this.location.y = this.y;
            this.shieldsDown();
            this.shieldsUp();
        };
        // Update Method
        Enemy.prototype.update = function () {
            if (gameControls) {
                this._acquireTarget();
                this._turnToFaceTarget();
                this._fireDisruptor();
            }
            //this.calcHitArea(); // debug hit area
            this.healthUpdate();
            this.shield.update();
        };
        // Destroy Enemy
        Enemy.prototype.destroy = function () {
            game.removeChild(this);
            game.removeChild(this.shield);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        // Initialize player properties
        Enemy.prototype._init = function () {
            this.turnRate = config.KLINGON_TURN_RATE;
            this.speed = 0;
            this.direction = 90;
            this._firingAngle = this.direction;
            this.disruptorFire = false;
            this.dx = 0;
            this.dy = 0;
            this.rateOfFire = Math.floor(Math.random() * 20 + 50);
            this.damage = config.KLINGON_DAMAGE;
        };
        // Calculate the angle to the target
        Enemy.prototype._calculateTargetAngle = function () {
            this.dx = this.x - this.target.x;
            this.dy = this.y - this.target.y;
            this.dy *= -1;
            var radians = Math.atan2(this.dy, this.dx);
            this.targetAngle = radians * 180 / Math.PI;
            this.targetAngle += 180;
        };
        // Select an initial Target - pick starbase 70% of the time
        Enemy.prototype._selectTarget = function () {
            var targetProbability = Math.floor(Math.random() * 100 + 1);
            if (targetProbability > 70) {
                this.target = player;
            }
            else {
                this.target = starbase;
            }
        };
        // Check which target is closest
        Enemy.prototype._checkClosestTarget = function () {
            var closestTarget;
            // Switch targets depending on which is closest
            if (utility.distance(this.location, player.location) < utility.distance(this.location, starbase.location)) {
                closestTarget = player;
            }
            if (utility.distance(this.location, starbase.location) <= utility.distance(this.location, player.location)) {
                closestTarget = starbase;
            }
            return closestTarget;
        };
        Enemy.prototype._acquireTarget = function () {
            // Acquire a new target if starbase is destroyed or player has hit hull
            if ((!starbaseAlive) || (this.integrity < 60)) {
                this.target = player;
            }
            else {
                this.target = this._checkClosestTarget();
            }
        };
        // Turn to face the current target at the turn rate and fire
        Enemy.prototype._turnToFaceTarget = function () {
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
            }
            else {
                if (enemyQuadrant == config.TOP_RIGHT) {
                    if (targetQuadrant == config.BOT_RIGHT) {
                        this.turnRight();
                        this._firingAngle = this.direction - (360 - this.targetAngle);
                    }
                    else {
                        this.turnLeft();
                        this._firingAngle = this.targetAngle - this.direction;
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
        };
        // If firing angle is less than 30 degrees then fire disruptors
        Enemy.prototype._fireDisruptor = function () {
            if (this._firingAngle <= 30) {
                this.disruptorFire = true;
            }
            else {
                this.disruptorFire = false;
            }
        };
        return Enemy;
    })(objects.GameObject);
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map