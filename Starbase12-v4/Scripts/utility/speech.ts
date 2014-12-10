module utility {
    export function Speech(speechString: string): createjs.SoundInstance {
        if (speechString == "0") {
            speechString = "zero";
        }
        return createjs.Sound.play(speechString);
    }
}