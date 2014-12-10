module objects {
    export class Photon extends objects.GameObject implements interfaces.IObject {
        // PUBLIC PROPERTIES
        public range: number;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _travelled: number;
        private _origin: createjs.Point;
        private _target: createjs.Point;
        
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("torpedo");
            this.name = "photon";
            this._origin = new createjs.Point();
            this._target = new createjs.Point();
            this._init();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Photon update
        update() {
            this.calcVector();
            this.calcPosition();
            this.location.x = this.x;
            this.location.y = this.y;
            this.checkBounds();
            this._travelled = utility.distance(this._origin, this.location);
        }

        // Remove the photon
        destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        private _init() {
            this.x = player.x;
            this.y = player.y;
            this._origin.x = this.x;
            this._origin.y = this.y;

            this.dx = 0;
            this.dy = 0;
            this.direction = player.targetAngle;
            this.speed = config.PHOTON_SPEED;
            this._target.x = stage.mouseX;
            this._target.y = stage.mouseY;

            this.range = utility.distance(this._origin, this._target);
            this.damage = config.PHOTON_DAMAGE;
        }
    }
} 