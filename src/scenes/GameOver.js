import { Scene } from 'phaser';
import game from '../main.js';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        // Get the width and height of the game
        let gameWidth = this.cameras.main.width;
        let gameHeight = this.cameras.main.height;

        // this.add.image(game.config.width / 2, game.config.height / 2, 'titlePageBG').setScale(1.2);


        this.add.image(game.config.width / 2, game.config.height / 2 - 100, 'gameOver_YouWin').setScale(0.8);
        
        let backtolevels = this.add.image(game.config.width / 2, game.config.height / 2 + 100, 'gameOver_nextlevel').setScale(0.8);
        backtolevels.setInteractive();

        backtolevels.on('pointerdown', () => {
            this.scene.stop('Game');
            this.scene.start("gameLevels");
        }, this);
    }
}


export default GameOver;