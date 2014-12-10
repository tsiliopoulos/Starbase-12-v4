///#source 1 1 /js/ParticleEmitterJS/baseParticle.js
/**
* @fileOverview baseParticle.js
* @version 0.5.0
* @license Copyright (c) 2013 Purple Monkey Studios
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
* 
 */

this.createjs = this.createjs || {};

(function () {

    var BaseParticle = function (particleObject) {

        this.initialize(particleObject);
    }
    var p = BaseParticle.prototype;

    // ** PUBLIC PROPERTIES
    p.debugMode = true;
    p.originX = 0;
    p.originY = 0;
    p.velocityX = 0;                //pixels per second
    p.velocityY = 0;                //pixels per second
    p.linearVelocityX = 0;          //pixels per second
    p.linearVelocityY = 0;          //pixels per second
    p.radialVelocity = 0;           //pixels per second
    p.tangentalVelocity = 0;        //pixels per second
    p.radialAcceleration = 0;       //pixels per second per second
    p.tangentalAcceleration = 0;    //pixels per second per second
    p.linearAccelerationX = 0;      //pixels per second per second
    p.linearAccelerationY = 0;      //pixels per second per second
    p.particleBaseId = 0;

    // ** PRIVATE PROPERTIES:
    p._lastUpdateTimeMs = 0;

    // ** CONSTRUCTOR:
    p.initialize = function (particleObject) {

        this._particleObject = particleObject;
    }

    // ** PUBLIC METHODS:
    p.initializeProperties = function (id) {
        this.particleBaseId = id;
    }

    p.updateParticle = function (ctx) {

        var currentTimeMs = createjs.Ticker.getTime();

        this.updatePosition(currentTimeMs);
    }

    p.updatePosition = function (currentTimeMs) {

        var diffTimeMs = currentTimeMs - this._lastUpdateTimeMs;
        var fractionTime = diffTimeMs / 1000;

        if (this._lastUpdateTimeMs <= 0) { this._lastUpdateTimeMs = currentTimeMs; return; }

        this.velocityX = 0;
        this.velocityY = 0;

        // Process accelerations
        this._processLinearAcceleration(fractionTime);
        this._processRadialAcceleration(fractionTime);
        this._processTangentalAcceleration(fractionTime);

        // Process velocitys
        this._processLinearVelocity(fractionTime);
        this._processRadialAndTangentalVelocity(fractionTime);

        // Update position
        this._processVelocity();
        this._lastUpdateTimeMs = currentTimeMs;
    }

    // ** PRIVATE METHODS:
    p._processLinearAcceleration = function (fractionTime) {
        var accelerationTickX = this.linearAccelerationX * fractionTime;
        var accelerationTickY = this.linearAccelerationY * fractionTime;

        this.linearVelocityX += accelerationTickX;
        this.linearVelocityY += accelerationTickY;
    }

    p._processRadialAcceleration = function (fractionTime) {
        var radialAceelerationTick = this.radialAcceleration * fractionTime;

        this.radialVelocity += radialAceelerationTick;
    }

    p._processTangentalAcceleration = function (fractionTime) {
        var tangentalAceelerationTick = this.tangentalAcceleration * fractionTime;

        this.tangentalVelocity += tangentalAceelerationTick;
    }

    p._processLinearVelocity = function (fractionTime) {

        var velocityTickY = this.linearVelocityY * fractionTime;
        var velocityTickX = this.linearVelocityX * fractionTime;

        this.velocityX += velocityTickX;
        this.velocityY += velocityTickY;
    }

    p._processRadialAndTangentalVelocity = function(fractionTime) {

        var center = this._getParticleCenter();
        var deltaY = this.originY - center.y;
        var deltaX = this.originX - center.x;
        var angle = Math.atan2(deltaY, deltaX);

        this._processRadialVelocity(fractionTime, angle);
        this._processTangentalVelocity(fractionTime, angle);
    }

    p._processRadialVelocity = function (fractionTime, angle) {

        var velocityTickX = this.radialVelocity * fractionTime * Math.cos(angle);
        var velocityTickY = this.radialVelocity * fractionTime * Math.sin(angle);

        this.velocityX += velocityTickX;
        this.velocityY += velocityTickY;
    }

    p._processTangentalVelocity = function (fractionTime, angle) {

        var velocityTickX = this.tangentalVelocity * fractionTime * Math.cos(angle - (Math.PI / 2));
        var velocityTickY = this.tangentalVelocity * fractionTime * Math.sin(angle - (Math.PI / 2));

        this.velocityX += velocityTickX;
        this.velocityY += velocityTickY;
    }

    p._processVelocity = function () {

        this._particleObject.x += this.velocityX;
        this._particleObject.y += this.velocityY;
    }

    p._getParticleCenter = function () {

        var center = {
            x: this._particleObject.x,
            y: this._particleObject.y
        };

        return center;
    }

    p._debugText = function (text) {
        if (this.debugMode) {
            console.log(text);
        }
    }

    // ** PRIVATE EVENT HANDLERS:

    createjs.BaseParticle = BaseParticle;
}());
///#source 1 1 /js/ParticleEmitterJS/bitmapParticle.js
/**
* @fileOverview bitmapParticle.js
* @version 0.5.0
* @license Copyright (c) 2013 Purple Monkey Studios
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
* 
 */

