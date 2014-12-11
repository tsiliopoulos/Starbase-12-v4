var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Loader Bar Class
var objects;
(function (objects) {
    var LoaderBar = (function (_super) {
        __extends(LoaderBar, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function LoaderBar(x, y, fill, stroke) {
            _super.call(this);
            this.x = x;
            this.y = y;
            this._fillColour = fill;
            this._strokeColour = stroke;
            //this.scaleX = 0;
            this.regX = config.LOADER_WIDTH * 0.5;
            this.regY = config.LOADER_HEIGHT * 0.5;
            this._drawPercent();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        LoaderBar.prototype.update = function () {
            //this.scaleX = percentLoaded;
            this._drawStroke();
            this._drawFill();
            this._updatePercent();
        };
        // Destroy Method
        LoaderBar.prototype.destroy = function () {
            game.removeChild(this);
            game.removeChild(this._percentLabel);
        };
        // PRIVATE METHODS
        // Draw the stroke for the loader bar
        LoaderBar.prototype._drawStroke = function () {
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(this._strokeColour);
            this.graphics.drawRoundRect(0, 0, config.LOADER_WIDTH, config.LOADER_HEIGHT, 20);
            this.graphics.endStroke();
        };
        // Draw the Fill for the loader bar
        LoaderBar.prototype._drawFill = function () {
            this.graphics.clear();
            this.graphics.beginFill(this._fillColour);
            this.graphics.drawRoundRect(0, 0, config.LOADER_WIDTH * percentLoaded, config.LOADER_HEIGHT, 20);
            this.graphics.endFill();
        };
        // Draw the percent label for the loader bar
        LoaderBar.prototype._drawPercent = function () {
            this._percentLabel = new createjs.Text("0%", "46px startrek", config.BLACK);
            this._percentLabel.regX = this._percentLabel.getBounds().width * 0.5;
            this._percentLabel.regY = this._percentLabel.getBounds().height * 0.5;
            this._percentLabel.x = this.x;
            this._percentLabel.y = this.y;
        };
        LoaderBar.prototype._updatePercent = function () {
            this._percentLabel.text = Math.floor(percentLoaded * 100).toString() + "%";
            game.addChild(this._percentLabel);
        };
        return LoaderBar;
    })(createjs.Shape);
    objects.LoaderBar = LoaderBar;
})(objects || (objects = {}));
//# sourceMappingURL=loaderbar.js.map