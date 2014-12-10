// Phaser Tracer Class
module objects {
    export class PhaserTracer extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES
        public range: number;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _travelled: number;
        private _origin: createjs.Point;
        private _target: createjs.Point;
       
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("tracer");
            this.name = "tracer";
            this._origin = new createjs.Point();
            this._target = new createjs.Point();
            this._init();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Tracer update
        update() {
            this.calcVector();
            this.calcPosition();
            this.location.x = this.x;
            this.location.y = this.y;
            this.checkBounds();
            this._travelled = utility.distance(this._origin, this.location);
            if (this._travelled >= this.range) {
                this.speed = 0;
            }
        }

        // Remove the tracer
        destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        private _init() {
            // Set the Phaser origin
            this.x = player.x;
            this.y = player.y;
            this._origin.x = this.x;
            this._origin.y = this.y;

            this.dx = 0;
            this.dy = 0;
            this.direction = player.targetAngle;
            this.speed = config.PHASER_SPEED;
            this._target.x = stage.mouseX;
            this._target.y = stage.mouseY;

            this.range = utility.distance(this._origin, this._target);
            this.damage = config.PHASER_DAMAGE;
            // Render the Tracer Invisible
            this.alpha = 0;
        }

    } 
} 