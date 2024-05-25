import { Scene } from 'phaser';
import game from '../main.js';

const gameOptions = {
    TileSize: 288,   //288
    tileSpacing: 15,  //20
    boardSize: { rows: 5, cols: 5 },
    tweenSpeed: 50,
    aspectRatio: 16 / 9,
    padding: 100
};

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background1').setScale(1.3);

        this.anims.create({
            key: 'loading',
            frames: this.anims.generateFrameNumbers('rockets', { start: 0, end: 4 }),
            frameRate: 10, // Frames per second
            repeat: -1 // Loop infinitely
        });

        // Create a sprite and play the animation
        let sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'rockets');
        sprite.setScale(0.15);
        sprite.play('loading');

        let gameWidth = this.cameras.main.width;
        let gameHeight = this.cameras.main.height;
        let offsetY = gameHeight * 0.25; // Adjust this value to move elements lower

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(gameWidth / 2 - 150, gameHeight / 2 + offsetY, 300, 40);

        var loadingText = this.make.text({
            x: gameWidth / 2,
            y: gameHeight / 2 - 25 + offsetY,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#e9f1f7'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: gameWidth / 2,
            y: gameHeight / 2 + 20 + offsetY,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#e9f1f7'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // Store the initial y position of the sprite
        let initialSpriteY = sprite.y;

        this.load.on('progress', function (value) {
            // Calculate the new y position based on the progress value
            sprite.y = initialSpriteY - (initialSpriteY * value * 1.2);

            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xe9f1f7, 1);
            progressBar.fillRect(gameWidth / 2 - 150, gameHeight / 2 + offsetY, 300 * value, 40);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
        this.load.image("tile1", `./Tiles/5.png`);
        this.load.image("tile2", `./Tiles/10.png`);
        this.load.image("tile3", `./Tiles/4.png`);
        this.load.image("tile4", `./Tiles/2.png`);
        this.load.image("tile5", `./Tiles/2.png`);
        this.load.image("tile6", `./Tiles/3.png`);


        // TitlePage Assets
        this.load.image('titlePageGameName', 'Unpuzzle_TitlePage_GameName.png');
        this.load.image('titlePageBG', 'Unpuzzle_TitlePage_Background.png');
        this.load.image('titlePageStartGame', 'Unpuzzle_TitlePage_StartGameBtn.png');

        // Game Level Assets
        this.load.image('gameLevel_greentile', 'Unpuzzle_GameLevels_greentile.png');
        this.load.image('gameLevel_redtile', 'Unpuzzle_GameLevels_redtile.png');

        // Outlined Scene Assets
        this.load.image("back", 'Unpuzzle_Back.png');
        this.load.image("back2", 'Unpuzzle_Back2.png');
        this.load.image("forword", 'Unpuzzle_Forword.png');
        this.load.image("backword", 'Unpuzzle_Backword.png');
        this.load.image("grid", 'Unpuzzle_Grid2.png');
        this.load.image("gridLevels", 'Unpuzzle_Grid3.png');
        this.load.image("expand", 'Unpuzzle_Expand.png');
        this.load.image("lightBtn", 'Unpuzzle_lightBtn.png');
        this.load.image("darkBtn", 'Unpuzzle_DarkBtn.png');
        this.load.image("sound", 'Unpuzzle_Sound.png');
        this.load.image("nosound", 'Unpuzzle_NoSound.png');


        // Game over Page Assets
        this.load.image('gameOver_nextlevel', 'Unpuzzle_GameOver_nextlevels.png');
        this.load.image('gameOver_YouWin', 'Unpuzzle_GameOver_YouWin.png');


        for(let i = 0; i<100; i++){
            this.load.image(`${i}`, `./Tiles/${i}.png`);
        }

    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        
        this.scene.start('TitlePage');
    }
}

export default Preloader;