// NAMESPACE:
this.createjs = this.createjs || {};

(function () {

    // ** ENUMS


    /**
     * A shape particle
     * @constructor
     * @extends createjs.Bitmap
     */
    var BitmapParticle = function (image) {

        this.initialize(image);
    }
    var p = BitmapParticle.prototype = new createjs.Bitmap();

    // ** BASE METHODS
    p.Bitmap_initialise = p.initialize;
    p.Bitmap_draw = p.draw;
    p.Bitmap_updateContext = p.updateContext;

    // ** PUBLIC PROPERTIES:
    p.particleId = 0;

    // ** PRIVATE PROPERTIES:
    p._baseParticle = null;

    // ** CONSTRUCTOR:
    p.initialize = function (image) {
        this.Bitmap_initialise(image);
        this._baseParticle = new createjs.BaseParticle(this);
    }

    // ** PUBLIC METHODS:
    p.initializeProperties = function (id) {
        this.particleId = id;
        this._baseParticle.initializeProperties(id);
    }

    p.updateContext = function (ctx) {
        this._baseParticle.updateParticle();
        this.Bitmap_updateContext(ctx);
        
    }

    // ** PRIVATE METHODS:

    // ** PRIVATE EVENT HANDLERS:

    createjs.BitmapParticle = BitmapParticle;
}());
///#source 1 1 /js/ParticleEmitterJS/particleEmitter.js
/**
* @fileOverview particleEmitter.js
* @version 0.5.0
* @license Copyright (c) 2013 Purple Monkey Studios
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
* 
 */

/**
* @module createjs
*/
this.createjs = this.createjs || {};

