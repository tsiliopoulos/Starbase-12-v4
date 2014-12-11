var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Starbase Class
var objects;
(function (objects) {
    var Starbase = (function (_super) {
        __extends(Starbase, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Starbase() {
            _super.call(this, "starbase");
            this.name = "starbase";
            this.init();
            this.showHealth();
            this.shieldsUp();
            this.randomRotation();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Starbase.prototype.update = function () {
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
        };
        // Reset Starbase
        Starbase.prototype.reset = function () {
            this.init;
            this.shieldsDown();
            this.shieldsUp();
        };
        // remove the starbase object from the game
        Starbase.prototype.destroy = function () {
            this.shield.destroy();
            game.removeChild(this);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        // Initialize starbase properties
        Starbase.prototype.init = function () {
            this.turnRate = config.STARBASE_TURN_RATE;
            this.speed = 0;
            this.direction = 90;
            this.dx = 0;
            this.dy = 0;
            this.damage = config.STARBASE_DAMAGE;
            this.hasDocked = true;
        };
        // Rotate the Starbase in a random direction
        Starbase.prototype.randomRotation = function () {
            var turnProbability = Math.floor(Math.random() * 100 + 1);
            if (turnProbability > 50) {
                this._turnDirection = config.CLOCKWISE;
            }
            else {
                this._turnDirection = config.COUNTERCLOCKWISE;
            }
        };
        return Starbase;
    })(objects.GameObject);
    objects.Starbase = Starbase;
})(objects || (objects = {}));
//# sourceMappingURL=starbase.js.map