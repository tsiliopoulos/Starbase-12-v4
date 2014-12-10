/// <reference path="../managers/asset.ts" />

// Flame Object Class
module objects {
    export class Flame extends createjs.ParticleEmitter {

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++
        private _particle: createjs.Bitmap;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(x, y) {
            this._particle = new createjs.Bitmap(managers.Assets.loader.getResult("flameParticle"));
            super(this._particle.image);
            this.position = new createjs.Point(x, y);
            this.emitterType = createjs.ParticleEmitterType.Emit;

            this.emissionRate = 100;
            this.maxParticles = 500;
            this.life = 3000;
            this.lifeVar = 1000;
            this.speed = 300;
            this.speedVar = 0;
            this.positionVarX = 0;
            this.positionVarY = 0;
            this.accelerationX = 0;
            this.accelerationY = 0;
            this.radialAcceleration = 0;
            this.radialAccelerationVar = 0;
            this.tangentalAcceleration = 0;
            this.tangentalAccelerationVar = 0;
            this.angle = -150;
            this.angleVar = 15;
            this.startSpin = 0;
            this.startSpinVar = 0;
            this.endSpin = null;
            this.endSpinVar = null;
            this.startColor = [230, 51, 51];
            this.startColorVar = [50, 50, 0];
            this.startOpacity = .7;
            this.endColor = null;
            this.endColorVar = null;
            this.endOpacity = 0.2;
            this.startSize = 60;
            this.startSizeVar = 40;
            this.endSize = 0;
            this.endSizeVar = 5;

        }

    }
}  