// Utility function to determine the opposite angle
module utility {
    export function oppositeAngle(angle: number):number {
        var opposite: number;
        if (angle < 180) {
            opposite = angle + 180;
        }
        if (angle >= 180) {
            opposite = angle - 180;
        }
        return opposite;
    }
} 