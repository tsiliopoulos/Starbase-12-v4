module managers {
    export class ParticleExplosion {

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++
        private _currentEmitter: createjs.Container;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Update Method
        update() {
            for (var emitterNum = 0; emitterNum < emitters.length; emitterNum++) {
                this._currentEmitter = emitters[emitterNum];
                var explosion: objects.Explosion = explosions[emitterNum];
                if (explosion.state == createjs.ParticleEmitterState.Finished) {
                    this.destroy(emitterNum);
                }
            }
        }

        // Add a new explosion
        addExplosion(x: number, y: number) {
            var explosion = new objects.Explosion(x, y);
            explosions.push(explosion);
            var emitter = new createjs.Container();
            emitter.addChild(explosion);
            emitters.push(emitter);
            game.addChild(emitters[emitters.length - 1]);
        }

        // Destroy Method
        destroy(explosionIndex: number) {
            explosions.splice(explosionIndex, 1);
            emitters.splice(explosionIndex, 1);
            game.removeChild(this._currentEmitter);
        }
    }
} 