import { Scene, GameObjects, Tweens } from 'phaser';
import outlinedScene from './outlinedScene.js';
import game from '../main.js';

let ImageTileArray;

let ImageSize = 100;
let gridAdjustValueX = 100;
let gridAdjustValueY = 100;

let completeData;
let levelName;
let ImageNames;
let GameVisibility;
let GameDirections;
let GameConnections;

let gridCols;
let gridRows;

let gridBtnValue = true;
let gridBtn;


export class Game extends Scene {
    constructor() {
        super('Game');
    }

    init(data){
        completeData = data;
        levelName = data.levelName;
        GameVisibility = data.gameVisibility;
        ImageNames = data.ImageNames;
        GameDirections = data.GameDirections;
        GameConnections = data.GameConnections;
        gridCols = data.gridColsValue;
        gridRows = data.gridRowsValue;
        ImageSize = data.imageSize;
        gridAdjustValueX = data.gridAdjustValueX;
        gridAdjustValueY = data.gridAdjustValueY;

    }

    create() {
        console.log(completeData);

        // Get the width and height of the game
        let gameWidth = this.cameras.main.width;
        let gameHeight = this.cameras.main.height;

        const allowedDirectionsArray = getAllAllowedDirections(GameVisibility);
        // console.log(GameVisibility);
        GameDirections = allowedDirectionsArray;

        this.add.image(game.config.width / 2, game.config.height / 2, 'titlePageBG').setScale(1.2);

        ImageTileArray = [];
        let l = 0;
        for (let i = 0; i < GameVisibility.length; i++) {
            for (let j = 0; j < GameVisibility[i].length; j++) {
                if (GameVisibility[i][j] === 1) {
                    let tile = new createImageTile(
                        this,
                        j * ImageSize + gridAdjustValueX,
                        i * ImageSize + gridAdjustValueY,
                        ImageNames[l],
                        GameDirections[i][j],
                        ImageNames[l],
                        GameVisibility[i][j],
                        GameConnections[l],
                        i,
                        j
                    );
                    l += 1;
                    ImageTileArray.push(tile);
                }
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
                            let p = gameObject.i;
                            let q = gameObject.j;
                            GameVisibility[p][q] = null;

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

        this.createGridBtn();

    }

    update() {
        
        const allowedDirectionsArray = getAllAllowedDirections(GameVisibility);
        GameDirections = allowedDirectionsArray;

        let l = 0;
        for (let i = 0; i < GameVisibility.length; i++) {
            for (let j = 0; j < GameVisibility[i].length; j++) {
                if (GameVisibility[i][j] === 1) {
                    ImageTileArray[l].direction = GameDirections[i][j];
                    l += 1;
                }
            }
        }

        if (ImageTileArray.length <= 0) {
            this.scene.start("GameOver");
        }

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


}

// *****************************************************************************************************************************
// *****************************************************************************************************************************
// *****************************************************************************************************************************

function canDrag(imageArray, pos_i, pos_j) {
    const rows = imageArray.length;
    const cols = imageArray[0].length;

    // Helper function to check if a position is within bounds
    function isWithinBounds(i, j) {
        return i >= 0 && i < rows && j >= 0 && j < cols;
    }

    // Check if there's a 1 in any position in the given row to the left of pos_j
    function hasImageToLeft(i, j) {
        for (let col = j - 1; col >= 0; col--) {
            if (imageArray[i][col] === 1) {
                return true;
            }
        }
        return false;
    }

    // Check if there's a 1 in any position in the given row to the right of pos_j
    function hasImageToRight(i, j) {
        for (let col = j + 1; col < cols; col++) {
            if (imageArray[i][col] === 1) {
                return true;
            }
        }
        return false;
    }

    // Check if there's a 1 in any position in the given column above pos_i
    function hasImageUp(i, j) {
        for (let row = i - 1; row >= 0; row--) {
            if (imageArray[row][j] === 1) {
                return true;
            }
        }
        return false;
    }

    // Check if there's a 1 in any position in the given column below pos_i
    function hasImageDown(i, j) {
        for (let row = i + 1; row < rows; row++) {
            if (imageArray[row][j] === 1) {
                return true;
            }
        }
        return false;
    }

    // Check if there's an adjacent 1 in the immediate surrounding positions
    const hasAdjacentImage = {
        left: isWithinBounds(pos_i, pos_j - 1) && imageArray[pos_i][pos_j - 1] === 1,
        right: isWithinBounds(pos_i, pos_j + 1) && imageArray[pos_i][pos_j + 1] === 1,
        up: isWithinBounds(pos_i - 1, pos_j) && imageArray[pos_i - 1][pos_j] === 1,
        down: isWithinBounds(pos_i + 1, pos_j) && imageArray[pos_i + 1][pos_j] === 1
    };

    // Determine allowed drag directions
    const allowedDirections = {
        up: hasImageUp(pos_i, pos_j),
        down: hasImageDown(pos_i, pos_j),
        left: hasImageToLeft(pos_i, pos_j),
        right: hasImageToRight(pos_i, pos_j)
    };

    // Update allowed directions based on the adjacent image condition
    if (hasAdjacentImage.left) {
        allowedDirections.left = true;
        allowedDirections.up = true;
        allowedDirections.down = true;
    }
    if (hasAdjacentImage.right) {
        allowedDirections.right = true;
        allowedDirections.up = true;
        allowedDirections.down = true;
    }
    if (hasAdjacentImage.up) {
        allowedDirections.up = true;
        allowedDirections.left = true;
        allowedDirections.right = true;
    }
    if (hasAdjacentImage.down) {
        allowedDirections.down = true;
        allowedDirections.left = true;
        allowedDirections.right = true;
    }

    return allowedDirections;
}

function getAllAllowedDirections(imageArray) {
    const rows = imageArray.length;
    const cols = imageArray[0].length;
    const directionsArray = [];

    for (let i = 0; i < rows; i++) {
        const rowDirections = [];
        for (let j = 0; j < cols; j++) {
            if (imageArray[i][j] === 1) {
                let getDirValues = canDrag(imageArray, i, j);
                const falseKeysArray = Object.keys(getDirValues).filter(key => !getDirValues[key]);
                rowDirections.push(falseKeysArray);

            } else {
                rowDirections.push(null);
            }
        }
        directionsArray.push(rowDirections);
    }

    return directionsArray;
}
// *****************************************************************************************************************************
// *****************************************************************************************************************************
// *****************************************************************************************************************************







class createImageTile extends GameObjects.Image {
    constructor(scene, x, y, texture, direction, name, visible, neighbours, i, j) {
        super(scene, x, y, texture);

        this.name = name;
        this.direction = direction;
        this.setInteractive();
        this.setDisplaySize(100, 100);
        this.scene = scene;
        this.setAlpha(1);
        this.originalX = x;
        this.originalY = y;

        this.i = i;
        this.j = j;

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

// This is to update the directions 

function UpdageAllowedDirections(tiles, i, j) {
    
}

export default Game;




