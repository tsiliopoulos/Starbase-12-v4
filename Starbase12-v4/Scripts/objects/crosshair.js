var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Crosshair object Class
var objects;
(function (objects) {
    var Crosshair = (function (_super) {
        __extends(Crosshair, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Crosshair() {
            _super.call(this, "crosshair");
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Crosshair.prototype.update = function () {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.checkBounds();
            //this.calcHitArea();
        };
        // Remove Crosshair object from game
        Crosshair.prototype.destroy = function () {
            game.removeChild(this);
        };
        return Crosshair;
    })(objects.GameObject);
    objects.Crosshair = Crosshair;
})(objects || (objects = {}));
//# sourceMappingURL=crosshair.js.map