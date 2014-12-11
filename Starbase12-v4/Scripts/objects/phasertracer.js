var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Phaser Tracer Class
var objects;
(function (objects) {
    var PhaserTracer = (function (_super) {
        __extends(PhaserTracer, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function PhaserTracer() {
            _super.call(this, "tracer");
            this.name = "tracer";
            this._origin = new createjs.Point();
            this._target = new createjs.Point();
            this._init();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Tracer update
        PhaserTracer.prototype.update = function () {
            this.calcVector();
            this.calcPosition();
            this.location.x = this.x;
            this.location.y = this.y;
            this.checkBounds();
            this._travelled = utility.distance(this._origin, this.location);
            if (this._travelled >= this.range) {
                this.speed = 0;
            }
        };
        // Remove the tracer
        PhaserTracer.prototype.destroy = function () {
            game.removeChild(this);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        PhaserTracer.prototype._init = function () {
            // Set the Phaser origin
            this.x = player.x;
            this.y = player.y;
            this._origin.x = this.x;
            this._origin.y = this.y;
            this.dx = 0;
            this.dy = 0;
            this.direction = player.targetAngle;
            this.speed = config.PHASER_SPEED;
            this._target.x = stage.mouseX;
            this._target.y = stage.mouseY;
            this.range = utility.distance(this._origin, this._target);
            this.damage = config.PHASER_DAMAGE;
            // Render the Tracer Invisible
            this.alpha = 0;
        };
        return PhaserTracer;
    })(objects.GameObject);
    objects.PhaserTracer = PhaserTracer;
})(objects || (objects = {}));
//# sourceMappingURL=phasertracer.js.map