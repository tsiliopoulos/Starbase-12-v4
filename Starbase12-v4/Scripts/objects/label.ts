/// <reference path="../managers/asset.ts" />

// Label Class
module objects {
    export class Label extends createjs.BitmapText {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(x: number, y: number, labelText: string) {
            super(labelText, managers.Assets.bitMapFont);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++

        // Utility Method to change the default font size
        public fontSize(size: number) {
            var scale: number = size / this.getBounds().height;

            this.scaleX = scale;
            this.scaleY = scale;
        }

    }
}  