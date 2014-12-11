// Static Utility Class to calculate the distance between two points
var utility;
(function (utility) {
    function distance(p1, p2) {
        return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }
    utility.distance = distance;
})(utility || (utility = {}));
//# sourceMappingURL=distance.js.map