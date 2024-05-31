import { Scene } from 'phaser';
import outlinedScene from './outlinedScene.js';
import game from '../main.js';
import Game from './Game.js';

let gamelevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let unlockedLevels = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];


let backButton;
let levelImage;
let gameLevel;

export class gameLevels extends Scene {
    constructor() {
        super('gameLevels');
    }

    create() {
        // this.add.image(game.config.width / 2, game.config.height / 2, 'titlePageBG').setScale(1.2).setAlpha(0.3);

        // Define the grid size and dimensions
        const gridSize = 4;
        const cellSize = 100;
        const margin = 20; // Define margin size
        
        // Define colors for the shapes
        const greenColor = 0x00ff00; // Green
        const redColor = 0xff0000; // Red

        let self = this;

        backButton = this.add.image(70, 100, 'back').setDisplaySize(65, 65).setAlpha(1.2);
        backButton.setInteractive();

        backButton.on('pointerdown', () => {
            try {
                this.scene.get('GameTemplate').changeScene('gameLevels', 'TitlePage');  
            } catch (error) {
                console.log(error);
            }
        }, this);

        let k = 0;
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = col * (cellSize + margin) + cellSize / 2 + margin;
                const y = row * (cellSize + margin) + cellSize / 2 + margin + 150;

                let circleColor;
                if (unlockedLevels[k] == 1) {
                    circleColor = greenColor;
                    // Add the circle
                    levelImage = this.add.image(x, y, 'gameLevel_greentile').setInteractive().setDisplaySize(100, 100);
                    levelImage.name = `Level${k + 1}`;
                } else {
                    circleColor = redColor;
                    // Add the circle
                    levelImage = this.add.image(x, y, 'gameLevel_redtile').setDisplaySize(100, 100);
                    levelImage.name = `Level${k + 1}`;
                }

                // Add the number on the circle
                this.add.text(x, y, (k + 1).toString(), {
                    fontSize: '32px',
                    color: '#000',
                    align: 'center'
                }).setOrigin(0.5);

                k += 1;
            }
        }

        try {
            this.input.on('gameobjectdown', (pointer, gameObject) => {
                const levelName = gameObject.name;
                const levelData = GamelevelsData.levels.find(level => level.levelName === levelName);
                const levelDataCopy = JSON.parse(JSON.stringify(levelData));
    
                if (levelDataCopy) {
                    // this.scene.start("Game", levelDataCopy);
                    this.playSelectLevelSound();
                    this.scene.get('GameTemplate').changeScene('gameLevels', 'Game', levelDataCopy);
                }
            });
        } catch (error) {
            console.log("Some Error: ");
            console.log(error);
        }
    }

    playSelectLevelSound() {
        // Play the sound
        let sound = this.sound.add('selectLevel');
        sound.play({ volume: 0.19 });

        // Stop the sound after 1 second
        this.time.delayedCall(300, () => {
            sound.stop();
        });
    }

    restartLevel(gameName){
        try {

            const levelName = gameName;
            const levelData = GamelevelsData.levels.find(level => level.levelName === levelName);
            const levelDataCopy = JSON.parse(JSON.stringify(levelData));

            if (levelDataCopy) {
                // this.scene.start("Game", levelDataCopy);
                this.scene.get('GameTemplate').changeScene('Game', 'Game', levelDataCopy);
            }else{
                this.scene.get('GameTemplate').changeScene('Game', 'GameOver');
            }
        } catch (error) {
            console.log("Next Level Coming Soon!!!!");
            // console.log(error);
            this.scene.get('GameTemplate').changeScene('Game', 'GameOver');
        }

    }

    nextLevel(gameName) {
        
        try {
            const input = gameName;
            let strName = "";
            let number = "";
                // Loop through the string to separate letters and numbers
            for (let i = 0; i < input.length; i++) {
                if (isNaN(input[i])) {
                    strName += input[i];
                } else {
                    number += input[i];
                }
            }
            number = parseInt(number, 10); 
            number = number + 1;

            const levelName = strName + number;
            const levelData = GamelevelsData.levels.find(level => level.levelName === levelName);
            const levelDataCopy = JSON.parse(JSON.stringify(levelData));

            if (levelDataCopy) {
                // this.scene.start("Game", levelDataCopy);
                this.scene.get('GameTemplate').changeScene('Game', 'Game', levelDataCopy);
            }else{
                this.scene.get('GameTemplate').changeScene('Game', 'GameOver');
            }
        } catch (error) {
            console.log("Next Level Coming Soon!!!!");
            // console.log(error);
            this.scene.get('GameTemplate').changeScene('Game', 'GameOver');
        }

    }
}

