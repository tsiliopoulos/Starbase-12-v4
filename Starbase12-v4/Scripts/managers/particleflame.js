var managers;
(function (managers) {
    var ParticleFlame = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function ParticleFlame() {
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        ParticleFlame.prototype.update = function () {
            for (var burstNum = 0; burstNum < flameBursts.length; burstNum++) {
                this._currentBurst = flameBursts[burstNum];
                var flame = flames[burstNum];
                if (flame.state == createjs.ParticleEmitterState.Finished) {
                    this.destroy(burstNum);
                }
            }
        };
        // Add a new explosion
        ParticleFlame.prototype.addFlame = function (x, y) {
            var flame = new objects.Flame(x, y);
            flames.push(flame);
            var burst = new createjs.Container();
            burst.addChild(flame);
            flameBursts.push(burst);
            game.addChild(flameBursts[flameBursts.length - 1]);
        };
        // Destroy Method
        ParticleFlame.prototype.destroy = function (flameIndex) {
            flames.splice(flameIndex, 1);
            flameBursts.splice(flameIndex, 1);
            game.removeChild(this._currentBurst);
        };
        return ParticleFlame;
    })();
    managers.ParticleFlame = ParticleFlame;
})(managers || (managers = {}));
//# sourceMappingURL=particleflame.js.map