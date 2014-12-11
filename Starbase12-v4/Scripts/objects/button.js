var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Button Object Class
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function Button(x, y, buttonIDString) {
            _super.call(this, buttonIDString);
            this.x = x;
            this.y = y;
            this.setButtonListeners();
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Create standard button listeners for rollover and rollout events
        Button.prototype.setButtonListeners = function () {
            this.cursor = 'pointer';
            this.on('rollover', this.onButtonOver);
            this.on('rollout', this.onButtonOut);
        };
        Button.prototype.onButtonOver = function () {
            this.alpha = 0.8;
        };
        Button.prototype.onButtonOut = function () {
            this.alpha = 1;
        };
        // public method to change the scale of the button
        Button.prototype.scale = function (newScale) {
            this.scaleX = newScale;
            this.scaleY = newScale;
        };
        return Button;
    })(objects.GameObject);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map