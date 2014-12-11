// Utility Method to assist with location debugging across various containers
var utility;
(function (utility) {
    function showLocation(container, displayObject) {
        var locationLabel = new createjs.Text(displayObject.x.toString() + ", " + displayObject.y.toString(), "16px Consolas", "#FFF");
        container.addChild(locationLabel);
        return locationLabel;
    }
    utility.showLocation = showLocation;
})(utility || (utility = {}));
//# sourceMappingURL=showlocation.js.map