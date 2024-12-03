import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay2(): Promise<void> {
    try {
        const inputData = await readProblemDataByDay("02");
        if (inputData) {
            partOne(inputData);
            partTwo(inputData);
        }
    } catch (err) {
        console.log(err);
    }
}

const isMonotonicAsc = (arr: number[], min: number, max: number): boolean => {
    return arr.every(
        (v, i) =>
            i === 0 ||
            (v < arr[i - 1] && arr[i - 1] - v <= max && arr[i - 1] - v > min),
    );
};
const isMonotonicDesc = (arr: number[], min: number, max: number) => {
    return arr.every(
        (v, i) =>
            i === 0 ||
            (v > arr[i - 1] && v - arr[i - 1] <= max && v - arr[i - 1] > min),
    );
};

const isMonotonic = (arr: number[], min: number, max: number): boolean => {
    let isAsc = isMonotonicAsc(arr, min, max);
    let isDesc = isMonotonicDesc(arr, min, max);
    if ((isAsc && isDesc) || (!isAsc && !isDesc)) {
        return false;
    }
    return true;
};

const tryToRemoveOneLevel = (
    arr: number[],
    min: number,
    max: number,
): boolean => {
    for (let index = 0; index < arr.length; index++) {
        let subArray = arr.slice(0, index).concat(arr.slice(index + 1));
        if (isMonotonic(subArray, min, max)) {
            return true;
        }
    }
    return false;
};
function partOne(inputData: string) {
    let numberOfSafeReports = 0;
    let splited = inputData.split(/\r?\n/);
    for (let line of splited) {
        if (isMonotonic(line.split(/\s+/).map(Number), 0, 3)) {
            numberOfSafeReports++;
        }
    }
    console.log("Number of safe reports: " + numberOfSafeReports);
}

function partTwo(inputData: string) {
    let numberOfSafeReports = 0;
    let splited = inputData.split(/\r?\n/);
    for (let line of splited) {
        const lineOfNumbers = line.split(/\s+/).map(Number);
        if (isMonotonic(lineOfNumbers, 0, 3)) {
            numberOfSafeReports++;
        } else {
            if (tryToRemoveOneLevel(lineOfNumbers, 0, 3)) {
                numberOfSafeReports++;
            }
        }
    }
    console.log(
        "Number of safe reports that tolerate a single bad level: " +
            numberOfSafeReports,
    );
}
