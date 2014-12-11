var utility;
(function (utility) {
    function drawDebugRect(container, x, y, width, height) {
        var rectangle = new createjs.Graphics();
        rectangle.beginStroke("#FFF");
        rectangle.setStrokeStyle(3);
        rectangle.drawRect(x, y, width, height);
        var collideRect = new createjs.Shape(rectangle);
        collideRect.x = x;
        collideRect.y = y;
        container.addChild(collideRect);
        return collideRect;
    }
    utility.drawDebugRect = drawDebugRect;
})(utility || (utility = {}));
//# sourceMappingURL=drawdebugrect.js.map