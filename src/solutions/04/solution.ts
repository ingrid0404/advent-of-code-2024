import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay4(): Promise<void> {
    try {
        const inputData = await readProblemDataByDay("04");
        if (inputData) {
            partOne(inputData);
            partTwo(inputData);
        }
    } catch (err) {
        console.log(err);
    }
}

function calculateForEachMatrixCombination(matrix: string[][]): number {
    //left right and right left
    let numberOfOccurences = 0;
    numberOfOccurences += calculateNumberOfOccurencesInMatrix(matrix);

    let copyMatrix: string[][] = [];
    let i, j;

    let n = matrix.length;

    for (i = 0; i < n; i++) {
        copyMatrix[i] = matrix[i].slice();
    }

    //top bottom and bottom up

    for (i = 0; i < n; i++) {
        for (j = 0; j < matrix[i].length; j++) {
            copyMatrix[j][i] = matrix[i][j];
        }
    }

    numberOfOccurences += calculateNumberOfOccurencesInMatrix(copyMatrix);

    return numberOfOccurences;
}

function calculateForCrossMatrix(matrix: string[][]): number {
    let numberOfOccurences = 0;
    let x, y;
    let subString = "";
    let n = matrix.length;
    for (y = 0; y < n; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === "X") {
                // down-to-the-right
                subString = matrix[y + 1]?.[x + 1]
                    ?.concat(matrix[y + 2]?.[x + 2])
                    ?.concat(matrix[y + 3]?.[x + 3]);
                if (subString === "MAS") {
                    numberOfOccurences++;
                }

                // up-to-the-left
                subString = matrix[y - 1]?.[x - 1]
                    ?.concat(matrix[y - 2]?.[x - 2])
                    ?.concat(matrix[y - 3]?.[x - 3]);
                if (subString === "MAS") {
                    numberOfOccurences++;
                }

                // down-to-the-left
                subString = matrix[y + 1]?.[x - 1]
                    ?.concat(matrix[y + 2]?.[x - 2])
                    ?.concat(matrix[y + 3]?.[x - 3]);
                if (subString === "MAS") {
                    numberOfOccurences++;
                }

                // up-to-the-right
                subString = matrix[y - 1]?.[x + 1]
                    ?.concat(matrix[y - 2]?.[x + 2])
                    ?.concat(matrix[y - 3]?.[x + 3]);
                if (subString === "MAS") {
                    numberOfOccurences++;
                }
            }
        }
    }
    return numberOfOccurences;
}

function calculateNumberOfOccurencesInLine(line: string[]): number {
    let regex = /(XMAS)/g;
    let regexRev = /(SAMX)/g;
    let numberOfOccurences = 0;

    let str = line.join("");
    let match = str.match(regex);

    if (match) {
        numberOfOccurences += match.length;
    }
    match = str.match(regexRev);
    if (match) {
        numberOfOccurences += match.length;
    }
    return numberOfOccurences;
}
function calculateNumberOfOccurencesInMatrix(matrix: string[][]): number {
    let numberOfOccurences = 0;

    for (let i = 0; i < matrix.length; i++) {
        numberOfOccurences += calculateNumberOfOccurencesInLine(matrix[i]);
    }

    return numberOfOccurences;
}

function calculateXMASInMatrix(matrix: string[][]): number {
    let numberOfOccurences = 0;
    let x, y;
    let regex = /(MAS|SAM)/g;
    let n = matrix.length;
    for (y = 1; y < n - 1; y++) {
        for (x = 1; x < matrix[y].length - 1; x++) {
            let subString1 = matrix[y - 1][x - 1]
                ?.concat(matrix[y][x])
                ?.concat(matrix[y + 1][x + 1]);
            let subString2 = matrix[y + 1][x - 1]
                ?.concat(matrix[y][x])
                ?.concat(matrix[y - 1][x + 1]);
            debugger;
            if (subString1.match(regex) && subString2.match(regex)) {
                numberOfOccurences++;
            }
        }
    }
    return numberOfOccurences;
}

function processMatrixData(inputData: string): string[][] {
    let matrix: string[][] = [];
    let splitByLine = inputData.split(/\r?\n/);
    for (let index = 0; index < splitByLine.length; index++) {
        matrix.push(splitByLine[index].split(""));
    }
    return matrix;
}
function partOne(inputData: string): void {
    let numberOfOccurences = 0;
    let matrix = processMatrixData(inputData);

    numberOfOccurences += calculateForCrossMatrix(matrix);
    numberOfOccurences += calculateForEachMatrixCombination(matrix);

    console.log(numberOfOccurences);
}

function partTwo(inputData: string): void {
    let numberOfOccurences;
    let matrix = processMatrixData(inputData);
    numberOfOccurences = calculateXMASInMatrix(matrix);
    console.log(numberOfOccurences);
}
