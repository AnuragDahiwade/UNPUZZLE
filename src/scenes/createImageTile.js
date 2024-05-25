import { GameObjects } from 'phaser';
import Game from './Game.js';


export class createImageTile extends GameObjects.Image {
    constructor(scene, x, y, texture, direction) {
        super(scene, x, y, texture);

        this.direction = direction; // Store the direction in the instance

        this.setInteractive(); // Make the image interactive
        this.setDisplaySize(100, 100);

        this.on('pointerdown', function (pointer) {
            // This function will be called when the image is clicked or touched
            this.scene.input.setDraggable(this); // Enable dragging for the image
        });

        const self = this;
        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this) { // Check if the dragged object is this image
               
                if (self.direction.includes('left') && dragX < gameObject.x) {

                    gameObject.x = dragX;
                }
                if (self.direction.includes('right') && dragX > gameObject.x) {

                    gameObject.x = dragX;
                }
                if (self.direction.includes('up') && dragY < gameObject.y) {

                    gameObject.y = dragY;
                }
                if (self.direction.includes('down') && dragY > gameObject.y) {

                    gameObject.y = dragY;
                }
            }
        });
    }


}

export default createImageTile;