const GamelevelsData = {
    "levels": [
        {
            "levelName": "Level1",
            "levelNumber": 1,
            "gameVisibility": [[1, 1], [null, 1]],
            "ImageNames": ['tile3', 'tile1', 'tile2'],
            "GameDirections": [['left'], [], [ 'down']],
            "GameConnections": [['tile1'], ['tile3', 'tile2'], ['tile1']],
            "gridColsValue": 2,
            "gridRowsValue": 2,
            "imageSize": 100,
            "gridAdjustValueX": 200,
            "gridAdjustValueY": 200,
            "maxScore": 50,
            "maxTime": 5,
        },
        {
            "levelName": "Level2",
            "levelNumber": 2,
            "gameVisibility": [[null, 1, null, null],[ 1, 1, 1, 1], [null, null, 1, null], [null, null, null, null]],
            "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
            "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
            "GameConnections": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
            "gridColsValue": 4,
            "gridRowsValue": 4,
            "imageSize": 100,
            "gridAdjustValueX": 100,
            "gridAdjustValueY": 200,
            "maxScore": 75,
            "maxTime": 10,
        },
        {
            "levelName": "Level3",
            "levelNumber": 3,
            "gameVisibility": [[1, null, 1, null],[null, 1, null, 1],[1, 1, 1, null],[null, 1, null, 1]],
            "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
            "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
            "GameConnections": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
            "gridColsValue": 4,
            "gridRowsValue": 4,
            "imageSize": 100,
            "gridAdjustValueX": 100,
            "gridAdjustValueY": 200,
            "maxScore": 100,
            "maxTime": 13,

        },
        {
            "levelName": "Level4",
            "levelNumber": 4,
            "gameVisibility": [[1, 1, null, 1, 1],[1, null, 1, 1, null],[null, null, 1, null, null]],
            "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
            "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
            "GameConnections": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
            "gridColsValue": 3,
            "gridRowsValue": 5,
            "imageSize": 90,
            "gridAdjustValueX": 80,
            "gridAdjustValueY": 200,
            "maxScore": 125,
            "maxTime": 15,

        },
        {
            "levelName": "Level5",
            "levelNumber": 5,
            "gameVisibility": [[1,1,1,1], [1,null,1,null], [null, 1, null, 1],[1,1,null, 1]],
            "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
            "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
            "GameConnections": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
            "gridColsValue": 4,
            "gridRowsValue": 4,
            "imageSize": 100,
            "gridAdjustValueX": 100,
            "gridAdjustValueY": 200,
            "maxScore": 150,
            "maxTime": 17,

        },
        {
            "levelName": "Level6",
            "levelNumber": 6,
            "gameVisibility": [[1,1,null,1], [1,null,1, null], [null,1,1,1],[1,1,null,1], [null, 1, 1, null]],
            "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
            "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
            "GameConnections": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
            "gridColsValue": 4,
            "gridRowsValue": 5,
            "imageSize": 100,
            "gridAdjustValueX": 100,
            "gridAdjustValueY": 200,
            "maxScore": 175,
            "maxTime": 20,
        },
        {
            "levelName": "Level7",
            "levelNumber": 7,
            "gameVisibility": [[1,1,null,1, null], [1,null,1, null, 1], [null,1,null,1, 1], [1,1,null, null,1], [null,1, 1, 1, null]],
            "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
            "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
            "GameConnections": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
            "gridColsValue": 5,
            "gridRowsValue": 5,
            "imageSize": 90,
            "gridAdjustValueX": 80,
            "gridAdjustValueY": 200,
            "maxScore": 200,
            "maxTime": 23,
        },
        {
            "levelName": "Level8",
            "levelNumber": 8,
            "gameVisibility": [[1,1,1,1,1, null], [1,null,1, null, 1], [null,1,1,1,null], [1,null, 1, null,1], [null,1,1,1,null], [1,null, 1, null,1]],
            "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
            "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
            "GameConnections": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
            "gridColsValue": 5,
            "gridRowsValue": 6,
            "imageSize": 80,
            "gridAdjustValueX": 80,
            "gridAdjustValueY": 200,
            "maxScore": 225,
            "maxTime": 27,
        },
    ]
};

export default gameLevels;
