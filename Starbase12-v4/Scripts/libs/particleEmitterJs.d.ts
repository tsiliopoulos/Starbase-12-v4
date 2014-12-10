// Type definitions for particleEmitterJs

/// <reference path="createjs-lib.d.ts" />

declare module createjs {
    export class BaseParticle {
        constructor(particleObject);

        // Properties
        debugMode:boolean;
        originX: number;
        originY: number;
        velocityX: number;
        velocityY: number;
        linearVelocityX: number;
        linearVelocityY: number;
        radialVelocity: number;
        tangentalVelocity: number;
        radialAcceleration: number;
        tangentalAcceleration: number;
        linearAccelerationX: number;
        linearAccelerationY: number;
        particleBaseId: number;
        particleObject;

        // Methods
        initializeProperties(id);
        updateParticle(ctx);
        updatePosition(currentTimeMs);
    }

    export class BitmapParticle extends createjs.Bitmap {
        constructor(image);

        // Properties
        particleId: number;

        // Methods
        initializeProperties(id: number);
        updateContext(ctx);
    }

    export enum ParticleEmitterState {
        "Created",
        "Running",
        "Finished"
    }

    export enum ParticleEmitterType {
        "Emit",
        "OneShot",
    }

    export class ParticleEmitter extends createjs.DisplayObject {
        constructor(image);

        // Constants
        static REMAIN_UNCHANGED;
        static INFINITE;

        // Properties
        autoRemoveOnFinished: boolean;
        debugMode: boolean;
        duration;
        emitterType;
        maxParticles: number;
        emissionRate: number;
        state;
        image;
        accelerationX: number;
        accelerationY: number;
        angle: number;
        angleVar: number;
        endOpacity: number;
        endColor;
        endColorVar;
        endSize: number;
        endSizeVar: number;
        endSpin: number;
        endSpinVar: number;
        life: number;
        lifeVar: number;
        position: createjs.Point;
        positionVarX: number;
        positionVarY: number;
        radialAcceleration: number;
        radialAccelerationVar: number;
        speed; number;
        speedVar: number;
        startOpacity: number;
        startColor;
        startColorVar;
        startSize: number;
        startSizeVar: number;
        startSpin: number;
        startSpinVar: number;
        tangentalAcceleration: number;
        tangentalAccelerationVar: number;

        // Methods
        reset();
    }

    export class ShapeParticle extends createjs.Shape {

        // Properties
        particleId: number;

        // Methods
        initializeProperties(id: number);
        updateContext(ctx);
    }
}