var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Disruptor Bullet Class
var objects;
(function (objects) {
    var Disruptor = (function (_super) {
        __extends(Disruptor, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Disruptor(enemy) {
            _super.call(this, "disruptorBolt");
            this.name = "disruptor";
            this._enemy = enemy;
            this._origin = new createjs.Point();
            this._origin = this._enemy.location;
            this._target = new createjs.Point();
            this._init();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // disruptor update
        Disruptor.prototype.update = function () {
            this.location.x = this.x;
            this.location.y = this.y;
            this.calcVector();
            this.calcPosition();
            this.checkBounds();
        };
        // Remove the tracer
        Disruptor.prototype.destroy = function () {
            game.removeChild(this);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Disruptor.prototype._init = function () {
            this.x = this._enemy.x;
            this.y = this._enemy.y;
            this._origin.x = this._enemy.x;
            this._origin.y = this._enemy.y;
            this.dx = 0;
            this.dy = 0;
            this.radius *= 1.5;
            this.direction = this._enemy.targetAngle;
            this.speed = config.DISRUPTOR_SPEED;
            this.damage = config.DISRUPTOR_DAMAGE;
        };
        return Disruptor;
    })(objects.GameObject);
    objects.Disruptor = Disruptor;
})(objects || (objects = {}));
//# sourceMappingURL=disruptor.js.map