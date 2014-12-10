// Static Utility Class to calculate the distance between two points
module utility {
        export function distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y),2));
        }
    }