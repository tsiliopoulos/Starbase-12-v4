// Utility Method to assist with location debugging across various containers
module utility {
    export function showLocation(container: createjs.Container, displayObject: createjs.DisplayObject): createjs.Text {
        var locationLabel = new createjs.Text(displayObject.x.toString() + ", " + displayObject.y.toString(), "16px Consolas", "#FFF");
        container.addChild(locationLabel);
        return locationLabel;
    }
} 