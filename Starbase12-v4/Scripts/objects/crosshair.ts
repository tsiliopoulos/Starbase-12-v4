// Crosshair object Class
module objects {
    export class Crosshair extends objects.GameObject implements interfaces.IObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("crosshair");
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++

        // Update Method
        public update() {
            this.x = stage.mouseX;
            this.y = stage.mouseY;
            this.checkBounds();
            //this.calcHitArea();
        }

        // Remove Crosshair object from game
        public destroy() {
            game.removeChild(this);
        }

    }
} 