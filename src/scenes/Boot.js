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
        this.load.image('background', 'assets/bg.png');
        this.load.image('background1', 'assets/bg1.jpg');
        this.load.spritesheet('rockets', 'assets/rocketSpritesheet.png', {
            frameWidth: 1080,
            frameHeight: 1080
        });
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}


export default Boot;