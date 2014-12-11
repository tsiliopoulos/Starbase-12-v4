// Utility function to determine the opposite angle
var utility;
(function (utility) {
    function oppositeAngle(angle) {
        var opposite;
        if (angle < 180) {
            opposite = angle + 180;
        }
        if (angle >= 180) {
            opposite = angle - 180;
        }
        return opposite;
    }
    utility.oppositeAngle = oppositeAngle;
})(utility || (utility = {}));
//# sourceMappingURL=oppositeangle.js.map