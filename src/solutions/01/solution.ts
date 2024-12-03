import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay1(): Promise<void> {
    try {
        const inputData = await readProblemDataByDay("01");
        if (inputData) {
            partOne(inputData);
            partTwo(inputData);
        }
    } catch (err) {
        console.log(err);
    }
}

function partOne(inputData: string): void {
    let leftArray: number[] = [],
        rightArray: number[] = [];
    let splited = inputData.split(/\r?\n/);
    for (let input of splited) {
        let [parsedLeft, parsedRight] = input.split(/\s+/);
        if (parsedLeft && parsedRight) {
            leftArray.push(parseInt(parsedLeft));
            rightArray.push(parseInt(parsedRight));
        }
    }

    const descendingSort = (a: number, b: number) => b - a;
    leftArray.sort(descendingSort);
    rightArray.sort(descendingSort);

    let length = rightArray.length;

    let totalDistance = 0;
    for (let index = 0; index < length; index++) {
        let diff = Math.abs(leftArray[index] - rightArray[index]);
        totalDistance += diff;
    }
    console.log("Part One: " + totalDistance);
}

function incrementMapIfExists(map: Map<number, number>, key: number): void {
    if (map.has(key)) {
        map.set(key, map.get(key)! + 1);
    } else {
        map.set(key, 1);
    }
}
function partTwo(inputData: string): void {
    let similarityScore = 0;
    let splited = inputData.split(/\r?\n/);

    let leftMap = new Map<number, number>(),
        rightMap = new Map<number, number>();
    for (let input of splited) {
        let [parsedLeft, parsedRight] = input.split(/\s+/);
        let left = parseInt(parsedLeft);
        let right = parseInt(parsedRight);

        incrementMapIfExists(leftMap, left);
        incrementMapIfExists(rightMap, right);
    }

    for (let key of leftMap.keys()) {
        if (rightMap.has(key)) {
            similarityScore += key * (rightMap.get(key) ?? 0);
        }
    }

    console.log("Part Two: " + similarityScore);
}
