// Button Object Class
module objects {
    export class Button extends objects.GameObject {
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(x: number, y: number, buttonIDString: string) {
            super(buttonIDString);
            this.x = x;
            this.y = y;
            this.setButtonListeners();
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        // Create standard button listeners for rollover and rollout events
        public setButtonListeners() {
            this.cursor = 'pointer';
            this.on('rollover', this.onButtonOver);
            this.on('rollout', this.onButtonOut);
        }

        public onButtonOver() {
            this.alpha = 0.8;
        }

        public onButtonOut() {
            this.alpha = 1;
        }

        // public method to change the scale of the button
        public scale(newScale:number) {
            this.scaleX = newScale;
            this.scaleY = newScale;
        }
    }
} 