module utility {
    export function getArcString(entityName: string, arcNum: number): string {
        var finalString: string = entityName;
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
}