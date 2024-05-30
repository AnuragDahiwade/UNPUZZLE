










// Assuming ImageTileArray and GameVisibility are already defined
ImageTileArray.forEach(tile => {
    this.add.existing(tile);
    this.input.setDraggable(tile);

    // Store original position for each tile
    tile.originalX = tile.x;
    tile.originalY = tile.y;
    tile.i = /* set the appropriate i index */;
    tile.j = /* set the appropriate j index */;
});

this.input.on('dragstart', (pointer, gameObject) => {
    gameObject.setAlpha(0.5);

    // Create a light rectangle and store it in the gameObject
    gameObject.light = this.add.rectangle(gameObject.x, gameObject.y, gameObject.width, gameObject.height, 0xffffff, 0.5);
});

this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
    // Calculate the delta distance
    let deltaX = dragX - gameObject.originalX;
    let deltaY = dragY - gameObject.originalY;

    let direction = getDirection(deltaX, deltaY);

    // Update the light rectangle's size and position based on the drag direction
    if (direction === 'left' || direction === 'right') {
        gameObject.light.width = this.cameras.main.width;
        gameObject.light.height = gameObject.height;
        gameObject.light.x = gameObject.originalX + (direction === 'left' ? -gameObject.light.width / 2 : gameObject.light.width / 2);
        gameObject.light.y = gameObject.originalY;
    } else if (direction === 'up' || direction === 'down') {
        gameObject.light.width = gameObject.width;
        gameObject.light.height = this.cameras.main.height;
        gameObject.light.x = gameObject.originalX;
        gameObject.light.y = gameObject.originalY + (direction === 'up' ? -gameObject.light.height / 2 : gameObject.light.height / 2);
    }
});

this.input.on('dragend', (pointer, gameObject) => {
    gameObject.setAlpha(1);

    // Destroy the light rectangle
    if (gameObject.light) {
        gameObject.light.destroy();
        gameObject.light = null;
    }

    let deltaX = pointer.x - gameObject.originalX;
    let deltaY = pointer.y - gameObject.originalY;

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
                    // Remove the tile from ImageTileArray and update GameVisibility
                    ImageTileArray = ImageTileArray.filter(tile => tile !== gameObject);
                    let p = gameObject.i;
                    let q = gameObject.j;
                    GameVisibility[p][q] = null;

                    // Destroy the tile
                    gameObject.destroy();
                }
            });
        } else {
            // If tile can't move, revert to original position
            gameObject.x = gameObject.originalX;
            gameObject.y = gameObject.originalY;
        }
    } else {
        // If drag is not far enough, revert to original position
        gameObject.x = gameObject.originalX;
        gameObject.y = gameObject.originalY;
    }
});

// Helper function to determine drag direction
function getDirection(deltaX, deltaY) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? 'right' : 'left';
    } else {
        return deltaY > 0 ? 'down' : 'up';
    }
}

// Function to check if the tile can move in the specified direction
function canMove(tile, direction) {
    let p = tile.i;
    let q = tile.j;

    if (direction === 'left') {
        return q > 0 && GameVisibility[p][q - 1] === null;
    } else if (direction === 'right') {
        return q < GameVisibility[0].length - 1 && GameVisibility[p][q + 1] === null;
    } else if (direction === 'up') {
        return p > 0 && GameVisibility[p - 1][q] === null;
    } else if (direction === 'down') {
        return p < GameVisibility.length - 1 && GameVisibility[p + 1][q] === null;
    }
    return false;
}
























const input = "level188dhdhd";

// Variables to hold the parts
let level = "";
let number = "";

// Loop through the string to separate letters and numbers
for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i])) {
        level += input[i];
    } else {
        number += input[i];
    }
}

console.log('Level:', level); // Output: Level: level
console.log('Number:', number); // Output: Number: 1







// function processConnections(grid) {
//     // Create a result array initialized to null
//     const result = grid.map(row => row.map(cell => null));
    
//     const directions = [
//         { name: 'up', dx: -1, dy: 0 },
//         { name: 'down', dx: 1, dy: 0 },
//         { name: 'left', dx: 0, dy: -1 },
//         { name: 'right', dx: 0, dy: 1 }
//     ];
    
//     function isValid(x, y) {
//         return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
//     }

//     for (let i = 0; i < grid.length; i++) {
//         for (let j = 0; j < grid[i].length; j++) {
//             if (grid[i][j] === 1 && result[i][j] === null) {
//                 let connections = [];
                
//                 directions.forEach(direction => {
//                     const newX = i + direction.dx;
//                     const newY = j + direction.dy;
//                     if (isValid(newX, newY) && grid[newX][newY] === 1 && result[newX][newY] === null) {
//                         connections.push(direction.name);
//                     }
//                 });
                
