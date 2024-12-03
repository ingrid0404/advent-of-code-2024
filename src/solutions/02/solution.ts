import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay2(): Promise<void> {
    try {
        const inputData = await readProblemDataByDay("02");
        if (inputData) {
            partOne(inputData);
        }
    } catch (err) {
        console.log(err);
    }
}

const isMonotonicAsc = (arr: number[], min: number, max: number) => {
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

const isMonotonic = (arr: number[], min: number, max: number) => {
    let isAsc = isMonotonicAsc(arr, min, max);
    let isDesc = isMonotonicDesc(arr, min, max);
    if ((isAsc && isDesc) || (!isAsc && !isDesc)) {
        return false;
    }
    return true;
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
