var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Shield Class
var objects;
(function (objects) {
    var Shield = (function (_super) {
        __extends(Shield, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Shield(entity) {
            _super.call(this);
            this.arcs = [];
            this._entity = entity;
            this._shipName = this._entity.name;
            this.location = new createjs.Point();
            this._createShields();
            this.width = this.arcs[config.TOP_LEFT].getBounds().width + this.arcs[config.TOP_RIGHT].getBounds().width;
            this.height = this.arcs[config.TOP_LEFT].getBounds().height + this.arcs[config.BOT_LEFT].getBounds().height;
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        Shield.prototype.update = function () {
            this.x = this._entity.x;
            this.y = this._entity.y;
            this.location.x = this.x;
            this.location.y = this.y;
            this._updateArcs();
        };
        // Remove Shield Object from game
        Shield.prototype.destroy = function () {
            game.removeChild(this);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        // Create the Shield Objects
        Shield.prototype._createShields = function () {
            for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                var arcString = utility.getArcString(this._shipName, arcNum);
                this.arcs[arcNum] = new objects.GameObject(arcString);
                this.arcs[arcNum].regX = this.x;
                this.arcs[arcNum].regY = this.y;
            }
            // Top Right Arc Offset
            this.arcs[config.TOP_RIGHT].x = this.arcs[config.TOP_LEFT].x + this.arcs[config.TOP_LEFT].width;
            // Bottom Left Arc Offset
            this.arcs[config.BOT_LEFT].y = this.arcs[config.TOP_LEFT].height;
            // Bottom Right Arc Offset
            this.arcs[config.BOT_RIGHT].x = this.arcs[config.TOP_LEFT].width;
            this.arcs[config.BOT_RIGHT].y = this.arcs[config.TOP_LEFT].height;
            for (var arcNum = 0; arcNum < 4; arcNum++) {
                this.addChild(this.arcs[arcNum]);
            }
        };
        // Update the location of each shield arc
        Shield.prototype._updateArcs = function () {
            for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                this.arcs[arcNum].location.x = this.arcs[arcNum].x;
                this.arcs[arcNum].location.y = this.arcs[arcNum].y;
            }
        };
        return Shield;
    })(createjs.Container);
    objects.Shield = Shield;
})(objects || (objects = {}));
//# sourceMappingURL=shield.js.map