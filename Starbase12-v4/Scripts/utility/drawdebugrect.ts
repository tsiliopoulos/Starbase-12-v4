module utility {
    export function drawDebugRect(container: createjs.Container, x: number, y: number, width: number, height: number): createjs.Shape {
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
}