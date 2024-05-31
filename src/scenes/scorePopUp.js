

import Game from './Game.js';
import gameLevels from './gameLevels.js';
import game from '../main.js';

let gameWidth;
let gameHeight;
let popupContainer;
let hasPoped = false;

let backBtn;
let newPopUp = false;

let bgImage;
let bgImageShadow;
let gameName;
let levelName;
let nextBtn;
let restartBtn;
let scoreLebal;
let scoreText;
let levelNumberText;

let maxScore;
let myScore;
let levelNumber;

class scorePopUp extends Phaser.Scene {
    constructor() {
        super({ key: 'scorePopUp' });
    }

    init(data) {
        // Retrieve data passed from SceneA
        levelNumber = data.gameLevelNumber;
        maxScore = data.maxScore;
        myScore = data.myScore;
        newPopUp = data.newPopUp;
    }

    create() {
        // Get the width and height of the game
        gameWidth = this.cameras.main.width;
        gameHeight = this.cameras.main.height;

        // Create a container for the score scene elements
        popupContainer = this.add.container(0, 0);

        bgImageShadow = this.add.image(gameWidth / 2 + 10, gameHeight / 2 + 10, 'ScorePopUp_bgImgShadow').setScale(1).setAlpha(0.5);
        bgImage = this.add.image(gameWidth / 2, gameHeight / 2, 'ScorePopUp_bgImg').setScale(1);
        
        
        levelName = this.add.image(gameWidth / 2 - 20, gameHeight / 2 - 210, 'ScorePopUp_level').setScale(0.43);
        
        gameName = this.add.image(gameWidth / 2 , gameHeight / 2 - 120, 'ScorePopUp_gameName').setScale(0.6);

        scoreLebal = this.add.image(gameWidth / 2 , gameHeight / 2 + 20, 'ScorePopUp_scoreLebal').setScale(0.7);

        restartBtn = this.add.image(gameWidth / 2 - 70, gameHeight / 2 + 180, 'ScorePopUp_restartBtn').setScale(0.3);
        restartBtn.setInteractive().setAlpha(1);
        restartBtn.on('pointerup', this.restartGame, this);


        nextBtn = this.add.image(gameWidth / 2 + 80, gameHeight / 2 + 180, 'ScorePopUp_nextBtn').setScale(0.29);
        nextBtn.setInteractive().setAlpha(1);
        nextBtn.on('pointerup', this.nextLevel, this);

        levelNumberText = this.add.text(gameWidth / 2 + 53, gameHeight / 2 - 240, levelNumber, {fontFamily: "Suez One",
        fontWeight: 400,fontSize: '50px', fill: '#FFA857' });  

        scoreText = this.add.text(gameWidth / 2 - 80, gameHeight / 2 + 18, myScore + "/" + maxScore, {fontFamily: "Suez One",
        fontWeight: 400,fontSize: '48px', fill: '#FFA857' });  


        popupContainer.add(bgImageShadow);
        popupContainer.add(bgImage);
        popupContainer.add(levelName);
        popupContainer.add(gameName);
        popupContainer.add(scoreLebal);
        popupContainer.add(restartBtn);
        popupContainer.add(nextBtn);
        popupContainer.add(levelNumberText);
        popupContainer.add(scoreText);

        if(newPopUp === true){

            this.tweens.add({
                targets: popupContainer,
                scaleX: 1,
                scaleY: 1,
                alpha: 1,
                scale:  { from: 0.5, to: 1 },
                ease: 'Back.easeOut', // You can change the easing function
                duration: 500,
                onComplete: () => {
                    console.log("container popped...");
                    newPopUp = false;
                }
            });
        }
       

    }

    restartGame() {
        this.scene.get('Game').restartScene();
        this.scene.stop("scorePopUp");
    }

    nextLevel() {
        this.scene.get('Game').nextLevelScene();
        this.scene.stop();
    }

    goToLevelsPage() {
        this.scene.get('Game').destroyThisGameScene();
        this.scene.get('GameTemplate').changeScene('scorePopUp', 'gameLevels');  
        this.scene.stop();
    }

}

export default scorePopUp;