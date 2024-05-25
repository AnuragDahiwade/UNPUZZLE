
import { Scene } from 'phaser';
import game from '../main.js';


export class TitlePage extends Scene
{
    constructor ()
    {
        super('TitlePage');
    }

    create ()
    {
        this.titleBG = this.add.image(game.config.width / 2, game.config.height / 2, 'titlePageBG').setScale(1.3);
        this.gameTitle = this.add.image(game.config.width / 2, game.config.height / 2 - 100, 'titlePageGameName');

        let startGamebtn = this.add.image(game.config.width / 2, game.config.height / 2 + 150, 'titlePageStartGame');
        startGamebtn.setInteractive();
        startGamebtn.on('pointerdown', () => {
            this.scene.stop('TitlePage');
            this.scene.start('gameLevels');

        }, this);


    }


}


export default TitlePage;