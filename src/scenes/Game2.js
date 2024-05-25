import { Scene, GameObjects, Tweens } from 'phaser';

let ImageTileArray = [];

let ImageSize = 100;
let TileAdjustValue = 100;

let ImageNames = ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'];
let TextureNames = ['tile1', 'tile3', 'tile2', 'tile4', 'tile5', 'tile6'];
let GameVisibility = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0];
let GameDirections = [['up'], ['left'], ['up', 'down', 'right', 'left'], ['right'], ['right'], ['down']];
let GameNeighbours = [['tile3'], ['tile3'], ['tile1', 'tile2', 'tile4'], ['tile3', 'tile5', 'tile6'], ['tile4'], ['tile4']];

let gridWidth = 4;

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background').setAlpha(0.4);

        let k = 0;
        let l = 0;
        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridWidth; j++) {
                if (GameVisibility[k] !== 0) {
                    let tile = new createImageTile(this, j * ImageSize + TileAdjustValue, i * ImageSize + TileAdjustValue, TextureNames[l], GameDirections[l], ImageNames[l], GameVisibility[k], GameNeighbours[l]);
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
            // console.log(gameObject);
            gameObject.setAlpha(1);
            let deltaX = gameObject.x - gameObject.originalX;
            let deltaY = gameObject.y - gameObject.originalY;

            if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
                let direction = getDirection(deltaX, deltaY);
                if (canMove(gameObject, direction)) {
                    this.tweens.add({
                        targets: gameObject,
                        alpha: 0,
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
    }

    update() {
        if(ImageTileArray.length <= 0){
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
