module managers {
    export class ParticleFlame {

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++
        private _currentBurst: createjs.Container;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        update() {
            for (var burstNum = 0; burstNum < flameBursts.length; burstNum++) {
                this._currentBurst = flameBursts[burstNum];
                var flame: objects.Flame = flames[burstNum];
                if (flame.state == createjs.ParticleEmitterState.Finished) {
                    this.destroy(burstNum);
                }
            }
        }

        // Add a new explosion
        addFlame(x: number, y: number) {
            var flame = new objects.Flame(x, y);
            flames.push(flame);
            var burst = new createjs.Container();
            burst.addChild(flame);
            flameBursts.push(burst);
            game.addChild(flameBursts[flameBursts.length - 1]);
        }

        // Destroy Method
        destroy(flameIndex: number) {
            flames.splice(flameIndex, 1);
            flameBursts.splice(flameIndex, 1);
            game.removeChild(this._currentBurst);
        }
    }
} 