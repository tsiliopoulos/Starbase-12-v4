// Shield Class
module objects {
    export class Shield extends createjs.Container implements interfaces.IObject {
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++
        public width: number;
        public height: number;
        public arcs: objects.GameObject[] = [];
        public location: createjs.Point;
        public radius: number;

        // PRIVATE PROPERTIES ++++++++++++++++++++++++++++++++++++++++++++++
        private _shipName: string;
        private _entity: objects.GameObject;


        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(entity: objects.GameObject) { 
            super();
            this._entity = entity;
            this._shipName = this._entity.name;
            this.location = new createjs.Point();

            this._createShields();
            this.width = this.arcs[config.TOP_LEFT].getBounds().width + this.arcs[config.TOP_RIGHT].getBounds().width;
            this.height = this.arcs[config.TOP_LEFT].getBounds().height + this.arcs[config.BOT_LEFT].getBounds().height;
            this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) * 0.5;
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
            this.x = this._entity.x;
            this.y = this._entity.y;
            this.location.x = this.x;
            this.location.y = this.y;
            this._updateArcs();
        }

        // Remove Shield Object from game
        public destroy() {
            game.removeChild(this);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++
        
        // Create the Shield Objects
        private _createShields() {
            // Top Left Arc
            for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                var arcString: string = utility.getArcString(this._shipName, arcNum);
                this.arcs[arcNum] = new objects.GameObject(arcString);
                this.arcs[arcNum].regX = this.x;
                this.arcs[arcNum].regY = this.y;
            }

            // Top Right Arc Offset
            this.arcs[config.TOP_RIGHT].x = this.arcs[config.TOP_LEFT].x + this.arcs[config.TOP_LEFT].width;
             // Bottom Left Arc Offset
            this.arcs[config.BOT_LEFT].y = this.arcs[config.TOP_LEFT].height;
            // Bottom Right Arc Offset
            this.arcs[config.BOT_RIGHT].x = this.arcs[config.TOP_LEFT].width;
            this.arcs[config.BOT_RIGHT].y = this.arcs[config.TOP_LEFT].height;
            // Add shield arcs to shield container
            for (var arcNum = 0; arcNum < 4; arcNum++) {
                this.addChild(this.arcs[arcNum]);
            }
        }

        // Update the location of each shield arc
        private _updateArcs() {
            for (var arcNum = 0; arcNum < config.ARC_COUNT; arcNum++) {
                this.arcs[arcNum].location.x = this.arcs[arcNum].x;
                this.arcs[arcNum].location.y = this.arcs[arcNum].y;
            }
        }

    }
} 