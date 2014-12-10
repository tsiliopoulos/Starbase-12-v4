// Loader Bar Class
module objects {
    export class LoaderBar extends createjs.Shape {

        // PRIVATE PROPERTIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++
        private _fillColour: string;
        private _strokeColour: string;
        private _percentLabel: createjs.Text;

        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(x: number, y: number, fill: string, stroke: string) {
            super()
            this.x = x;
            this.y = y;
            this._fillColour = fill;
            this._strokeColour = stroke;
            //this.scaleX = 0;
            this.regX = config.LOADER_WIDTH * 0.5;
            this.regY = config.LOADER_HEIGHT * 0.5;

            this._drawPercent();
            
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        update() {
            //this.scaleX = percentLoaded;

            this._drawStroke();
            this._drawFill();
            this._updatePercent();
        }

        // Destroy Method
        destroy() {
            game.removeChild(this);
            game.removeChild(this._percentLabel);
        }

        // PRIVATE METHODS

        // Draw the stroke for the loader bar
        private _drawStroke() {
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke(this._strokeColour);
            this.graphics.drawRoundRect(0, 0, config.LOADER_WIDTH, config.LOADER_HEIGHT, 20);
            this.graphics.endStroke();
        }

        // Draw the Fill for the loader bar
        private _drawFill() {
            this.graphics.clear();
            this.graphics.beginFill(this._fillColour);
            this.graphics.drawRoundRect(0, 0, config.LOADER_WIDTH * percentLoaded, config.LOADER_HEIGHT, 20);
            this.graphics.endFill();
        }

        // Draw the percent label for the loader bar
        private _drawPercent() {
            this._percentLabel = new createjs.Text("0%", "46px startrek", config.BLACK);
            this._percentLabel.regX = this._percentLabel.getBounds().width * 0.5;
            this._percentLabel.regY = this._percentLabel.getBounds().height * 0.5;
            this._percentLabel.x = this.x;
            this._percentLabel.y = this.y;
            
        }

        private _updatePercent() {
            this._percentLabel.text = Math.floor(percentLoaded * 100).toString() + "%";
            game.addChild(this._percentLabel);
        }

    }
} 