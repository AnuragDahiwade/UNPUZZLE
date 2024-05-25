

import { Scene } from 'phaser';
import outlinedScene from './outlinedScene.js';
import game from '../main.js';
import Game from './Game.js';

let gamelevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let unlockedLevels = [1, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let backButton;
let levelImage;
let gameLevel;

export class gameLevels extends Scene
{
    constructor ()
    {
        super('gameLevels');
    }

    create ()
    {
        this.add.image(game.config.width / 2, game.config.height / 2, 'titlePageBG').setScale(1.2);

        // Define the grid size and dimensions
        const gridSize = 4;
        const cellSize = 100;
        const margin = 20; // Define margin size

        // Define colors for the shapes
        const greenColor = 0x00ff00; // Green
        const redColor = 0xff0000; // Red

        let self = this;

        backButton = this.add.image(70, 50, 'back').setDisplaySize(65, 65).setAlpha(1.2);
        backButton.setInteractive();

        backButton.on('pointerdown', () => {
            // this.scene.stop("gameLevels");
            this.scene.stop("gameLevels");
            this.scene.launch('TitlePage');

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
                    levelImage.name = `Level${k+1}`;
                } else {
                    circleColor = redColor;
                    // Add the circle
                    levelImage = this.add.image(x, y, 'gameLevel_redtile').setDisplaySize(100, 100);
                    levelImage.name = `Level${k+1}`;
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

        this.input.on('pointerdown', (pointer, gameObject) => {
            // console.log(gameObject[0].name);
            const levelName = gameObject[0].name;
            const levelData = GamelevelsData.levels.find(level => level.levelName === levelName);
            this.scene.start("Game", levelData);
        });

        // this.scene.launch('outlinedScene');

    }
}


const GamelevelsData = {
    "levels": [
      {
        "levelName": "Level1",
        "gameVisibility": [1, 1, 0, 1],
        "ImageNames": ['tile3', 'tile1', 'tile2'],
        "GameDirections": [['left'], ['up'],['up', 'down', 'left', 'right']],
        "GameNeighbours": [['tile1'], ['tile3', 'tile2'], ['tile1']],
        "gridColsValue": 2,
        "gridRowsValue": 2,
        "imageSize": 100,
        "gridAdjustValueX": 200,
        "gridAdjustValueY": 200,
      },
      {
        "levelName": "Level2",
        "gameVisibility": [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
        "ImageNames": ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'],
        "GameDirections": [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']],
        "GameNeighbours": [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']],
        "gridColsValue": 4,
        "gridRowsValue": 4,
        "imageSize": 100,
        "gridAdjustValueX": 100,
        "gridAdjustValueY": 200,
      }
    ]
};
  


export default gameLevels;