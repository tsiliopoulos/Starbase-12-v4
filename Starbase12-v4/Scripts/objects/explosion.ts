/// <reference path="../managers/asset.ts" />

// Explosion Object Class
module objects {
    export class Explosion extends createjs.ParticleEmitter {

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++
        private _particle: createjs.Bitmap;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(x, y) {
            this._particle = new createjs.Bitmap(managers.Assets.loader.getResult("explosionParticle"));
            super(this._particle.image);
            this.position = new createjs.Point(x, y);
            this.emitterType = createjs.ParticleEmitterType.Emit;
            this.emissionRate = 50;
            this.maxParticles = 500;

            this.life = 590;
            this.lifeVar = 380;
            this.speed = 100;
            this.speedVar = 30;
            this.positionVarX = 0;
            this.positionVarY = 0;
            this.accelerationX = 0;
            this.accelerationY = 0;
            this.radialAcceleration = 0;
            this.radialAccelerationVar = 0;
            this.tangentalAcceleration = 0;
            this.tangentalAccelerationVar = 0;
            this.angle = 270;
            this.angleVar = 360;
            this.startSpin = 0;
            this.startSpinVar = 0;
            this.endSpin = null;
            this.endSpinVar = null;
            this.startColor = [255, 0, 35];
            this.startColorVar = [255, 125, 0];
            this.startOpacity = 0.5;
            this.endColor = [255, 255, 255];
            this.endColorVar = [0, 0, 0];
            this.endOpacity = 0;
            this.startSize = 65;
            this.startSizeVar = 33;
            this.endSize = 0;
            this.endSizeVar = 5;
            this.duration = 1000;

        }

    }
} 