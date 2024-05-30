
import { Scene } from 'phaser';
import game from '../main.js';

import TitlePage from './TitlePage.js';
import gameLevels from './gameLevels.js';



let gameColors = ["0x77d0c8", "0xb094d5", "0x6584ab", "0xed9eb5", "0x76d1c7", "0x2493f1", "0xbd8790", "0xd2b489", "0xd70f9f"];


export class GameTemplate extends Scene
{
    constructor ()
    {
        super('GameTemplate');
    }

    create ()
    {
        
        let crossBtn = this.add.image(game.config.width / 2, 40, 'cross').setScale(0.2);
        crossBtn.setInteractive();
        crossBtn.setDepth(1); 

        crossBtn.on('pointerdown', () => {
            game.destroy(true); 
        }, this);


        this.loadScene('TitlePage');

        // this.loadScene('_animationExperiment');
    }

    // Method to load a new scene and keep the template scene on top
    loadScene(sceneKey) {
        // this.scene.launch(sceneKey);
        
        this.cameras.main.fadeOut(170, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
                // Fade in effect
                this.cameras.main.fadeIn(400, 0, 0, 0);
                this.scene.launch(sceneKey);
            }
        });
    }

    loadScene(sceneKey, newSceneData) {
        // this.scene.launch(sceneKey, newSceneData);
        this.cameras.main.fadeOut(170, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
                // Fade in effect
                this.cameras.main.fadeIn(400, 0, 0, 0);
                this.scene.launch(sceneKey, newSceneData);
            }
        });
        let randomColor = gameColors[Math.floor(Math.random() * gameColors.length)];
        this.cameras.main.setBackgroundColor(randomColor);
        console.log(randomColor);

  
    }

    // Method to change scenes while keeping the template scene on top
    changeScene(currentSceneKey, newSceneKey) {
        if (this.scene.isActive(currentSceneKey)) {
            this.scene.stop(currentSceneKey);
            this.loadScene(newSceneKey);
        }
        // Fade in effect
        this.cameras.main.fadeIn(100, 0, 0, 0);
    }

    changeScene(currentSceneKey, newSceneKey, newSceneData) {
        if (this.scene.isActive(currentSceneKey)) {
            this.scene.stop(currentSceneKey);
            this.loadScene(newSceneKey, newSceneData);
        }
        
    }

}


export default GameTemplate;