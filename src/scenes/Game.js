import { Scene, GameObjects, Tweens } from 'phaser';
import outlinedScene from './outlinedScene.js';
import game from '../main.js';

let ImageTileArray = [];

let ImageSize = 100;
let gridAdjustValueX = 100;
let gridAdjustValueY = 100;

let levelName;
let ImageNames;
let GameVisibility;
let GameDirections;
let GameNeighbours;

let gridCols;
let gridRows;

let gridBtnValue = true;
let gridBtn;


export class Game extends Scene {
    constructor() {
        super('Game');
    }

    init(data){
        levelName = data.levelName;
        GameVisibility = data.gameVisibility;
        ImageNames = data.ImageNames;
        GameDirections = data.GameDirections;
        GameNeighbours = data.GameNeighbours;
        gridCols = data.gridColsValue;
        gridRows = data.gridRowsValue;
        ImageSize = data.imageSize;
        gridAdjustValueX = data.gridAdjustValueX;
        gridAdjustValueY = data.gridAdjustValueY;

    }

    create() {

        ImageTileArray = [];

        // Get the width and height of the game
        let gameWidth = this.cameras.main.width;
        let gameHeight = this.cameras.main.height;

        this.add.image(game.config.width / 2, game.config.height / 2, 'titlePageBG').setScale(1.2);

        let k = 0;
        let l = 0;
        for (let i = 0; i < gridCols; i++) {
            for (let j = 0; j < gridCols; j++) {
                if (GameVisibility[k] !== 0) {
                    let tile = new createImageTile(this, j * ImageSize + gridAdjustValueX, i * ImageSize + gridAdjustValueY, ImageNames[l], GameDirections[l], ImageNames[l], GameVisibility[k], GameNeighbours[l]);
                    l += 1;
                    ImageTileArray.push(tile);
                }
                k += 1;
            }
        }

        ImageTileArray.forEach(tile => {
            this.add.existing(tile);
            this.input.setDraggable(tile);
        });

        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setAlpha(0.5);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.setAlpha(1);
            let deltaX = gameObject.x - gameObject.originalX;
            let deltaY = gameObject.y - gameObject.originalY;

            if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
                let direction = getDirection(deltaX, deltaY);
                if (canMove(gameObject, direction)) {
                    let offscreenX = gameObject.originalX;
                    let offscreenY = gameObject.originalY;

                    if (direction === 'left') {
                        offscreenX -= this.cameras.main.width;
                    } else if (direction === 'right') {
                        offscreenX += this.cameras.main.width;
                    } else if (direction === 'up') {
                        offscreenY -= this.cameras.main.height;
                    } else if (direction === 'down') {
                        offscreenY += this.cameras.main.height;
                    }

                    this.tweens.add({
                        targets: gameObject,
                        x: offscreenX,
                        y: offscreenY,
                        duration: 500,
                        onComplete: () => {
                            ImageTileArray = ImageTileArray.filter(tile => tile !== gameObject);
                            gameObject.destroy();
                        }
                    });
                } else {
                    gameObject.x = gameObject.originalX;
                    gameObject.y = gameObject.originalY;
                }
            } else {
                gameObject.x = gameObject.originalX;
                gameObject.y = gameObject.originalY;
            }
        });

        // *******************************************************************************************************************************************
        // *******************************************************************************************************************************************
        // *******************************************************************************************************************************************
        
        this.createGridBtn();

    }

    createGridBtn() {
        gridBtn = this.add.image(100, 50, "grid").setDisplaySize(70, 70).setAlpha(1.2);
        gridBtn.setInteractive();
        gridBtn.on('pointerdown', this.displayOutLinedScene, this);
    }

    displayOutLinedScene() {
        if(this.gridBtn){
            this.gridBtn.destroy();
            this.gridBtn = null;
        }
        // Launch the overlay scene
        this.scene.launch('outlinedScene');

        // Disable interactivity in the main scene
        this.input.enabled = false;

        // Scale down the main scene
        this.cameras.main.setZoom(0.83);
        
        gridBtn.setAlpha(0);
    }

    restoreGameScene() {
        this.createGridBtn();

        // Enable interactivity in the main scene
        this.input.enabled = true;

        // Restore the main scene's scale
        this.cameras.main.setZoom(1.0);
    }

    update() {
        if (ImageTileArray.length <= 0) {
            this.scene.start("GameOver");
        }
        
    }
}

class createImageTile extends GameObjects.Image {
    constructor(scene, x, y, texture, direction, name, visible, neighbours) {
        super(scene, x, y, texture);

        this.name = name;
        this.direction = direction;
        this.setInteractive();
        this.setDisplaySize(100, 100);
        this.scene = scene;
        this.setAlpha(1);
        this.originalX = x;
        this.originalY = y;

        this.visible = visible;
        this.neighbours = neighbours;
    }
}

function getDirection(deltaX, deltaY) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? 'right' : 'left';
    } else {
        return deltaY > 0 ? 'down' : 'up';
    }
}

function canMove(tile, direction) {
    if (!tile.direction.includes(direction)) {
        return false;
    }

    let newX = tile.originalX + (direction === 'left' ? -ImageSize : direction === 'right' ? ImageSize : 0);
    let newY = tile.originalY + (direction === 'up' ? -ImageSize : direction === 'down' ? ImageSize : 0);

    for (let i = 0; i < ImageTileArray.length; i++) {
        if (ImageTileArray[i] !== tile && ImageTileArray[i].x === newX && ImageTileArray[i].y === newY) {
            return false;
        }
    }

    // Check for up, down, left, and right neighbors only
    let neighborCount = 0;
    ImageTileArray.forEach(otherTile => {
        if (otherTile !== tile) {
            if ((otherTile.x === tile.originalX && Math.abs(otherTile.y - tile.originalY) === ImageSize) ||
                (otherTile.y === tile.originalY && Math.abs(otherTile.x - tile.originalX) === ImageSize)) {
                neighborCount++;
            }
        }
    });

    if (neighborCount > 1) {
        return false;
    }

    return true;
}

export default Game;
