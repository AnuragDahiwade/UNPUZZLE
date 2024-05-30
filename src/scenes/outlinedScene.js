import Game from './Game.js';
import gameLevels from './gameLevels.js';


let currentTexture = 'lightBtn';
let lightOrDark;
let currentSoundState = "sound";
let SoundOrNoSound;
let backBtn;


class outlinedScene extends Phaser.Scene {
    constructor() {
        super({ key: 'outlinedScene' });
    }

    preload() {
        
    }

    create() {
        // Get the width and height of the game
        let gameWidth = this.cameras.main.width;
        let gameHeight = this.cameras.main.height;

        // Create a graphics object for drawing
        let graphics = this.add.graphics();
        // Define the height of the strips
        let stripHeight = 100;
        // Set the fill color and alpha for the strips
        graphics.fillStyle(0xffffff, 1);
        // Draw the top strip
        graphics.fillRect(0, 0, gameWidth, stripHeight);
        // Draw the bottom strip
        graphics.fillRect(0, gameHeight - stripHeight, gameWidth, stripHeight);



        backBtn = this.add.image(100, 50, 'back').setDisplaySize(65, 65).setInteractive().setAlpha(1.2);
        backBtn.on('pointerdown', this.setGridValFalseAndDestroyOutline, this);

        // currentTexture = 'darkBtn';
        // lightOrDark = this.add.image(gameWidth - 70, 50, currentTexture).setDisplaySize(130, 65).setAlpha(1.2);
        // lightOrDark.setInteractive();
        // lightOrDark.on('pointerdown', this.toggleBetweeenLightAndDarkBtn, this);


        currentSoundState = 'sound';
        SoundOrNoSound = this.add.image(gameWidth - 70, 50, currentSoundState).setDisplaySize(70, 70).setAlpha(1.2);
        SoundOrNoSound.setInteractive();
        SoundOrNoSound.on('pointerdown', this.toggleBetweeenSoundAndNoSoundBtn, this);


        let gridLevelBtn = this.add.image( 100, gameHeight - 50, 'gridLevels').setDisplaySize(85, 85);
        gridLevelBtn.setInteractive();
        
        gridLevelBtn.on('pointerdown', ()=>{
            this.scene.stop("Game");
            // this.scene.stop('outlinedScene');
            // this.scene.start('gameLevels');

            this.scene.get('GameTemplate').changeScene('outlinedScene','gameLevels');

        }, this);

        let levelText = this.add.text(gameWidth / 2 - 50, gameHeight - 70, "Level 0" , {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });

        let forwordBtn = this.add.image(gameWidth - 100, gameHeight - 50, 'forword').setDisplaySize(75, 75).setInteractive().setAlpha(1);
    }

    toggleBetweeenLightAndDarkBtn() {
        currentTexture = (currentTexture === 'lightBtn') ? 'darkBtn' : 'lightBtn';
        lightOrDark.setTexture(currentTexture);
    }

    toggleBetweeenSoundAndNoSoundBtn() {
        currentSoundState = (currentSoundState === 'sound') ? 'nosound' : 'sound';
        SoundOrNoSound.setTexture(currentSoundState);
    }

    setGridValFalseAndDestroyOutline() {
        // Restore Game Scene
        this.scene.get('Game').restoreGameScene();
        this.scene.stop("outlinedScene");
    }

    update() {
        
    }
}

export default outlinedScene;