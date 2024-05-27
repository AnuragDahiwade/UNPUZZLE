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

















function getImageName(connections) {
    const directionsToImage = {
        'up': 'one_up',
        'down': 'one_down',
        'left': 'one_left',
        'right': 'one_right',
        'up_down': 'two_up_down',
        'left_right': 'two_left_right',
        'up_right': 'two_up_right',
        'up_left': 'two_up_left',
        'down_right': 'two_down_right',
        'down_left': 'two_down_left',
        'up_down_right': 'three_up_down_right',
        'up_down_left': 'three_up_down_left',
        'up_left_right': 'three_up_left_right',
        'down_left_right': 'three_down_left_right',
        'up_down_left_right': 'four_up_down_left_right'
       
    };

    const imageName = directionsToImage[connections.join('_')];
    return imageName ? imageName : 'default_image'; // Set default image if no mapping found
}

function getConnections(matrix, row, col) {
    const directions = ['up', 'down', 'left', 'right'];
    const connectedDirections = [];
    for (const dir of directions) {
        const newRow = row + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0);
        const newCol = col + (dir === 'left' ? -1 : dir === 'right' ? 1 : 0);
        if (isValidPosition(matrix, newRow, newCol) && matrix[newRow][newCol] === 1) {
            connectedDirections.push(dir);
        }
    }
    return connectedDirections;
}

function isValidPosition(matrix, row, col) {
    return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

// Example usage
const gameVisibility = [
    [null, 1, null, null],
    [1, 1, 1, 1],
    [null, null, 1, null],
    [null, null, null, null]
];

for (let i = 0; i < gameVisibility.length; i++) {
    for (let j = 0; j < gameVisibility[i].length; j++) {
        if (gameVisibility[i][j] === 1) {
            const connections = getConnections(gameVisibility, i, j);
            const imageName = getImageName(connections);
            console.log(`Image name for ${i},${j}: ${imageName}`);
            // Create and position image based on imageName
        }
    }
}