//                 // If there are connections, mark the first 1
//                 if (connections.length > 0) {
//                     result[i][j] = connections;
//                     // Mark subsequent connected 1s as 'processed'
//                     connections.forEach(direction => {
//                         const newX = i + direction.dx;
//                         const newY = j + direction.dy;
//                         if (isValid(newX, newY)) {
//                             result[newX][newY] = 'processed';
//                         }
//                     });
//                 } else {
//                     result[i][j] = [];
//                 }
//             }
//         }
//     }

//     // Convert 'processed' markers back to null for clarity
//     for (let i = 0; i < result.length; i++) {
//         for (let j = 0; j < result[i].length; j++) {
//             if (result[i][j] === 'processed') {
//                 result[i][j] = null;
//             }
//         }
//     }
    
//     return result;
// }

// const gameVisibility = [
//     [null, 1, null, null],
//     [1, 1, 1, 1],
//     [null, null, 1, null],
//     [null, null, null, null]
// ];

// console.log(processConnections(gameVisibility));















// function findConnectedOnes(matrix) {
//     const directions = [
//         { row: -1, col: 0, dir: 'up' },
//         { row: 1, col: 0, dir: 'down' },
//         { row: 0, col: -1, dir: 'left' },
//         { row: 0, col: 1, dir: 'right' }
//     ];

//     const rows = matrix.length;
//     const cols = matrix[0].length;
//     const result = [];

//     function isValid(r, c) {
//         return r >= 0 && r < rows && c >= 0 && c < cols;
//     }

//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//             if (matrix[r][c] === 1) {
//                 const connections = [];
//                 for (const { row, col, dir } of directions) {
//                     const newRow = r + row;
//                     const newCol = c + col;
//                     if (isValid(newRow, newCol) && matrix[newRow][newCol] === 1) {
//                         connections.push(dir);
//                     }
//                 }
//                 result.push({ position: [r, c], connections });
//             }
//         }
//     }

//     return result;
// }

// const gameVisibility = [
//     [null, 1, null, null],
//     [1, 1, 1, 1],
//     [null, null, 1, null],
//     [null, null, null, null]
// ];

// console.log(findConnectedOnes(gameVisibility));




// function getImageName(connections) {
//     const directionsToImage = {
//         'up': 'one_up',
//         'down': 'one_down',
//         'left': 'one_left',
//         'right': 'one_right',
//         'up_down': 'two_up_down',
//         'left_right': 'two_left_right',
//         'up_right': 'two_up_right',
//         'up_left': 'two_up_left',
//         'down_right': 'two_down_right',
//         'down_left': 'two_down_left',
//         'up_down_right': 'three_up_down_right',
//         'up_down_left': 'three_up_down_left',
//         'up_left_right': 'three_up_left_right',
//         'down_left_right': 'three_down_left_right',
//         'up_down_left_right': 'four_up_down_left_right'
       
//     };

//     const imageName = directionsToImage[connections.join('_')];
//     return imageName ? imageName : 'default_image'; // Set default image if no mapping found
// }

// function getConnections(matrix, row, col) {
//     const directions = ['up', 'down', 'left', 'right'];
//     const connectedDirections = [];
//     for (const dir of directions) {
//         const newRow = row + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0);
//         const newCol = col + (dir === 'left' ? -1 : dir === 'right' ? 1 : 0);
//         if (isValidPosition(matrix, newRow, newCol) && matrix[newRow][newCol] === 1) {
//             connectedDirections.push(dir);
//         }
//     }
//     return connectedDirections;
// }

// function isValidPosition(matrix, row, col) {
//     return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
// }

// // Example usage
// const gameVisibility = [
//     [null, 1, null, null],
//     [1, 1, 1, 1],
//     [null, null, 1, null],
//     [null, null, null, null]
// ];

// for (let i = 0; i < gameVisibility.length; i++) {
//     for (let j = 0; j < gameVisibility[i].length; j++) {
//         if (gameVisibility[i][j] === 1) {
//             const connections = getConnections(gameVisibility, i, j);
//             const imageName = getImageName(connections);
//             console.log(`Image name for ${i},${j}: ${imageName}`);
//             // Create and position image based on imageName
//         }
//     }
// }


















// import Game from './Game.js';
// import gameLevels from './gameLevels.js';


// class crossButtonScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'crossButtonScene' });
//     }


//     create() {
//         let crossBtn = this.add.image(game.config.width / 2, 40, 'cross').setScale(0.2);
//         crossBtn.setInteractive();
//         crossBtn.on('pointerdown', () => {
//             this.scene.start('TitlePage');
//         }, this);
//     }

// }

// export default crossButtonScene;