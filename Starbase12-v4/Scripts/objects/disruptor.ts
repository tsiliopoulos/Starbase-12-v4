// Disruptor Bullet Class
module objects {
    export class Disruptor extends objects.GameObject implements interfaces.IObject {   
         // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _enemy: objects.Enemy;
        private _origin: createjs.Point;
        private _target: createjs.Point;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(enemy: objects.Enemy) {
            super("disruptorBolt");
            this.name = "disruptor";
            this._enemy = enemy;
            this._origin = new createjs.Point();
            this._origin = this._enemy.location;
            this._target = new createjs.Point();
            this._init();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // disruptor update
        update() {
            this.location.x = this.x;
            this.location.y = this.y;
            this.calcVector();
            this.calcPosition();
            this.checkBounds();
        }

        // Remove the tracer
        destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _init() {
            this.x = this._enemy.x;
            this.y = this._enemy.y;
            this._origin.x = this._enemy.x;
            this._origin.y = this._enemy.y;
            this.dx = 0;
            this.dy = 0;
            this.radius *= 1.5;
            this.direction = this._enemy.targetAngle;
            this.speed = config.DISRUPTOR_SPEED;
            this.damage = config.DISRUPTOR_DAMAGE;
        }


    }
} 