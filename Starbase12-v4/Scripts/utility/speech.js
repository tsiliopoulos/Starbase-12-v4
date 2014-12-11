var utility;
(function (utility) {
    function Speech(speechString) {
        if (speechString == "0") {
            speechString = "zero";
        }
        return createjs.Sound.play(speechString);
    }
    utility.Speech = Speech;
})(utility || (utility = {}));
//# sourceMappingURL=speech.js.map