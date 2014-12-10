// Determine text colour based on a property value
module utility {
    export function textColour(value: number): string {
        var colour: string;
        if (value > 60) {
            colour = config.GREEN;
        }
        else if ((value > 35) && (value < 61)) {
            colour = config.YELLOW;
        }
        else if (value < 36) {
            colour = config.RED;
        }
        return colour;
    }
} 