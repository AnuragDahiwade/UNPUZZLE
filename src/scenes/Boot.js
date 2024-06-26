import { Scene } from 'phaser';
import game from '../main.js';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }
   
    preload ()
    {
        this.load.image('background', 'assets/unpuzzle_bg1.jpg');
        this.load.spritesheet('rockets', 'assets/unpuzzle_rocketSpritesheet.png', {
            frameWidth: 1080,
            frameHeight: 1080
        });
    }

    create ()
    {
        this.scene.start('Preloader');
        // this.scene.get('GameTemplate').changeScene('Boot', 'Preloader');

    }
}


export default Boot;