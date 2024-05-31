
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
        
        let exitButton = this.add.image(50, game.config.height - 130, 'exitButton').setScale(0.06);
        exitButton.setInteractive();
        exitButton.setDepth(1); 

        this.input.setDraggable(exitButton);

        exitButton.on('drag', (pointer, dragX, dragY) => {
            exitButton.x = 50; // Keeps the button attached to the left side
            exitButton.y = Phaser.Math.Clamp(dragY, 35, game.config.height - 35);
        });

        exitButton.on('pointerup', () => {
            game.destroy(true); 
        }, this);

        this.loadScene('TitlePage');

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
        // this.playnextSceneSound();
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

    playnextSceneSound() {
        // Play the sound
        let sound = this.sound.add('next_scene');
        sound.play({ volume: 0.43 });

        // Stop the sound after 1 second
        this.time.delayedCall(300, () => {
            sound.stop();
        });
    }

}


export default GameTemplate;