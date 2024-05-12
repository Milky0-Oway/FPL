/*Create a function spiral , which gets two deimension array and
return onedimensional array with elements positioned by spiral*/

const spiral = (matrix) => {
    let result = [];
    let rows = matrix.length;
    let cols = matrix[0].length;
    let startRow = 0;
    let startCol = 0;
    let endRow = rows - 1;
    let endCol = cols - 1;

    while (startRow <= endRow && startCol <= endCol) {
        for (let i = startCol; i <= endCol; i++) {
            result.push(matrix[startRow][i]);
        }
        startRow++;
        for (let i = startRow; i <= endRow; i++) {
            result.push(matrix[i][endCol]);
        }
        endCol--;
        if (startRow <= endRow) {
            for (let i = endCol; i >= startCol; i--) {
                result.push(matrix[endRow][i]);
            }
            endRow--;
        }
        if (startCol <= endCol) {
            for (let i = endRow; i >= startRow; i--) {
                result.push(matrix[i][startCol]);
            }
            startCol++;
        }
    }
    return result;
}

console.log(spiral([[4, 5], [6, 7]])); // [4,5,7,6]
console.log(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // [1,2,3,6,9,8,7,4,5]
console.log(spiral([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]
]));  // [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]