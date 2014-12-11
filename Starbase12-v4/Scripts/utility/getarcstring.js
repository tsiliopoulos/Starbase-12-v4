var utility;
(function (utility) {
    function getArcString(entityName, arcNum) {
        var finalString = entityName;
        switch (arcNum) {
            case 0:
                finalString += "TR";
                break;
            case 1:
                finalString += "TL";
                break;
            case 2:
                finalString += "BL";
                break;
            case 3:
                finalString += "BR";
                break;
        }
        return finalString;
    }
    utility.getArcString = getArcString;
})(utility || (utility = {}));
//# sourceMappingURL=getarcstring.js.map