(function () {
    "use strict"

    /**
     * A Particle Emitter extends DisplayObject and must be added to a Container object. An emitter will emit a stream of particles
     * adhereing to the given configuration.
     * @class ParticleEmitter
     * @constructor
     * @param {Image} [image] The image to use for each particle. If no image is provided then a simple circle will be drawn.
    **/
    var ParticleEmitter = function (image) {

        if (image != null) {
            this.image = image;
        }

        this.initialize();
    }
    var p = ParticleEmitter.prototype = new createjs.DisplayObject();

    //#region Enums + Constants

    /**
    * Enum to represent the state of the particle emitter
    **/
    createjs.ParticleEmitterState = {
        "Created": 0,
        "Running": 1,
        "Finished": 2
    }

    /**
    * Enum to represent the type of the particle emitter
    **/
    createjs.ParticleEmitterType = {
        "Emit": 0,
        "OneShot": 1
    }

    // ** CONSTANTS:
    p.REMAIN_UNCHANGED = null;
    p.INFINITE = -1;

    //#endregion

    // ** BASE METHODS
    p.DisplayObject_initialise = p.initialize;
    p.DisplayObject_draw = p.draw;
    p.DisplayObject_updateContext = p.updateContext;

    //#region Public Properties (Emitter specific)

    /**
    * Should the emitter be removed from the parent when finished?
    * 
    * @property autoRemoveOnFinished
    * @type {boolean}
    * @default false
    **/
    p.autoRemoveOnFinished = false;

    /**
    * Is debug mode active for this emitter. If so, render debug text.
    *
    * @property debugMode
    * @type {boolean}
    * @default false
    **/
    p.debugMode = false;

    /**
    * The amount of time (milliseconds) that the emitter will last. A value of -1 means that the emitter will 
    * last for an infinite amount of time.
    *
    * @property duration
    * @type {number}
    * @default -1
    **/
    p.duration = p.INFINITE;

    /**
    * The type of particle emitter to create
    *
    * @property emitterType
    * @type {ParticleEmitterType}
    * @default ParticleEmitterType.Emit
    **/
    p.emitterType = createjs.ParticleEmitterType.Emit;

    /**
    * The total number of particles that can exist at any one time
    *
    * @property maxParticles
    * @type {number}
    * @default 200
    **/
    p.maxParticles = 200;

    /**
    * The rate at which particles are generated (number of particles per second)
    *
    * @property emissionRate
    * @type {number}
    * @default 1
    **/
    p.emissionRate = 1;

    /**
    * The current state of the particle emitter
    *
    * @property state
    * @type {ParticleEmitterState}
    * @default ParticleEmitterState.Created
    **/
    p.state = createjs.ParticleEmitterState.Created;

    /**
    * The image to show for each particle
    *
    * @property image
    * @type {Image}
    * @default null
    **/
    p.image = null;

    //#endregion
    //#region Public Properties (Particle generation)

    /**
    * The accelerration of each particle in the X axis.
    *
    * @property accelerationX
    * @type {decimal}
    * @default 0
    **/
    p.accelerationX = 0;

    /**
    * The accelerration of each particle in the Y axis. This can be used to simulate forces such as Gravity
    *
    * @property accelerationY
    * @type {decimal}
    * @default 0
    **/
    p.accelerationY = 0;

    /**
    * The angle (degrees) in which to fire the particle from the origin point
    *
    * @property angle
    * @type {number}
    * @default 0
    **/
    p.angle = 0;

    /**
    * The amount of degrees that the angle can vary by
    *
    * @property angleVar
    * @type {number}
    * @default 0
    **/
    p.angleVar = 0;

    /**
    * The end opacity of each particle, where 1 is opaque and 0 is transparent. A null value signifies that
    * the value will not differ from the start value.
    *
    * @property endOpacity
    * @type {number}
    * @default null
    **/
    p.endOpacity = p.REMAIN_UNCHANGED;

    /**
    * The end color of each particle [r,g,b]. A null value signifies that
    * the value will not differ from the start value.
    *
    * @property endColor
    * @type {[r,g,b]}
    * @default null
    **/
    p.endColor = p.REMAIN_UNCHANGED;

    /**
    * The variance in the end color. A null value signifies that
    * the value will not differ from the start value.
    *
    * @property endColorVar
    * @type {[r,g,b]}
    * @default null
    **/
    p.endColorVar = [0, 0, 0];

    /**
    * The end size of each particle, in pixels. A null value signifies that
    * the value will not differ from the start value.
    *
    * @property endSize
    * @type {number}
    * @default null
    **/
    p.endSize = p.REMAIN_UNCHANGED;

    /**
    * The variance in end size, in pixels. A null value signifies that
    * the value will not differ from the start value.
    *
    * @property endSizeVar
    * @type {number}
    * @default 0
    **/
    p.endSizeVar = 0.0;

    /**
    * The number of degrees to spin each particle per second when each particle is destroyed. A null value signifies that
    * the value will not differ from the start value.
    *
    * @property endSpin
    * @type {number}
    * @default null
    **/
    p.endSpin = p.REMAIN_UNCHANGED;

    /**
    * The variance in end spin. A null value signifies that
    * the value will not differ from the start value.
    *
    * @property endSpinVar
    * @type {number}
    * @default 0
    **/
    p.endSpinVar = 0;

    /**
    * The amount of time (milliseconds) that each particle will last before being destroyed
    *
    * @property life
    * @type {number}
    * @default 4000
    **/
    p.life = 4000;

    /**
    * The variance in the amount of life time (milliseconds)
    *
    * @property lifeVar
    * @type {number}
    * @default 0
    **/
    p.lifeVar = 0;

    /**
    * The variance in the x position of emitted particles
    *
    * @property positionVarX
    * @type {number}
    * @default 0
    **/
    p.positionVarX = 0;

    /**
    * The variance in the y position of emitted particles
    *
    * @property positionVarY
    * @type {number}
    * @default 0
    **/
    p.positionVarY = 0;

    /**
    * The radial acceleration of the particle
    *
    * @property radialAcceleration
    * @type {number}
    * @default 0
    **/
    p.radialAcceleration = 0;

    /**
    * The variance of the radial acceleration of the particle
    *
    * @property radialAccelerationVar
    * @type {number}
    * @default 0
    **/
    p.radialAccelerationVar = 0;

    /**
    * The number of pixels per second that the particle will move
    *
    * @property speed
    * @type {number}
    * @default 10
    **/
    p.speed = 10;

    /**
    * The number of pixels per second that the speed can vary by
    *
    * @property speedVar
    * @type {number}
    * @default 0
    **/
    p.speedVar = 0;

    /**
    * The start opacity of each particle, where 1 is opaque and 0 is transparent
    *
    * @property startOpacity
    * @type {number}
    * @default 0
    **/
    p.startOpacity = 1;

    /**
    * The color of each particle [r,g,b] when it is created
    *
    * @property startColor
    * @type {[r,g,b]}
    * @default [255,0,0]
    **/
    p.startColor = [255,0,0];

    /**
    * The variance in the start color
    *
    * @property startColorVar
    * @type {[r,g,b]}
    * @default [0,0,0]
    **/
    p.startColorVar = [0,0,0];

    /**
    * The start size of each particle, in pixels
    *
    * @property startSize
    * @type {number}
    * @default 20
    **/
    p.startSize = 20;

    /**
    * The variance in start size, in pixels
    *
    * @property startSizeVar
    * @type {number}
    * @default 0
    **/
    p.startSizeVar = 0;

    /**
    * The number of degrees to spin each particle per second when each particle is created
    *
    * @property startSpin
    * @type {number}
    * @default 0
    **/
    p.startSpin = 0;

    /**
    * The variance in start spin
    *
    * @property startSpinVar
    * @type {number}
    * @default 0
    **/
    p.startSpinVar = 0;

    /**
    * The tangental acceleration of the particle
    *
    * @property tangentalAcceleration
    * @type {number}
    * @default 0
    **/
    p.tangentalAcceleration = 0;

    // 
    /**
    * The variance in the tangental acceleration of the particle
    *
    * @property tangentalAccelerationVar
    * @type {number}
    * @default 0
    **/
    p.tangentalAccelerationVar = 0;

    //#endregion
    //#region Private Properties

    // The total number of particles emitted by this emitter
    p._totalEmitted = 0;

    // The time the emitter started
    p._timeStarted = 0;

    // The time at which the last particle was emitted
    p._timeLastParticleEmitted = 0;

    // All the particles currently managed by this emitter
    p._particles = new Array();

    //#endregion

    //#region Public Methods

    /**
    * Resets the emitter which removes any active particles before starting all over again.
    *
    * @method reset
    */
    p.reset = function () {

        while (this._particles.length > 0) {
            var particle = this._particles[0];

            if (particle.filters != null) {
                for (var filterIndex in particle.filters) {
                    createjs.Tween.removeTweens(particle.filters[filterIndex]);
                }
            }

            particle.uncache();
            createjs.Tween.removeTweens(particle);

            this._particles.splice(0, 1);
            this.parent.removeChild(particle);
        }

        this._timeLastParticleEmitted = 0;
        this.state = createjs.ParticleEmitterState.Created;
    }

    //#endregion
    //#region Private Methods

    p.initialize = function () {
        this.DisplayObject_initialise();
    }

    p.updateContext = function (ctx) {
        this.DisplayObject_updateContext(ctx);

        var currentTimeMilli = createjs.Ticker.getTime();

        // Update state
        if (this.state == createjs.ParticleEmitterState.Created) {
            this._timeStarted = currentTimeMilli;
            this.state = createjs.ParticleEmitterState.Running;
        }
        else if (this.duration != this.INFINITE &&
                currentTimeMilli > (this._timeStarted + this.duration)) {
            this.state = createjs.ParticleEmitterState.Finished;
        }

        // If RUNNING, try to generate a particle
        if (this.state == createjs.ParticleEmitterState.Running) {
            switch (this.emitterType)
            {
                case createjs.ParticleEmitterType.OneShot:
                    this._oneShot(currentTimeMilli);
                    break;
                case createjs.ParticleEmitterType.Emit:
                default:
                    this._emit(currentTimeMilli);
                    break;
            }
        }
        // If FINISHED, remove from parent
        else if (this.state == createjs.ParticleEmitterState.Finished) {
            if (this.autoRemoveOnFinished) {
                this.parent.removeChild(this);
            }
        }

        // Call updateCache if color tweening is required
        // NB. ColorFilter (or any other type of filter) tweening is computationally very expensive. 
        // Therefore if you wish to use color tweening, then we recommend trying to minimize:
        //  a) the emission rate, and
        //  b) the start and end size of the particles
        if (this.endColor != p.REMAIN_UNCHANGED)
        {
            for (var i = 0; i < this._particles.length; i++) {
            this._particles[i].updateCache();
            }
        }
    }

    p._emit = function (currentTimeMilli) {

        var millisecondsPerParticle = 1000 / this.emissionRate;
        if (currentTimeMilli > (this._timeLastParticleEmitted + millisecondsPerParticle)) {
            if (this._particles.length < this.maxParticles) {
                this._generateParticle();
                this._timeLastParticleEmitted = currentTimeMilli;
            }
        }
    }

    p._oneShot = function (currentTimeMilli) {

        if (this._particles.length == 0) {
            for (var i = 0; i < this.maxParticles; i++) {
                this._generateParticle();
            }

            this._timeLastParticleEmitted = currentTimeMilli;
        }
    }

    // Generate a new particle
    p._generateParticle = function () {

        var o = this;
        this._debugText("generateParticle");

        // Get properties
        var startOpacity = this.startOpacity;
        var startColor = this._getColor(this.startColor, this.startColorVar);
        var startSize = this._getVariedValue(this.startSize, this.startSizeVar, true);
        var startSpin = this._getVariedValue(this.startSpin, this.startSpinVar, false);
        var endColor = this.endColor == this.REMAIN_UNCHANGED ? this.startColor : this._getColor(this.endColor, this.endColorVar);
        var endSize = this.endSize == this.REMAIN_UNCHANGED ? this.startSize : this._getVariedValue(this.endSize, this.endSizeVar, true);
        var endSpin = this.endSpin == this.REMAIN_UNCHANGED ? this.startSpin : this._getVariedValue(this.endSpin, this.endSpinVar, true);
        var endOpacity = this.endOpacity == this.REMAIN_UNCHANGED ? this.startOpacity : this.endOpacity;
        var scale = endSize / startSize;
        var speed = this._getVariedValue(this.speed, this.speedVar, true);
        var life = this._getVariedValue(this.life, this.lifeVar, true);
        var angle = this._getAngle(this.angle, this.angleVar);
        var distance = speed * life / 1000;
        var startPos = {
            x: this._getVariedValue(this.position.x, this.positionVarX, false),
            y: this._getVariedValue(this.position.y, this.positionVarY, false),
        }
        var endPos = this._getPositionInDirection(this.position, angle, distance);
        var dx = endPos.x - this.position.x;
        var dy = endPos.y - this.position.y;

        // Create shape
        var shape = this._createParticle(startPos, startColor, startOpacity, startSize, startSpin, life, dx, dy);
        this.parent.addChild(shape);

        // Create color filter
        var colorFilter = this._createColorFilter(shape, startColor);

        // Cache shape
        if (this.image == null) {
            shape.cache(0,0, startSize, startSize);
        }
        else {
            shape.cache(0, 0, this.image.width, this.image.height, startSize / this.image.width);
        }

        // Animate
        scale = scale * shape.scaleX;
        createjs.Tween.get(shape).to({ scaleX: scale, scaleY: scale, rotation: endSpin, alpha: endOpacity}, life).call(function () { o._onParticleFinished(shape) });
        createjs.Tween.get(colorFilter).to({ redMultiplier: endColor[0] / 255.0, greenMultiplier: endColor[1] / 255.0, blueMultiplier: endColor[2] / 255.0 }, life);

        // Finalize
        this._particles.push(shape);
        this._totalEmitted++;

        // Write to console
        this._debugText(this._format("Particle [s_x:{0}, s_y:{1}, e_x:{2}, e_y:{3}]", this.position.x, this.position.y, endPos.x, endPos.y));
    }

    p._createColorFilter = function (shape, color) {

        var filter = new createjs.ColorFilter(color[0] / 255.0, color[1] / 255.0, color[2] / 255.0, 1);
        shape.filters = [filter]; 

        return filter;
    }

    p._createParticle = function (position, color, alpha, size, spin, life, dx, dy) {

        var shape = null;

        if (this.image != null) {
            shape = this._createImageParticle(color, size);
        }
        else {
            shape = this._createCircleParticle(color, size);
        }

        var originalWidth = this.image != null ? this.image.width : size;
        var originalHeight = this.image != null ? this.image.height : size;

        shape._baseParticle.originX = this.position.x;
        shape._baseParticle.originY = this.position.y;
        shape._baseParticle.linearVelocityX = dx / life * 1000;
        shape._baseParticle.linearVelocityY = dy / life * 1000;
        shape._baseParticle.linearAccelerationX = this.accelerationX;
        shape._baseParticle.linearAccelerationY = this.accelerationY;
        shape._baseParticle.radialAcceleration = this._getVariedValue(this.radialAcceleration, this.radialAccelerationVar, false);
        shape._baseParticle.tangentalAcceleration = this._getVariedValue(this.tangentalAcceleration, this.tangentalAccelerationVar, false);

        shape.alpha = alpha;
        shape.rotation = spin;
        shape.x = position.x;
        shape.y = position.y;
        shape.regX = originalWidth / 2;
        shape.regY = originalHeight / 2;

        shape.initializeProperties(this._totalEmitted);

        return shape;
    }

    p._createImageParticle = function (color, size) {
        var bitmap = new createjs.BitmapParticle(this.image);
        bitmap.scaleX = size / this.image.width;
        bitmap.scaleY = bitmap.scaleX;

        return bitmap;
    }

    p._createCircleParticle = function (color, size) {
        var shape = new createjs.ShapeParticle();
        var colorRgb = createjs.Graphics.getRGB(255, 255, 255);
        shape.graphics.beginFill(colorRgb).drawCircle(size / 2, size / 2, size / 2);
        shape.alpha = 255;

        return shape;
    }

    p._debugText = function (text) {
        if (this.debugMode) {
            console.log(text);
        }
    }

    p._getPositionInDirection = function (startPoint, angle, length) {
        var newX = startPoint.x + (this._cosd(angle) * length);
        var newY = startPoint.y + (this._sind(angle) * length);

        return new createjs.Point(newX, newY);
    }

    p._getVariedValue = function(base, variance, applyLowerLimit) {

        var plusOrMinus = this._intRandom(1) == 1 ? 1 : -1;
        var variedValue = base + (this._intRandom(variance) * plusOrMinus);

        if (applyLowerLimit||false) {
            variedValue = this._lowerLimit(variedValue);
        }

        return variedValue;
    }

    p._getAngle = function (base, variance) {

        var unlimited = this._getVariedValue(base, variance);
        unlimited = unlimited < 0 ? 360 + unlimited : unlimited;
        unlimited = unlimited > 360 ? unlimited - 360 : unlimited;
        return unlimited;
    }

    p._getColor = function (base, variance) {

        var r = variance == null ? base[0] : this._getVariedValue(base[0], variance[0]);
        var g = variance == null ? base[1] : this._getVariedValue(base[1], variance[1]);
        var b = variance == null ? base[2] : this._getVariedValue(base[2], variance[2]);

        r = this._rgbLimit(r);
        g = this._rgbLimit(g);
        b = this._rgbLimit(b);

        var color = [r, g, b];

        return color;
    }

    p._rgbLimit = function (unlimitedVal) {
        var limitedVal = this._lowerLimit(unlimitedVal);
        limitedVal = limitedVal > 255 ? 255 : limitedVal;
        return limitedVal;
    }

    p._lowerLimit = function (unlimitedVal) {
        var limitedVal = unlimitedVal < 0 ? 0 : unlimitedVal;
        return limitedVal;
    }

    /*** Generate a random integer between 0-x (inclusive) */
    p._intRandom = function (upperbound) {
        return Math.floor(Math.random() * (upperbound + 1));
    }

    p._sind = function (degrees) {
        return Math.sin(this._toRadians(degrees));
    }

    p._cosd = function (degrees) {
        return Math.cos(this._toRadians(degrees));
    }

    p._toRadians = function (degrees) {
        return degrees * Math.PI / 180;
    }

    p._format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }

    //#endregion
    //#region Private Event Handlers

    // Called when a particles life is over
    p._onParticleFinished = function (particle) {
        particle.uncache();
        var particleIndex = this._particles.indexOf(particle);
        this._particles.splice(particleIndex, 1);
        this.parent.removeChild(particle);

        if (this._particles.length == 0 && this.state == createjs.ParticleEmitterState.Running && this.emitterType == createjs.ParticleEmitterType.OneShot) {
            this.state = createjs.ParticleEmitterState.Finished;
        }
    }

    //#endregion

    createjs.ParticleEmitter = ParticleEmitter;
}());
///#source 1 1 /js/ParticleEmitterJS/shapeParticle.js
/**
* @fileOverview shapeParticle.js
* @version 0.5.0
* @license Copyright (c) 2013 Purple Monkey Studios
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
* 
 */

// NAMESPACE:
this.createjs = this.createjs || {};

(function () {

    /**
     * A shape particle
     * @constructor
     * @extends createjs.Shape
     */
    var ShapeParticle = function () {

        this.initialize();
    }
    var p = ShapeParticle.prototype = new createjs.Shape();

    // ** BASE METHODS
    p.Shape_initialise = p.initialize;
    p.Shape_draw = p.draw;
    p.Shape_updateContext = p.updateContext;

    // ** PUBLIC PROPERTIES:
    p.particleId = 0;

    // ** PRIVATE PROPERTIES:
    p._baseParticle = null;

    // ** CONSTRUCTOR:
    p.initialize = function () {
        this.Shape_initialise();
        this._baseParticle = new createjs.BaseParticle(this);
    }

    // ** PUBLIC METHODS:
    p.initializeProperties = function (id) {
        this.particleId = id;
        this._baseParticle.initializeProperties(id);
    }

    p.updateContext = function (ctx) {
        this.Shape_updateContext(ctx);
        this._baseParticle.updateParticle();
    }

    // ** PRIVATE METHODS:

    // ** PRIVATE EVENT HANDLERS:

    createjs.ShapeParticle = ShapeParticle;
}());
