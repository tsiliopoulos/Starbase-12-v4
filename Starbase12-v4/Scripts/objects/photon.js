var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Photon = (function (_super) {
        __extends(Photon, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Photon() {
            _super.call(this, "torpedo");
            this.name = "photon";
            this._origin = new createjs.Point();
            this._target = new createjs.Point();
            this._init();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Photon update
        Photon.prototype.update = function () {
            this.calcVector();
            this.calcPosition();
            this.location.x = this.x;
            this.location.y = this.y;
            this.checkBounds();
            this._travelled = utility.distance(this._origin, this.location);
        };
        // Remove the photon
        Photon.prototype.destroy = function () {
            game.removeChild(this);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Photon.prototype._init = function () {
            this.x = player.x;
            this.y = player.y;
            this._origin.x = this.x;
            this._origin.y = this.y;
            this.dx = 0;
            this.dy = 0;
            this.direction = player.targetAngle;
            this.speed = config.PHOTON_SPEED;
            this._target.x = stage.mouseX;
            this._target.y = stage.mouseY;
            this.range = utility.distance(this._origin, this._target);
            this.damage = config.PHOTON_DAMAGE;
        };
        return Photon;
    })(objects.GameObject);
    objects.Photon = Photon;
})(objects || (objects = {}));
//# sourceMappingURL=photon.js.map