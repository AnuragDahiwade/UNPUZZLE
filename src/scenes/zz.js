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

    // Determine allowed drag directions
    const allowedDirections = {
        up: hasImageUp(pos_i, pos_j),
        down: hasImageDown(pos_i, pos_j),
        left: hasImageToLeft(pos_i, pos_j),
        right: hasImageToRight(pos_i, pos_j)
    };

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
                rowDirections.push(canDrag(imageArray, i, j));
            } else {
                rowDirections.push(null);
            }
        }
        directionsArray.push(rowDirections);
    }

    return directionsArray;
}

// Example usage:
const gridArray = [
    [1, null, 1],
    [null, 1, 1],
    [null, null, null]
];

const allowedDirectionsArray = getAllAllowedDirections(gridArray);
console.log(allowedDirectionsArray);
