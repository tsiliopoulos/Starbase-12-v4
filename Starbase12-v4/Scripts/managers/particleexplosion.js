var managers;
(function (managers) {
    var ParticleExplosion = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function ParticleExplosion() {
        }
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        ParticleExplosion.prototype.update = function () {
            for (var emitterNum = 0; emitterNum < emitters.length; emitterNum++) {
                this._currentEmitter = emitters[emitterNum];
                var explosion = explosions[emitterNum];
                if (explosion.state == createjs.ParticleEmitterState.Finished) {
                    this.destroy(emitterNum);
                }
            }
        };
        // Add a new explosion
        ParticleExplosion.prototype.addExplosion = function (x, y) {
            var explosion = new objects.Explosion(x, y);
            explosions.push(explosion);
            var emitter = new createjs.Container();
            emitter.addChild(explosion);
            emitters.push(emitter);
            game.addChild(emitters[emitters.length - 1]);
        };
        // Destroy Method
        ParticleExplosion.prototype.destroy = function (explosionIndex) {
            explosions.splice(explosionIndex, 1);
            emitters.splice(explosionIndex, 1);
            game.removeChild(this._currentEmitter);
        };
        return ParticleExplosion;
    })();
    managers.ParticleExplosion = ParticleExplosion;
})(managers || (managers = {}));
//# sourceMappingURL=particleexplosion.js.map