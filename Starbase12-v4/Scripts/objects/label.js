/// <reference path="../managers/asset.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Label Class
var objects;
(function (objects) {
    var Label = (function (_super) {
        __extends(Label, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Label(x, y, labelText) {
            _super.call(this, labelText, managers.Assets.bitMapFont);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++
        // Utility Method to change the default font size
        Label.prototype.fontSize = function (size) {
            var scale = size / this.getBounds().height;
            this.scaleX = scale;
            this.scaleY = scale;
        };
        return Label;
    })(createjs.BitmapText);
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=label.js.map