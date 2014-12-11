// Determine text colour based on a property value
var utility;
(function (utility) {
    function textColour(value) {
        var colour;
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
    utility.textColour = textColour;
})(utility || (utility = {}));
//# sourceMappingURL=textcolour.js.map