
import { GameObjects } from 'phaser';
import createImageTile from './createImageTile.js';

import Game from './Game.js';

export class tileSprite extends GameObjects.Container {
    constructor(scene, directions, tiletexture, posx, posy) {
        super(scene, posx, posy);

        this.scene = scene;


        console.log(posx, '  ', posy);
        this.tile = new createImageTile(scene, posx, posy, tiletexture, directions); // Create an instance of createImageTile
        this.add(this.tile); // Add the image to the container

        this.tile.setAlpha(1); // Set alpha for transparency

        this.tile.on('pointerdown', () => {
            this.posx = this.tile.x;
            this.posy = this.tile.y;
        });

        const self = this;

        this.scene.input.on('dragend', (pointer, gameObject) => {
            if (gameObject === this.tile) {
                if (directions.includes("left") && Math.abs(this.posx - gameObject.x) > 50) {
                    this.scene.tweens.add({
                        targets: gameObject,
                        alpha: 0, // Fade out the image
                        duration: 500, // Animation duration in milliseconds
                        onComplete: () => {
                            gameObject.destroy(); // Remove the image from the scene after animation
                            

                        }
                    });
                }

                if (directions.includes("right") && Math.abs(this.posx - gameObject.x) > 50) {
                    this.scene.tweens.add({
                        targets: gameObject,
                        alpha: 0, // Fade out the image
                        duration: 500, // Animation duration in milliseconds
                        onComplete: () => {
                            gameObject.destroy(); // Remove the image from the scene after animation
                          

                        }
                    });
                }

                if (directions.includes("up") && Math.abs(this.posy - gameObject.y) > 50) {
                    this.scene.tweens.add({
                        targets: gameObject,
                        alpha: 0, // Fade out the image
                        duration: 500, // Animation duration in milliseconds
                        onComplete: () => {
                            gameObject.destroy(); // Remove the image from the scene after animation
                         

                        }
                    });
                }

                if (directions.includes("down") && Math.abs(this.posy - gameObject.y) > 50) {
                    this.scene.tweens.add({
                        targets: gameObject,
                        alpha: 0, // Fade out the image
                        duration: 500, // Animation duration in milliseconds
                        onComplete: () => {
                            gameObject.destroy(); // Remove the image from the scene after animation
                   
                        }
                    });
                }
            }
        });

        this.scene.add.existing(this);
    }
}

export default tileSprite;

