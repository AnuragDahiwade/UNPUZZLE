
import { Scene } from 'phaser';
import game from '../main.js';

import TitlePage from './TitlePage.js';
import gameLevels from './gameLevels.js';

export class GameTemplate extends Scene
{
    constructor ()
    {
        super('GameTemplate');
    }

    create ()
    {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background2').setAlpha(1.5).setScale(0.6);

        let crossBtn = this.add.image(game.config.width / 2, 40, 'cross').setScale(0.2);
        crossBtn.setInteractive();
        crossBtn.setDepth(1); 

        crossBtn.on('pointerdown', () => {
            game.destroy(true); 
        }, this);


        this.loadScene('TitlePage');
    }

    // Method to load a new scene and keep the template scene on top
    loadScene(sceneKey) {
        this.scene.launch(sceneKey);
       
    }

    loadScene(sceneKey, newSceneData) {
        this.scene.launch(sceneKey, newSceneData);

    }

    // Method to change scenes while keeping the template scene on top
    changeScene(currentSceneKey, newSceneKey) {
        if (this.scene.isActive(currentSceneKey)) {
            this.scene.stop(currentSceneKey);
            this.loadScene(newSceneKey);
        }
    }

    changeScene(currentSceneKey, newSceneKey, newSceneData) {
        if (this.scene.isActive(currentSceneKey)) {
            this.scene.stop(currentSceneKey);
            this.loadScene(newSceneKey, newSceneData);
        }
    }

}


export default GameTemplate;