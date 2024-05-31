import { Scene } from 'phaser';
import game from '../main.js';

import TitlePage from './TitlePage.js';


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
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background').setScale(1.1);

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


        // Game sounds
        this.load.audio('destroySound', 'destoyImg.wav');
        this.load.audio('wrongMove', 'Unpuzzle_wrongMove.wav');
        this.load.audio('next_scene', 'game_scene_reevil.wav');
        this.load.audio('selectLevel', 'select.mp3');


        // Template Page Assets
        this.load.image("cross", 'Unpuzzle_Template_cross.png');
        this.load.image("imageShadow", 'unpuzzle_shadow_for_image.png');
        this.load.image("exitButton", "exitButton.png");

        // All GameImages
        this.load.image('all_empty', './Tiles_new_1/all_empty.png')
        this.load.image('all_four', './Tiles_new_1/all_four.png')
        this.load.image('one_down', './Tiles_new_1/one_down.png')
        this.load.image('one_left', './Tiles_new_1/one_left.png')
        this.load.image('one_right', './Tiles_new_1/one_right.png')
        this.load.image('one_up', './Tiles_new_1/one_up.png')
        this.load.image('three_down_rem', './Tiles_new_1/three_down_rem.png')
        this.load.image('three_left_rem', './Tiles_new_1/three_left_rem.png')
        this.load.image('three_right_rem', './Tiles_new_1/three_right_rem.png')
        this.load.image('three_up_rem', './Tiles_new_1/three_up_rem.png')
        this.load.image('two_left_down', './Tiles_new_1/two_left_down.png')
        this.load.image('two_left_right', './Tiles_new_1/two_left_right.png')
        this.load.image('two_left_up', './Tiles_new_1/two_left_up.png')
        this.load.image('two_right_down', './Tiles_new_1/two_right_down.png')
        this.load.image('two_up_down', './Tiles_new_1/two_up_down.png')
        this.load.image('two_up_right', './Tiles_new_1/two_up_right.png')
        this.load.image("border_after_destroyed_img", 'unpuzzle_border_after_destroyed_img.png');

        
        // TitlePage Assets
        this.load.image('titlePageGameName', 'Unpuzzle_TitlePage_GameName.png');
        this.load.image('titlePageBG', 'Unpuzzle_TitlePage_Background.png');
        this.load.image('titlePageStartGame', 'Unpuzzle_TitlePage_StartGameBtn.png');

        // Level Assets
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

        // Main Game Assets -- 
        this.load.image("gameTimerBG", 'Unpuzzle_GameTimer.png');
        

        // gameScore pop-up Page Assets
        this.load.image("ScorePopUp_bgImg", 'Unpuzzle_ScorePopUp_bgImg.png');
        this.load.image("ScorePopUp_bgImgShadow", 'Unpuzzle_ScorePopUp_bgImgShadow.png');
        this.load.image("ScorePopUp_gameName", 'Unpuzzle_ScorePopUp_GameName.png');
        this.load.image("ScorePopUp_level", 'Unpuzzle_ScorePopUp_level.png');
        this.load.image("ScorePopUp_nextBtn", 'Unpuzzle_ScorePopUp_nextButton.png');
        this.load.image("ScorePopUp_restartBtn", 'Unpuzzle_ScorePopUp_restartButton.png');
        this.load.image("ScorePopUp_scoreLebal", 'Unpuzzle_ScorePopUp_ScoreLebal.png');


        // Game over Page Assets
        this.load.image('gameOver_nextlevel', 'Unpuzzle_GameOver_nextlevels.png');
        this.load.image('gameOver_YouWin', 'Unpuzzle_GameOver_YouWin.png');
        this.load.image('won', 'won.png');
        this.load.image('nextLevel', 'nextLevel.png');
        this.load.image('restartLevel', 'restartLevel.png');


    }

    create ()
    {
        this.scene.start('GameTemplate');
        
        // this.scene.get('GameTemplate').changeScene('Preloader', 'TitlePage');

    }
}

export default Preloader;